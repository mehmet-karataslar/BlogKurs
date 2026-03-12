-- Contact messages table for BlogKurs — form submissions from /iletisim

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null default '',
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied')),
  reply_text text not null default '',
  replied_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.contact_messages is 'Messages sent via the contact form on /iletisim';
comment on column public.contact_messages.status is 'new = unread, read = viewed by admin, replied = admin saved a reply';
