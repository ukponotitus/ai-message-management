"use client";

import { Grid, Card, Text, Group, Box, Stack, Loader, Center } from "@mantine/core";
import { IconMessage, IconRobot, IconUsers, IconClock } from "@tabler/icons-react";
import { Metrics, Analytics, ApiMessageLog } from "../components/types/dto";
import { DashboardStats, TopQuestion, StatusBreakdown } from "../components/types/interface";
import { useDashboard } from "../hooks/useDashboard";


const G = "#00C853";


function parseAvgResponseToMs(avgResponse: string): number {
  const match = avgResponse.match(/([\d.]+)(s|ms)/);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  return match[2] === "s" ? value * 1000 : value;
}

function toStats(metrics?: Metrics, analytics?: Analytics): DashboardStats {
  if (!metrics) return { messages_today: 0, ai_replies: 0, unique_contacts: 0, avg_response_ms: 0, reply_rate: 0 };
  const sent   = analytics?.status_breakdown?.sent   ?? 0;
  const failed = analytics?.status_breakdown?.failed ?? 0;
  const total  = sent + failed;
  return {
    messages_today:   metrics.messages_today,
    ai_replies:       sent,
    unique_contacts:  metrics.unique_contacts,
    avg_response_ms:  parseAvgResponseToMs(metrics.avg_response),
    reply_rate:       total > 0 ? Math.round((sent / total) * 100) : 100,
  };
}

function toTopQuestions(analytics?: Analytics): TopQuestion[] {
  return analytics?.top_questions.map((q) => ({ topic: q.label, count: q.count })) ?? [];
}

function toStatusBreakdown(analytics?: Analytics): StatusBreakdown {
  return {
    replied: analytics?.status_breakdown.sent   ?? 0,
    failed:  analytics?.status_breakdown.failed ?? 0,
    pending: 0,
  };
}

function formatMs(ms: number) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub: string; icon: React.ReactNode }) {
  return (
    <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p="lg">
      <Group justify="space-between" mb={8}>
        <Text fz={11} c="dimmed" style={{ letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</Text>
        <Box style={{ color: G }}>{icon}</Box>
      </Group>
      <Text fz={28} fw={700} style={{ color: "#1a2e1a", lineHeight: 1 }}>{value}</Text>
      <Text fz={12} style={{ color: G }} mt={4}>{sub}</Text>
    </Card>
  );
}

function BarRow({ label, count, max, color = G }: { label: string; count: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <Group gap={10} wrap="nowrap" mb={8}>
      <Text fz={12} c="dimmed" w={100} style={{ flexShrink: 0 }}>{label}</Text>
      <Box style={{ flex: 1, height: 8, background: "#eef4ee", borderRadius: 4, overflow: "hidden" }}>
        <Box style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4 }} />
      </Box>
      <Text fz={12} c="dimmed" w={28} ta="right">{count}</Text>
    </Group>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  const { metrics, analytics, logs, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <Center style={{ height: 400 }}>
        <Loader color="green" size="md" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: 400 }}>
        <Stack align="center" gap={4}>
          <Text c="red" fw={500}>Connection Error</Text>
          <Text fz={12} c="dimmed">{(error as any)?.message ?? "Check backend connection"}</Text>
        </Stack>
      </Center>
    );
  }

  const stats         = toStats(metrics, analytics);
  const topQuestions  = toTopQuestions(analytics);
  const breakdown     = toStatusBreakdown(analytics);
  const maxQ          = Math.max(...topQuestions.map((q) => q.count), 1);
  const totalStatus   = breakdown.replied + breakdown.failed + breakdown.pending;

  // Recent conversations from real logs
  const recentLogs: ApiMessageLog[] = logs?.slice(0, 4) ?? [];

  return (
    <Stack gap={24}>
      {/* Stat cards */}
      <Grid>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <StatCard label="Messages today"  value={String(stats.messages_today)}  sub={`+${metrics?.diff_yesterday ?? 0} from yesterday`} icon={<IconMessage size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <StatCard label="AI replies sent" value={String(stats.ai_replies)}      sub={`${stats.reply_rate}% success rate`}               icon={<IconRobot   size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <StatCard label="Unique contacts" value={String(stats.unique_contacts)} sub="this week"                                         icon={<IconUsers   size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <StatCard label="Avg response"    value={formatMs(stats.avg_response_ms)} sub="last 24 hours"                                   icon={<IconClock   size={18} />} />
        </Grid.Col>
      </Grid>

      {/* Charts row */}
      <Grid>
        {/* Recent conversations from API */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p="xl">
            <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={16}>
              Recent conversations
            </Text>
            <Stack gap={0}>
              {recentLogs.length === 0 ? (
                <Text fz={12} c="dimmed" ta="center" py="md">No recent conversations</Text>
              ) : (
                recentLogs.map((log, i) => (
                  <Group
                    key={i}
                    gap={12}
                    py={10}
                    style={{ borderBottom: i < recentLogs.length - 1 ? "0.5px solid #eef4ee" : "none" }}
                  >
                    <Box
                      style={{
                        width: 36, height: 36,
                        background: "#e8f8ee", borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: G, fontWeight: 700, fontSize: 13, flexShrink: 0,
                      }}
                    >
                      {(log.name ?? "?")[0].toUpperCase()}
                    </Box>
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Text fz={13} fw={500} style={{ color: "#1a2e1a" }}>{log.name || "Unknown"}</Text>
                      <Text fz={12} c="dimmed" truncate>{log.message}</Text>
                    </Box>
                    <Text fz={11} c="dimmed" style={{ flexShrink: 0 }}>{log.time}</Text>
                  </Group>
                ))
              )}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Top questions from API analytics */}
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p="xl">
            <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={16}>
              Top questions asked
            </Text>
            {topQuestions.length === 0 ? (
              <Text fz={12} c="dimmed" ta="center" py="md">No data yet</Text>
            ) : (
              topQuestions.map((q) => (
                <BarRow key={q.topic} label={q.topic} count={q.count} max={maxQ} />
              ))
            )}

            <Box style={{ borderTop: "0.5px solid #eef4ee", marginTop: 20, paddingTop: 16 }}>
              <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={12}>
                Status breakdown
              </Text>
              <BarRow label="Replied" count={breakdown.replied} max={totalStatus || 1} color={G}        />
              <BarRow label="Failed"  count={breakdown.failed}  max={totalStatus || 1} color="#E24B4A"  />
              <BarRow label="Pending" count={breakdown.pending} max={totalStatus || 1} color="#EF9F27"  />
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}