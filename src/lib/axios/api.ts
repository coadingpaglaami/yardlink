import {
  AuthResponse,
  GetUsersParams,
  LoginCredentials,
  UserSummaryResponse,
} from "@/interfaces/user";
import { axiosInstance } from "./axios.instance";
import {
  SubscriptionParams,
  SubscriptionPlan,
  SubscriptionPlanResponse,
  SubscriptionResponse,
} from "@/interfaces/subscripion";
import { MessageParams, MessageResponse } from "@/interfaces/message";
import {
  DailyOverviewResponse,
  PaymentsResponse,
  TransactionSummaryResponse,
} from "@/interfaces/payment";
import {
  OverviewMap,
  Period,
  SubscriptionRatio,
  UsersListResponse,
} from "@/interfaces/user.type";
import { PaymentRatio } from "@/interfaces/payment.ratio";

const FORM_DATA_HEADERS = {
  "Content-Type": "multipart/form-data",
};

const ADMIN = "admin";

export const Login = async (
  payload: LoginCredentials,
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("login/", payload, {
    headers: FORM_DATA_HEADERS,
  });
  return data;
};

export const UserList = async (
  params: GetUsersParams,
): Promise<UserSummaryResponse> => {
  const { data } = await axiosInstance.get("users-list/", { params });
  return data;
};

export const DeleteUser = async (userId: number): Promise<void> => {
  return await axiosInstance.delete(`${ADMIN}/delete-user/${userId}/`);
};

export const PauseUser = async (
  userId: number,
  action: string,
): Promise<void> => {
  return await axiosInstance.patch(`${ADMIN}/users/${userId}/pause/`, {
    action,
  });
};

// Subscriptions //

export const SuscriptionPlan = async (): Promise<SubscriptionPlanResponse> => {
  const { data } = await axiosInstance.get("plans/");
  return data;
};

export const CreateSubscriptionPlan = async (
  payload: Pick<
    SubscriptionPlan,
    "name" | "description" | "price" | "discount" | "duration"
  >,
): Promise<SubscriptionPlan> => {
  const { data } = await axiosInstance.post("plans/", payload);
  return data;
};

export const DeletePlan = (planId: number): Promise<void> => {
  return axiosInstance.delete(`${ADMIN}/plans/${planId}/delete/`);
};

export const DeleteSubscriptionPlan = (
  subscripitonId: number,
): Promise<void> => {
  return axiosInstance.delete(`subscriptions/${subscripitonId}/delete/`);
};

export const ListOfSubscriptions = async (
  params: SubscriptionParams,
): Promise<SubscriptionResponse> => {
  const { data } = await axiosInstance.get(`${ADMIN}/subscriptions/`, {
    params,
  });
  return data;
};

export const ExetendSubscription = ({
  userId,
  days,
}: {
  userId: number;
  days: number;
}): Promise<void> => {
  return axiosInstance.post(`${ADMIN}/subscriptions/${userId}/extend/`, {
    days,
  });
};

// Message //

export const AllMessages = async (
  params: MessageParams,
): Promise<MessageResponse> => {
  const { data } = await axiosInstance.get(`${ADMIN}/list/contact/`, {
    params,
  });
  return data;
};

export const Reply = async ({
  messageId,
  admin_reply,
}: {
  messageId: number;
  admin_reply: string;
}): Promise<void> => {
  return axiosInstance.patch(`${ADMIN}/messages/${messageId}/reply/`, {
    admin_reply,
  });
};

export const DeleteMessage = (messageId: number): Promise<void> => {
  return axiosInstance.delete(`${ADMIN}/messages/${messageId}/delete/`);
};

export const getDailyOverview = async (): Promise<DailyOverviewResponse> => {
  const { data } = await axiosInstance.get("/admin/stripe/daily-overview/");
  return data;
};

// 2️⃣ Transaction Summary
export const getTransactionSummary =
  async (): Promise<TransactionSummaryResponse> => {
    const { data } = await axiosInstance.get("/admin/transactions/summary/");
    return data;
  };

// 3️⃣ Stripe Payments (Paginated)
export const getStripePayments = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<PaymentsResponse> => {
  const { data } = await axiosInstance.get("/admin/stripe/payments/", {
    params: { page, limit },
  });
  return data;
};

// 4️⃣ Delete User Financial
export const deleteUserFinancial = async (userId: number) => {
  const { data } = await axiosInstance.delete(
    `/admin/delete-user-financial/${userId}/`,
  );
  return data;
};

export const getUsersList = async (): Promise<UsersListResponse> => {
  const { data } = await axiosInstance.get("/users-list/");
  return data;
};

// SUBSCRIPTION RATIO
export const getSubscriptionRatio = async (): Promise<SubscriptionRatio> => {
  const { data } = await axiosInstance.get(`${ADMIN}/subscriptions/ratio/`);
  return data;
};

// STRIPE MONTHLY OVERVIEW
export const getStripeOverview = async <T extends Period>(
  period: T
): Promise<OverviewMap[T]> => {
  const { data } = await axiosInstance.get(
    `${ADMIN}/stripe/monthly-overview/?period=${period}`
  );

  return data;
};

export const getPaymentRatio = async (): Promise<PaymentRatio> => {
  const { data } = await axiosInstance.get(`${ADMIN}/dashboard/payment-ratio/`);
  return data;
};