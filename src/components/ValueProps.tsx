import React from 'react';
import { ShieldCheck, Landmark, Rocket } from 'lucide-react';

export const ValueProps: React.FC = () => {
  return (
    <section className="mb-14 pt-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
          Empowering Smarter Financial Decisions with Real-Time Precision
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
          A practical, privacy-first toolkit built to help entrepreneurs, freelancers, and marketers price, budget, and plan with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Privacy */}
        <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2.5">
            100% Client-Side Privacy
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every number you type is processed instantly inside your own browser. Nothing is uploaded, logged, or stored on a server — your revenue, margins, and rates stay completely private, even from us.
          </p>
        </div>

        {/* Card 2: Banking Formulas */}
        <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 shadow-2xs">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2.5">
            Standard Banking Formulas
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our engine mirrors published benchmark formulas used by global payment processors and standard accounting practices — Stripe and PayPal standard fee schedules, benchmark tax estimation math, and textbook definitions of margin, markup, and break-even.
          </p>
        </div>

        {/* Card 3: Speed & Entrepreneurs */}
        <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-5 shadow-2xs">
            <Rocket className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2.5">
            Built for Entrepreneurs & Freelancers
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Designed for speed. Whether you are pricing an e-commerce product, scoping a freelance contract, or reviewing an ad campaign, results update in real time as you type — no page reloads, no waiting.
          </p>
        </div>
      </div>
    </section>
  );
};
