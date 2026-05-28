"use client";

import { useState } from "react";
import { Grid, Card, Text, Box, Button, Stack, Badge } from "@mantine/core";
import {
  IconBrandWhatsapp, IconBrain, IconCreditCard,
  IconTable, IconMail, IconShoppingBag, IconCircleCheck,
} from "@tabler/icons-react";
import { Integration } from "../components/types/interface";
import { MOCK_INTEGRATIONS } from "../components/const/mockdata";


const ICONS: Record<string, React.ReactNode> = {
  "brand-whatsapp": <IconBrandWhatsapp size={22} />,
  "brain":          <IconBrain         size={22} />,
  "credit-card":    <IconCreditCard    size={22} />,
  "table":          <IconTable         size={22} />,
  "mail":           <IconMail          size={22} />,
  "shopping-bag":   <IconShoppingBag   size={22} />,
};

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(MOCK_INTEGRATIONS);

  const toggle = (id: string) => {
    // TODO: await fetch(`/api/integrations/${id}/toggle`, { method: 'PATCH' })
    setIntegrations((prev) => prev.map((i) => i.id === id ? { ...i, connected: !i.connected } : i));
  };

  return (
    <Stack gap={20}>
      <Text fz={12} c="dimmed">
        {integrations.filter((i) => i.connected).length} of {integrations.length} services connected
      </Text>
      <Grid>
        {integrations.map((int) => (
          <Grid.Col key={int.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4", height: "100%" }} radius="md" p="lg">
              <Stack gap={12} align="center" style={{ textAlign: "center" }}>
                <Box
                  style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: `${int.color}18`, color: int.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {ICONS[int.icon]}
                </Box>
                <Box>
                  <Text fz={13} fw={500} style={{ color: "#1a2e1a" }}>{int.name}</Text>
                  <Text fz={12} c="dimmed" mt={2}>{int.description}</Text>
                </Box>
                {int.connected && (
                  <Badge color="green" variant="light" size="sm" leftSection={<IconCircleCheck size={12} />}>
                    Connected
                  </Badge>
                )}
                <Button
                  variant={int.connected ? "outline" : "filled"}
                  color={int.connected ? "red" : "green"}
                  size="xs"
                  fullWidth
                  onClick={() => toggle(int.id)}
                >
                  {int.connected ? "Disconnect" : "Connect"}
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}