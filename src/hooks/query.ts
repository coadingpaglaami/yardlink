import { MessageParams } from "@/interfaces/message";
import {
  SubscriptionParams,
  SubscriptionPlan,
  SubscriptionPlanResponse,
  SubscriptionResponse,
} from "@/interfaces/subscripion";
import {
  AuthResponse,
  GetUsersParams,
  LoginCredentials,
  UserSummaryResponse,
} from "@/interfaces/user";
import { Period } from "@/interfaces/user.type";
import {
  AllMessages,
  CreateSubscriptionPlan,
  DeleteMessage,
  DeletePlan,
  DeleteSubscriptionPlan,
  DeleteUser,
  deleteUserFinancial,
  ExetendSubscription,
  getDailyOverview,
  getPaymentRatio,
  getStripeOverview,
  getStripePayments,
  getSubscriptionRatio,
  getTransactionSummary,
  getUsersList,
  ListOfSubscriptions,
  Login,
  PauseUser,
  Reply,
  SuscriptionPlan,
  UserList,
} from "@/lib/axios";
import { setTokens } from "@/lib/cookies";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

// Auth //
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

// Users //
export const useGetUsersQuery = (
  params: GetUsersParams,
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

export const usePauseUserMutation = () => {
  return useMutation({
    mutationKey: ["pauseUser"],
    mutationFn: ({ userId, action }: { userId: number; action: string }) => {
      return PauseUser(userId, action);
    },
  });
};
// Subscriptions //
export const UseGetSubscriptionPlan = (): UseQueryResult<
  SubscriptionPlanResponse,
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
      >,
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
  params: SubscriptionParams,
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

// Messages //

export const useAllMessagesQuery = (params: MessageParams) => {
  return useQuery({
    queryKey: ["allMessages", { ...params }],
    queryFn: () => AllMessages(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useReplyMutation = () => {
  return useMutation({
    mutationKey: ["replyMessage"],
    mutationFn: ({
      messageId,
      admin_reply,
    }: {
      messageId: number;
      admin_reply: string;
    }) => {
      return Reply({ messageId, admin_reply });
    },
  });
};

export const useDeleteMessageMutation = () => {
  return useMutation({
    mutationKey: ["deleteMessage"],
    mutationFn: (messageId: number) => {
      return DeleteMessage(messageId);
    },
  });
};

export const useDailyOverview = () => {
  return useQuery({
    queryKey: ["admin", "daily-overview"],
    queryFn: () => getDailyOverview(),
  });
};

/* =========================
   TRANSACTION SUMMARY
========================= */

export const useGetTransactionSummary = () => {
  return useQuery({
    queryKey: ["admin", "transaction-summary"],
    queryFn: getTransactionSummary,
  });
};

/* =========================
   STRIPE PAYMENTS
========================= */

export const useGetStripePayments = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["admin", "stripe-payments", { page, limit }],
    queryFn: () => getStripePayments({ page, limit }),
  });
};

/* =========================
   DELETE USER FINANCIAL
========================= */

export const useDeleteUserFinancial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserFinancial,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "stripe-payments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "daily-overview"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "transaction-summary"],
      });
    },
  });
};

export const useGetUsersList = () => {
  return useQuery({
    queryKey: ["users-list"],
    queryFn: getUsersList,
  });
};

// SUBSCRIPTION RATIO
export const useGetSubscriptionRatio = () => {
  return useQuery({
    queryKey: ["subscription-ratio"],
    queryFn: getSubscriptionRatio,
  });
};

// STRIPE MONTHLY OVERVIEW
export const useGetStripeOverview = <T extends Period>(period: T) => {
  return useQuery({
    queryKey: ["stripe-overview", period],
    queryFn: () => getStripeOverview(period),
  });
};

export const usePaymentRatio = () => {
  return useQuery({
    queryKey: ["payment-ratio"],
    queryFn: getPaymentRatio,
  })
}