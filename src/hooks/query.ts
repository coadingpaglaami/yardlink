import { SubscriptionPlan } from "@/interfaces/subscripion";
import {
  AuthResponse,
  GetUsersParams,
  LoginCredentials,
  UserSummaryResponse,
} from "@/interfaces/user";
import { DeleteUser, Login, SuscriptionPlan, UserList } from "@/lib/axios";
import { setTokens } from "@/lib/cookies";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useLoginMutation = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginCredentials
> => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginCredentials) => {
      return Login(data);
    },
    onSuccess: (data) => {
      setTokens(data.token.access, data.token.refresh);
    },
  });
};

export const useGetUsersQuery = (
  params: GetUsersParams
): UseQueryResult<UserSummaryResponse, Error> => {
  return useQuery({
    queryKey: ["users", { ...params }],
    queryFn: () => UserList(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (userId: number) => {
      return DeleteUser(userId);
    },
  });
};

export const UseGetSubscriptionPlan = (): UseQueryResult<
  SubscriptionPlan[],
  Error
> => {
  return useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: () => SuscriptionPlan(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
