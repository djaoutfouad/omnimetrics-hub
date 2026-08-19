import { FaqItem } from '../types';

export const FAQS_DATA: FaqItem[] = [
  {
    question: 'How accurate are the payment gateway fee calculations?',
    answer: 'Our calculators use standard published 2026 rates for domestic transactions (e.g., Stripe standard 2.9% + $0.30, PayPal standard 3.49% + $0.49). Custom interchange rates and flat fees can also be adjusted directly to match your specific merchant account tier.',
    category: 'Payments',
  },
  {
    question: 'Is my financial data stored or transmitted to external servers?',
    answer: 'No. 100% of calculations execute directly in your browser client-side. OmniMetrics Hub does not log, track, or transmit your entered balance figures or company metrics to external databases.',
    category: 'Privacy',
  },
  {
    question: 'What is the difference between Profit Margin and Markup?',
    answer: 'Markup is the percentage added to the product cost to determine the selling price. Profit margin is the percentage of the selling price that is kept as profit. For instance, a 100% markup on a $50 cost results in a $100 selling price, which represents a 50% profit margin.',
    category: 'Finance',
  },
  {
    question: 'How is the Freelance Rate formula structured?',
    answer: 'The freelance rate formula combines your desired annual take-home salary with anticipated self-employment taxes, health insurance, software overhead, and business expenses. It divides this total by realistic billable hours (typically 1,000 hours/year) rather than standard 2,080 salaried hours.',
    category: 'Freelance',
  },
  {
    question: 'Can I export or copy the calculation results?',
    answer: 'Yes, every calculator modal includes a 1-click "Copy Summary" button that creates a formatted breakdown ready to paste into client proposals, Slack, or financial spreadsheets.',
    category: 'General',
  },
  {
    question: 'How does ROAS differ from Net Ad ROI?',
    answer: 'ROAS (Return on Ad Spend) measures gross revenue generated per dollar spent on advertising (e.g. $4 revenue on $1 ad spend = 4.0x or 400%). Net Ad Profit subtracts the ad spend from revenue ($3 net profit).',
    category: 'Marketing',
  },
];
