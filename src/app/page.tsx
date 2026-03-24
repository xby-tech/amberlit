import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-amber-700">
            AmberLit
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
            AI-assisted STEM and literacy learning for Australian children, Foundation to Year 2.
          </p>
          <p className="text-lg text-gray-500">
            Aligned to the Australian Curriculum v9.0.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center pt-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto rounded-xl bg-amber-600 px-8 py-3.5 text-lg font-semibold text-white shadow-md hover:bg-amber-500 transition-colors min-h-[48px] flex items-center justify-center"
            >
              Get started — it&apos;s free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto rounded-xl border-2 border-gray-300 bg-white px-8 py-3.5 text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors min-h-[48px] flex items-center justify-center"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Two modes, one goal</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <FeatureCard
              emoji="👨‍👩‍👧"
              title="For Parents"
              description="15-20 minute structured daily practice sessions at home. Track your child's progress with AI-powered insights."
              features={['Phonics and reading', 'Maths fluency', 'Personalised learning path', 'Progress dashboard']}
            />
            <FeatureCard
              emoji="👩‍🏫"
              title="For Teacher Aides"
              description="45-60 minute small-group intervention sessions for 2-4 students. Real-time AI observations and note-taking."
              features={['Multi-student management', 'AI teaching insights', 'Session notes', 'Group progress tracking']}
            />
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive curriculum</h2>
          <p className="text-gray-600 mb-10">Covering four key domains from Foundation through Year 2.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <DomainCard emoji="📖" title="Literacy" description="Phonics, reading, writing, oral language" />
            <DomainCard emoji="🔢" title="Mathematics" description="Number, space, measurement, statistics" />
            <DomainCard emoji="🔬" title="Science" description="Biological, chemical, earth, physical" />
            <DomainCard emoji="💻" title="Digital Tech" description="Systems, data, algorithms, citizenship" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 AmberLit. Built in Australia.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-700">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ emoji, title, description, features }: { emoji: string; title: string; description: string; features: string[] }) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 p-8 space-y-4">
      <span className="text-4xl">{emoji}</span>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DomainCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 text-center space-y-2">
      <span className="text-3xl">{emoji}</span>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}
