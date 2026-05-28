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
  { label: "Leads",         icon: IconUsers,        id: "leads"         },
  { label: "Broadcasts",    icon: IconSpeakerphone, id: "broadcasts"    },
  { label: "Flows",         icon: IconGitBranch,    id: "flows"         },
  { label: "Integrations",  icon: IconPlug,         id: "integrations"  },
  { label: "Analytics",     icon: IconChartBar,     id: "analytics"     },
  { label: "Settings",      icon: IconSettings,     id: "settings"      },
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
              leftSection={<item.icon size={17} />}
              active={active}
              onClick={() => onNavigate(item.id)}
              styles={{
                root: {
                  borderRadius: 8,
                  fontSize: 13,
                  color: active ? "#00843a" : "#4a6a4a",
                  fontWeight: active ? 500 : 400,
                  background: active ? "#e8f8ee" : "transparent",
                  "&:hover": { background: "#f0faf0" },
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