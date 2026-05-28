"use client";

import { useState } from "react";
import {
  Stack, Card, Text, Group, Badge, Button, Select,
  Textarea, Table, ScrollArea, Box, TextInput, Notification,
} from "@mantine/core";
import { IconSend, IconCircleCheck } from "@tabler/icons-react";
import { MOCK_BROADCASTS } from "../components/const/mockdata";

const STATUS = {
  delivered: { color: "green",  label: "Delivered" },
  partial:   { color: "yellow", label: "Partial"   },
  failed:    { color: "red",    label: "Failed"     },
} as const;

const G = "#00C853";

export default function BroadcastsPage() {
  const [message,  setMessage]  = useState("");
  const [audience, setAudience] = useState<string | null>("all");
  const [schedule, setSchedule] = useState("");
  const [sent,     setSent]     = useState(false);

  const handleSend = async () => {
    // TODO: Replace with real API call
    // await fetch('/api/broadcasts', {
    //   method: 'POST',
    //   body: JSON.stringify({ message, audience, schedule }),
    // });
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <Stack gap={24}>
      {sent && (
        <Notification icon={<IconCircleCheck size={18} />} color="green" title="Broadcast sent!" onClose={() => setSent(false)}>
          Your message is being delivered to the selected audience.
        </Notification>
      )}

      {/* Compose */}
      <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p="xl">
        <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={16}>
          New broadcast
        </Text>
        <Stack gap={14}>
          <Select
            label="Audience"
            value={audience}
            onChange={setAudience}
            data={[
              { value: "all",      label: "All contacts (1,204)" },
              { value: "hot",      label: "Hot leads (87)"        },
              { value: "orders",   label: "Recent orders (340)"   },
              { value: "inactive", label: "Inactive users (312)"  },
            ]}
            styles={{ label: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", color: "#4a6a4a" }, input: { border: "0.5px solid #d4e8d4" } }}
          />
          <Textarea
            label="Message"
            placeholder="Type your broadcast message…"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            minRows={3}
            styles={{ label: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", color: "#4a6a4a" }, input: { border: "0.5px solid #d4e8d4" } }}
          />
          <TextInput
            label="Schedule (optional)"
            type="datetime-local"
            value={schedule}
            onChange={(e) => setSchedule(e.currentTarget.value)}
            styles={{ label: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", color: "#4a6a4a" }, input: { border: "0.5px solid #d4e8d4" } }}
          />
          <Button color="green" leftSection={<IconSend size={14} />} onClick={handleSend} disabled={!message.trim()} fullWidth>
            Send broadcast
          </Button>
        </Stack>
      </Card>

      {/* History */}
      <Box>
        <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={12}>
          Broadcast history
        </Text>
        <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p={0}>
          <ScrollArea>
            <Table style={{ tableLayout: "fixed", width: "100%" }}>
              <Table.Thead>
                <Table.Tr style={{ background: "#f8fcf8" }}>
                  {["Message", "Audience", "Sent", "Status"].map((h) => (
                    <Table.Th key={h} style={{ color: "#6a8c6a", fontSize: 11, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", padding: "10px 16px" }}>
                      {h}
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {MOCK_BROADCASTS.map((b, i) => {
                  const s = STATUS[b.status];
                  return (
                    <Table.Tr key={b.id} style={{ borderTop: "0.5px solid #eef4ee", background: i % 2 === 0 ? "transparent" : "#fafffe" }}>
                      <Table.Td style={{ padding: "12px 16px" }}>
                        <Text fz={13} style={{ color: "#1a2e1a" }} lineClamp={1}>{b.message}</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", width: 160 }}>
                        <Text fz={13} style={{ color: "#1a2e1a" }}>{b.audience}</Text>
                        <Text fz={11} c="dimmed">{b.audience_count.toLocaleString()} contacts</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", width: 150 }}>
                        <Text fz={12} c="dimmed">{b.sent_at}</Text>
                      </Table.Td>
                      <Table.Td style={{ padding: "12px 16px", width: 110 }}>
                        <Badge color={s.color} variant="light" size="sm">{s.label}</Badge>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      </Box>
    </Stack>
  );
}