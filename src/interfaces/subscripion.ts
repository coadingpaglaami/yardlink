export interface SubscriptionPlan {
  id: number;               // Unique identifier for the plan
  name: string;             // Name of the subscription plan
  description: string;      // Description of the plan
  price: string;            // Original price of the plan
  discount: string;         // Discount applied to the plan
  duration: string;         // Duration of the plan (e.g., "monthly")
  is_active: boolean;       // Whether the plan is active or not
  created_at: string;       // Timestamp of when the plan was created
  updated_at: string;       // Timestamp of the last update to the plan
  final_price: number;      // Final price after discount
}