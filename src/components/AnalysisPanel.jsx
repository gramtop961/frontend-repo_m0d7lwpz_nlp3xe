import React from 'react';
import { CheckCircle2, XCircle, Info, ExternalLink } from 'lucide-react';

function Badge({ children, type = 'info' }) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    danger: 'bg-rose-50 text-rose-700 ring-rose-200',
    info: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ring-1 ${styles[type]}`}>
      {children}
    </span>
  );
}

export default function AnalysisPanel({ analysis }) {
  if (!analysis) return null;
  const { domain, steps, rationale, similarCases } = analysis;

  return (
    <section id="analysis" className="max-w-6xl mx-auto px-4 pt-8">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Recommended strategy</h2>
            <p className="text-sm text-slate-500 mt-1">Domain detected: <Badge><Info size={14}/> {domain}</Badge></p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-6 p-6">
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Step-by-step plan</h3>
            <ol className="space-y-3">
              {steps.map((s, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{s.title}</p>
                    <p className="text-sm text-slate-600">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Why this works</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{rationale}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Similar cases</h3>
            <ul className="space-y-3">
              {similarCases.map((c, idx) => (
                <li key={idx} className="p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-800">{c.name}</p>
                    {c.outcome === 'Won' ? (
                      <Badge type="success"><CheckCircle2 size={14}/> Won</Badge>
                    ) : (
                      <Badge type="danger"><XCircle size={14}/> Lost</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{c.reason}</p>
                  <a href={c.link} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:text-indigo-500 inline-flex items-center gap-1 mt-2">
                    View case <ExternalLink size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
