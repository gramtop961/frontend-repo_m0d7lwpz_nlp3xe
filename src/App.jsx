import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CaseForm from './components/CaseForm.jsx';
import AnalysisPanel from './components/AnalysisPanel.jsx';
import InsightsChart from './components/InsightsChart.jsx';

function analyzeCase({ description, jurisdiction, date }) {
  const text = description.toLowerCase();
  const isContract = /contract|agreement|breach|payment|invoice|freelance/.test(text);
  const isTort = /accident|negligence|injury|damage|car|medical/.test(text);
  const isEmployment = /employment|harass|discriminat|wrongful|overtime|wage/.test(text);
  const isIp = /copyright|trademark|patent|ip|infring/.test(text);

  let domain = 'General Civil';
  if (isContract) domain = 'Contract Law';
  else if (isTort) domain = 'Tort Law';
  else if (isEmployment) domain = 'Employment Law';
  else if (isIp) domain = 'Intellectual Property';

  const stepsBase = [
    { title: 'Organize all evidence', detail: 'Collect written communications, agreements, photos, invoices, and timelines.' },
    { title: 'Assess limitation period', detail: `Confirm filing deadlines for ${jurisdiction}. Delays may bar claims.` },
    { title: 'Send a formal notice', detail: 'Issue a demand or preservation letter to establish your position and trigger responses.' },
    { title: 'Negotiate and document', detail: 'Attempt resolution in writing. Keep records of offers, counter-offers, and meeting notes.' },
    { title: 'Escalate appropriately', detail: 'If unresolved, consider mediation, arbitration, or filing in the proper court.' },
  ];

  const domainSteps = {
    'Contract Law': [
      { title: 'Review contract clauses', detail: 'Identify breach, remedies, notice requirements, and dispute resolution terms.' },
      { title: 'Calculate damages', detail: 'Direct losses, consequential damages, interest, and mitigation efforts.' },
    ],
    'Tort Law': [
      { title: 'Establish duty and breach', detail: 'Document how the other party owed a duty and how it was breached.' },
      { title: 'Causation and damages', detail: 'Link the breach to actual harm with medical bills, repair costs, or expert reports.' },
    ],
    'Employment Law': [
      { title: 'Document workplace events', detail: 'Save emails, performance reviews, HR complaints, and witness statements.' },
      { title: 'Agency filing requirements', detail: 'Consider EEOC/state agency filing before any court litigation if required.' },
    ],
    'Intellectual Property': [
      { title: 'Prove ownership', detail: 'Gather registrations, drafts, and proof of first use.' },
      { title: 'Infringement analysis', detail: 'Compare works/marks, market overlap, and confusion likelihood.' },
    ],
  };

  const steps = [...(domainSteps[domain] || []), ...stepsBase];

  const outcomes = (() => {
    if (isContract) return { win: 62, settle: 28, lose: 10 };
    if (isTort) return { win: 48, settle: 37, lose: 15 };
    if (isEmployment) return { win: 35, settle: 45, lose: 20 };
    if (isIp) return { win: 40, settle: 42, lose: 18 };
    return { win: 30, settle: 50, lose: 20 };
  })();

  const similarCases = (() => {
    if (isContract) return [
      { name: 'Acme v. Rivera (2019)', outcome: 'Won', reason: 'Clear breach and well-documented damages', link: 'https://law.justia.com/search/?query=breach%20of%20contract' },
      { name: 'Nova v. Bright (2021)', outcome: 'Lost', reason: 'Ambiguous clause and failure to mitigate losses', link: 'https://law.justia.com/search/?query=contract%20ambiguity' },
    ];
    if (isTort) return [
      { name: 'Han v. Cityline (2020)', outcome: 'Won', reason: 'Strong negligence evidence from camera footage', link: 'https://law.justia.com/search/?query=negligence' },
      { name: 'Perez v. Dalton (2018)', outcome: 'Lost', reason: 'Causation not proven by medical expert', link: 'https://law.justia.com/search/?query=causation' },
    ];
    if (isEmployment) return [
      { name: 'Lee v. NorthBank (2022)', outcome: 'Won', reason: 'Documented pattern of retaliation post-complaint', link: 'https://law.justia.com/search/?query=employment%20retaliation' },
      { name: 'Khan v. TeraFoods (2017)', outcome: 'Lost', reason: 'Insufficient comparators for discrimination claim', link: 'https://law.justia.com/search/?query=discrimination' },
    ];
    if (isIp) return [
      { name: 'Pixel v. Macro (2016)', outcome: 'Won', reason: 'Substantial similarity and market overlap established', link: 'https://law.justia.com/search/?query=copyright%20infringement' },
      { name: 'Orion v. Lumen (2015)', outcome: 'Lost', reason: 'Fair use defense succeeded on transformative purpose', link: 'https://law.justia.com/search/?query=fair%20use' },
    ];
    return [
      { name: 'Smith v. Doe (2014)', outcome: 'Won', reason: 'Procedural compliance and credible testimony', link: 'https://law.justia.com' },
      { name: 'Mason v. Hart (2013)', outcome: 'Lost', reason: 'Statute of limitations expired', link: 'https://law.justia.com' },
    ];
  })();

  const rationale = `Plan emphasizes preserving evidence, meeting deadlines, and escalating proportionately in ${jurisdiction}. Adjust based on facts, defenses, and any mandatory pre-suit procedures. Dates like ${date || 'N/A'} may affect limitation periods.`;

  return { domain, steps, rationale, similarCases, outcomes };
}

export default function App() {
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = (payload) => {
    const result = analyzeCase(payload);
    setAnalysis(result);
    // Smooth scroll to analysis
    requestAnimationFrame(() => {
      const el = document.getElementById('analysis');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-sky-50">
      <Header />

      <main className="py-8">
        <section className="max-w-6xl mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white overflow-hidden shadow-lg">
            <div className="p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="inline-flex px-2 py-1 rounded-full bg-white/15 text-xs font-medium">AI-Assisted Legal Guidance</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight">Understand your case and get a step-by-step path forward</h2>
                <p className="mt-3 text-white/90 text-sm">Describe what happened and where it occurred. You’ll get an actionable plan, similar case references, and outcome insights visualized clearly.</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/> Tailored guidance for your jurisdiction</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-yellow-300"/> Highlights winning vs. losing patterns</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-300"/> Clear charts for quick decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <CaseForm onAnalyze={handleAnalyze} />
        <AnalysisPanel analysis={analysis} />
        <InsightsChart outcomes={analysis?.outcomes} />
      </main>

      <footer className="py-10 text-center text-sm text-slate-500">
        This demo provides educational information and is not a substitute for legal advice.
      </footer>
    </div>
  );
}
