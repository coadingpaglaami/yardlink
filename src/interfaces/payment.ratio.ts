export interface PaymentRatio {
  total_payments: number
  stripe: {
    amount: number
    percentage: number
  }
  cash: {
    amount: number
    percentage: number
  }
}