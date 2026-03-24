'use client';

import Link from 'next/link';

interface Group {
  id: string;
  name: string;
  year_level: string;
  student_count: number;
}

interface AideDashboardProps {
  groups: Group[];
  displayName: string;
}

export default function AideDashboard({ groups, displayName }: AideDashboardProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome, {displayName}</h1>
      <p className="mt-2 text-gray-600">Manage your student groups and start intervention sessions.</p>

      {groups.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id} className="rounded-xl border-2 border-blue-200 bg-white p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{group.name}</h3>
                <p className="text-sm text-gray-500">
                  {group.year_level === 'F' ? 'Foundation' : `Year ${group.year_level}`} — {group.student_count} student{group.student_count !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/app/group/${group.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Start session
                </Link>
                <Link
                  href={`/app/group/${group.id}`}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-semibold text-blue-800">Getting started</h2>
          <p className="mt-2 text-sm text-blue-700">Create your first intervention group to begin.</p>
          <Link href="/app/settings" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Create a group
          </Link>
        </div>
      )}
    </div>
  );
}
