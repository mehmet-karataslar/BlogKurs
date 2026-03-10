-- Blog posts table for BlogKurs
-- Run this in Supabase SQL Editor after creating your project.

-- Table: posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  cover_image_url text,
  content text not null default '',
  published boolean not null default false,
  featured_on_homepage boolean not null default false,
  homepage_order integer not null default 0,
  reading_time_minutes integer not null default 5,
  category text,
  view_count integer not null default 0,
  like_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Optional: trigger to keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- RLS: allow public read for published posts only (optional; adjust if you use RLS)
-- alter table public.posts enable row level security;
-- create policy "Public read published" on public.posts for select using (published = true);
-- Service role key bypasses RLS, so admin API will work regardless.

-- Storage bucket: create in Supabase Dashboard → Storage → New bucket
-- Name: blog-covers
-- Public: yes (so cover_image_url can be used in <img> / next/image)
-- Or via SQL:
insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do update set public = true;

-- Allow public read for blog-covers
create policy "Public read blog-covers"
  on storage.objects for select
  using (bucket_id = 'blog-covers');

-- Allow authenticated/anon upload (or use service role from API)
-- For API upload with service role, no policy needed for insert.
create policy "Allow uploads for blog-covers"
  on storage.objects for insert
  with check (bucket_id = 'blog-covers');

create policy "Allow delete for blog-covers"
  on storage.objects for delete
  using (bucket_id = 'blog-covers');
