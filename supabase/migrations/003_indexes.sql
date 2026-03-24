-- AmberLit: Performance Indexes

create index idx_responses_session on responses(session_id);
create index idx_responses_student on responses(student_id);
create index idx_responses_node on responses(curriculum_node_id);
create index idx_progress_student on student_progress(student_id);
create index idx_progress_node on student_progress(curriculum_node_id);
create index idx_sessions_student on sessions(student_id);
create index idx_sessions_conductor on sessions(conductor_id);
create index idx_insights_student on ai_insights(student_id);
create index idx_students_parent on students(parent_id);
create index idx_groups_aide on groups(aide_id);
create index idx_group_students_student on group_students(student_id);
