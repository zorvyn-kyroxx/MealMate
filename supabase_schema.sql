-- MealMate Production Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://app.supabase.com)

-- 1. Create User Workspaces Table
create table if not exists public.user_workspaces (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  data jsonb not null default '{}'::jsonb,
  plan text not null default 'FREE' check (plan in ('FREE', 'PRO')),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Payments & Subscription Ledger Table
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  order_id text not null,
  payment_id text,
  amount integer not null,
  currency text not null default 'INR',
  status text not null default 'created' check (status in ('created', 'paid', 'failed', 'refunded')),
  plan text not null default 'PRO',
  billing_cycle text not null default 'annual',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS) on all tables
alter table public.user_workspaces enable row level security;
alter table public.payments enable row level security;

-- Browser clients may manage workspace data but cannot change the paid plan column.
revoke all on table public.user_workspaces from anon, authenticated;
grant select on table public.user_workspaces to authenticated;
grant insert (user_id, data, updated_at) on public.user_workspaces to authenticated;
grant update (user_id, data, updated_at) on public.user_workspaces to authenticated;

-- 4. RLS Policies for user_workspaces (Only owner can read/write)
drop policy if exists "Users can view their own workspace data" on public.user_workspaces;
create policy "Users can view their own workspace data"
  on public.user_workspaces for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own workspace data" on public.user_workspaces;
create policy "Users can insert their own workspace data"
  on public.user_workspaces for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own workspace data" on public.user_workspaces;
create policy "Users can update their own workspace data"
  on public.user_workspaces for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 5. RLS Policies for payments (Users can only view their own receipts)
drop policy if exists "Users can view their own payments" on public.payments;
create policy "Users can view their own payments"
  on public.payments for select to authenticated
  using (auth.uid() = user_id);

-- 6. Trigger to auto-create workspace entry on signup
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
