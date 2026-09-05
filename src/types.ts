export type CategoryType =
  | 'ALL'
  | 'E-COMMERCE'
  | 'FINANCE & MARGINS'
  | 'MARKETING & ADS'
  | 'FREELANCE'
  | 'INVESTING'
  | 'PAYROLL';

export type CurrencySymbol = '$' | '€' | '£' | 'C$' | 'A$' | '¥' | '₹';

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolGuide {
  whatIsIt: string;
  howItWorks?: string;
  inputExplanations?: { label: string; description: string }[];
  outputExplanations?: { label: string; description: string }[];
  formulaExplanation: string;
  formulaMath: string;
  stepByStepExample: string;
  howToInterpret?: string;
  whenToUse?: string[];
  commonMistakes?: string[];
  limitationsAndAssumptions?: string[];
  practicalTips: string[];
  faqs: ToolFaq[];
  relatedArticleSlugs?: string[];
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  fullTitle: string;
  category: CategoryType;
  description: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  iconName: string;
  iconBgColor: string;
  iconColor: string;
  tagColor: string;
  featured?: boolean;
  detailedGuide: ToolGuide;
  relatedToolIds: string[];
  personaImageUrl?: string;
  personaRole?: string;
}

export interface ArticleTable {
  headers: string[];
  rows: (string | number)[][];
}

export interface ArticleSection {
  heading?: string;
  content: string;
  formula?: string;
  bulletPoints?: string[];
  table?: ArticleTable;
}

export interface ArticleItem {
  id: string;
  slug?: string;
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  tagColorClass: string;
  sections: ArticleSection[];
  relatedToolIds?: string[];
  relatedArticleSlugs?: string[];
  faqs?: ToolFaq[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}
