import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function InsightsChart({ outcomes }) {
  if (!outcomes) return null;
  const max = 100; // percentages
  const bars = [
    { key: 'win', label: 'Win', color: '#16a34a' },
    { key: 'settle', label: 'Settle', color: '#f59e0b' },
    { key: 'lose', label: 'Lose', color: '#ef4444' },
  ];

  return (
    <section id="insights" className="max-w-6xl mx-auto px-4 pt-8 pb-12">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Outcome insights</h2>
            <p className="text-sm text-slate-500 mt-1">Estimated probabilities based on similar patterns</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-100 text-slate-700"><BarChart3 size={18} /></div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="w-full">
            <svg viewBox="0 0 360 180" className="w-full h-48">
              {/* Axes */}
              <line x1="40" y1="10" x2="40" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="40" y1="150" x2="340" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              {/* Bars */}
              {bars.map((b, i) => {
                const val = Math.max(0, Math.min(max, outcomes[b.key] ?? 0));
                const height = (val / max) * 120;
                const x = 70 + i * 80;
                const y = 150 - height;
                return (
                  <g key={b.key}>
                    <rect x={x} y={y} width="40" height={height} fill={b.color} rx="6" />
                    <text x={x + 20} y={y - 8} textAnchor="middle" fontSize="12" fill="#334155" fontWeight="600">
                      {val}%
                    </text>
                    <text x={x + 20} y={165} textAnchor="middle" fontSize="12" fill="#64748b">
                      {b.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div>
            <ul className="space-y-3">
              {bars.map((b) => (
                <li key={b.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded" style={{ backgroundColor: b.color }} />
                    <p className="text-sm font-medium text-slate-800">{b.label}</p>
                  </div>
                  <p className="text-sm text-slate-600">{outcomes[b.key] ?? 0}%</p>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-4">These are heuristic estimates for demonstration and not legal advice.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
