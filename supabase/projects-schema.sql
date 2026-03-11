-- Projects table for BlogKurs
-- Run this in Supabase SQL Editor after creating your project.

-- Optional: trigger function for updated_at (skip if already in schema.sql)
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

-- Table: projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  cover_image_url text,
  content text not null default '',
  github_url text,
  live_demo_url text,
  related_links jsonb not null default '[]',
  published boolean not null default false,
  featured_on_homepage boolean not null default false,
  homepage_order integer not null default 0,
  view_count integer not null default 0,
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger for updated_at (reuse existing function from schema.sql)
drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Storage bucket: create in Supabase Dashboard or via SQL
insert into storage.buckets (id, name, public)
values ('project-covers', 'project-covers', true)
on conflict (id) do update set public = true;

create policy "Public read project-covers"
  on storage.objects for select
  using (bucket_id = 'project-covers');

create policy "Allow uploads for project-covers"
  on storage.objects for insert
  with check (bucket_id = 'project-covers');

create policy "Allow delete for project-covers"
  on storage.objects for delete
  using (bucket_id = 'project-covers');
