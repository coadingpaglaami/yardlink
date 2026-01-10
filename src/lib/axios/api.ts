import {
  AuthResponse,
  GetUsersParams,
  LoginCredentials,
  UserSummaryResponse,
} from "@/interfaces/user";
import { axiosInstance } from "./axios.instance";
import { SubscriptionPlan } from "@/interfaces/subscripion";

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

export const SuscriptionPlan = async ():Promise<SubscriptionPlan[]>=>{
  const { data } = await axiosInstance.get("plans/");
  return data;
}