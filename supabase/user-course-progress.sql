-- =========================================================
-- USER COURSE PROGRESS (idempotent by user_id + course_id)
-- =========================================================

create extension if not exists pgcrypto;

create table if not exists public.user_course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  status text not null default 'started',
  started_at timestamptz not null default now(),
  completed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_course_progress_user_course_unique
    unique (user_id, course_id)
);

create index if not exists user_course_progress_user_idx
on public.user_course_progress(user_id);

create index if not exists user_course_progress_course_idx
on public.user_course_progress(course_id);

create index if not exists user_course_progress_completed_idx
on public.user_course_progress(completed_at desc);

alter table public.user_course_progress
enable row level security;

drop policy if exists "Users can read own course progress"
on public.user_course_progress;

create policy "Users can read own course progress"
on public.user_course_progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own course progress"
on public.user_course_progress;

create policy "Users can insert own course progress"
on public.user_course_progress
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own course progress"
on public.user_course_progress;

create policy "Users can update own course progress"
on public.user_course_progress
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
