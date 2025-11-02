import React from 'react';
import { Scale, Gavel } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-600 text-white">
            <Scale size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">LexiGuide AI</h1>
            <p className="text-xs text-slate-500">Your AI legal research companion</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <a href="#form" className="hover:text-indigo-600 transition-colors">Describe Case</a>
          <a href="#analysis" className="hover:text-indigo-600 transition-colors">Guidance</a>
          <a href="#insights" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            <Gavel size={16} /> Insights
          </a>
        </nav>
      </div>
    </header>
  );
}
