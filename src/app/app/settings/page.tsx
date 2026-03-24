'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { YearLevel } from '@/lib/supabase/types';

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [yearLevel, setYearLevel] = useState<YearLevel>('F');
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Array<{ id: string; first_name: string; year_level: string }>>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from('students')
      .select('id, first_name, year_level')
      .eq('parent_id', user.id);
    setStudents((data as typeof students) ?? []);
  }

  async function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim()) return;

    setLoading(true);
    setMessage('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    const { error } = await supabase.from('students').insert({
      parent_id: user.id,
      first_name: firstName.trim(),
      year_level: yearLevel,
      avatar_seed: Math.random().toString(36).slice(2),
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage(`${firstName} added!`);
      setFirstName('');
      await loadStudents();
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      {/* Add Student */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">Add a student</h2>
        <form onSubmit={handleAddStudent} className="mt-4 flex flex-col gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
              placeholder="e.g. Amira"
              required
            />
          </div>
          <div>
            <label htmlFor="yearLevel" className="block text-sm font-medium text-gray-700">Year level</label>
            <select
              id="yearLevel"
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value as YearLevel)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-amber-500 focus:ring-amber-500"
            >
              <option value="F">Foundation (Prep)</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading || !firstName.trim()}
            className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 transition-colors w-fit"
          >
            {loading ? 'Adding...' : 'Add student'}
          </button>
          {message && <p className="text-sm text-green-700">{message}</p>}
        </form>
      </section>

      {/* Student List */}
      {students.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800">Your students</h2>
          <ul className="mt-4 space-y-2">
            {students.map((s) => (
              <li key={s.id} className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm">
                  {s.first_name[0]}
                </div>
                <span className="font-medium text-gray-800">{s.first_name}</span>
                <span className="text-sm text-gray-500">
                  {s.year_level === 'F' ? 'Foundation' : `Year ${s.year_level}`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
