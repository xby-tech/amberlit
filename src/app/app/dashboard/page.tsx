import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';
import AideDashboard from '@/components/layout/AideDashboard';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Student = Database['public']['Tables']['students']['Row'];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .returns<Profile[]>()
    .single();

  // Aide mode: show groups
  if (profile?.role === 'aide') {
    const { data: groups } = await supabase
      .from('groups')
      .select('id, name, year_level')
      .eq('aide_id', user!.id);

    const groupsWithCounts = await Promise.all(
      ((groups as Array<{ id: string; name: string; year_level: string }>) ?? []).map(async (g) => {
        const { count } = await supabase.from('group_students').select('*', { count: 'exact', head: true }).eq('group_id', g.id);
        return { ...g, student_count: count ?? 0 };
      }),
    );

    return <AideDashboard groups={groupsWithCounts} displayName={profile.display_name} />;
  }

  // Parent mode: show students
  const { data: students } = await supabase
    .from('students')
    .select('*')
    .eq('parent_id', user!.id)
    .returns<Student[]>();

  const hasStudents = students && students.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome, {profile?.display_name}
      </h1>
      <p className="mt-2 text-gray-600">
        Start a learning session or check your child&apos;s progress.
      </p>

      {hasStudents ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <div
              key={student.id}
              className="rounded-xl border-2 border-amber-200 bg-white p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-xl">
                  {student.first_name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{student.first_name}</h3>
                  <p className="text-sm text-gray-500">
                    {student.year_level === 'F' ? 'Foundation' : `Year ${student.year_level}`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/app/session/${student.id}`}
                  className="flex-1 bg-amber-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Start session
                </Link>
                <Link
                  href={`/app/progress/${student.id}`}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Progress
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-semibold text-amber-800">
            Getting started
          </h2>
          <p className="mt-2 text-sm text-amber-700">
            Add a student to begin your first learning session.
          </p>
          <Link
            href="/app/settings"
            className="mt-4 inline-block bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Add a student
          </Link>
        </div>
      )}
    </div>
  );
}
