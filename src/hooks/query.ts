import {
  SubscriptionParams,
  SubscriptionPlan,
  SubscriptionResponse,
} from "@/interfaces/subscripion";
import {
  AuthResponse,
  GetUsersParams,
  LoginCredentials,
  UserSummaryResponse,
} from "@/interfaces/user";
import {
  CreateSubscriptionPlan,
  DeletePlan,
  DeleteSubscriptionPlan,
  DeleteUser,
  ExetendSubscription,
  ListOfSubscriptions,
  Login,
  SuscriptionPlan,
  UserList,
} from "@/lib/axios";
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

export const UseCreateSubscriptionPlan = (): UseMutationResult<
  SubscriptionPlan,
  Error,
  Pick<
    SubscriptionPlan,
    "name" | "description" | "price" | "discount" | "duration"
  >
> => {
  return useMutation({
    mutationKey: ["createSubscriptionPlan"],
    mutationFn: (
      data: Pick<
        SubscriptionPlan,
        "name" | "description" | "price" | "discount" | "duration"
      >
    ) => {
      return CreateSubscriptionPlan(data);
    },
  });
};

export const useDeletePlanMutation = () => {
  return useMutation({
    mutationKey: ["deletePlan"],
    mutationFn: (planId: number) => {
      return DeletePlan(planId);
    },
  });
};

export const useDeleteSubscriptionPlanMutation = () => {
  return useMutation({
    mutationKey: ["deleteSubscriptionPlan"],
    mutationFn: (subscriptionId: number) => {
      return DeleteSubscriptionPlan(subscriptionId);
    },
  });
};

export const useListOfSubscriptionsQuery = (
  params: SubscriptionParams
): UseQueryResult<SubscriptionResponse, Error> => {
  return useQuery({
    queryKey: ["subscriptions", { ...params }],
    queryFn: () => ListOfSubscriptions(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useExtendSubscriptionMutation = () => {
  return useMutation({
    mutationKey: ["extendSubscription"],
    mutationFn: ({ userId, days }: { userId: number; days: number }) => {
      return ExetendSubscription({ userId, days });
    },
  });
};
