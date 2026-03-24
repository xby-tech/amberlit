import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-amber-600 hover:text-amber-700 text-sm mb-8 block">&larr; Back to home</Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p><strong>Last updated:</strong> March 2026</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">1. What we collect</h2>
        <p>AmberLit collects only what is needed to deliver personalised learning:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Parent/aide account: email address, display name, role</li>
          <li>Student: first name, last initial (optional), year level</li>
          <li>Learning data: activity responses, session logs, progress records</li>
        </ul>
        <p>We do not collect photos, precise location, full surnames, or device identifiers beyond what authentication requires.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">2. How we use your data</h2>
        <p>Your data is used solely to deliver and improve the learning experience. AI API calls include only first name, year level, and activity context — no personally identifying information beyond first name.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Data sharing</h2>
        <p>Student learning data is never shared with or sold to third parties. AI provider calls (Anthropic) are configured to opt out of model training.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Data storage</h2>
        <p>All data is stored on Supabase servers in the Sydney (ap-southeast-2) region. No student data leaves Australia. Data is encrypted in transit (TLS 1.3) and at rest.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Parental consent</h2>
        <p>Parents create accounts and add children. No child can create their own account. By adding a child, parents consent to the collection of learning data as described above.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Right to deletion</h2>
        <p>Parents can delete their child&apos;s account and all associated data at any time via Settings. Complete deletion occurs within 30 days including backups.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">7. Contact</h2>
        <p>For privacy inquiries, contact us at privacy@amberlit.app.</p>
      </div>
    </div>
  );
}
