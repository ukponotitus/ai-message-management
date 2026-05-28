import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";

export const useDashboard = () => {
  const metricsQuery = useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: dashboardService.getMetrics,
    refetchInterval: 30000,
  });

  const analyticsQuery = useQuery({
    queryKey: ["dashboard", "analytics"],
    queryFn: dashboardService.getAnalytics,
    refetchInterval: 60000,
  });

  const logsQuery = useQuery({
    queryKey: ["dashboard", "logs"],
    queryFn: dashboardService.getLogs,
    refetchInterval: 15000,
  });

  return {
    metrics: metricsQuery.data,
    analytics: analyticsQuery.data,
    logs: logsQuery.data,
    isLoading:
      metricsQuery.isLoading ||
      analyticsQuery.isLoading ||
      logsQuery.isLoading,
    isRefetching: metricsQuery.isRefetching || logsQuery.isRefetching,
    error:
      metricsQuery.error || analyticsQuery.error || logsQuery.error,
  };
};

export const useConversation = (phone: string | null) => {
  return useQuery({
    queryKey: ["dashboard", "conversation", phone],
    queryFn: () => dashboardService.getConversation(phone!),
    enabled: !!phone,
    refetchInterval: 10000,
  });
};