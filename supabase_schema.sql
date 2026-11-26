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

-- 4. RLS Policies for user_workspaces (Only owner can read/write)
create policy "Users can view their own workspace data"
  on public.user_workspaces for select
  using (auth.uid() = user_id);

create policy "Users can insert their own workspace data"
  on public.user_workspaces for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own workspace data"
  on public.user_workspaces for update
  using (auth.uid() = user_id);

-- 5. RLS Policies for payments (Users can only view their own receipts)
create policy "Users can view their own payments"
  on public.payments for select
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
