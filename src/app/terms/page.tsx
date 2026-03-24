import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-amber-600 hover:text-amber-700 text-sm mb-8 block">&larr; Back to home</Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <p><strong>Last updated:</strong> March 2026</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Acceptance</h2>
        <p>By using AmberLit, you agree to these terms. If you do not agree, please do not use the service.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">2. Service description</h2>
        <p>AmberLit is an AI-assisted learning tool for Australian children in Foundation through Year 2, aligned to the Australian Curriculum v9.0. It provides structured practice sessions for parents and intervention sessions for teacher aides.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Accounts</h2>
        <p>You must be 18 or older to create an account. You are responsible for maintaining the security of your account credentials. Only parents/guardians may create student profiles for children.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Acceptable use</h2>
        <p>You agree to use AmberLit only for its intended educational purpose. You must not attempt to access other users&apos; data, reverse-engineer the service, or use it for any commercial purpose without permission.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">5. AI-generated content</h2>
        <p>AmberLit uses AI to generate feedback, reading passages, and teaching insights. While we implement safety guardrails, AI-generated content may occasionally be imperfect. Parents and aides should exercise professional judgement alongside AI suggestions.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Availability</h2>
        <p>We aim to provide reliable service but do not guarantee uninterrupted availability. The service is provided &quot;as is&quot; without warranties of any kind.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">7. Changes</h2>
        <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8">8. Contact</h2>
        <p>For questions about these terms, contact us at hello@amberlit.app.</p>
      </div>
    </div>
  );
}
