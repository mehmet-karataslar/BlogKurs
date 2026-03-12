-- Add optional phone to contact_messages

alter table public.contact_messages
  add column if not exists phone text default '';

comment on column public.contact_messages.phone is 'Optional sender phone from contact form';
