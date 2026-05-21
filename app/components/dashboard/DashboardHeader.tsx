"use client";

import { Box, Container, Group, Text, Badge, Loader } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

const G = "#00C853";

export function DashboardHeader({
  lastUpdated,
  loading,
  onRefresh,
}: {
  lastUpdated: Date;
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <Box
      style={{
        borderBottom: "0.5px solid rgba(0,200,83,0.12)",
        padding: "14px 0",
        background: "rgba(10,15,13,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container size="lg">
        <Group justify="space-between">
          <Group gap={8}>
            <Text fw={800} fz={16} style={{ fontFamily: "Syne, sans-serif" }}>
              Automate<span style={{ color: G }}>NG</span>
            </Text>
            <Text fz={13} c="dimmed">/ Admin</Text>
          </Group>
          <Group gap={12}>
            <Text fz={12} c="dimmed">
              Updated {lastUpdated.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}
            </Text>
            <Badge color="green" variant="dot" size="sm">Live</Badge>
            <Box
              component="button"
              onClick={onRefresh}
              style={{
                background: "none",
                border: "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "5px 10px",
                cursor: "pointer",
                color: "#7a9b7e",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {loading ? <Loader size={12} color="green" /> : <IconRefresh size={14} />}
              <Text fz={12}>Refresh</Text>
            </Box>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}