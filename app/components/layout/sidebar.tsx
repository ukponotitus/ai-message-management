"use client";

import { Box, NavLink, Text, Group, Stack, Badge } from "@mantine/core";
import {
  IconHome, IconMessage, IconUsers, IconSpeakerphone,
  IconGitBranch, IconPlug, IconChartBar, IconSettings,
} from "@tabler/icons-react";

const G = "#00C853";

const NAV_ITEMS = [
  { label: "Overview",      icon: IconHome,         id: "overview"      },
  { label: "Conversations", icon: IconMessage,      id: "conversations" },
  { label: "Leads",         icon: IconUsers,        id: "leads",         disabled: true },
  { label: "Broadcasts",    icon: IconSpeakerphone, id: "broadcasts",    disabled: true },
  { label: "Flows",         icon: IconGitBranch,    id: "flows",         disabled: true },
  { label: "Integrations",  icon: IconPlug,         id: "integrations",  disabled: true },
  { label: "Analytics",     icon: IconChartBar,     id: "analytics",     disabled: true },
  { label: "Settings",      icon: IconSettings,     id: "settings",      disabled: true },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <Box
      style={{
        width: 220,
        background: "#fff",
        borderRight: "0.5px solid #d4e8d4",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <Group gap={8} p={16} style={{ borderBottom: "0.5px solid #d4e8d4" }}>
        <Box
          style={{
            width: 32, height: 32,
            background: G, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 14,
          }}
        >
          A
        </Box>
        <Text fw={700} fz={15} style={{ color: "#1a2e1a" }}>
          Automate<span style={{ color: G }}>NG</span>
        </Text>
      </Group>

      {/* Nav items */}
      <Stack gap={2} p={8} style={{ flex: 1, overflowY: "auto" }}>
      {NAV_ITEMS.map((item) => {
  const active = activePage === item.id;
  return (
    <NavLink
      key={item.id}
      label={item.label}
      leftSection={
        <item.icon size={17} style={{ opacity: item.disabled ? 0.35 : 1 }} />
      }
      active={active}
      disabled={item.disabled}
      onClick={() => !item.disabled && onNavigate(item.id)}
      styles={{
        root: {
          borderRadius: 8,
          fontSize: 13,
          color: item.disabled ? "#b0c4b0" : active ? "#00843a" : "#4a6a4a",
          fontWeight: active ? 500 : 400,
          background: active ? "#e8f8ee" : "transparent",
          cursor: item.disabled ? "not-allowed" : "pointer",
          opacity: item.disabled ? 0.5 : 1,
          "&:hover": { background: item.disabled ? "transparent" : "#f0faf0" },
        },
      }}
    />
  );
})}
      </Stack>

      {/* Footer */}
      <Box p={16} style={{ borderTop: "0.5px solid #d4e8d4" }}>
        <Badge color="green" variant="dot" size="sm">Live</Badge>
        <Text fz={11} c="dimmed" mt={6}>Auto-refreshes every 30s</Text>
      </Box>
    </Box>
  );
}