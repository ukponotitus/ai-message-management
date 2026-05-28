"use client";

import { Box, Group, Text, Badge, Loader, Button } from "@mantine/core";
import { IconRefresh, IconPlus } from "@tabler/icons-react";

const G = "#00C853";

const PAGE_TITLES: Record<string, string> = {
  overview:      "Overview",
  conversations: "Conversations",
  leads:         "Leads",
  broadcasts:    "Broadcasts",
  flows:         "Flows",
  integrations:  "Integrations",
  analytics:     "Analytics",
  settings:      "Settings",
};

interface TopbarProps {
  activePage: string;
  lastUpdated: Date;
  loading: boolean;
  onRefresh: () => void;
  onNewBroadcast: () => void;
}

export function Topbar({ activePage, lastUpdated, loading, onRefresh, onNewBroadcast }: TopbarProps) {
  return (
    <Box
      style={{
        background: "#fff",
        borderBottom: "0.5px solid #d4e8d4",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Text fz={15} fw={500} style={{ color: "#1a2e1a" }}>
        {PAGE_TITLES[activePage] ?? "Overview"}
      </Text>

      <Group gap={12}>
        <Text fz={12} c="dimmed">
          Updated {lastUpdated.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}
        </Text>
        <Badge color="green" variant="dot" size="sm">Live</Badge>
        <Button
          variant="outline"
          color="green"
          size="xs"
          leftSection={loading ? <Loader size={11} color="green" /> : <IconRefresh size={13} />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
        <Button
          color="green"
          size="xs"
          leftSection={<IconPlus size={13} />}
          onClick={onNewBroadcast}
        >
          New Broadcast
        </Button>
      </Group>
    </Box>
  );
}