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
  SubscriptionResponse,
} from "@/interfaces/subscripion";
import { number } from "framer-motion";

const FORM_DATA_HEADERS = {
  "Content-Type": "multipart/form-data",
};

const ADMIN = "admin";

export const Login = async (
  payload: LoginCredentials
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("login/", payload, {
    headers: FORM_DATA_HEADERS,
  });
  return data;
};

export const UserList = async (
  params: GetUsersParams
): Promise<UserSummaryResponse> => {
  const { data } = await axiosInstance.get("users-list/", { params });
  return data;
};

export const DeleteUser = async (userId: number): Promise<void> => {
  return await axiosInstance.delete(`${ADMIN}/delete-user/${userId}/`);
};

export const SuscriptionPlan = async (): Promise<SubscriptionPlan[]> => {
  const { data } = await axiosInstance.get("plans/");
  return data;
};

export const CreateSubscriptionPlan = async (
  payload: Pick<
    SubscriptionPlan,
    "name" | "description" | "price" | "discount" | "duration"
  >
): Promise<SubscriptionPlan> => {
  const { data } = await axiosInstance.post("plans", payload);
  return data;
};

export const DeletePlan = (planId: number): Promise<void> => {
  return axiosInstance.delete(`plans/${planId}/delete`);
};

export const DeleteSubscriptionPlan = (
  subscripitonId: number
): Promise<void> => {
  return axiosInstance.delete(`subscriptions/${subscripitonId}/delete`);
};

export const ListOfSubscriptions = async (
  params: SubscriptionParams
): Promise<SubscriptionResponse> => {
  const { data } = await axiosInstance.get(`${ADMIN}/subscriptions/`, { params });
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
