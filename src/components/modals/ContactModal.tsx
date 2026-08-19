import React, { useState } from 'react';
import { X, Mail, Copy, Check, MessageSquare } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = 'omnimetricshub@gmail.com';
  const mailtoLink = `mailto:${email}?subject=OmniMetrics%20Hub%20Inquiry`;

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDirectEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Ensuring native mailto trigger works across browsers and container iframes
    try {
      window.location.href = mailtoLink;
    } catch {
      // fallback to native anchor
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
          <Mail className="w-5 h-5" />
        </div>

        <h3 className="font-extrabold text-xl text-slate-900 mb-1">Get in Touch</h3>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Questions about specific financial formulas, advertising placements, or enterprise integrations? Reach our team anytime.
        </p>

        <div className="space-y-3 text-xs mb-6">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">Official Email</span>
              <a href={mailtoLink} className="text-emerald-600 font-semibold hover:underline text-sm">
                {email}
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className={`px-3 py-1.5 rounded-lg border text-slate-700 flex items-center gap-1 font-bold text-[11px] transition shadow-2xs ${
                copiedEmail
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-700 block">Response Standard:</span>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              We aim to reply to all developer inquiries, tool suggestions, and commercial partnerships within 24-48 business hours.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={mailtoLink}
            onClick={handleDirectEmail}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-bold rounded-xl text-center transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send Direct Email</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
