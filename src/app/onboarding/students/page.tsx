'use client';

import { createClient } from '@/lib/supabase/client';
import type { YearLevel, AustralianState } from '@/lib/supabase/types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AddStudentsPage() {
  const [role, setRole] = useState<'parent' | 'aide' | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      const profile = data as { role: string } | null;
      setRole((profile?.role as 'parent' | 'aide') ?? 'parent');
      setLoading(false);
    }
    loadRole();
  }, []);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return role === 'aide' ? <AideOnboarding /> : <ParentOnboarding />;
}

// ─── Parent Onboarding ───────────────────────────────────────────────────────

function ParentOnboarding() {
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [yearLevel, setYearLevel] = useState<YearLevel>('F');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const { error: insertError } = await supabase.from('students').insert({
      parent_id: user.id,
      first_name: firstName,
      last_initial: lastInitial || null,
      year_level: yearLevel,
      avatar_seed: Math.random().toString(36).substring(2, 10),
    });

    if (insertError) { setError(insertError.message); setLoading(false); return; }
    router.push('/onboarding/placement');
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Add your child</h2>
        <p className="mt-2 text-sm text-gray-600">We&apos;ll create a personalised learning path for them.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <InputField id="firstName" label="First name" value={firstName} onChange={setFirstName} required />
        <InputField id="lastInitial" label="Last initial (optional)" value={lastInitial} onChange={(v) => setLastInitial(v.toUpperCase())} maxLength={1} className="w-20" />
        <YearLevelSelect value={yearLevel} onChange={setYearLevel} />
        <SubmitButton loading={loading} label="Add student and continue" />
      </form>
    </div>
  );
}

// ─── Aide Onboarding ─────────────────────────────────────────────────────────

function AideOnboarding() {
  const [step, setStep] = useState<'school' | 'group' | 'students'>('school');
  const [schoolName, setSchoolName] = useState('');
  const [schoolState, setSchoolState] = useState<AustralianState>('VIC');
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupYearLevel, setGroupYearLevel] = useState<YearLevel>('F');
  const [groupId, setGroupId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<Array<{ id: string; first_name: string }>>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleCreateSchool(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const { data, error: err } = await supabase.from('schools').insert({
      name: schoolName,
      state: schoolState,
    }).select('id').single();

    if (err || !data) { setError(err?.message ?? 'Failed to create school'); setLoading(false); return; }

    const school = data as { id: string };
    setSchoolId(school.id);

    // Link school to profile
    await supabase.from('profiles').update({ school_id: school.id }).eq('id', user.id);

    setStep('group');
    setLoading(false);
  }

  async function handleCreateGroup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !schoolId) { setLoading(false); return; }

    const { data, error: err } = await supabase.from('groups').insert({
      aide_id: user.id,
      school_id: schoolId,
      name: groupName,
      year_level: groupYearLevel,
    }).select('id').single();

    if (err || !data) { setError(err?.message ?? 'Failed to create group'); setLoading(false); return; }
    setGroupId((data as { id: string }).id);
    setStep('students');
    setLoading(false);
  }

  async function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!studentName.trim() || !schoolId || !groupId) return;
    setError('');
    setLoading(true);

    const { data, error: err } = await supabase.from('students').insert({
      school_id: schoolId,
      first_name: studentName.trim(),
      year_level: groupYearLevel,
      avatar_seed: Math.random().toString(36).substring(2, 10),
    }).select('id, first_name').single();

    if (err || !data) { setError(err?.message ?? 'Failed'); setLoading(false); return; }

    const student = data as { id: string; first_name: string };

    // Add to group
    await supabase.from('group_students').insert({ group_id: groupId, student_id: student.id });

    setStudents((prev) => [...prev, student]);
    setStudentName('');
    setLoading(false);
  }

  function handleFinish() {
    router.push('/app/dashboard');
  }

  return (
    <div className="space-y-6">
      {step === 'school' && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Your school</h2>
            <p className="mt-2 text-sm text-gray-600">Set up your school profile.</p>
          </div>
          <form onSubmit={handleCreateSchool} className="space-y-4">
            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            <InputField id="schoolName" label="School name" value={schoolName} onChange={setSchoolName} required />
            <div>
              <label htmlFor="schoolState" className="block text-sm font-medium text-gray-700">State</label>
              <select id="schoolState" value={schoolState} onChange={(e) => setSchoolState(e.target.value as AustralianState)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500">
                {['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <SubmitButton loading={loading} label="Continue" />
          </form>
        </>
      )}

      {step === 'group' && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Create a group</h2>
            <p className="mt-2 text-sm text-gray-600">Set up your first intervention group.</p>
          </div>
          <form onSubmit={handleCreateGroup} className="space-y-4">
            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            <InputField id="groupName" label="Group name" value={groupName} onChange={setGroupName} required placeholder="e.g. Monday Phonics Group" />
            <YearLevelSelect value={groupYearLevel} onChange={setGroupYearLevel} />
            <SubmitButton loading={loading} label="Create group" />
          </form>
        </>
      )}

      {step === 'students' && (
        <>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Add students to your group</h2>
            <p className="mt-2 text-sm text-gray-600">Add 2-4 students for your intervention group.</p>
          </div>

          {students.length > 0 && (
            <ul className="space-y-2">
              {students.map((s) => (
                <li key={s.id} className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm">{s.first_name[0]}</div>
                  <span className="text-gray-800">{s.first_name}</span>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleAddStudent} className="flex gap-2">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Student first name"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button type="submit" disabled={loading || !studentName.trim()}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 transition-colors">
              Add
            </button>
          </form>

          {students.length >= 2 && (
            <button onClick={handleFinish}
              className="w-full rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500">
              Done — go to dashboard
            </button>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </>
      )}
    </div>
  );
}

// ─── Shared form components ──────────────────────────────────────────────────

function InputField({ id, label, value, onChange, required, maxLength, className, placeholder }: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  required?: boolean; maxLength?: number; className?: string; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input id={id} type="text" required={required} maxLength={maxLength} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 block rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 ${className ?? 'w-full'}`} />
    </div>
  );
}

function YearLevelSelect({ value, onChange }: { value: YearLevel; onChange: (v: YearLevel) => void }) {
  return (
    <div>
      <label htmlFor="yearLevel" className="block text-sm font-medium text-gray-700">Year level</label>
      <select id="yearLevel" value={value} onChange={(e) => onChange(e.target.value as YearLevel)}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500">
        <option value="F">Foundation (Prep)</option>
        <option value="1">Year 1</option>
        <option value="2">Year 2</option>
      </select>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button type="submit" disabled={loading}
      className="w-full rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50">
      {loading ? 'Loading...' : label}
    </button>
  );
}
