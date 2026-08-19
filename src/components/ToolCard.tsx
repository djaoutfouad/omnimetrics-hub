import React from 'react';
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
    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-2xl ${tool.iconBgColor} flex items-center justify-center ${tool.iconColor} mb-4 shadow-xs`}
        >
          {getIcon()}
        </div>

        {/* Category Header */}
        <span className={`text-[10px] font-extrabold tracking-wider uppercase block mb-1 ${tool.tagColor}`}>
          {tool.category}
        </span>

        {/* Title */}
        <h3 className="font-extrabold text-lg text-slate-900 mb-2 group-hover:text-slate-800 transition">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed mb-5">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 border border-slate-200/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Launch Action */}
      <button
        type="button"
        onClick={() => onLaunch(tool)}
        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-[0.99] shadow-xs"
      >
        <span>Launch Tool</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
