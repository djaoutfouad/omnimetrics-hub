import { ArticleItem } from '../types';

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'article-1',
    title: 'Demystifying Payment Gateway Fees: Stripe vs. PayPal Breakdown (2026 Edition)',
    category: 'PAYMENTS',
    readTime: '4 min read',
    snippet: 'Every card payment accepted online passes through an acquiring processor that deducts interchange and merchant fees before settling into your bank account...',
    tagColorClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    sections: [
      {
        heading: '1. The Anatomy of Modern Processing Fees',
        content: 'When a customer checks out on your digital storefront or settles an invoice online, card networks (Visa, Mastercard, American Express), issuing banks, and merchant gateway aggregators take their respective fees. Gateways simplify this by charging a blended percentage plus a fixed transaction fee.',
      },
      {
        heading: '2. Standard Schedule Comparison (2026 Domestic Rates)',
        content: 'Here is how domestic US transaction rates compare across major tier-1 payment gateways:',
        table: {
          headers: ['Transaction Tier', 'Stripe Standard (2.9% + $0.30)', 'PayPal Standard (3.49% + $0.49)', 'Difference (Merchant Savings)'],
          rows: [
            ['$25 Micro-sale', '$1.03 (Net: $23.97)', '$1.36 (Net: $23.64)', '+$0.33 saved on Stripe'],
            ['$100 Retail Order', '$3.20 (Net: $96.80)', '$3.98 (Net: $96.02)', '+$0.78 saved on Stripe'],
            ['$500 Consulting Invoice', '$14.80 (Net: $485.20)', '$17.94 (Net: $482.06)', '+$3.14 saved on Stripe'],
            ['$1,000 High-Ticket Sale', '$29.30 (Net: $970.70)', '$35.39 (Net: $964.61)', '+$6.09 saved on Stripe'],
          ],
        },
      },
      {
        heading: '3. Grossing Up: The Reverse Invoice Gross-Up Formula',
        content: 'A frequent question among freelancers and agencies is: "How much do I need to bill my client so that I receive exactly my target amount after fees are deducted?"\n\nIf you simply add 2.9% to your invoice, the processor will apply their 2.9% to the new larger total, leaving you short. Instead, you must use the mathematical gross-up formula:',
        formula: 'Required Invoice Amount = (Desired Net Payout + Fixed Fee) / (1 - (Percentage Rate / 100))',
      },
      {
        heading: '4. Step-by-Step Mathematical Walkthrough',
        content: 'Suppose you wish to receive an exact net sum of $1,000.00 via standard Stripe (2.9% + $0.30):\n\nStep 1: Identify variables: Target = $1,000.00, Fixed Fee = $0.30, Rate = 0.029\nStep 2: Add numerator: 1,000 + 0.30 = $1,000.30\nStep 3: Calculate denominator: 1 - 0.029 = 0.971\nStep 4: Divide: 1,000.30 / 0.971 = $1,030.18\n\nVerification Check:\nStripe fee on $1,030.18 = (1,030.18 × 0.029) + 0.30 = $29.88 + $0.30 = $30.18.\nNet Payout to Merchant = $1,030.18 - $30.18 = $1,000.00 exactly.',
        bulletPoints: [
          'Always use the gross-up formula for contractor agreements and high-value project milestones.',
          'For international clients, add an extra 1.5% cross-border assessment to your base rate calculation.',
          'Consider ACH / direct bank transfers for transactions above $2,000 to cap transaction costs at $5.00.',
        ],
      },
    ],
  },
  {
    id: 'article-2',
    title: 'Margin vs. Markup: How to Price Your Products for Maximum Profit',
    category: 'PRICING',
    readTime: '5 min read',
    snippet: 'Margin and markup both describe profitability, but are calculated from different bases. Mixing them up causes major pricing errors that eat into cash flow...',
    tagColorClass: 'bg-blue-50 text-blue-700 border border-blue-200',
    sections: [
      {
        heading: '1. The Fundamental Mathematical Difference',
        content: 'While profit margin and markup utilize the exact same absolute dollar profit figure, they evaluate that profit against different baselines:\n• Markup is the percentage added to the wholesale product cost.\n• Margin is the percentage of the final retail selling price retained as profit.',
      },
      {
        heading: '2. The Core Formulas',
        content: 'Memorize these two foundational formulas to avoid under-pricing inventory:',
        formula: 'Profit Margin (%) = ((Selling Price - Cost) / Selling Price) × 100\nMarkup Percentage (%) = ((Selling Price - Cost) / Cost) × 100',
      },
      {
        heading: '3. Margin vs. Markup Conversion Table',
        content: 'Use this quick reference lookup table when setting retail pricing strategies:',
        table: {
          headers: ['Desired Profit Margin (%)', 'Required Markup (%)', 'Pricing Multiplier', 'Example ($50 Cost Item)'],
          rows: [
            ['20.0% Margin', '25.0% Markup', '1.25x Cost', 'Sells for $62.50 ($12.50 profit)'],
            ['33.3% Margin', '50.0% Markup', '1.50x Cost', 'Sells for $75.00 ($25.00 profit)'],
            ['40.0% Margin', '66.7% Markup', '1.67x Cost', 'Sells for $83.33 ($33.33 profit)'],
            ['50.0% Margin', '100.0% Markup (Keystone)', '2.00x Cost', 'Sells for $100.00 ($50.00 profit)'],
            ['60.0% Margin', '150.0% Markup', '2.50x Cost', 'Sells for $125.00 ($75.00 profit)'],
            ['75.0% Margin', '300.0% Markup', '4.00x Cost', 'Sells for $200.00 ($150.00 profit)'],
          ],
        },
      },
      {
        heading: '4. The Classic 50% "Margin Trap"',
        content: 'The most frequent mistake made by new e-commerce store owners is wanting a 50% profit margin and multiplying their product cost by 1.5. If an item costs $50 to manufacture and is sold for $75, your markup is 50%, but your actual margin is only 33.3% ($25 profit / $75 revenue). To attain a true 50% margin, you must double the cost to $100.',
        bulletPoints: [
          'Keystone pricing in retail refers to a 100% markup (Cost × 2), yielding a 50% gross profit margin.',
          'Digital products and SaaS can sustain 80%+ margins, whereas physical consumer goods typically average 40-60% margins.',
          'Factor in payment gateway fees (approx. 3%) and return allowances (approx. 5%) on top of baseline product costs.',
        ],
      },
    ],
  },
  {
    id: 'article-3',
    title: 'The Freelancer\'s Pricing Formula: Setting Sustainable Hourly & Daily Rates',
    category: 'FREELANCE',
    readTime: '6 min read',
    snippet: 'New freelancers often pick rates blindly based on past salaried hourly wages. Learn how factoring non-billable overhead and tax obligations stabilizes cash flow...',
    tagColorClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    sections: [
      {
        heading: '1. Why Standard Salaried Hourly Math Fails',
        content: 'When an employee earning $75,000/year decides to freelance, they frequently divide $75,000 by 2,080 salaried hours (40 hrs/week × 52 weeks) to arrive at $36/hour. Charging $36/hour as a freelancer results in severe financial deficit because solopreneurs must fund their own taxes, health insurance, paid vacation, and business overheads.',
      },
      {
        heading: '2. Accounting for Hidden Solopreneur Overhead',
        content: 'A sustainable freelance rate must factor in four critical cost layers:',
        table: {
          headers: ['Expense Category', 'Typical Annual Cost (USD)', 'Percentage of Gross Income', 'Why It Matters'],
          rows: [
            ['Self-Employment & Income Tax', '$20,000 - $30,000', '25% - 30%', 'Covers federal, state, and FICA/SE taxes'],
            ['Healthcare & Disability', '$6,000 - $12,000', '8% - 12%', 'Zero employer healthcare subsidies'],
            ['Software, Gear & Office', '$4,000 - $8,000', '5% - 8%', 'Adobe, Figma, web hosting, accountant'],
            ['Unpaid Time Off & Sickness', 'Equivalent to 4-6 weeks', '10%', 'Must be pre-funded across billable weeks'],
          ],
        },
      },
      {
        heading: '3. The 1,000 Billable Hours Golden Rule',
        content: 'Full-time consultants realistically spend only 50% to 60% of their weekly hours on billable client work. The remainder is devoted to business development, proposals, invoicing, administrative tasks, and skills learning. Therefore, a full-time freelancer works approximately 1,000 billable hours per year (20-25 hrs/week across 46 active weeks).',
        formula: 'Minimum Hourly Rate = (Target Take-Home + Taxes & Health + Overheads & Buffer) / 1,000 Billable Hours',
      },
      {
        heading: '4. Sample Worked Calculation',
        content: 'Suppose you desire a comfortable $70,000 net take-home salary:\n\n1. Target Take-Home: $70,000\n2. Estimated Taxes & Healthcare: $20,000\n3. Software, Hardware & Accounting: $10,000\nTotal Required Gross Revenue = $100,000 per year.\n\nMinimum Hourly Rate: $100,000 / 1,000 hours = $100.00 / hour.\nStandard Day Rate (8 hours): $800.00 / day.\nWeekly Rate (25 billable hrs): $2,500.00 / week.',
        bulletPoints: [
          'Always quote project or value-based fixed fees derived from your daily rate baseline.',
          'Require a 50% upfront deposit before commencing work on any milestone.',
          'Review and increase your rates by 10-15% annually to outpace inflation and reflect deepened expertise.',
        ],
      },
    ],
  },
];
