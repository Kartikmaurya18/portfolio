-- Learning journal schema for Supabase (Postgres).
--
-- How to use: Supabase dashboard -> SQL Editor -> paste this whole file ->
-- change OWNER_EMAIL below to the email you will log in with -> Run.
-- It is safe to run again: it only creates what is missing.
--
-- Security model: everyone may READ (the journal is public on the portfolio).
-- Only a signed-in user whose email equals OWNER_EMAIL may create, edit or
-- delete. Also turn OFF "Allow new users to sign up" in
-- Authentication -> Sign In / Providers, so nobody else can ever get an account.

-- ---------------------------------------------------------------- tables
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  sort_order  int  not null default 100,
  created_at  timestamptz not null default now()
);

create table if not exists public.learning_entries (
  id           uuid primary key default gen_random_uuid(),
  entry_date   date not null,                       -- the day the learning belongs to; many rows can share a day
  title        text not null check (char_length(title) between 1 and 200),
  category_id  uuid references public.categories(id) on delete set null,
  tags         text[] not null default '{}',        -- lower-case topics
  summary      text not null default '',
  explanation  text not null default '',            -- Markdown (images are Markdown images)
  takeaways    text[] not null default '{}',
  examples     text not null default '',            -- Markdown, including code blocks
  links        jsonb not null default '[]'::jsonb,  -- [{ "title": "...", "url": "https://..." }]
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists learning_entries_date_idx on public.learning_entries (entry_date desc, created_at desc);
create index if not exists learning_entries_category_idx on public.learning_entries (category_id);
create index if not exists learning_entries_tags_idx on public.learning_entries using gin (tags);

-- Keep updated_at honest.
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists learning_entries_touch on public.learning_entries;
create trigger learning_entries_touch before update on public.learning_entries
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------- categories
insert into public.categories (name, sort_order) values
  ('Artificial Intelligence', 1),
  ('Generative AI & LLMs', 2),
  ('RAG & AI Agents', 3),
  ('System Design', 4),
  ('Software Architecture', 5),
  ('Backend Engineering', 6),
  ('Java & Spring Boot', 7),
  ('Distributed Systems', 8),
  ('Database & SQL', 9),
  ('Computer Science Fundamentals', 10),
  ('Other', 11)
on conflict (name) do nothing;

-- --------------------------------------------------------------- security
-- >>> CHANGE THIS to the email you log in with <<<
create or replace function public.is_journal_owner() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'OWNER_EMAIL'
$$;

alter table public.categories       enable row level security;
alter table public.learning_entries enable row level security;

drop policy if exists "anyone can read categories" on public.categories;
create policy "anyone can read categories" on public.categories for select using (true);
drop policy if exists "owner writes categories" on public.categories;
create policy "owner writes categories" on public.categories for all
  using (public.is_journal_owner()) with check (public.is_journal_owner());

drop policy if exists "anyone can read entries" on public.learning_entries;
create policy "anyone can read entries" on public.learning_entries for select using (true);
drop policy if exists "owner writes entries" on public.learning_entries;
create policy "owner writes entries" on public.learning_entries for all
  using (public.is_journal_owner()) with check (public.is_journal_owner());

-- ---------------------------------------------------------------- images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('journal-images', 'journal-images', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

drop policy if exists "anyone can view journal images" on storage.objects;
create policy "anyone can view journal images" on storage.objects for select
  using (bucket_id = 'journal-images');
drop policy if exists "owner uploads journal images" on storage.objects;
create policy "owner uploads journal images" on storage.objects for insert
  with check (bucket_id = 'journal-images' and public.is_journal_owner());
drop policy if exists "owner changes journal images" on storage.objects;
create policy "owner changes journal images" on storage.objects for update
  using (bucket_id = 'journal-images' and public.is_journal_owner());
drop policy if exists "owner deletes journal images" on storage.objects;
create policy "owner deletes journal images" on storage.objects for delete
  using (bucket_id = 'journal-images' and public.is_journal_owner());
