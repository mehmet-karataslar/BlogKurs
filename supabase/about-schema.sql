-- About (Hakkımda) table for BlogKurs — single profile row.
-- Run this in Supabase SQL Editor after creating your project.

-- Table: about (single row for site owner profile)
create table if not exists public.about (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  surname text not null default '',
  tagline text not null default '',
  profile_image_url text,
  bio text not null default '',
  schools jsonb not null default '[]',
  certificates jsonb not null default '[]',
  skills jsonb not null default '[]',
  technical_info text not null default '',
  updated_at timestamptz not null default now()
);

-- Trigger for updated_at (reuse existing function from schema.sql or projects-schema.sql)
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists about_updated_at on public.about;
create trigger about_updated_at
  before update on public.about
  for each row execute function public.set_updated_at();

-- Storage bucket for profile/avatar image
insert into storage.buckets (id, name, public)
values ('about', 'about', true)
on conflict (id) do update set public = true;

create policy "Public read about"
  on storage.objects for select
  using (bucket_id = 'about');

create policy "Allow uploads for about"
  on storage.objects for insert
  with check (bucket_id = 'about');

create policy "Allow delete for about"
  on storage.objects for delete
  using (bucket_id = 'about');
