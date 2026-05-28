"use client";

import { Grid, Card, Text, Box, Group, Stack } from "@mantine/core";
import { ANALYTICS_WEEKLY, TOP_QUESTIONS_MOCK } from "../components/const/mockdata";

const G = "#00C853";

function BarChart({ data, max, color = G }: { data: number[]; max: number; color?: string }) {
  return (
    <Box style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, padding: "0 4px" }}>
      {data.map((v, i) => (
        <Box
          key={i}
          title={String(v)}
          style={{
            flex: 1, minWidth: 0,
            height: `${Math.round((v / max) * 100)}%`,
            background: color, borderRadius: "4px 4px 0 0", opacity: 0.85,
          }}
        />
      ))}
    </Box>
  );
}

function Labels({ items }: { items: string[] }) {
  return (
    <Box style={{ display: "flex", gap: 6, marginTop: 6, padding: "0 4px" }}>
      {items.map((l, i) => (
        <Box key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#9ab09a" }}>{l}</Box>
      ))}
    </Box>
  );
}

function BarRow({ label, count, max, color = G }: { label: string; count: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <Group gap={10} wrap="nowrap" mb={10}>
      <Text fz={12} c="dimmed" w={70} style={{ flexShrink: 0 }}>{label}</Text>
      <Box style={{ flex: 1, height: 8, background: "#eef4ee", borderRadius: 4, overflow: "hidden" }}>
        <Box style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4 }} />
      </Box>
      <Text fz={12} c="dimmed" w={28} ta="right">{count}</Text>
    </Group>
  );
}

export function AnalyticsPage() {
  const maxMsg  = Math.max(...ANALYTICS_WEEKLY.messages);
  const maxResp = Math.max(...ANALYTICS_WEEKLY.response_times);
  const maxQ    = Math.max(...TOP_QUESTIONS_MOCK.map((q) => q.count));

  return (
    <Stack gap={24}>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p="xl">
            <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={16}>
              Messages this week
            </Text>
            <BarChart data={ANALYTICS_WEEKLY.messages} max={maxMsg} />
            <Labels items={ANALYTICS_WEEKLY.days} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p="xl">
            <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={16}>
              Response time trend (s)
            </Text>
            <BarChart data={ANALYTICS_WEEKLY.response_times} max={maxResp} color="#4fc3f7" />
            <Labels items={ANALYTICS_WEEKLY.days} />
          </Card>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p="xl">
            <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={16}>
              Top questions
            </Text>
            {TOP_QUESTIONS_MOCK.map((q) => (
              <BarRow key={q.topic} label={q.topic} count={q.count} max={maxQ} />
            ))}
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p="xl">
            <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={16}>
              Status breakdown
            </Text>
            <BarRow label="Replied" count={43} max={48} color={G}        />
            <BarRow label="Failed"  count={5}  max={48} color="#e74c3c"  />
            <BarRow label="Pending" count={0}  max={48} color="#f39c12"  />
            <Box style={{ borderTop: "0.5px solid #eef4ee", marginTop: 20, paddingTop: 16 }}>
              <Group gap={24}>
                {[
                  { label: "Reply rate",     value: "97%",   color: G        },
                  { label: "Avg response",   value: "1.8s",  color: "#1a2e1a" },
                  { label: "Total messages", value: "2,453", color: "#1a2e1a" },
                ].map((s) => (
                  <Stack key={s.label} gap={0}>
                    <Text fz={24} fw={600} style={{ color: s.color }}>{s.value}</Text>
                    <Text fz={11} c="dimmed">{s.label}</Text>
                  </Stack>
                ))}
              </Group>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}