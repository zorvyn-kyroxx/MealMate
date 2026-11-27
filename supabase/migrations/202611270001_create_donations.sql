create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  payment_id text unique,
  amount_paise integer not null check (amount_paise >= 100 and amount_paise <= 10000000),
  status text not null default 'pending' check (status in ('pending', 'paid')),
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.donations enable row level security;
revoke all on table public.donations from anon, authenticated;
grant select, insert, update on table public.donations to service_role;

create or replace function public.get_donation_summary()
returns table (total_paise bigint, donation_count bigint)
language sql
security definer
set search_path = public
as $$
  select
    coalesce(sum(amount_paise), 0)::bigint,
    count(*)::bigint
  from public.donations
  where status = 'paid';
$$;

revoke all on function public.get_donation_summary() from public, anon, authenticated;
grant execute on function public.get_donation_summary() to service_role;
