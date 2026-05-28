"use client";

import { useState } from "react";
import { Grid, Card, Text, Group, Box, Stack, Badge, Button, TextInput } from "@mantine/core";
import { IconDownload, IconSearch } from "@tabler/icons-react";
import { MOCK_LEADS } from "../components/const/mockdata";

const TAG = {
  hot:  { bg: "#fdeeee", color: "#c0392b", label: "Hot lead" },
  warm: { bg: "#fff8e6", color: "#b8860b", label: "Warm"     },
  cold: { bg: "#eef4ee", color: "#4a8c4a", label: "Cold"     },
};

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

export function LeadsPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_LEADS.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.topic.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    // TODO: replace with real API export endpoint
    const rows = [
      ["Name", "Phone", "Topic", "Tag", "Date"],
      ...MOCK_LEADS.map((l) => [l.name, l.phone, l.topic, l.tag, l.created_at]),
    ];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const a    = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "leads.csv" });
    a.click();
  };

  return (
    <Stack gap={20}>
      <Group justify="space-between" wrap="wrap" gap={8}>
        <Text fz={14} fw={500} style={{ color: "#1a2e1a" }}>
          {filtered.length} leads captured this week
        </Text>
        <Group gap={8}>
          <TextInput
            placeholder="Search leads…"
            leftSection={<IconSearch size={15} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            size="xs"
            styles={{ input: { border: "0.5px solid #d4e8d4" } }}
          />
          <Button variant="outline" color="green" size="xs" leftSection={<IconDownload size={13} />} onClick={handleExport}>
            Export CSV
          </Button>
        </Group>
      </Group>

      <Grid>
        {filtered.map((lead) => {
          const t = TAG[lead.tag];
          return (
            <Grid.Col key={lead.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Card style={{ background: "#fff", border: "0.5px solid #d4e8d4", cursor: "pointer" }} radius="md" p="md">
                <Box
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#e8f8ee", color: "#00843a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 600, fontSize: 14, marginBottom: 10,
                  }}
                >
                  {initials(lead.name)}
                </Box>
                <Text fz={13} fw={500} style={{ color: "#1a2e1a" }}>{lead.name}</Text>
                <Text fz={12} c="dimmed">{lead.phone}</Text>
                <Text fz={12} c="dimmed" mt={2}>{lead.topic}</Text>
                <Group justify="space-between" mt={10}>
                  <Badge size="sm" style={{ background: t.bg, color: t.color, border: "none" }}>{t.label}</Badge>
                  <Text fz={11} c="dimmed">{lead.created_at}</Text>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Stack>
  );
}