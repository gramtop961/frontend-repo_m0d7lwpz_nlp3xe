import React, { useState } from 'react';
import { FileText, MapPin, Calendar, Send } from 'lucide-react';

export default function CaseForm({ onAnalyze }) {
  const [description, setDescription] = useState('');
  const [jurisdiction, setJurisdiction] = useState('Federal');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    // Simulate async processing to feel responsive
    setTimeout(() => {
      onAnalyze({ description, jurisdiction, date });
      setLoading(false);
    }, 400);
  };

  return (
    <section id="form" className="max-w-6xl mx-auto px-4 pt-8">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold tracking-tight">Describe your legal situation</h2>
          <p className="text-sm text-slate-500 mt-1">Be as specific as you can. Avoid including personal identifiers.</p>
        </div>
        <form onSubmit={submit} className="p-6 grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><FileText size={16}/> Case details</span>
            <textarea
              className="w-full min-h-[120px] rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none p-3 text-sm"
              placeholder="Example: I signed a freelance contract, the client refused final payment after delivery..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <div className="grid sm:grid-cols-2 gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><MapPin size={16}/> Jurisdiction</span>
              <select
                className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
              >
                <option>Federal</option>
                <option>California</option>
                <option>New York</option>
                <option>Texas</option>
                <option>Florida</option>
                <option>Other</option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700 flex items-center gap-2"><Calendar size={16}/> Incident date</span>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={loading || !description.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={16} /> {loading ? 'Analyzing…' : 'Analyze case'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
