create table if not exists public.pro_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id text not null unique,
  payment_id text unique,
  billing_cycle text not null check (billing_cycle in ('monthly', 'annual')),
  amount_paise integer not null check (amount_paise in (24900, 199900)),
  status text not null default 'pending' check (status in ('pending', 'active')),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  expires_at timestamptz
);

create index if not exists pro_subscriptions_user_expiry_idx
  on public.pro_subscriptions (user_id, expires_at desc)
  where status = 'active';

alter table public.pro_subscriptions enable row level security;
revoke all on table public.pro_subscriptions from public, anon, authenticated;
grant select, insert, update on table public.pro_subscriptions to service_role;
