import React from 'react';
import { Link } from 'react-router-dom';
import { ToolItem } from '../types';
import {
  CreditCard,
  TrendingUp,
  Scale,
  Megaphone,
  Briefcase,
  PiggyBank,
  Users,
  Receipt,
  Target,
  Package,
  CalendarClock,
  Landmark,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

interface Props {
  tool: ToolItem;
  onLaunch: (tool: ToolItem) => void;
}

export const ToolCard: React.FC<Props> = ({ tool, onLaunch }) => {
  const getIcon = () => {
    switch (tool.iconName) {
      case 'CreditCard':
        return <CreditCard className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'PiggyBank':
        return <PiggyBank className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      case 'Receipt':
        return <Receipt className="w-5 h-5" />;
      case 'Target':
        return <Target className="w-5 h-5" />;
      case 'Package':
        return <Package className="w-5 h-5" />;
      case 'CalendarClock':
        return <CalendarClock className="w-5 h-5" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group overflow-hidden">
      {/* Persona Image Header */}
      {tool.personaImageUrl && (
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={tool.personaImageUrl}
            alt={tool.personaRole || tool.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {/* Subtle bottom gradient overlay for readability & transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Persona Role Pill Badge */}
          {tool.personaRole && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-sm max-w-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">{tool.personaRole}</span>
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Icon & Category */}
          <div className="flex items-center justify-between mb-3.5">
            <div
              className={`w-11 h-11 rounded-xl ${tool.iconBgColor} flex items-center justify-center ${tool.iconColor} shadow-xs`}
            >
              {getIcon()}
            </div>
            <Link
              to={`/tools/${tool.slug}`}
              className="text-slate-400 hover:text-slate-700 transition p-1.5 rounded-lg hover:bg-slate-100"
              title={`Open dedicated page for ${tool.name}`}
              aria-label={`Open dedicated page for ${tool.name}`}
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Header */}
          <span className={`text-[10px] font-extrabold tracking-wider uppercase block mb-1 ${tool.tagColor}`}>
            {tool.category}
          </span>

          {/* Title */}
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-emerald-700 transition leading-snug">
            <Link to={`/tools/${tool.slug}`}>
              {tool.name}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
            {tool.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 border border-slate-200/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer: Quick Launch Modal or Dedicated URL */}
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={() => onLaunch(tool)}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs cursor-pointer"
          >
            <span>Launch Tool</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <Link
            to={`/tools/${tool.slug}`}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center transition"
            title="Open Full Page & Formula Guide"
          >
            <span>Guide</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
