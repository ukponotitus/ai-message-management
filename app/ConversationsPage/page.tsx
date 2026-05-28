"use client";

import { useState } from "react";
import {
  Card, Table, ScrollArea, Group, Text, Badge,
  TextInput, Box, Modal, Stack, SegmentedControl, Loader, Center,
} from "@mantine/core";
import { IconSearch, IconCircleCheck, IconCircleX, IconAlertCircle } from "@tabler/icons-react";
import { ConversationHistory } from "../components/dashboard/ConversationHistory";
import { ApiMessageLog } from "../components/types/dto";
import { MessageLog } from "../components/types/interface";
import { useDashboard } from "../hooks/useDashboard";


// ─── Transform API log → UI MessageLog ───────────────────────────────────────
function transformLog(log: ApiMessageLog, idx: number): MessageLog {
  return {
    id:         idx,
    phone:      log.phone,
    name:       log.name || "Unknown",
    incoming:   log.message,
    reply:      log.ai_reply,
    status:     log.status === "sent" ? "replied" : "failed",
    created_at: log.time,
  };
}

function StatusBadge({ status }: { status: MessageLog["status"] }) {
  const map = {
    replied: { color: "green",  icon: <IconCircleCheck  size={12} /> },
    failed:  { color: "red",    icon: <IconCircleX      size={12} /> },
    pending: { color: "yellow", icon: <IconAlertCircle  size={12} /> },
  } as const;
  const { color, icon } = map[status];
  return (
    <Badge color={color} variant="light" size="sm" leftSection={icon}>
      {status}
    </Badge>
  );
}

export default function ConversationsPage() {
  const { logs, isLoading, error } = useDashboard();
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("all");
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Center style={{ height: 400 }}>
        <Loader color="green" size="md" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center style={{ height: 400 }}>
        <Text c="red" fz={13}>{(error as any)?.message ?? "Failed to load conversations"}</Text>
      </Center>
    );
  }

  const messages: MessageLog[] = (logs ?? []).map(transformLog);

  const filtered = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.incoming.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      m.status === filter;
    return matchesSearch && matchesFilter;
  });

  const counts = {
    all:     messages.length,
    replied: messages.filter((m) => m.status === "replied").length,
    failed:  messages.filter((m) => m.status === "failed").length,
    pending: messages.filter((m) => m.status === "pending").length,
  };

  return (
    <>
      <Stack gap={16}>
        <Group justify="space-between" wrap="wrap" gap={8}>
          <TextInput
            placeholder="Search by name, phone or message…"
            leftSection={<IconSearch size={15} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ flex: 1, minWidth: 200, maxWidth: 380 }}
            styles={{ input: { border: "0.5px solid #d4e8d4" } }}
          />
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            color="green"
            size="xs"
            data={[
              { label: `All (${counts.all})`,         value: "all"     },
              { label: `Replied (${counts.replied})`,  value: "replied" },
              { label: `Failed (${counts.failed})`,    value: "failed"  },
              { label: `Pending (${counts.pending})`,  value: "pending" },
            ]}
          />
        </Group>

        <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4" }} radius="md" p={0}>
          <Box px="md" pt="md">
            <Text fz={12} c="dimmed">{filtered.length} conversations</Text>
          </Box>
          <ScrollArea mt={10}>
            <Table style={{ tableLayout: "fixed", width: "100%" }}>
              <Table.Thead>
                <Table.Tr style={{ background: "#f8fcf8", borderTop: "0.5px solid #eef4ee" }}>
                  {["Phone / Name", "Message", "Time", "Status"].map((h) => (
                    <Table.Th
                      key={h}
                      style={{
                        color: "#6a8c6a", fontSize: 11, fontWeight: 500,
                        letterSpacing: "0.5px", textTransform: "uppercase",
                        padding: "10px 16px",
                      }}
                    >
                      {h}
                    </Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filtered.map((m, i) => (
                  <Table.Tr
                    key={m.id}
                    onClick={() => setSelectedPhone(m.phone)}
                    style={{
                      cursor: "pointer",
                      borderTop: "0.5px solid #eef4ee",
                      background: i % 2 === 0 ? "transparent" : "#fafffe",
                    }}
                  >
                    <Table.Td style={{ padding: "12px 16px", width: 170, verticalAlign: "top" }}>
                      <Text fz={13} fw={500} style={{ color: "#1a2e1a" }}>{m.name}</Text>
                      <Text fz={11} c="dimmed">{m.phone}</Text>
                    </Table.Td>
                    <Table.Td style={{ padding: "12px 16px", verticalAlign: "top" }}>
                      <Text fz={13} style={{ color: "#1a2e1a" }} lineClamp={1}>{m.incoming}</Text>
                    </Table.Td>
                    <Table.Td style={{ padding: "12px 16px", width: 110, verticalAlign: "top" }}>
                      <Text fz={12} c="dimmed">{m.created_at}</Text>
                    </Table.Td>
                    <Table.Td style={{ padding: "12px 16px", width: 110, verticalAlign: "top" }}>
                      <StatusBadge status={m.status} />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Card>
      </Stack>

      {/* Conversation detail modal - uses real useConversation hook */}
      <Modal
        opened={!!selectedPhone}
        onClose={() => setSelectedPhone(null)}
        title={
          <Text fw={600} fz={14} style={{ color: "#1a2e1a" }}>
            Conversation · {selectedPhone}
          </Text>
        }
        size="md"
        styles={{
          content: { background: "#fff" },
          header:  { background: "#fff", borderBottom: "0.5px solid #d4e8d4" },
        }}
      >
        {selectedPhone && <ConversationHistory phone={selectedPhone} />}
      </Modal>
    </>
  );
}