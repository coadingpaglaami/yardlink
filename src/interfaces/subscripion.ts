export interface SubscriptionPlan {
  id: number; // Unique identifier for the plan
  name: string; // Name of the subscription plan
  description: string; // Description of the plan
  price: number; // Original price of the plan
  discount: number; // Discount applied to the plan
  duration: string; // Duration of the plan (e.g., "monthly")
  is_active: boolean; // Whether the plan is active or not
  created_at: string; // Timestamp of when the plan was created
  updated_at: string; // Timestamp of the last update to the plan
  final_price: number; // Final price after discount
}

export interface Subscription {
  id: number; // Unique identifier for the subscription
  user: number;
  user_name: string; // User ID associated with the subscription
  user_email: string; // Email of the user
  plan: number; // ID of the subscription plan
  plan_name: string; // Name of the subscription plan
  status: "active" | "inactive" | "expired"; // Status of the subscription
  start_date: string; // Subscription start date
  end_date: string; // Subscription end date
  is_active: boolean; // Whether the subscription is currently active
  remaining_days: number; // Days remaining in the subscription
  created_at: string; // Timestamp of when the subscription was created
}

export interface SubscriptionResponse {
  count: number; // Number of subscriptions
  subscriptions: Subscription[]; // Array of subscription objects
}

export interface SubscriptionParams {
  page?: number;
  search?: string;
  limit?: number;
  plan?: string;
}

export interface SubscriptionPlanResponse {
  count: number;
  results: SubscriptionPlan[];
}