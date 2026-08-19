import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SuggestModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('E-COMMERCE');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setName('');
      setDescription('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-emerald-600 mb-1">
          <Sparkles className="w-4 h-4" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider">Community Wishlist</span>
        </div>
        <h3 className="font-extrabold text-lg text-slate-900 mb-1">Suggest a Calculator</h3>
        <p className="text-xs text-slate-500 mb-4">
          Need a specific financial formula or custom industry metric? Let our team know.
        </p>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm text-emerald-900">Thank You!</h4>
            <p className="text-xs text-emerald-700">
              Your suggestion has been logged. Our quant analysts review all submissions weekly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Calculator Concept Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. SaaS Churn Rate & Expansion Revenue"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="E-COMMERCE">E-Commerce & Retail</option>
                <option value="FINANCE & MARGINS">Finance & Margins</option>
                <option value="MARKETING & ADS">Marketing & Ad Tech</option>
                <option value="FREELANCE">Freelance & Consulting</option>
                <option value="INVESTING">Investing & Wealth</option>
                <option value="PAYROLL">Payroll & Human Resources</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Formula & Calculation Details</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key input fields, formulas, and target outputs needed..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> Submit Suggestion
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
