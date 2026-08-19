export type CategoryType =
  | 'ALL'
  | 'E-COMMERCE'
  | 'FINANCE & MARGINS'
  | 'MARKETING & ADS'
  | 'FREELANCE'
  | 'INVESTING'
  | 'PAYROLL';

export type CurrencySymbol = '$' | '€' | '£' | 'C$' | 'A$' | '¥' | '₹';

export type LanguageCode =
  | 'US'
  | 'ES'
  | 'DE'
  | 'FR'
  | 'BR'
  | 'IT'
  | 'PL'
  | 'NL';

export interface LanguageOption {
  code: LanguageCode;
  countryCode: string;
  name: string;
  flag: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  tags: string[];
  iconName: string;
  iconBgColor: string;
  iconColor: string;
  tagColor: string;
  featured?: boolean;
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
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  tagColorClass: string;
  sections: ArticleSection[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}
