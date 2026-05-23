# Supabase Setup for ForgeFit

## 1. Create the `user_workouts` table

Run this SQL in your Supabase SQL Editor:

```sql
create table public.user_workouts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  workout_id text not null,
  title text not null,
  completed_at timestamptz not null,
  duration_minutes integer,
  exercises_completed integer,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.user_workouts enable row level security;

-- Users can only see and modify their own workouts
create policy "Users can view own workouts"
  on public.user_workouts for select
  using (auth.uid() = user_id);

create policy "Users can insert own workouts"
  on public.user_workouts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own workouts"
  on public.user_workouts for update
  using (auth.uid() = user_id);

-- Optional: Add index for faster queries
create index on public.user_workouts (user_id, completed_at desc);
```