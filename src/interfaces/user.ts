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


export interface UserSummaryResponse {
  status: string;
  summary: {
    total_users: number;
    total_clients: number;
    total_landscapers: number;
    daily_active_users: number;
  };
  data: User[];
}

interface User {
  id: number;
  name: string;
  email: string;
  address: string | null;
  phone: string | null;
  role: string;
  is_active: boolean;
  date_joined: string; // ISO 8601 format
}

export interface GetUsersParams {
  role?: string;
  search?: string;
  subscription?: string;
}
