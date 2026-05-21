"use client";

import { Stack, Text, Box, Loader, Center } from "@mantine/core";
import { useConversation } from "../../hooks/useDashboard";

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
    <Stack gap="sm" py="md">
      {data?.map((m, i) => (
        <Box
          key={i}
          style={{
            alignSelf: m.role === "user" ? "flex-start" : "flex-end",
            background: m.role === "user" ? "rgba(255,255,255,0.05)" : "rgba(0, 200, 83, 0.1)",
            padding: "10px 14px",
            borderRadius: "12px",
            border: m.role === "user" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0, 200, 83, 0.2)",
            maxWidth: "85%",
          }}
        >
          <Text fz={13} c="white" style={{ lineHeight: 1.5 }}>
            {m.content}
          </Text>
          <Text fz={10} c="dimmed" mt={4} ta={m.role === "user" ? "left" : "right"}>
            {m.time}
          </Text>
        </Box>
      ))}
      
      {data?.length === 0 && (
        <Text c="dimmed" fz="xs" ta="center">No messages found.</Text>
      )}
    </Stack>
  );
}