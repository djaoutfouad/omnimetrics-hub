/**
 * Centralized benchmark rate assumptions and standard provider presets.
 * Note: These values represent standard public benchmark defaults (e.g. US domestic merchant rates)
 * and can be customized by the user in each respective calculator.
 */

export interface PaymentGatewayPreset {
  id: string;
  name: string;
  percentRate: number;
  fixedFee: number;
  description: string;
}

export const PAYMENT_GATEWAY_PRESETS: PaymentGatewayPreset[] = [
  {
    id: 'stripe-standard',
    name: 'Stripe (Standard US Domestic)',
    percentRate: 2.9,
    fixedFee: 0.30,
    description: 'Standard domestic card processing benchmark (2.9% + $0.30).',
  },
  {
    id: 'paypal-standard',
    name: 'PayPal (Merchant Rate)',
    percentRate: 3.49,
    fixedFee: 0.49,
    description: 'Standard online checkout merchant fee benchmark (3.49% + $0.49).',
  },
  {
    id: 'square-online',
    name: 'Square (Online API/Store)',
    percentRate: 2.9,
    fixedFee: 0.30,
    description: 'Square online checkout benchmark (2.9% + $0.30).',
  },
  {
    id: 'custom',
    name: 'Custom Gateway Rate',
    percentRate: 2.5,
    fixedFee: 0.25,
    description: 'User-specified negotiated interchange or merchant rate.',
  },
];

export const TAX_BENCHMARK_PRESETS = [
  { label: 'Low Bracket / Minimal Effective Rate (15%)', rate: 15 },
  { label: 'Moderate Bracket / Standard Rate (22%)', rate: 22 },
  { label: 'High Bracket / Upper Tier (32%)', rate: 32 },
];

export const STATUTORY_LATE_FEE_TIERS = [
  { maxDebt: 1000, fee: 40, label: 'Debts up to $1,000 / £1,000 ($40 standard)' },
  { maxDebt: 10000, fee: 70, label: 'Debts $1,000 – $10,000 / £1,000 – £10,000 ($70 standard)' },
  { maxDebt: Infinity, fee: 100, label: 'Debts above $10,000 / £10,000 ($100 standard)' },
];
