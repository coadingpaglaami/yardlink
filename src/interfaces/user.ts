export interface AuthResponse {
  message: string;
  token: {
    refresh: string;
    access: string;
  };
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    phone: string | null;
    address: string | null;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export type LandscaperPlan = "BasicPlan" | "ProPlan";

export interface UserSummaryResponse {
  status: string;
  summary: UserSummary;
  data: User[];
}

export interface UserSummary {
  total_users: number;
  total_clients: number;
  total_landscapers: number;
  basic_landscapers: number;
  pro_landscapers: number;
  daily_active_users: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: string | null;
  phone: string | null;
  is_active: boolean;
  date_joined: string; // ISO 8601
  landscaper_plan: LandscaperPlan | null;
}

export interface GetUsersParams {
  role?: 'client' | 'landscaper' | 'worker';
  search?: string;
  plan?: LandscaperPlan;
}
