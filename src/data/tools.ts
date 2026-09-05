import { ToolItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'calc-fees',
    slug: 'payment-gateway-fees',
    name: 'Payment Gateway Fees',
    fullTitle: 'Payment Gateway Fee & Invoice Gross-Up Calculator',
    category: 'E-COMMERCE',
    description: 'Compare transaction processing fees for Stripe, PayPal, and custom gateways, or calculate the exact invoice amount needed to receive your target net payout.',
    metaDescription: 'Calculate payment processing fees for Stripe, PayPal, and merchant gateways. Estimate net payouts or solve for the gross invoice amount required to cover transaction costs.',
    keywords: [
      'payment fee calculator',
      'stripe processing fee calculator',
      'paypal merchant fees',
      'invoice gross up calculator',
      'credit card transaction fee estimate',
    ],
    tags: ['Stripe', 'PayPal', 'Net Payout', 'Invoicing', 'Gross-Up'],
    iconName: 'CreditCard',
    iconBgColor: 'bg-emerald-950/80 border border-emerald-800/40',
    iconColor: 'text-emerald-400',
    tagColor: 'text-emerald-600',
    featured: true,
    personaImageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    personaRole: 'E-Commerce Merchant & SaaS Billing',
    relatedToolIds: ['calc-margin', 'calc-freelance', 'calc-landed-cost', 'calc-breakeven'],
    detailedGuide: {
      whatIsIt: 'Payment gateways charge a blended transaction fee consisting of a percentage of the total transaction value plus a fixed assessment fee per charge (such as standard US domestic rates of 2.9% + $0.30 on Stripe or 3.49% + $0.49 on PayPal). When invoicing clients or setting digital product prices, calculating the exact processor deduction prevents unexpected margin erosion.',
      howItWorks: 'The calculator operates in two modes: Forward mode subtracts the payment processor fee schedule from a customer invoice to show your net settled payout. Reverse mode (gross-up) solves the algebra in reverse to calculate the larger invoice total you must charge so that the remaining amount after processor deductions matches your exact desired take-home dollar figure.',
      formulaExplanation: 'In forward calculations, the processing fee equals the transaction amount multiplied by the percentage rate plus the fixed fee. In reverse gross-up calculations, the fixed fee is added to your net target and divided by (1 minus the decimal percentage rate).',
      formulaMath: `Forward Calculation (Net Payout):
• Processing Fee = (Invoice Amount × Rate%) + Fixed Fee
• Net Settled Payout = Invoice Amount - Processing Fee

Reverse Calculation (Gross-Up Target):
• Required Invoice Amount = (Desired Net Payout + Fixed Fee) / (1 - (Rate% / 100))

Where:
• Invoice Amount: Total charged to the customer card
• Desired Net Payout: Exact cash balance you wish to retain
• Rate%: Gateway percentage fee (e.g. 2.9% = 0.029)
• Fixed Fee: Gateway per-transaction flat fee (e.g. $0.30)`,
      stepByStepExample: `Example: You are billing a client for $1,000.00 of consulting work via Stripe standard processing (2.9% + $0.30) and wish to take home exactly $1,000.00 net.

1. Identify inputs: Desired Net Payout = $1,000.00, Fixed Fee = $0.30, Percentage Rate = 0.029.
2. Sum the numerator: $1,000.00 + $0.30 = $1,000.30.
3. Compute the denominator: 1 - 0.029 = 0.971.
4. Divide: $1,000.30 / 0.971 = $1,030.18.

Verification:
• Customer pays: $1,030.18
• Stripe fee: ($1,030.18 × 0.029) + $0.30 = $29.88 + $0.30 = $30.18
• Net deposited into your account: $1,030.18 - $30.18 = $1,000.00 exactly.`,
      whenToUse: [
        'When writing client service agreements and setting payment terms where the client agrees to cover processing overhead.',
        'When establishing baseline retail prices on e-commerce storefronts like Shopify, WooCommerce, or custom checkouts.',
        'When assessing whether to offer alternative payment rails (such as ACH direct debit or SEPA bank transfers) for high-ticket invoices.',
        'When comparing merchant account quotes from different payment service providers.',
      ],
      commonMistakes: [
        'Adding 2.9% directly to your net target ($1,000 + $29 = $1,029). The processor deducts 2.9% from the new $1,029 total ($29.84 + $0.30 = $30.14), leaving you short with only $998.86.',
        'Overlooking cross-border assessment fees (typically an extra 1.0% to 1.5%) when accepting payments from international cardholders.',
        'Forgetting that currency conversion fees (typically 1.0% to 2.0%) may apply if your payout bank account currency differs from the transaction currency.',
      ],
      practicalTips: [
        'For domestic B2B transactions above $2,000, consider encouraging ACH direct debit or bank wires, which typically cap fees between $5.00 and $15.00.',
        'Check whether your transaction volume qualifies for Level 2 or Level 3 corporate card data processing, which can reduce interchange costs on B2B transactions.',
        'Remember that payment processing fees are standard ordinary business operating expenses and are generally tax deductible.',
      ],
      faqs: [
        {
          q: 'Why does simple addition fail when trying to cover payment fees?',
          a: 'When you increase the invoice price, the payment gateway applies its percentage fee to the entire new transaction total. To offset this compounding effect, you must divide by (1 - Rate%) rather than multiplying.',
        },
        {
          q: 'Are payment processing fees consistent across all credit card brands?',
          a: 'Aggregated gateways like Stripe and PayPal generally charge uniform blended rates for domestic Visa, Mastercard, and Discover. However, American Express, international cards, and commercial corporate purchasing cards may carry higher underlying interchange or cross-border surcharges depending on your processor agreement.',
        },
        {
          q: 'Is it legal to pass payment gateway processing fees onto customers?',
          a: 'Rules regarding credit card surcharges vary by country and state. In many jurisdictions, surcharge transparency rules require clear disclosure before checkout, and some regions cap surcharges to the actual cost of processing or prohibit surcharges on debit card transactions.',
        },
      ],
    },
  },
  {
    id: 'calc-margin',
    slug: 'profit-margin',
    name: 'Profit Margin & Markup',
    fullTitle: 'Profit Margin, Markup & Selling Price Calculator',
    category: 'FINANCE & MARGINS',
    description: 'Calculate gross profit, profit margin percentage, markup percentage, and required selling price for target margin thresholds.',
    metaDescription: 'Free profit margin and markup calculator. Calculate gross profit, cost of goods sold (COGS), margin vs markup percentage, and optimal selling prices.',
    keywords: [
      'profit margin calculator',
      'markup calculator',
      'margin vs markup formula',
      'gross profit percentage',
      'retail pricing calculator',
    ],
    tags: ['Real-Time', 'Retail', 'Gross Profit', 'Pricing', 'Markup'],
    iconName: 'TrendingUp',
    iconBgColor: 'bg-blue-950/80 border border-blue-800/40',
    iconColor: 'text-blue-400',
    tagColor: 'text-blue-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Retail Founder & Pricing Manager',
    relatedToolIds: ['calc-breakeven', 'calc-landed-cost', 'calc-fees', 'calc-roas'],
    detailedGuide: {
      whatIsIt: 'Profit margin and markup are two foundational financial metrics used to evaluate the profitability of a product or service. Although both metrics use the exact same dollar profit figure, they express that profit relative to different baselines: markup measures profit relative to cost, whereas profit margin measures profit relative to revenue.',
      howItWorks: 'Enter your product cost (Cost of Goods Sold / COGS) and selling price (revenue). The calculator computes gross profit in dollars, gross margin percentage, markup percentage, and the required selling price multiplier for various target margin tiers in real time.',
      formulaExplanation: 'Gross profit is selling price minus product cost. Margin divides gross profit by selling price and multiplies by 100. Markup divides gross profit by product cost and multiplies by 100. To find the required price for a target margin, cost is divided by (1 minus the margin percentage as a decimal).',
      formulaMath: `Gross Profit = Selling Price - Cost Price

Profit Margin (%) = ((Selling Price - Cost Price) / Selling Price) × 100
Markup Percentage (%) = ((Selling Price - Cost Price) / Cost Price) × 100

Target Selling Price = Cost Price / (1 - (Target Margin % / 100))

Where:
• Selling Price: Final price charged to the buyer (revenue)
• Cost Price: Direct cost to produce or acquire the item (COGS)
• Gross Profit: Dollar difference between revenue and product cost`,
      stepByStepExample: `Example: A manufacturer produces a handcrafted item for $40.00 and sells it for $100.00.

1. Gross Profit = $100.00 - $40.00 = $60.00.
2. Profit Margin = ($60.00 / $100.00) × 100 = 60.0%. (This means $0.60 of every dollar taken in remains as gross profit).
3. Markup = ($60.00 / $40.00) × 100 = 150.0%. (The selling price is 150% higher than the baseline cost).

Target Margin Application:
If the manufacturer wants a true 70% profit margin on a $40.00 item:
• Required Price = $40.00 / (1 - 0.70) = $40.00 / 0.30 = $133.33.`,
      whenToUse: [
        'When establishing wholesale catalog pricing and recommended retail prices (MSRP).',
        'When analyzing product lines to identify low-margin SKUs that consume disproportionate working capital.',
        'When planning promotional discounts to ensure price reductions do not cause negative unit economics.',
        'When negotiating volume purchase discounts with suppliers or wholesale distributors.',
      ],
      commonMistakes: [
        'Confusing 50% markup with 50% margin. Multiplying a $50 cost by 1.5 results in a $75 price, which yields a 33.3% margin ($25 / $75), not a 50% margin.',
        'Focusing solely on gross margin while forgetting operating expenses (rent, software, paid ad spend, customer returns).',
        'Assuming a 100% margin is achievable on physical products. Margin cannot reach or exceed 100% unless product cost is zero or negative.',
      ],
      practicalTips: [
        'In traditional retail, "keystone pricing" refers to a 100% markup (Cost × 2), which yields an exact 50% gross margin.',
        'Software and digital goods typically target 75% to 90% gross margins to accommodate customer acquisition and ongoing engineering costs.',
        'Regularly review your landed costs (shipping, materials, duties) as cost fluctuations directly squeeze profit margins if retail prices remain static.',
      ],
      faqs: [
        {
          q: 'What is the main difference between margin and markup?',
          a: 'Markup represents the percentage added to your wholesale cost to arrive at a selling price. Margin represents the percentage of the final selling price that remains as profit after deducting product cost.',
        },
        {
          q: 'What is a typical healthy profit margin for e-commerce?',
          a: 'Physical e-commerce stores typically aim for gross profit margins between 45% and 65% before accounting for marketing ad spend, payment fees, fulfillment, and returns.',
        },
        {
          q: 'Can markup be higher than 100%?',
          a: 'Yes. Markup can be 100%, 300%, 1,000%, or higher. For example, if an item costs $10 and is sold for $50, the markup is 400% (($50 - $10) / $10 × 100), while the margin is 80% (($50 - $10) / $50 × 100).',
        },
      ],
    },
  },
  {
    id: 'calc-breakeven',
    slug: 'break-even',
    name: 'Break-Even Point',
    fullTitle: 'Break-Even Point & Unit Volume Analysis Calculator',
    category: 'FINANCE & MARGINS',
    description: 'Determine the exact unit sales volume and gross revenue required to fully cover fixed operating overheads and per-unit variable costs.',
    metaDescription: 'Calculate your business break-even point in units and revenue. Accurately analyze fixed overhead, variable unit costs, and contribution margin ratios.',
    keywords: [
      'break even calculator',
      'break even point formula',
      'contribution margin calculator',
      'fixed costs vs variable costs',
      'business break even analysis',
    ],
    tags: ['Fixed Costs', 'Units Target', 'Contribution', 'Safety Buffer', 'Overhead'],
    iconName: 'Scale',
    iconBgColor: 'bg-amber-950/80 border border-amber-800/40',
    iconColor: 'text-amber-400',
    tagColor: 'text-amber-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Operations Lead & Financial Planner',
    relatedToolIds: ['calc-margin', 'calc-landed-cost', 'calc-roas', 'calc-fees'],
    detailedGuide: {
      whatIsIt: 'Break-even analysis identifies the exact operating milestone where total business revenues equal total accumulated expenses (both fixed overhead and variable unit costs). At the break-even point, net profit is zero; every additional unit sold beyond this milestone generates direct pre-tax contribution profit.',
      howItWorks: 'Enter your recurring fixed monthly expenses (rent, salaries, software subscriptions), your per-unit selling price, and your variable cost per unit (materials, shipping, per-order fees). The calculator determines your unit contribution margin, contribution margin ratio, break-even unit threshold, and total break-even revenue.',
      formulaExplanation: 'The unit contribution margin is the selling price minus the variable cost per unit. Dividing total fixed costs by this unit contribution margin gives the break-even volume in units. Multiplying the unit volume by the selling price gives the break-even revenue.',
      formulaMath: `Unit Contribution Margin = Selling Price - Variable Cost per Unit
Contribution Margin Ratio (%) = (Unit Contribution Margin / Selling Price) × 100

Break-Even Volume (Units) = Total Fixed Costs / Unit Contribution Margin
Break-Even Revenue ($) = Break-Even Volume (Units) × Selling Price

Where:
• Total Fixed Costs: Expenses that do not change with production volume (rent, insurance, base payroll)
• Variable Cost per Unit: Direct costs incurred with every single unit sold (materials, packaging, per-unit freight)
• Unit Contribution Margin: Dollar amount from each sale that goes toward covering fixed overhead`,
      stepByStepExample: `Example: A specialty coffee roaster has $3,000.00 in monthly fixed overhead (roastery rent, equipment lease, utilities). A bag of roasted coffee sells for $20.00 and has $8.00 in variable costs (green beans, valve bag, packaging, label).

1. Unit Contribution Margin = $20.00 - $8.00 = $12.00 per bag.
2. Contribution Margin Ratio = ($12.00 / $20.00) × 100 = 60.0%.
3. Break-Even Units = $3,000.00 / $12.00 = 250 bags per month.
4. Break-Even Revenue = 250 bags × $20.00 = $5,000.00 per month.

Interpretation:
The roaster must sell at least 250 bags each month to pay all bills. Bag #251 contributes $12.00 directly to pre-tax profit.`,
      whenToUse: [
        'When evaluating a new product launch or commercial venture to determine commercial feasibility.',
        'When assessing the impact of taking on new fixed overhead (e.g. hiring a full-time employee or signing an office lease).',
        'When testing price adjustments to see how price increases or cuts impact required sales volumes.',
        'When creating financial projections for bank loans, investors, or grant applications.',
      ],
      commonMistakes: [
        'Treating semi-variable costs (such as contractor hours or advertising spend) strictly as fixed costs.',
        'Ignoring volume-based tiered shipping discounts or raw material price increases when scaling production.',
        'Failing to plan for a safety buffer above the mathematical break-even point to withstand seasonal lulls or supply delays.',
      ],
      practicalTips: [
        'Maintain a 20% to 30% safety margin above your break-even volume to protect your business against unpredictable market shifts.',
        'Lower your break-even threshold by converting fixed overhead into variable costs (e.g. using third-party logistics fulfillment instead of leasing an entire warehouse).',
        'Analyze your product portfolio with individual contribution margins to prioritize high-margin inventory.',
      ],
      faqs: [
        {
          q: 'What is the difference between fixed costs and variable costs?',
          a: 'Fixed costs remain steady regardless of whether you sell zero units or 10,000 units (e.g. office rent, base salaries, accounting fees). Variable costs increase directly with each unit produced and sold (e.g. raw materials, packaging, transaction fees).',
        },
        {
          q: 'Why is contribution margin so important in break-even analysis?',
          a: 'Contribution margin shows how much cash each sale provides toward covering your ongoing fixed overhead. Once fixed overhead is 100% covered, the contribution margin on subsequent sales becomes pure operating profit.',
        },
        {
          q: 'How does lowering product price affect break-even volume?',
          a: 'Lowering the selling price reduces your unit contribution margin, which means you must sell significantly more units to cover the same fixed overhead.',
        },
      ],
    },
  },
  {
    id: 'calc-roas',
    slug: 'roas-calculator',
    name: 'ROAS & Ad Spend',
    fullTitle: 'Return on Ad Spend (ROAS), CPA & Campaign Profit Calculator',
    category: 'MARKETING & ADS',
    description: 'Measure return on ad spend, cost per acquisition (CPA), gross profit, and true net profit after product COGS across digital advertising campaigns.',
    metaDescription: 'Free ROAS and ad spend calculator. Compute return on ad spend multiplier, cost per acquisition (CPA), break-even ROAS, and net campaign profit after product COGS.',
    keywords: [
      'roas calculator',
      'return on ad spend calculator',
      'cpa calculator',
      'break even roas formula',
      'ad spend profit calculator',
    ],
    tags: ['ROI', 'Marketing', 'Ad Spend', 'Campaigns', 'CPA'],
    iconName: 'Megaphone',
    iconBgColor: 'bg-rose-950/80 border border-rose-800/40',
    iconColor: 'text-rose-400',
    tagColor: 'text-rose-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Paid Media Buyer & Growth Marketer',
    relatedToolIds: ['calc-cr-cpa', 'calc-ltv', 'calc-margin', 'calc-breakeven'],
    detailedGuide: {
      whatIsIt: 'Return on Ad Spend (ROAS) is a vital digital marketing metric that measures the gross revenue generated for every dollar invested in advertising. While top-line ROAS evaluates channel conversion efficiency, true campaign profitability requires subtracting both advertising spend and product manufacturing costs (COGS).',
      howItWorks: 'Enter your total ad budget, attributed sales revenue, number of conversions, and product unit COGS. The calculator computes your ROAS multiplier (e.g. 3.5x), Cost Per Acquisition (CPA), gross ad profit, True Net Profit after COGS, and your Break-Even ROAS threshold.',
      formulaExplanation: 'ROAS is calculated by dividing attributed revenue by total ad spend. CPA divides ad spend by total conversions. Break-even ROAS is calculated by dividing 1 by your gross profit margin decimal.',
      formulaMath: `ROAS Multiplier = Attributed Revenue / Total Ad Spend
ROAS Percentage (%) = (Attributed Revenue / Total Ad Spend) × 100

Cost Per Acquisition (CPA) = Total Ad Spend / Total Conversions
Break-Even ROAS = 1 / (Gross Profit Margin % / 100)

Net Ad Profit = Attributed Revenue - Total Ad Spend
True Net Profit (After COGS) = Attributed Revenue - Total Ad Spend - COGS
True Campaign ROI (%) = (True Net Profit / (Total Ad Spend + COGS)) × 100`,
      stepByStepExample: `Example: An e-commerce brand spends $2,000.00 on Meta Ads, generating $8,000.00 in revenue across 100 orders, with $3,200.00 in product COGS (40% COGS / 60% gross margin).

1. ROAS Multiplier = $8,000.00 / $2,000.00 = 4.0x (400%).
2. Cost Per Acquisition (CPA) = $2,000.00 / 100 = $20.00 per customer order.
3. Break-Even ROAS = 1 / 0.60 = 1.67x. (Any campaign ROAS above 1.67x produces net positive cash flow).
4. True Net Profit = $8,000.00 - $2,000.00 (ad spend) - $3,200.00 (COGS) = $2,800.00.
5. True Campaign ROI = ($2,800.00 / ($2,000.00 + $3,200.00)) × 100 = 53.8%.`,
      whenToUse: [
        'When evaluating performance across advertising platforms (Google Ads, Meta, TikTok, Amazon PPC, Pinterest).',
        'When deciding whether to scale daily ad budgets or pause underperforming ad sets.',
        'When calculating your break-even ROAS target to establish minimum bidding guardrails.',
        'When reporting marketing return on investment to stakeholders or agency clients.',
      ],
      commonMistakes: [
        'Confusing top-line ROAS with bottom-line profitability. A 2.0x ROAS sounds positive, but if your gross margin is only 40%, a 2.0x ROAS actually loses money on every sale.',
        'Relying solely on platform attribution without verifying total store blended MER (Marketing Efficiency Ratio).',
        'Evaluating high-repeat subscription products solely on first-order ROAS without factoring in customer lifetime value (LTV).',
      ],
      practicalTips: [
        'Always know your Break-Even ROAS before launching a paid campaign: Break-Even ROAS = 1 / Gross Margin %.',
        'Track blended ROAS (Total Store Revenue / Total Ad Spend Across All Channels) to account for multi-touch customer journeys and organic spillover.',
        'Incorporate payment processing fees and return allowances when calculating net campaign profit.',
      ],
      faqs: [
        {
          q: 'What is considered a good ROAS in e-commerce?',
          a: 'A 3.0x to 4.0x ROAS (300% to 400%) is typically considered healthy for physical e-commerce stores with 50% to 65% gross margins. Digital products and SaaS with 80%+ margins can operate profitably at a 1.5x to 2.0x ROAS.',
        },
        {
          q: 'How does ROAS differ from ROI?',
          a: 'ROAS compares gross revenue directly against advertising spend ($4 revenue per $1 ad spend). ROI measures net bottom-line profit against all associated costs including ad spend, product manufacturing, and overhead.',
        },
        {
          q: 'What is Break-Even ROAS and how do I calculate it?',
          a: 'Break-Even ROAS is the minimum ROAS needed so that advertising revenue minus product COGS exactly covers the ad spend. It is calculated by dividing 1 by your gross profit margin (e.g. 1 / 0.50 = 2.0x Break-Even ROAS for a 50% margin).',
        },
      ],
    },
  },
  {
    id: 'calc-cr-cpa',
    slug: 'conversion-rate-cpa',
    name: 'Conversion Rate & CPA',
    fullTitle: 'Website Conversion Rate, CPC & Cost Per Acquisition Calculator',
    category: 'MARKETING & ADS',
    description: 'Analyze traffic conversion efficiency, cost per click (CPC), cost per acquisition (CPA), and projected visitor traffic required for sales milestones.',
    metaDescription: 'Free conversion rate (CR) and CPA calculator. Compute website conversion efficiency, cost per click (CPC), and projected traffic volume required for sales goals.',
    keywords: [
      'conversion rate calculator',
      'cpa calculator',
      'cpc to cpa formula',
      'website conversion rate benchmark',
      'lead generation cost calculator',
    ],
    tags: ['Conversion %', 'CPA', 'Traffic Growth', 'Lead Gen', 'CPC'],
    iconName: 'Target',
    iconBgColor: 'bg-red-950/80 border border-red-800/40',
    iconColor: 'text-red-400',
    tagColor: 'text-red-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Conversion Rate Optimization Specialist',
    relatedToolIds: ['calc-roas', 'calc-ltv', 'calc-margin', 'calc-breakeven'],
    detailedGuide: {
      whatIsIt: 'Conversion Rate (CR) measures the percentage of website visitors who complete a desired commercial action (such as placing an order, booking a consultation, or submitting a lead form). Pairing Conversion Rate with Cost Per Click (CPC) reveals your exact Cost Per Acquisition (CPA) and highlights marketing funnel efficiency.',
      howItWorks: 'Enter your total visitor traffic (sessions or clicks), total conversions generated, total ad spend, and optional Average Order Value (AOV). The calculator provides your conversion percentage, Cost Per Acquisition (CPA), Cost Per Click (CPC), total generated revenue, and the required traffic volume needed to generate 100 sales.',
      formulaExplanation: 'Conversion Rate is calculated by dividing total conversions by total visitors and multiplying by 100. CPA is total ad spend divided by conversions (or CPC divided by the conversion rate decimal). CPC is total ad spend divided by total visitors.',
      formulaMath: `Conversion Rate (%) = (Total Conversions / Total Visitors) × 100
Cost Per Acquisition (CPA) = Total Ad Spend / Total Conversions = CPC / (CR% / 100)
Cost Per Click (CPC) = Total Ad Spend / Total Visitors

Estimated Revenue = Total Conversions × Average Order Value (AOV)
Traffic Required for 100 Sales = 100 / (CR% / 100)`,
      stepByStepExample: `Example: An e-commerce landing page receives 10,000 visitors from a $1,200.00 ad campaign, resulting in 250 completed checkout orders with an Average Order Value of $50.00.

1. Conversion Rate = (250 / 10,000) × 100 = 2.50%.
2. Cost Per Acquisition (CPA) = $1,200.00 / 250 = $4.80 per customer.
3. Cost Per Click (CPC) = $1,200.00 / 10,000 = $0.12 per click.
4. Total Gross Revenue = 250 × $50.00 = $12,500.00 (10.4x ROAS).
5. Traffic Required for 100 Sales = 100 / 0.025 = 4,000 visitors.`,
      whenToUse: [
        'When evaluating the business impact of conversion rate optimization (CRO) tests on landing pages.',
        'When forecasting sales volumes and estimating advertising budgets needed to reach revenue targets.',
        'When assessing performance differences between desktop and mobile checkout experiences.',
        'When benchmarking marketing channel efficiency (e.g. paid search vs. organic social).',
      ],
      commonMistakes: [
        'Evaluating traffic solely by volume without measuring conversion intent and quality.',
        'Comparing lead-generation conversion rates (often 5% to 15%) directly with e-commerce transaction conversion rates (typically 1.5% to 3.5%).',
        'Overlooking mobile friction such as slow page load speeds or multi-step checkout forms that suppress mobile CR.',
      ],
      practicalTips: [
        'Increasing conversion rate from 2.0% to 3.0% reduces your customer acquisition cost (CPA) by 33.3% without spending an extra dollar on advertising.',
        'Optimize page loading speeds: industry research indicates that every 1-second improvement in page speed can increase mobile conversion rates by 10% to 20%.',
        'Simplify checkout: reducing form fields and providing express payment options (Apple Pay, Google Pay, Shop Pay) significantly lifts conversion rates.',
      ],
      faqs: [
        {
          q: 'What is a typical average website conversion rate?',
          a: 'Average e-commerce conversion rates typically range between 1.8% and 3.2%. High-intent search campaigns often achieve 3% to 5%, while B2B lead generation forms can reach 5% to 12% depending on the offer.',
        },
        {
          q: 'How are CPC and CPA mathematically linked?',
          a: 'CPA is directly proportional to CPC and inversely proportional to Conversion Rate: CPA = CPC / Conversion Rate. If your CPC is $1.00 and your conversion rate is 2.0% (0.02), your CPA is $1.00 / 0.02 = $50.00.',
        },
        {
          q: 'How does Average Order Value (AOV) impact CPA viability?',
          a: 'A higher AOV allows your business to tolerate a higher CPA while remaining profitable. If your AOV is $150 with a 60% gross margin ($90 profit), a $30 CPA is highly sustainable.',
        },
      ],
    },
  },
  {
    id: 'calc-landed-cost',
    slug: 'landed-cost',
    name: 'Landed Cost & Pricing',
    fullTitle: 'Landed Cost, Customs Duty & Retail Price Calculator',
    category: 'E-COMMERCE',
    description: 'Calculate total unit landed cost (manufacturing, international freight, customs duties, packaging) and determine profitable retail selling prices.',
    metaDescription: 'Calculate total landed cost per unit including FOB manufacturing, international shipping, customs duty, tariffs, and packaging. Set profitable MSRP prices.',
    keywords: [
      'landed cost calculator',
      'customs duty calculator',
      'ecommerce landed cost formula',
      'import tariff calculator',
      'total landed cost per unit',
    ],
    tags: ['Landed Cost', 'Tariff', 'MSRP Pricing', 'Importing', 'COGS'],
    iconName: 'Package',
    iconBgColor: 'bg-lime-950/80 border border-lime-800/40',
    iconColor: 'text-lime-400',
    tagColor: 'text-lime-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Supply Chain & Import Coordinator',
    relatedToolIds: ['calc-margin', 'calc-fees', 'calc-breakeven', 'calc-roas'],
    detailedGuide: {
      whatIsIt: 'Landed cost represents the complete, true expense required to manufacture, transport, clear through customs, insure, inspect, and package a physical product until it sits inside your fulfillment warehouse ready for dispatch to customers.',
      howItWorks: 'Enter your supplier unit FOB cost, international freight per unit, import customs tariff percentage, packaging cost, payment gateway fee schedule, and desired profit margin. The calculator computes the total landed cost per unit and solves for the required retail selling price that protects your target margin after payment processing deductions.',
      formulaExplanation: 'Customs duty is calculated on the FOB unit cost. Total landed cost combines FOB cost, freight, customs duty, and packaging. The recommended retail price factors in both payment processing fees and your target profit margin.',
      formulaMath: `Customs Duty Cost = FOB Unit Cost × (Tariff % / 100)
Total Landed Cost per Unit = FOB Cost + Freight/Unit + Customs Duty + Packaging

Recommended Retail Price = (Total Landed Cost + Gateway Fixed Fee) / (1 - (Gateway Rate% / 100) - (Target Margin% / 100))
Break-Even Retail Price = (Total Landed Cost + Gateway Fixed Fee) / (1 - (Gateway Rate% / 100))`,
      stepByStepExample: `Example: You import a product manufactured overseas with a $15.00 FOB price. Ocean freight is $3.00 per unit, customs tariff is 6.0%, and custom packaging is $1.50. You target a 55% gross profit margin and expect standard 2.9% + $0.30 payment processing fees.

1. Customs Duty = $15.00 × 0.06 = $0.90 per unit.
2. Total Landed Cost = $15.00 + $3.00 + $0.90 + $1.50 = $20.40 per unit.
3. Compute pricing denominator: 1 - 0.029 (gateway) - 0.55 (margin) = 0.421.
4. Recommended Retail Price = ($20.40 + $0.30) / 0.421 = $20.70 / 0.421 = $49.17.

Verification Check:
• Selling Price: $49.17
• Landed Cost: $20.40
• Gateway Fee: ($49.17 × 0.029) + $0.30 = $1.73
• Net Gross Profit: $49.17 - $20.40 - $1.73 = $27.04 (exactly 55.0% of $49.17).`,
      whenToUse: [
        'When evaluating quotes from overseas or domestic manufacturing suppliers.',
        'When budgeting container-load sea freight versus air freight shipments.',
        'When setting MSRP catalog prices for wholesale distribution or direct-to-consumer stores.',
        'When auditing landed cost variances between product batches.',
      ],
      commonMistakes: [
        'Pricing retail products based solely on the supplier factory invoice (FOB) while forgetting freight and customs duties.',
        'Omitting payment processing fees when setting retail prices, which quietly erodes 3% of your profit margin on every checkout.',
        'Failing to account for port drayage, customs broker filing fees, or warehouse receiving charges in unit economics.',
      ],
      practicalTips: [
        'Obtain verified Harmonized System (HS / HTS) tariff classification codes from your customs broker before issuing manufacturing purchase orders.',
        'Compare Full Container Load (FCL) versus Less than Container Load (LCL) freight rates to optimize per-unit shipping expenses.',
        'Include a 3% to 5% buffer in your landed cost calculations to account for potential freight surcharges and exchange rate shifts.',
      ],
      faqs: [
        {
          q: 'What is FOB in manufacturing contracts?',
          a: 'FOB stands for Free On Board. It means the seller covers manufacturing and transport to the origin shipping port, but the buyer is responsible for ocean/air freight, marine insurance, import customs duties, and domestic delivery.',
        },
        {
          q: 'Why should payment gateway fees be included in landed cost pricing?',
          a: 'Payment processors charge fees on the full checkout transaction total. Omitting gateway fees from your retail pricing calculation means you absorb those fees directly from your net margin.',
        },
        {
          q: 'How do customs tariffs affect retail pricing?',
          a: 'Customs duties increase your baseline landed cost. If a tariff raises your unit cost by $2.00, keeping your margin steady requires raising the retail price by $4.00 or more depending on your margin target.',
        },
      ],
    },
  },
  {
    id: 'calc-freelance',
    slug: 'freelance-rate',
    name: 'Freelance Rate Formula',
    fullTitle: 'Freelance Hourly, Day & Project Rate Pricing Calculator',
    category: 'FREELANCE',
    description: 'Convert your target annual take-home salary into sustainable hourly, day, and weekly billing rates factoring self-employment taxes, healthcare, and non-billable hours.',
    metaDescription: 'Free freelance hourly rate and day rate calculator. Calculate sustainable consulting prices based on target take-home pay, self-employment taxes, and billable capacity.',
    keywords: [
      'freelance hourly rate calculator',
      'consultant day rate formula',
      'freelancer pricing calculator',
      'billable hours formula',
      'contractor rate calculator',
    ],
    tags: ['Hourly', 'Day Rate', 'Billable Hours', 'Solopreneur', 'Consulting'],
    iconName: 'Briefcase',
    iconBgColor: 'bg-indigo-950/80 border border-indigo-800/40',
    iconColor: 'text-indigo-400',
    tagColor: 'text-indigo-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Independent Consultant & Creative Freelancer',
    relatedToolIds: ['calc-fees', 'calc-late-interest', 'calc-salary', 'calc-margin'],
    detailedGuide: {
      whatIsIt: 'When transitioning from salaried employment to independent freelancing or consulting, dividing annual salary by standard working hours (2,080 hours) leads to severe underpricing. Solopreneurs must self-fund taxes, health insurance, software subscriptions, unpaid sick leave, and non-billable business development hours.',
      howItWorks: 'Enter your desired annual net take-home salary, estimated income and self-employment taxes, annual business overhead, and expected annual billable hours. The calculator determines your total required gross revenue, minimum sustainable hourly rate, standard 8-hour day rate, and weekly pacing targets.',
      formulaExplanation: 'Total required gross revenue is calculated by summing your target take-home pay, estimated tax and insurance liabilities, and business operating overhead. Dividing this gross revenue by realistic annual billable hours gives your hourly billing rate.',
      formulaMath: `Total Required Gross Revenue = Target Net Take-Home + Taxes & Health Insurance + Business Operating Expenses

Minimum Hourly Rate = Total Required Gross Revenue / Annual Billable Hours
Standard Day Rate (8 Hours) = Minimum Hourly Rate × 8
Weekly Gross Target = Total Required Gross Revenue / Active Working Weeks

Where:
• Target Net Take-Home: Personal income you wish to take home after all expenses
• Taxes & Insurance: Estimated self-employment tax, income tax, and health/dental coverage
• Annual Billable Hours: Realistic client-facing hours (typically 1,000 to 1,200 hours/year)`,
      stepByStepExample: `Example: A consultant wants an annual net take-home income of $75,000.00. They anticipate $22,000.00 in self-employment/income taxes and health coverage, and $8,000.00 in software, hardware, accounting, and office overhead. They plan for 1,000 billable hours per year (approx. 21-22 billable hours/week across 46 active working weeks).

1. Total Required Gross Revenue = $75,000 + $22,000 + $8,000 = $105,000.00 per year.
2. Minimum Hourly Rate = $105,000.00 / 1,000 billable hours = $105.00 / hour.
3. Standard Day Rate (8h) = $105.00 × 8 = $840.00 / day.
4. Weekly Billing Target (46 weeks) = $105,000 / 46 = $2,282.61 / week.`,
      whenToUse: [
        'When transitioning from full-time corporate employment to independent freelancing or agency consulting.',
        'When quoting fixed-fee client project proposals based on expected milestone duration.',
        'When reviewing and updating annual client retainer pricing.',
        'When evaluating whether an offered contract role meets your baseline earnings requirements.',
      ],
      commonMistakes: [
        'Dividing annual salary by 2,080 hours (40 hrs/week × 52 weeks). This assumes zero non-billable time, zero marketing, zero administrative overhead, and zero vacation time.',
        'Failing to set aside quarterly estimated tax payments, resulting in unexpected tax penalties.',
        'Billing exclusively by the hour rather than shifting to fixed milestone or value-based pricing as efficiency improves.',
      ],
      practicalTips: [
        'The 1,000-Hour Rule: Full-time freelancers typically spend only 50% to 60% of their working week on billable deliverables; the rest is sales, invoicing, and admin.',
        'Require a 30% to 50% upfront retainer deposit before commencing milestone deliverables for new clients.',
        'Review and increase your rates by 10% to 15% annually to adjust for inflation and reflect accumulated domain expertise.',
      ],
      faqs: [
        {
          q: 'Why is 1,000 billable hours considered standard for full-time freelancing?',
          a: 'A standard working year has 2,080 potential hours. However, taking 4 to 6 weeks for vacation, holidays, and sick days leaves about 1,840 hours. Spending 40% to 50% of your time on non-billable work (proposals, accounting, client acquisition) leaves roughly 1,000 actual billable hours.',
        },
        {
          q: 'Should I quote hourly rates or fixed project fees to clients?',
          a: 'Fixed project fees derived from your daily rate baseline are generally preferable because they reward efficiency, provide pricing clarity for clients, and prevent arguments over timesheet hours.',
        },
        {
          q: 'How should I handle self-employment taxes as a freelancer?',
          a: 'In the US, independent contractors pay Self-Employment (SE) tax (15.3% for Social Security and Medicare) in addition to regular income tax. It is best practice to set aside 25% to 30% of every invoice for taxes.',
        },
      ],
    },
  },
  {
    id: 'calc-late-interest',
    slug: 'late-payment-interest',
    name: 'Invoice Late Interest',
    fullTitle: 'Overdue Invoice Late Payment Interest & Recovery Fee Calculator',
    category: 'FREELANCE',
    description: 'Calculate statutory and contractual late payment interest, daily accrual amounts, and debt recovery compensation on overdue commercial invoices.',
    metaDescription: 'Calculate late payment interest and statutory recovery fees on overdue commercial invoices under US, UK, and EU commercial payment regulations.',
    keywords: [
      'late payment interest calculator',
      'overdue invoice interest calculator',
      'statutory interest commercial debt',
      'late invoice compensation fee',
      'debt recovery interest calculation',
    ],
    tags: ['Overdue', 'Statutory Rate', 'Debt Claim', 'Invoicing', 'Cash Flow'],
    iconName: 'CalendarClock',
    iconBgColor: 'bg-orange-950/80 border border-orange-800/40',
    iconColor: 'text-orange-400',
    tagColor: 'text-orange-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Commercial Credit & Accounts Receivable',
    relatedToolIds: ['calc-freelance', 'calc-fees', 'calc-salary', 'calc-margin'],
    detailedGuide: {
      whatIsIt: 'When commercial clients fail to settle invoices by the agreed contract due date, businesses are legally permitted under commercial legislation (such as UK/EU Late Payment of Commercial Debts acts) or contractual terms to charge accrued late payment interest and statutory debt collection compensation fees.',
      howItWorks: 'Enter your invoice principal balance, annual interest rate (statutory benchmark plus reference rate, or contract rate), days overdue past the payment due date, and optional fixed statutory compensation. The calculator determines your daily interest accrual, total accumulated interest, and final updated statement balance.',
      formulaExplanation: 'Daily interest is calculated by multiplying the invoice principal by the annual interest rate divided by 365 days. Total interest equals the daily rate multiplied by days past due. The total outstanding balance adds the principal, accumulated interest, and recovery compensation.',
      formulaMath: `Daily Interest Rate = (Invoice Principal × (Annual Interest Rate % / 100)) / 365
Accrued Late Interest = Daily Interest Rate × Days Overdue
Total Balance Due = Invoice Principal + Accrued Late Interest + Statutory Recovery Fee

Where:
• Invoice Principal: Original unpaid invoice amount
• Annual Interest Rate%: Statutory reference rate (e.g. Bank of England base rate + 8.0%) or contract rate
• Days Overdue: Calendar days elapsed since payment due date`,
      stepByStepExample: `Example: A B2B client owes an unpaid invoice of $5,000.00 that is 60 days overdue under a contract clause specifying 10.0% annual late payment interest with a $70.00 administrative recovery compensation fee.

1. Daily Interest = ($5,000.00 × 0.10) / 365 = $500.00 / 365 = $1.3698 per day.
2. Accrued Interest (60 days) = $1.3698 × 60 = $82.19.
3. Statutory Recovery Fee = $70.00.
4. Total Outstanding Balance = $5,000.00 + $82.19 + $70.00 = $5,152.19.`,
      whenToUse: [
        'When issuing formal overdue payment notices and updated statements of account to late-paying corporate clients.',
        'When enforcing contractual payment terms on milestone deliverables.',
        'When submitting commercial debt recovery documentation to collections agencies or small claims courts.',
        'When calculating the carrying cost of extended accounts receivable terms.',
      ],
      commonMistakes: [
        'Attempting to charge late interest to non-commercial retail consumers without clear statutory or consumer credit authorization.',
        'Calculating overdue days from the invoice issuance date rather than the agreed payment due date.',
        'Compounding daily late payment interest unless specifically authorized by contract or local statutory regulations.',
      ],
      practicalTips: [
        'Always include explicit payment terms in your contract: "Invoices payable within 30 days. Overdue balances subject to statutory late interest of 1.5% per month (18% per annum) plus recovery costs."',
        'Send courteous automated payment reminders 7 days before due date, on the due date, and at 7, 14, and 30 days past due.',
        'Attaching a recalculation statement showing accrued daily interest often motivates corporate accounts payable departments to expedite release of funds.',
      ],
      faqs: [
        {
          q: 'What is statutory compensation for late commercial debt?',
          a: 'Under UK and EU commercial debt legislation, businesses are entitled to claim a tiered fixed compensation fee (e.g. £40 for debts under £1,000, £70 for £1,000-£10,000, £100 for £10,000+) to cover administrative collection costs.',
        },
        {
          q: 'Can I charge late payment interest if it was not written in my original contract?',
          a: 'In jurisdictions with statutory late payment legislation (such as the UK and EU Member States), statutory interest applies by law to commercial B2B transactions even if not explicitly stated in the contract. In the US, terms generally depend on written contract agreements or state usury limits.',
        },
        {
          q: 'Is late payment interest calculated on simple or compound basis?',
          a: 'Statutory commercial late payment interest is standardly calculated on a simple daily basis (Principal × Rate / 365 × Days) rather than compounded daily.',
        },
      ],
    },
  },
  {
    id: 'calc-compound',
    slug: 'compound-interest',
    name: 'Compound Interest Growth',
    fullTitle: 'Compound Interest & Investment Wealth Growth Calculator',
    category: 'INVESTING',
    description: 'Project future investment balance, total principal deposits, and compound interest earnings over time with regular monthly recurring contributions.',
    metaDescription: 'Free compound interest calculator with monthly contributions. Visualize exponential investment growth, annual returns, and total interest earned.',
    keywords: [
      'compound interest calculator',
      'investment growth calculator',
      'future value calculator',
      'monthly contribution compound interest',
      'wealth growth projection formula',
    ],
    tags: ['Wealth', 'Compound', 'Horizon', 'Investing', 'Savings'],
    iconName: 'PiggyBank',
    iconBgColor: 'bg-teal-950/80 border border-teal-800/40',
    iconColor: 'text-teal-400',
    tagColor: 'text-teal-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Long-Term Wealth & Portfolio Strategist',
    relatedToolIds: ['calc-loan-emi', 'calc-salary', 'calc-ltv', 'calc-breakeven'],
    detailedGuide: {
      whatIsIt: 'Compound interest represents interest earned on both the initial principal investment and on all previously accumulated interest. Over multi-year and multi-decade time horizons, compounding transforms linear contributions into exponential wealth growth.',
      howItWorks: 'Enter your starting principal, regular monthly contribution, expected annual return rate, compounding frequency (e.g. monthly or annually), and investment time horizon in years. The calculator computes your future investment value, total principal deposits, and total compound interest earnings.',
      formulaExplanation: 'The future value formula combines the compound growth of the lump-sum starting principal with the future value of a recurring monthly deposit annuity stream.',
      formulaMath: `Future Value (FV) = P × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]

Where:
• P: Initial starting principal deposit
• PMT: Monthly recurring contribution
• r: Annual interest / return rate (as a decimal, e.g. 7% = 0.07)
• n: Compounding frequency per year (12 for monthly)
• t: Time horizon in years
• Total Principal Deposits = P + (PMT × 12 × t)
• Total Compound Interest Earned = Future Value - Total Principal Deposits`,
      stepByStepExample: `Example: You start with an initial deposit of $10,000.00 and invest $300.00 each month at an estimated 8.0% annual return compounded monthly over 15 years.

1. Total Principal Invested = $10,000 + ($300 × 12 × 15) = $10,000 + $54,000 = $64,000.00.
2. Compounding factor for 15 years (180 months) at 8% monthly: (1 + 0.08/12)^180 = 3.3069.
3. Principal Growth = $10,000 × 3.3069 = $33,069.21.
4. Monthly Deposits Growth = $300 × [(3.3069 - 1) / (0.08/12)] = $300 × 346.038 = $103,811.47.
5. Total Projected Future Balance = $33,069.21 + $103,811.47 = $136,880.68.
6. Total Compound Interest Earned = $136,880.68 - $64,000.00 = $72,880.68 (Interest accounts for 53.2% of the final wealth balance).`,
      whenToUse: [
        'When planning long-term retirement savings, index fund portfolios, or college fund contributions.',
        'When evaluating the long-term wealth impact of increasing monthly savings rates.',
        'When comparing high-yield savings accounts (HYSA) against diversified market investment returns.',
        'When teaching financial literacy and demonstrating the mathematical power of starting early.',
      ],
      commonMistakes: [
        'Underestimating the impact of time: delaying investing by 5 to 10 years can cut final compounding wealth in half.',
        'Ignoring the effect of management expense ratios (MER) or investment fees, which can compound negatively over decades.',
        'Assuming investment returns are strictly linear year-over-year without planning for normal market volatility.',
      ],
      practicalTips: [
        'The Rule of 72: Divide 72 by your annual expected interest rate to estimate how many years it takes for your investment balance to double (e.g. 72 / 8% = 9 years).',
        'Automate monthly investment transfers on paycheck day to maintain consistent dollar-cost averaging.',
        'Reinvest all dividends and capital gain distributions to maximize the compounding acceleration effect.',
      ],
      faqs: [
        {
          q: 'What is the Rule of 72 and how is it used?',
          a: 'The Rule of 72 is a quick mental math shortcut used to estimate how long an investment will take to double at a fixed annual rate of return. For example, at an 8% return, money doubles in approximately 72 / 8 = 9 years.',
        },
        {
          q: 'How does compounding frequency affect total return?',
          a: 'More frequent compounding (such as monthly or daily versus annually) slightly increases effective annual yield because accumulated interest starts generating its own interest sooner.',
        },
        {
          q: 'Does compound interest account for inflation?',
          a: 'Standard compound interest calculations show nominal growth. To estimate real purchasing power growth, subtract an estimated inflation rate (e.g. 2.5% to 3.0%) from your nominal return rate.',
        },
      ],
    },
  },
  {
    id: 'calc-loan-emi',
    slug: 'loan-emi',
    name: 'Loan & Monthly EMI',
    fullTitle: 'Loan Amortization, Monthly EMI & Interest Calculator',
    category: 'INVESTING',
    description: 'Calculate monthly loan EMI payments, total interest cost, and principal vs. interest amortization breakdown for commercial, auto, and personal loans.',
    metaDescription: 'Free loan EMI and amortization calculator. Calculate monthly loan payments, total interest payable, and amortization schedule for personal and business loans.',
    keywords: [
      'loan emi calculator',
      'loan amortization calculator',
      'monthly payment calculator',
      'reducing balance loan interest',
      'commercial loan emi formula',
    ],
    tags: ['Loan EMI', 'Amortization', 'Interest Cost', 'Debt', 'Financing'],
    iconName: 'Landmark',
    iconBgColor: 'bg-cyan-950/80 border border-cyan-800/40',
    iconColor: 'text-cyan-400',
    tagColor: 'text-cyan-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Corporate Debt & Commercial Lending',
    relatedToolIds: ['calc-compound', 'calc-salary', 'calc-breakeven', 'calc-fees'],
    detailedGuide: {
      whatIsIt: 'An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a financial lender on a set monthly schedule over a defined tenure. Each payment is divided between paying down accrued monthly interest and reducing the principal loan balance.',
      howItWorks: 'Enter your loan principal amount, annual interest rate, and loan repayment tenure in years. The calculator uses standard reducing-balance amortization mathematics to compute your fixed monthly EMI, total repayment amount, and total interest cost.',
      formulaExplanation: 'The standard amortization formula calculates the fixed installment using the loan principal, monthly interest rate, and total number of monthly payments across the tenure.',
      formulaMath: `Monthly EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]

Where:
• P: Principal loan amount borrowed
• r: Monthly interest rate = (Annual Interest Rate % / 100) / 12
• n: Total number of monthly installments (Tenure in Years × 12)

Total Repayment Amount = Monthly EMI × n
Total Interest Payable = Total Repayment Amount - Principal Loan Amount`,
      stepByStepExample: `Example: You take out a $40,000.00 commercial equipment loan at a 7.0% annual interest rate over a 5-year tenure (60 monthly payments).

1. Monthly Interest Rate r = (0.07 / 12) = 0.0058333.
2. Total Months n = 5 × 12 = 60 months.
3. Factor (1 + r)^n = (1.0058333)^60 = 1.417625.
4. Monthly EMI = [$40,000 × 0.0058333 × 1.417625] / [1.417625 - 1] = $330.78 / 0.417625 = $792.05 / month.
5. Total Repayment Amount = $792.05 × 60 = $47,523.00.
6. Total Interest Cost = $47,523.00 - $40,000.00 = $7,523.00 (Interest represents 15.8% of total payout).`,
      whenToUse: [
        'When evaluating commercial financing for equipment purchases, vehicle fleets, or business expansion.',
        'When comparing lending offers from different financial institutions with varied terms and rates.',
        'When planning monthly operating budgets to ensure cash flow comfortably supports debt obligations.',
        'When calculating interest savings achievable through accelerated loan prepayment.',
      ],
      commonMistakes: [
        'Confusing flat-rate interest with reducing-balance interest. Flat-rate loans charge interest on the original full principal for the entire duration, resulting in much higher actual borrowing costs.',
        'Focusing only on the monthly EMI amount while ignoring the total cumulative interest paid across longer tenures.',
        'Overlooking loan origination fees, processing charges, or early repayment penalty clauses in the loan agreement.',
      ],
      practicalTips: [
        'Early in loan tenure, the majority of your EMI goes toward interest; as the principal balance decreases, a greater portion goes toward principal equity.',
        'Making one extra monthly EMI payment per year or rounding up monthly payments can shorten a 5-year loan by several months and save substantial interest.',
        'Compare the Annual Percentage Rate (APR), which includes lender fees, rather than relying solely on the advertised nominal interest rate.',
      ],
      faqs: [
        {
          q: 'What is the difference between flat interest rate and reducing balance rate?',
          a: 'Flat rates calculate interest on the entire original loan principal throughout the entire term, making them substantially more expensive. Reducing-balance loans recalculate interest each month based only on the remaining unpaid principal balance.',
        },
        {
          q: 'How does loan tenure affect total interest paid?',
          a: 'A longer tenure lowers your monthly payment (EMI) but increases total interest paid over the life of the loan. A shorter tenure increases monthly payments but minimizes total interest expense.',
        },
        {
          q: 'Can prepaying a loan reduce total interest cost?',
          a: 'Yes. On reducing-balance loans, extra principal payments directly lower the outstanding loan balance, reducing future monthly interest calculations and shortening the repayment schedule.',
        },
      ],
    },
  },
  {
    id: 'calc-ltv',
    slug: 'customer-ltv',
    name: 'Customer LTV (CLV)',
    fullTitle: 'Customer Lifetime Value (LTV) & Maximum CAC Calculator',
    category: 'MARKETING & ADS',
    description: 'Forecast aggregate lifetime value per customer based on average order value, purchase frequency, customer lifespan, and target 3:1 LTV:CAC ratios.',
    metaDescription: 'Free customer lifetime value (LTV / CLV) calculator. Forecast customer retention value, profit LTV, and recommended maximum customer acquisition cost (CAC).',
    keywords: [
      'customer lifetime value calculator',
      'clv calculator',
      'ltv to cac ratio calculator',
      'customer retention value formula',
      'maximum allowable cac',
    ],
    tags: ['SaaS', 'Retention', 'CLV/CAC', 'E-Commerce', 'Unit Economics'],
    iconName: 'Users',
    iconBgColor: 'bg-purple-950/80 border border-purple-800/40',
    iconColor: 'text-purple-400',
    tagColor: 'text-purple-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Customer Success & Retention Director',
    relatedToolIds: ['calc-roas', 'calc-cr-cpa', 'calc-margin', 'calc-breakeven'],
    detailedGuide: {
      whatIsIt: 'Customer Lifetime Value (LTV or CLV) represents the total gross revenue and net profit an individual customer account generates for your business throughout the duration of their relationship. Benchmarking LTV against Customer Acquisition Cost (CAC) ensures sustainable marketing unit economics.',
      howItWorks: 'Enter your Average Order Value (AOV), annual purchase frequency, average customer lifespan in years, and gross profit margin percentage. The calculator computes annual customer revenue, Gross Lifetime Revenue (LTV), Net Profit LTV, and your recommended Maximum Customer Acquisition Cost (CAC) under the industry standard 3:1 ratio.',
      formulaExplanation: 'Annual revenue per customer equals AOV multiplied by purchase frequency. Gross LTV multiplies annual customer revenue by customer lifespan. Net Profit LTV multiplies Gross LTV by your gross profit margin percentage. Maximum CAC is Net Profit LTV divided by 3.',
      formulaMath: `Annual Revenue per Customer = Average Order Value (AOV) × Annual Purchase Frequency
Gross Lifetime Value (LTV) = Annual Revenue per Customer × Customer Lifespan (Years)

Net Profit LTV = Gross Lifetime Value × (Gross Profit Margin % / 100)
Recommended Maximum CAC (at 3:1 LTV:CAC) = Net Profit LTV / 3

Where:
• AOV: Average revenue generated per transaction
• Annual Purchase Frequency: Number of orders an active customer places per year
• Customer Lifespan: Average number of years a customer continues buying
• Gross Profit Margin%: Percentage of revenue retained after product COGS`,
      stepByStepExample: `Example: A specialty subscription coffee brand has an Average Order Value (AOV) of $40.00, purchase frequency of 6 orders per year, average customer retention lifespan of 3 years, and a 65% gross profit margin.

1. Annual Customer Revenue = $40.00 × 6 = $240.00 / year.
2. Gross Lifetime Value (LTV) = $240.00 × 3 years = $720.00.
3. Net Profit LTV = $720.00 × 0.65 = $468.00 in cumulative net profit per customer.
4. Recommended Maximum CAC (3:1 LTV:CAC target) = $468.00 / 3 = $156.00.

Interpretation:
The company can spend up to $156.00 to acquire a new customer while maintaining a healthy 3:1 profit-to-acquisition ratio.`,
      whenToUse: [
        'When establishing marketing acquisition budgets and determining maximum allowable bids on paid advertising channels.',
        'When evaluating the ROI of customer retention, loyalty programs, and post-purchase email onboarding flows.',
        'When pitching subscription SaaS or e-commerce unit economics to investors.',
        'When segmenting customer cohorts to identify high-value customer personas.',
      ],
      commonMistakes: [
        'Measuring CAC against Gross LTV instead of Profit LTV. Gross revenue includes product COGS that cannot be spent on advertising.',
        'Assuming customer lifespan remains constant without accounting for cohort churn rates.',
        'Allowing the LTV:CAC ratio to fall below 2:1, which creates serious operational cash flow strain.',
      ],
      practicalTips: [
        'Target an LTV:CAC ratio between 3:1 and 4:1. A ratio under 2:1 indicates unprofitable acquisition, while a ratio above 5:1 may indicate you are under-investing in marketing growth.',
        'A 5% increase in customer retention can increase overall profits by 25% to 95% according to research by Bain & Company.',
        'Deploy cross-sells, annual billing discounts, and loyalty reward tiers to systematically lift both AOV and purchase frequency.',
      ],
      faqs: [
        {
          q: 'Why should CAC be evaluated against Profit LTV rather than Gross Revenue LTV?',
          a: 'Gross revenue must cover cost of goods sold, fulfillment, and customer support. Measuring CAC against Profit LTV ensures that your marketing spend remains genuinely profitable after all unit delivery costs are settled.',
        },
        {
          q: 'How do you calculate customer lifespan for a subscription SaaS business?',
          a: 'For SaaS businesses with recurring billing, Average Lifespan (in months) = 1 / Monthly Churn Rate. For example, a 4% monthly churn rate yields an average customer lifespan of 1 / 0.04 = 25 months.',
        },
        {
          q: 'What does a 3:1 LTV:CAC ratio mean in practice?',
          a: 'A 3:1 ratio means that for every $1.00 invested in acquiring a customer, that customer generates $3.00 in net profit over their lifetime with your company. This provides ample margin to cover general overhead, R&D, and net business profit.',
        },
      ],
    },
  },
  {
    id: 'calc-salary',
    slug: 'salary-tax',
    name: 'Net Salary & Tax Payout',
    fullTitle: 'Net Take-Home Salary & Paycheck Tax Estimator',
    category: 'PAYROLL',
    description: 'Calculate net annual, monthly, bi-weekly, and weekly take-home salary after estimated income tax withholdings and pre-tax deductions.',
    metaDescription: 'Free take-home salary and paycheck tax calculator. Calculate net monthly take-home pay, annual taxes withheld, and bi-weekly paycheck deposits.',
    keywords: [
      'salary calculator',
      'take home pay calculator',
      'net salary calculator',
      'paycheck tax withholding calculator',
      'effective tax rate salary estimator',
    ],
    tags: ['Payroll', 'Tax Estimator', 'Take-Home', 'Paycheck', 'Salary'],
    iconName: 'Receipt',
    iconBgColor: 'bg-pink-950/80 border border-pink-800/40',
    iconColor: 'text-pink-400',
    tagColor: 'text-pink-600',
    personaImageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    personaRole: 'Payroll Manager & Executive Compensation',
    relatedToolIds: ['calc-freelance', 'calc-compound', 'calc-loan-emi', 'calc-breakeven'],
    detailedGuide: {
      whatIsIt: 'Gross salary represents total contracted compensation before deductions, whereas net take-home salary is the actual disposable cash deposited into your bank account after income taxes, social security/Medicare contributions, and optional pre-tax benefit deductions.',
      howItWorks: 'Enter your gross annual salary, estimated effective tax withholding rate, and optional monthly pre-tax deductions (such as health insurance, dental, or retirement contributions). The calculator estimates total annual taxes withheld, annual net take-home pay, and pay period deposits across monthly, bi-weekly, and weekly schedules.',
      formulaExplanation: 'Annual tax withholding is estimated by multiplying gross salary by the effective tax rate. Total annual other deductions are subtracted, and remaining net compensation is divided across standard payroll frequencies.',
      formulaMath: `Annual Taxes Withheld = Gross Annual Salary × (Effective Tax Rate % / 100)
Annual Other Deductions = Monthly Deductions × 12
Annual Net Take-Home = Gross Annual Salary - Annual Taxes Withheld - Annual Other Deductions

Monthly Paycheck (12 pay periods) = Annual Net Take-Home / 12
Bi-Weekly Paycheck (26 pay periods) = Annual Net Take-Home / 26
Weekly Paycheck (52 pay periods) = Annual Net Take-Home / 52

Where:
• Gross Annual Salary: Total contracted pre-tax earnings
• Effective Tax Rate: Overall blended percentage of income paid across all tax brackets
• Pre-Tax Deductions: Voluntary retirement, health, or flexible spending deductions`,
      stepByStepExample: `Example: An employee receives a job offer with an $85,000.00 gross annual salary, an estimated 22.0% effective tax rate, and $200.00/month in health insurance and 401(k) retirement contributions.

1. Annual Taxes Withheld = $85,000.00 × 0.22 = $18,700.00.
2. Annual Pre-Tax Deductions = $200.00 × 12 = $2,400.00.
3. Annual Net Take-Home = $85,000.00 - $18,700.00 - $2,400.00 = $63,900.00.
4. Monthly Paycheck Deposit = $63,900.00 / 12 = $5,325.00 / month.
5. Bi-Weekly Paycheck (26 pay periods) = $63,900.00 / 26 = $2,457.69 per paycheck.
6. Effective Overall Withholding = (($18,700 + $2,400) / $85,000) × 100 = 24.8%.`,
      whenToUse: [
        'When evaluating new job offers or negotiating compensation packages.',
        'When budgeting personal monthly living expenses against actual expected net bank deposits.',
        'When assessing the take-home cash flow impact of increasing pre-tax retirement contributions.',
        'When comparing salaried employment compensation with freelance contractor day rates.',
      ],
      commonMistakes: [
        'Confusing marginal top tax rate with effective tax rate. In progressive tax systems, only income earned within higher brackets is taxed at higher rates.',
        'Confusing bi-weekly pay schedules (26 paychecks per year) with semi-monthly schedules (exactly 24 paychecks per year).',
        'Overlooking state/provincial taxes or local municipal wage withholdings when estimating effective tax rates.',
      ],
      practicalTips: [
        'Pre-tax retirement contributions (such as a 401(k) or traditional IRA) reduce your taxable gross income base, lowering your overall tax liability.',
        'Review your payroll withholding allowances (Form W-4 in the US) when major life events occur (marriage, birth of a child, purchasing a home).',
        'Remember that bi-weekly payroll results in two months each year having three paychecks, which can provide an extra savings boost.',
      ],
      faqs: [
        {
          q: 'What is the difference between marginal tax rate and effective tax rate?',
          a: 'Your marginal tax rate is the rate applied to your highest single dollar of earnings in a progressive tax bracket. Your effective tax rate is the actual overall blended percentage of your total income paid in taxes across all brackets.',
        },
        {
          q: 'Why does bi-weekly pay differ from semi-monthly pay?',
          a: 'Bi-weekly pay occurs every two weeks on a set weekday, resulting in 26 paychecks per year. Semi-monthly pay occurs twice per month (e.g. on the 15th and last day of the month), resulting in exactly 24 paychecks per year.',
        },
        {
          q: 'Is this calculator an official statutory tax filing tool?',
          a: 'No. This calculator is a planning and estimation utility. Actual payroll tax withholdings depend on local jurisdictional tax codes, filing status, exemptions, standard deductions, and specific employer benefits structures.',
        },
      ],
    },
  },
];
