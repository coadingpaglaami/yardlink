export interface DailyIncome {
  day: string;
  income: number;
}

export interface DailyOverviewResponse {
  currency: string;
  daily_income: DailyIncome[];
}

export interface TransactionSummaryResponse {
  transactions: {
    job_transactions: number;
    subscription_transactions: number;
    total_transactions: number;
  };
  platform_fees: {
    job_platform_fee_2_percent: number;
  };
}

export interface PaymentItem {
  id: number;
  user_id: number;
  role: string;
  name: string;
  email: string;
  amount_paid: number;
  platform_fee: number;
  transaction_id: string;
  date: string;
  source: string;
}

export interface PaymentsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PaymentItem[];
}
