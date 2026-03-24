-- AmberLit: Initial Schema
-- All tables for the learning platform

-- Schools (must exist before profiles reference it)
create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  state text not null check (state in ('VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT')),
  created_at timestamptz default now()
);

-- User profiles (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  role text not null check (role in ('parent', 'aide', 'admin')),
  school_id uuid references schools(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Students
create table students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references profiles(id),
  school_id uuid references schools(id),
  first_name text not null,
  last_initial text,
  year_level text not null check (year_level in ('F', '1', '2')),
  avatar_seed text,
  date_of_birth date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Teacher aide groups
create table groups (
  id uuid primary key default gen_random_uuid(),
  aide_id uuid references profiles(id) not null,
  school_id uuid references schools(id) not null,
  name text not null,
  year_level text not null,
  created_at timestamptz default now()
);

create table group_students (
  group_id uuid references groups(id) on delete cascade,
  student_id uuid references students(id) on delete cascade,
  primary key (group_id, student_id)
);

-- Student progress per curriculum node (core learning state)
create table student_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) not null,
  curriculum_node_id text not null,
  domain text not null,
  strand text not null,
  mastery_level real default 0,
  attempts integer default 0,
  correct integer default 0,
  last_practiced timestamptz,
  next_review timestamptz,
  unlocked boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(student_id, curriculum_node_id)
);

-- Learning sessions
create table sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) not null,
  conductor_id uuid references profiles(id) not null,
  mode text not null check (mode in ('parent', 'aide')),
  group_id uuid references groups(id),
  started_at timestamptz default now(),
  ended_at timestamptz,
  duration_seconds integer,
  lesson_id text not null,
  status text default 'active' check (status in ('active', 'completed', 'abandoned'))
);

-- Individual responses within sessions
create table responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) not null,
  student_id uuid references students(id) not null,
  activity_type text not null,
  curriculum_node_id text not null,
  stimulus text not null,
  expected_response text,
  actual_response text,
  result text not null check (result in ('correct', 'incorrect', 'prompted', 'skipped')),
  response_time_ms integer,
  ai_feedback text,
  aide_note text,
  created_at timestamptz default now()
);

-- AI-generated insights for parents and aides
create table ai_insights (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) not null,
  session_id uuid references sessions(id),
  insight_type text not null check (insight_type in ('observation', 'suggestion', 'alert', 'praise', 'milestone')),
  title text not null,
  body text not null,
  domain text,
  priority integer default 0,
  dismissed boolean default false,
  created_at timestamptz default now()
);
