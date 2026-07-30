create extension if not exists pgcrypto;

create table if not exists public.catalog_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand_key text not null default '',
  brand_title text not null default '',
  price numeric(10, 2) not null default 0,
  image_url text not null default '',
  image_alt_url text not null default '',
  category text not null default 'unisex',
  badge text not null default '',
  size_label text not null default '',
  description text not null default '',
  details_html text not null default '',
  status text not null default 'active' check (status in ('active', 'hidden', 'draft', 'archived')),
  is_featured boolean not null default false,
  is_best_seller boolean not null default false,
  sort_order integer not null default 0,
  source_page text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_action_logs (
  id uuid primary key default gen_random_uuid(),
  actor_email text not null default '',
  action_type text not null,
  entity_type text not null,
  entity_id text not null default '',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  page text,
  product_name text,
  session_id text,
  visitor_id text,
  order_id text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_catalog_products_touch_updated_at on public.catalog_products;
create trigger trg_catalog_products_touch_updated_at
before update on public.catalog_products
for each row
execute function public.touch_updated_at();

drop trigger if exists trg_site_settings_touch_updated_at on public.site_settings;
create trigger trg_site_settings_touch_updated_at
before update on public.site_settings
for each row
execute function public.touch_updated_at();

create index if not exists idx_catalog_products_status on public.catalog_products(status);
create index if not exists idx_catalog_products_brand_key on public.catalog_products(brand_key);
create index if not exists idx_catalog_products_best_seller on public.catalog_products(is_best_seller);
create index if not exists idx_catalog_products_sort_order on public.catalog_products(sort_order);
create index if not exists idx_site_events_created_at on public.site_events(created_at desc);
create index if not exists idx_site_events_event_name on public.site_events(event_name);
create index if not exists idx_site_events_session_id on public.site_events(session_id);
create index if not exists idx_site_events_visitor_id on public.site_events(visitor_id);
create index if not exists idx_site_events_order_id on public.site_events(order_id);

alter table public.catalog_products enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_action_logs enable row level security;
alter table public.site_events enable row level security;

drop policy if exists "public can read active catalog products" on public.catalog_products;
create policy "public can read active catalog products"
on public.catalog_products
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "service role manages catalog products" on public.catalog_products;
create policy "service role manages catalog products"
on public.catalog_products
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role manages site settings" on public.site_settings;
create policy "service role manages site settings"
on public.site_settings
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role manages admin logs" on public.admin_action_logs;
create policy "service role manages admin logs"
on public.admin_action_logs
for all
to service_role
using (true)
with check (true);

drop policy if exists "service role manages site events" on public.site_events;
create policy "service role manages site events"
on public.site_events
for all
to service_role
using (true)
with check (true);
