import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export const ConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('omni_privacy_consent');
      if (!consent) {
        // Small timeout so it doesn't pop in abruptly on first frame
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be disabled in private sandboxes
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('omni_privacy_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('omni_privacy_consent', 'essential_only');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy & Cookie Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-slate-900/95 text-slate-100 p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-800 backdrop-blur-md text-xs space-y-3 transition-all animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Cookie className="w-4 h-4 text-emerald-400" />
          <span>Privacy & Transparency Notice</span>
        </div>
        <button
          type="button"
          onClick={handleDecline}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          aria-label="Close Notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-slate-300 text-[11px] leading-relaxed">
        OmniMetrics Hub performs financial calculations client-side in your browser. We use local storage to remember your currency and theme preferences. We do not store personal financial data on external servers.
      </p>

      <div className="flex items-center justify-between pt-1 gap-2">
        <Link
          to="/privacy"
          className="text-slate-400 hover:text-emerald-400 text-[11px] underline underline-offset-2 transition"
        >
          Privacy Policy
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition shadow-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </aside>
  );
};
