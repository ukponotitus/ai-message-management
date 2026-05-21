"use client";

import { Box, Card, Table, ScrollArea, Group, Text, Badge, Modal, Stack } from "@mantine/core";
import { IconCircleCheck, IconCircleX, IconAlertCircle } from "@tabler/icons-react";
import { MessageLog } from "../types/interface";
import { useState } from "react";
import { ConversationHistory } from "./ConversationHistory";


function StatusBadge({ status }: { status: MessageLog["status"] }) {
  const map = {
    replied: { color: "green", icon: <IconCircleCheck size={12} /> },
    failed: { color: "red", icon: <IconCircleX size={12} /> },
    pending: { color: "yellow", icon: <IconAlertCircle size={12} /> },
  };
  const { color, icon } = map[status];
  return (
    <Badge color={color} variant="light" size="sm" leftSection={icon}>
      {status}
    </Badge>
  );
}

const MUTED = "#7a9b7e";
const DK2 = "#111a14";

export function MessageLogTable({ messages }: { messages: MessageLog[] }) {

    const [opened, setOpened] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);

  const handleRowClick = (phone: string) => {
    setSelectedPhone(phone);
    setOpened(true);
  };


  return (
    <>
        <Card style={{ background: DK2, border: "0.5px solid rgba(255,255,255,0.07)" }} radius="md" p={0}>
      <Box p="xl" pb={0}>
        <Group justify="space-between">
          <Text fz={11} fw={700} c="green" style={{ letterSpacing: "2px", textTransform: "uppercase" }}>
            Recent message log
          </Text>
          <Text fz={12} c="dimmed">{messages.length} conversations</Text>
        </Group>
      </Box>
      <ScrollArea mt={16}>
        <Table style={{ tableLayout: "fixed", width: "100%" }}>
          <Table.Thead style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
            <Table.Tr>
              {["Phone / Name", "Message & AI reply", "Time", "Status"].map((h) => (
                <Table.Th
                  key={h}
                  style={{
                    color: MUTED,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    padding: "10px 20px",
                    background: "rgba(0,0,0,0.2)",
                  }}
                >
                  {h}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {messages.map((m, i) => (
              <Table.Tr
               key={m.id} onClick={() => handleRowClick(m.phone)}
                style={{
                  cursor: "pointer",
                  borderTop: "0.5px solid rgba(255,255,255,0.04)",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                }}
              >
                <Table.Td style={{ padding: "14px 20px", verticalAlign: "top", width: 160 }}>
                  <Text fz={13} c="white" fw={500}>{m.name || "Unknown"}</Text>
                  <Text fz={11} c="dimmed">{m.phone}</Text>
                </Table.Td>
                <Table.Td style={{ padding: "14px 20px", verticalAlign: "top" }}>
                  <Text fz={13} c="white">{m.incoming}</Text>
                  {/* <Text fz={12} c="dimmed" mt={2} style={{ fontStyle: "italic" }}>{m.reply}</Text> */}
                </Table.Td>
                <Table.Td style={{ padding: "14px 20px", verticalAlign: "top", width: 120 }}>
                  <Text fz={12} c="dimmed">{m.created_at}</Text>
                </Table.Td>
                <Table.Td style={{ padding: "14px 20px", verticalAlign: "top", width: 100 }}>
                  <StatusBadge status={m.status} />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Card>

     <Modal 
        opened={opened} 
        onClose={() => setOpened(false)} 
        title="Conversation History"
        size="lg"
        styles={{ content: { background: "#111a14", color: "#e8f5e2" } }}
      >
        {selectedPhone && <ConversationHistory phone={selectedPhone} />}
      </Modal>
    </>

  );
}