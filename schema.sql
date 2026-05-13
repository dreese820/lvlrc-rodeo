-- Long Valley Lions Rodeo Club — Supabase Schema
-- Run this entire file in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)

create table if not exists contestants (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  gender text not null check (gender in ('Girls','Boys')),
  age_group text not null check (age_group in ('0-5','6-9','10-14','15-18')),
  created_at timestamptz default now()
);

create table if not exists entries (
  id uuid default gen_random_uuid() primary key,
  rodeo_id text not null,
  event_id text not null,
  contestant_id uuid references contestants(id) on delete cascade,
  created_at timestamptz default now(),
  unique(rodeo_id, event_id, contestant_id)
);

create table if not exists draws (
  id uuid default gen_random_uuid() primary key,
  rodeo_id text not null,
  event_id text not null,
  contestant_ids text[] not null default '{}',
  updated_at timestamptz default now(),
  unique(rodeo_id, event_id)
);

create table if not exists results (
  id uuid default gen_random_uuid() primary key,
  rodeo_id text not null,
  event_id text not null,
  contestant_id uuid references contestants(id) on delete cascade,
  time_val numeric,
  penalty numeric,
  loop1 numeric,
  loop2 numeric,
  loop3 numeric,
  loop_count integer default 0,
  loop_total numeric,
  score numeric,
  no_time boolean default false,
  is_ll boolean default false,
  updated_at timestamptz default now(),
  unique(rodeo_id, event_id, contestant_id)
);

create table if not exists rodeo_settings (
  rodeo_id text primary key,
  entries_open boolean default false,
  updated_at timestamptz default now()
);

insert into rodeo_settings (rodeo_id, entries_open) values
  ('r1', false), ('r2', false), ('r3', false), ('r4', false)
on conflict (rodeo_id) do nothing;

create table if not exists admin_users (
  id uuid default gen_random_uuid() primary key,
  username text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- Disable RLS for all tables (we use the service key server-side)
alter table contestants disable row level security;
alter table entries disable row level security;
alter table draws disable row level security;
alter table results disable row level security;
alter table rodeo_settings disable row level security;
alter table admin_users disable row level security;
