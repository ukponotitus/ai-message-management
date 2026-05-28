"use client";

import { useState } from "react";
import { Stack, Group, Text, Box, Button, Switch, Badge } from "@mantine/core";
import {
  IconUserPlus, IconPackage, IconHeadset,
  IconTag, IconStar, IconShoppingCart, IconPlus,
} from "@tabler/icons-react";
import { MOCK_FLOWS } from "../components/const/mockdata";
import { Flow } from "../components/types/interface";


const ICONS: Record<string, React.ReactNode> = {
  "user-plus":     <IconUserPlus    size={18} />,
  "package":       <IconPackage     size={18} />,
  "headset":       <IconHeadset     size={18} />,
  "tag":           <IconTag         size={18} />,
  "star":          <IconStar        size={18} />,
  "shopping-cart": <IconShoppingCart size={18} />,
};

export default function FlowsPage() {
  const [flows, setFlows] = useState<Flow[]>(MOCK_FLOWS);

  const toggle = (id: number) => {
    // TODO: await fetch(`/api/flows/${id}/toggle`, { method: 'PATCH' })
    setFlows((prev) => prev.map((f) => f.id === id ? { ...f, active: !f.active } : f));
  };

  return (
    <Stack gap={20}>
      <Group justify="space-between">
        <Stack gap={2}>
          <Text fz={14} fw={500} style={{ color: "#1a2e1a" }}>
            {flows.filter((f) => f.active).length} active flows
          </Text>
          <Text fz={12} c="dimmed">Toggle to enable or disable a flow</Text>
        </Stack>
        <Button color="green" size="xs" leftSection={<IconPlus size={13} />}>New flow</Button>
      </Group>

      <Stack gap={10}>
        {flows.map((flow) => (
          <Box
            key={flow.id}
            style={{
              background: "#fff",
              border: "0.5px solid #d4e8d4",
              borderRadius: 12,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              cursor: "pointer",
            }}
          >
            <Box
              style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: flow.active ? "#e8f8ee" : "#f4f6f4",
                color:      flow.active ? "#00843a" : "#9ab09a",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {ICONS[flow.icon]}
            </Box>

            <Box style={{ flex: 1 }}>
              <Group gap={8} mb={2}>
                <Text fz={13} fw={500} style={{ color: "#1a2e1a" }}>{flow.name}</Text>
                {!flow.active && <Badge size="xs" color="gray" variant="light">Inactive</Badge>}
              </Group>
              <Text fz={12} c="dimmed">{flow.description}</Text>
            </Box>

            <Text fz={12} c="dimmed" style={{ flexShrink: 0 }}>
              {flow.triggers.toLocaleString()} triggers
            </Text>

            <Switch
              checked={flow.active}
              onChange={() => toggle(flow.id)}
              color="green"
              size="md"
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}