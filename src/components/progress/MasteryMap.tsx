'use client';

interface ProgressItem {
  curriculum_node_id: string;
  domain: string;
  strand: string;
  mastery_level: number;
  attempts: number;
  unlocked: boolean;
}

interface MasteryMapProps {
  progress: ProgressItem[];
}

const DOMAIN_COLORS: Record<string, string> = {
  literacy: 'bg-amber-400',
  maths: 'bg-blue-400',
  science: 'bg-green-400',
  digital: 'bg-purple-400',
};

const DOMAIN_BG: Record<string, string> = {
  literacy: 'bg-amber-50 border-amber-200',
  maths: 'bg-blue-50 border-blue-200',
  science: 'bg-green-50 border-green-200',
  digital: 'bg-purple-50 border-purple-200',
};

function getMasteryColor(level: number, unlocked: boolean): string {
  if (!unlocked) return 'bg-gray-200';
  if (level >= 0.8) return 'bg-green-400';
  if (level >= 0.5) return 'bg-amber-400';
  if (level > 0) return 'bg-red-300';
  return 'bg-gray-300';
}

export default function MasteryMap({ progress }: MasteryMapProps) {
  // Group by domain → strand
  const grouped: Record<string, Record<string, ProgressItem[]>> = {};
  for (const item of progress) {
    if (!grouped[item.domain]) grouped[item.domain] = {};
    if (!grouped[item.domain][item.strand]) grouped[item.domain][item.strand] = [];
    grouped[item.domain][item.strand].push(item);
  }

  if (progress.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-xl">
        Complete your first session to see your curriculum map.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([domain, strands]) => (
        <div key={domain} className={`border rounded-xl p-4 ${DOMAIN_BG[domain] ?? 'bg-gray-50 border-gray-200'}`}>
          <h3 className="font-semibold text-gray-800 capitalize mb-3">{domain}</h3>
          {Object.entries(strands).map(([strand, items]) => (
            <div key={strand} className="mb-3">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{strand}</p>
              <div className="flex flex-wrap gap-1.5">
                {items
                  .sort((a, b) => a.curriculum_node_id.localeCompare(b.curriculum_node_id))
                  .map((item) => (
                    <div
                      key={item.curriculum_node_id}
                      className={`w-6 h-6 rounded ${getMasteryColor(item.mastery_level, item.unlocked)} transition-colors`}
                      title={`${item.curriculum_node_id}: ${Math.round(item.mastery_level * 100)}% (${item.attempts} attempts)`}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Legend */}
      <div className="flex gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400" /> Mastered</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-400" /> In progress</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-300" /> Needs work</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200" /> Locked</span>
      </div>
    </div>
  );
}
