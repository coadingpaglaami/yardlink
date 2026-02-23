// USERS LIST TYPES
export interface UserSummary {
  total_users: number
  total_clients: number
  total_landscapers: number
  basic_landscapers: number
  pro_landscapers: number
  paused_users: number
  active_users: number
  daily_active_users: number
  daily_average_users: number
  weekly_new_signups: number
  total_new_signups: number
  active_subscriptions: number
  active_jobs: number
  platform_fee_collected: number
}

export interface User {
  id: number
  name: string
  email: string
  address: string | null
  phone: string | null
  role: "admin" | "client" | "landscaper"
  is_active: boolean
  date_joined: string
  landscaper_plan: string | null
  plan_type: string | null
}

export interface UsersListResponse {
  status: string
  summary: UserSummary
  data: User[]
}

// SUBSCRIPTION RATIO TYPES
export interface SubscriptionRatio {
  total_active_subscriptions: number
  basic: {
    count: number
    percentage: number
  }
  pro: {
    count: number
    percentage: number
  }
}

// STRIPE MONTHLY OVERVIEW TYPES
export type Period = "daily" | "weekly" | "monthly" | "yearly";

export interface WeeklyIncome {
  week_start: string;
  income: number;
}

export interface MonthlyIncome {
  month_start: string;
  income: number;
}

export interface DailyIncome {
  date: string;
  income: number;
}

export interface YearlyIncome {
  year: string;
  income: number;
}

export interface OverviewMap {
  weekly: {
    currency: string;
    period: "weekly";
    overview: WeeklyIncome[];
  };
  monthly: {
    currency: string;
    period: "monthly";
    overview: MonthlyIncome[];
  };
  daily: {
    currency: string;
    period: "daily";
    overview: DailyIncome[];
  };
  yearly: {
    currency: string;
    period: "yearly";
    overview: YearlyIncome[];
  };
}