"use client";

import { Stack, Text, Box, Loader, Center } from "@mantine/core";
import { useConversation } from "../../hooks/useDashboard";

const G = "#00C853";

export function ConversationHistory({ phone }: { phone: string }) {
  const { data, isLoading, error } = useConversation(phone);

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader color="green" size="sm" />
      </Center>
    );
  }

  if (error) {
    return <Text c="red" fz="xs">Failed to load conversation.</Text>;
  }

  return (
    <Stack gap="sm" py="md" style={{ display: "flex", flexDirection: "column" }}>
      {data?.map((m, i) => (
        <Box
          key={i}
          style={{
            alignSelf: m.role === "user" ? "flex-start" : "flex-end",
            // light-theme bubbles
            background: m.role === "user" ? "#f4f6f4" : "#e8f8ee",
            padding: "10px 14px",
            borderRadius: m.role === "user" ? "12px 12px 12px 2px" : "12px 12px 2px 12px",
            border: m.role === "user" ? "0.5px solid #d4e8d4" : `0.5px solid ${G}40`,
            maxWidth: "85%",
          }}
        >
          <Text fz={13} style={{ color: "#1a2e1a", lineHeight: 1.5 }}>
            {m.content}
          </Text>
          <Text
            fz={10}
            c="dimmed"
            mt={4}
            ta={m.role === "user" ? "left" : "right"}
            style={{ color: m.role === "assistant" ? G : undefined }}
          >
            {m.role === "assistant" ? `AI · ${m.time}` : m.time}
          </Text>
        </Box>
      ))}

      {data?.length === 0 && (
        <Text c="dimmed" fz="xs" ta="center">No messages found.</Text>
      )}
    </Stack>
  );
}