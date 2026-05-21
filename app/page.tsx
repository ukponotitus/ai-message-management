"use client";

import { Box, Container, Stack, Text, Center, Loader } from "@mantine/core";
import { DashboardHeader } from "./components/dashboard/DashboardHeader";
import { DashboardMetrics } from "./components/dashboard/DashboardMetrics";
import { MessageLogTable } from "./components/dashboard/MessageLogTable";
import { Metrics, Analytics, ApiMessageLog } from "./components/types/dto";
import { useDashboard } from "./hooks/useDashboard";
import { MessageLog, Stats } from "./components/types/interface";


// Helper: convert "1.4s" → 1400 (milliseconds)
function parseAvgResponseToMs(avgResponse: string): number {
  const match = avgResponse.match(/([\d.]+)(s|ms)/);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  return match[2] === "s" ? value * 1000 : value;
}

// Transform API data to component props
function transformToStats(metrics: Metrics | undefined, analytics: Analytics | undefined): Stats {
  const defaultStats = {
    messages_today: 0,
    ai_replies: 0,
    unique_contacts: 0,
    avg_response_ms: 0,
    reply_rate: 0,
  };

  if (!metrics) return defaultStats;

  const sent = analytics?.status_breakdown?.sent || 0;
  const failed = analytics?.status_breakdown?.failed || 0;
  const total = sent + failed;
  
  return {
    messages_today: metrics.messages_today,
    ai_replies: sent,
    unique_contacts: metrics.unique_contacts,
    avg_response_ms: parseAvgResponseToMs(metrics.avg_response),
    reply_rate: total > 0 ? Math.round((sent / total) * 100) : 100,
  };
}


function transformTopQuestions(analytics: Analytics | undefined) {
  if (!analytics) return [];
  return analytics.top_questions.map((q) => ({
    topic: q.label,   // API uses "label", component uses "topic"
    count: q.count,
  }));
}

function transformStatusBreakdown(analytics: Analytics | undefined) {
  if (!analytics) return { replied: 0, failed: 0, pending: 0 };
  return {
    replied: analytics.status_breakdown.sent,
    failed: analytics.status_breakdown.failed,
    pending: 0,        // API doesn't have pending; adjust if needed
  };
}

function transformMessages(apiLogs: ApiMessageLog[] | undefined): MessageLog[] {
  if (!apiLogs) return [];
  return apiLogs.map((log, idx) => ({
    id: idx,
    phone: log.phone,
    name: log.name || "Unknown",
    incoming: log.message,    // Corrected: matches ApiMessageLog
    reply: log.ai_reply,      // Corrected: matches ApiMessageLog
    status: log.status === "sent" ? "replied" : "failed",
    created_at: log.time,
  }));
}

const DK = "#0A0F0D";

export default function AdminDashboard() {
  const { metrics, analytics, logs, isLoading, isRefetching, error } = useDashboard();

  if (isLoading) {
    return (
      <Box style={{ background: DK, minHeight: "100vh" }}>
        <Center style={{ height: "100vh" }}>
          <Loader color="green" size="lg" />
        </Center>
      </Box>
    );
  }

  if (error) {
  return (
    <Box style={{ background: DK, minHeight: "100vh", color: "#e8f5e2" }}>
      <Center style={{ height: "100vh" }}>
        <Stack align="center">
          <Text c="red">Connection Error</Text>
          {/* Use optional chaining because error might be a generic Error object */}
          <Text size="xs" c="dimmed">{(error as any)?.message || "Check backend connection"}</Text>
        </Stack>
      </Center>
    </Box>
  );
}

  const stats = transformToStats(metrics, analytics);
  const topQuestions = transformTopQuestions(analytics);
  const statusBreakdown = transformStatusBreakdown(analytics);
  const messages = transformMessages(logs);

  return (
    <Box style={{ background: DK, minHeight: "100vh", color: "#e8f5e2" }}>
      <DashboardHeader
        lastUpdated={new Date()}
        loading={isRefetching}
        onRefresh={() => {
          // If you want manual refresh, you can use queryClient.refetchQueries()
          // For simplicity, we'll rely on auto-refetch intervals
        }}
      />
      <Container size="lg" py="xl">
        <Stack gap={32}>
          <DashboardMetrics
            stats={stats}
            topQuestions={topQuestions}
            statusBreakdown={statusBreakdown}
          />
          <MessageLogTable messages={messages} />
        </Stack>
      </Container>

      <Box style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)", padding: "20px 0", marginTop: 40 }}>
        <Container size="lg">
          <Stack justify="space-between" style={{ flexDirection: "row" }}>
            <Text fz={12} c="dimmed">Automate NG Admin · Internal use only</Text>
            <Text fz={12} c="dimmed">Auto-refreshes every 15-30s</Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}