"use client";

import { Box, Container, Grid, Group, Text, Title, Card, Badge, Stack } from "@mantine/core";
import { IconMessage, IconRobot, IconUsers, IconClock } from "@tabler/icons-react";

const G = "#00C853";
const DK2 = "#111a14";

// Helper: format milliseconds
function formatMs(ms: number) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

// Stat card component (internal)
function StatCard({ label, value, sub, icon }: { label: string; value: string; sub: string; icon: React.ReactNode }) {
  return (
    <Card style={{ background: DK2, border: "0.5px solid rgba(255,255,255,0.07)" }} radius="md" p="lg">
      <Group justify="space-between" mb={8}>
        <Text fz={12} c="dimmed" style={{ letterSpacing: "0.5px", textTransform: "uppercase" }}>{label}</Text>
        <Box c={G}>{icon}</Box>
      </Group>
      <Text fz={28} fw={700} c="white" style={{ fontFamily: "Syne, sans-serif", lineHeight: 1 }}>{value}</Text>
      <Text fz={12} c="dimmed" mt={4}>{sub}</Text>
    </Card>
  );
}

// Horizontal bar row (internal)
function BarRow({ label, count, max, color = G }: { label: string; count: number; max: number; color?: string }) {
  const pct = Math.round((count / max) * 100);
  return (
    <Group gap={10} wrap="nowrap">
      <Text fz={13} c="dimmed" w={110} style={{ flexShrink: 0 }}>{label}</Text>
      <Box style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <Box style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4 }} />
      </Box>
      <Text fz={12} c="dimmed" w={24} ta="right">{count}</Text>
    </Group>
  );
}

interface Stats {
  messages_today: number;
  ai_replies: number;
  unique_contacts: number;
  avg_response_ms: number;
  reply_rate: number;
}

interface TopQuestion {
  topic: string;
  count: number;
}

interface StatusBreakdown {
  replied: number;
  failed: number;
  pending: number;
}

export function DashboardMetrics({
  stats,
  topQuestions,
  statusBreakdown,
}: {
  stats: Stats;
  topQuestions: TopQuestion[];
  statusBreakdown: StatusBreakdown;
}) {
  const maxQ = Math.max(...topQuestions.map((q) => q.count));
  const totalStatus = statusBreakdown.replied + statusBreakdown.failed + statusBreakdown.pending;

  return (
    <Stack gap={32}>
      {/* Stats row */}
      <Grid>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <StatCard label="Messages today" value={String(stats.messages_today)} sub="+12 from yesterday" icon={<IconMessage size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <StatCard label="AI replies sent" value={String(stats.ai_replies)} sub={`${stats.reply_rate}% success rate`} icon={<IconRobot size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <StatCard label="Unique contacts" value={String(stats.unique_contacts)} sub="this week" icon={<IconUsers size={18} />} />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <StatCard label="Avg response" value={formatMs(stats.avg_response_ms)} sub="last 24 hours" icon={<IconClock size={18} />} />
        </Grid.Col>
      </Grid>

      {/* Charts row */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card style={{ background: DK2, border: "0.5px solid rgba(255,255,255,0.07)" }} radius="md" p="xl">
            <Text fz={11} fw={700} c="green" mb={4} style={{ letterSpacing: "2px", textTransform: "uppercase" }}>Top questions asked</Text>
            <Stack gap={10} mt={16}>
              {topQuestions.map((q) => (
                <BarRow key={q.topic} label={q.topic} count={q.count} max={maxQ} />
              ))}
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card style={{ background: DK2, border: "0.5px solid rgba(255,255,255,0.07)" }} radius="md" p="xl">
            <Text fz={11} fw={700} c="green" mb={4} style={{ letterSpacing: "2px", textTransform: "uppercase" }}>Status breakdown</Text>
            <Stack gap={10} mt={16}>
              <BarRow label="Replied" count={statusBreakdown.replied} max={totalStatus} color={G} />
              <BarRow label="Failed" count={statusBreakdown.failed} max={totalStatus} color="#E24B4A" />
              <BarRow label="Pending" count={statusBreakdown.pending} max={totalStatus} color="#EF9F27" />
            </Stack>
            <Box style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", marginTop: 20, paddingTop: 16 }}>
              <Group gap={16}>
                {[
                  { label: "Replied", val: statusBreakdown.replied, color: G },
                  { label: "Failed", val: statusBreakdown.failed, color: "#E24B4A" },
                  { label: "Pending", val: statusBreakdown.pending, color: "#EF9F27" },
                ].map((s) => (
                  <Group key={s.label} gap={6}>
                    <Box style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                    <Text fz={12} c="dimmed">{s.label} <span style={{ color: "#e8f5e2" }}>{s.val}</span></Text>
                  </Group>
                ))}
              </Group>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}