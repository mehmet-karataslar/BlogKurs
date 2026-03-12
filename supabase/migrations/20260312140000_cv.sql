-- CV (Özgeçmiş) table — single row, full CV stored in data JSONB.
create table if not exists public.cv (
  id uuid primary key default gen_random_uuid(),
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists cv_updated_at on public.cv;
create trigger cv_updated_at
  before update on public.cv
  for each row execute function public.set_updated_at();

-- Public read for site CV (GET /api/cv); insert/update via API (server)
alter table public.cv enable row level security;

create policy "Public read cv"
  on public.cv for select
  using (true);

create policy "Allow insert update cv"
  on public.cv for all
  using (true)
  with check (true);
