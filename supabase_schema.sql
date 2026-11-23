-- MealMate Supabase Database Schema
-- Run this script in the Supabase SQL Editor (https://app.supabase.com)

-- 1. Create User Workspaces Table (stores synchronized state per user)
create table if not exists public.user_workspaces (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  data jsonb not null default '{}'::jsonb,
  plan text not null default 'FREE',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.user_workspaces enable row level security;

-- 3. Define RLS Policies so users can only read & write their own data
create policy "Users can view their own workspace data"
  on public.user_workspaces for select
  using (auth.uid() = user_id);

create policy "Users can insert their own workspace data"
  on public.user_workspaces for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own workspace data"
  on public.user_workspaces for update
  using (auth.uid() = user_id);

-- 4. Automatically create workspace entry on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_workspaces (user_id, data, plan)
  values (new.id, '{}'::jsonb, 'FREE')
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
