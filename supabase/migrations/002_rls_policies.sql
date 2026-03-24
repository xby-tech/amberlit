-- AmberLit: Row Level Security Policies
-- Every table has RLS enabled. No data accessible without authenticated, scoped query.

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table schools enable row level security;
alter table students enable row level security;
alter table groups enable row level security;
alter table group_students enable row level security;
alter table student_progress enable row level security;
alter table sessions enable row level security;
alter table responses enable row level security;
alter table ai_insights enable row level security;

-- Profiles: users can read/update their own profile
create policy "users_own_profile" on profiles
  for all using (id = auth.uid());

-- Schools: aides at that school can read
create policy "school_members_read" on schools
  for select using (
    id in (select school_id from profiles where id = auth.uid())
  );

-- Students: parents see their own children
create policy "parents_own_students" on students
  for all using (parent_id = auth.uid());

-- Students: aides see students in their groups
create policy "aides_group_students" on students
  for select using (
    id in (
      select gs.student_id from group_students gs
      join groups g on gs.group_id = g.id
      where g.aide_id = auth.uid()
    )
  );

-- Groups: aides see their own groups
create policy "aides_own_groups" on groups
  for all using (aide_id = auth.uid());

-- Group students: aides manage their group membership
create policy "aides_group_students_manage" on group_students
  for all using (
    group_id in (select id from groups where aide_id = auth.uid())
  );

-- Student progress: scoped via student access
create policy "progress_via_student" on student_progress
  for all using (
    student_id in (
      select id from students where parent_id = auth.uid()
      union
      select gs.student_id from group_students gs
      join groups g on gs.group_id = g.id
      where g.aide_id = auth.uid()
    )
  );

-- Sessions: scoped via conductor or student ownership
create policy "sessions_via_conductor" on sessions
  for all using (
    conductor_id = auth.uid()
    or student_id in (
      select id from students where parent_id = auth.uid()
    )
  );

-- Responses: scoped via student access
create policy "responses_via_student" on responses
  for all using (
    student_id in (
      select id from students where parent_id = auth.uid()
      union
      select gs.student_id from group_students gs
      join groups g on gs.group_id = g.id
      where g.aide_id = auth.uid()
    )
  );

-- AI Insights: scoped via student access
create policy "insights_via_student" on ai_insights
  for all using (
    student_id in (
      select id from students where parent_id = auth.uid()
      union
      select gs.student_id from group_students gs
      join groups g on gs.group_id = g.id
      where g.aide_id = auth.uid()
    )
  );
