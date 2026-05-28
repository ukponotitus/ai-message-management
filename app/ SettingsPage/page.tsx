"use client";

import { useState } from "react";
import {
  Stack, Card, Text, Group, Box, Button,
  TextInput, Textarea, Select, Switch, Tabs, PasswordInput, Badge,
} from "@mantine/core";
import { IconDeviceFloppy, IconRefresh, IconPlus } from "@tabler/icons-react";

const G    = "#00C853";
const CARD = { background: "#fff", border: "0.5px solid #d4e8d4" };
const LBL  = { fontSize: 11, textTransform: "uppercase" as const, letterSpacing: "0.5px", color: "#4a6a4a" };

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text fz={11} fw={700} style={{ color: G, letterSpacing: "2px", textTransform: "uppercase" }} mb={16}>
      {children}
    </Text>
  );
}

function BotSettings() {
  const [aiEnabled, setAiEnabled] = useState(true);
  return (
    <Card style={CARD} radius="md" p="xl">
      <SectionTitle>Bot configuration</SectionTitle>
      <Stack gap={14}>
        <TextInput  label="Bot name"        defaultValue="AutomateNG Bot"                                          styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4" } }} />
        <Textarea   label="Welcome message" defaultValue="Hello! Welcome to AutomateNG. How can I help you today?" minRows={2} styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4" } }} />
        <Select
          label="Language"
          defaultValue="en"
          data={[
            { value: "en", label: "English" },
            { value: "yo", label: "Yoruba"  },
            { value: "ha", label: "Hausa"   },
            { value: "ig", label: "Igbo"    },
          ]}
          styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4" } }}
        />
        <Group
          justify="space-between"
          style={{ background: "#f8fcf8", padding: "12px 16px", borderRadius: 8 }}
        >
          <Box>
            <Text fz={13} fw={500} style={{ color: "#1a2e1a" }}>AI auto-reply</Text>
            <Text fz={12} c="dimmed">Let AI handle incoming messages automatically</Text>
          </Box>
          <Switch checked={aiEnabled} onChange={(e) => setAiEnabled(e.currentTarget.checked)} color="green" size="md" />
        </Group>
        <Button color="green" leftSection={<IconDeviceFloppy size={14} />} style={{ alignSelf: "flex-start" }}>
          Save changes
        </Button>
      </Stack>
    </Card>
  );
}

function CompanySettings() {
  return (
    <Card style={CARD} radius="md" p="xl">
      <SectionTitle>Company info</SectionTitle>
      <Stack gap={14}>
        <TextInput label="Company name"    defaultValue="AutomateNG Ltd."              styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4" } }} />
        <TextInput label="WhatsApp number" defaultValue="+234 800 000 0000"            styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4" } }} />
        <TextInput label="Website"         defaultValue="https://automate-ng.com"      styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4" } }} />
        <TextInput label="Support email"   defaultValue="support@automate-ng.com"      styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4" } }} />
        <Button color="green" leftSection={<IconDeviceFloppy size={14} />} style={{ alignSelf: "flex-start" }}>
          Save changes
        </Button>
      </Stack>
    </Card>
  );
}

function ApiSettings() {
  return (
    <Card style={CARD} radius="md" p="xl">
      <SectionTitle>API keys</SectionTitle>
      <Stack gap={14}>
        <PasswordInput label="WhatsApp API key" defaultValue="wh_live_abc123def456ghi789jkl4f2a" styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4", fontFamily: "monospace" } }} />
        <PasswordInput label="OpenAI API key"   defaultValue="sk-proj-abc123def456ghi789jkl9b1c" styles={{ label: LBL, input: { border: "0.5px solid #d4e8d4", fontFamily: "monospace" } }} />
        <Box>
          <Text fz={11} style={{ ...LBL, display: "block", marginBottom: 6 }}>Webhook URL</Text>
          <Box style={{ background: "#f4f6f4", border: "0.5px solid #d4e8d4", borderRadius: 8, padding: "9px 12px" }}>
            <Text fz={13} style={{ fontFamily: "monospace", color: "#0f6e56" }}>
              https://api.automate-ng.com/webhook/whatsapp
            </Text>
          </Box>
        </Box>
        <Button variant="outline" color="red" size="xs" leftSection={<IconRefresh size={13} />} style={{ alignSelf: "flex-start" }}>
          Regenerate keys
        </Button>
      </Stack>
    </Card>
  );
}

const TEAM = [
  { name: "Admin Owner",    email: "admin@automate-ng.com", role: "Owner",   bg: "#e8f8ee", tc: "#00843a" },
  { name: "Tunde Idowu",    email: "tunde@automate-ng.com", role: "Manager", bg: "#e8f0ff", tc: "#1a6aff" },
  { name: "Amaka Fasanya",  email: "amaka@automate-ng.com", role: "Viewer",  bg: "#f0e8ff", tc: "#8b1aff" },
];

function TeamSettings() {
  return (
    <Card style={CARD} radius="md" p="xl">
      <Group justify="space-between" mb={16}>
        <SectionTitle>Team members</SectionTitle>
        <Button color="green" size="xs" leftSection={<IconPlus size={13} />}>Invite</Button>
      </Group>
      <Stack gap={0}>
        {TEAM.map((m, i) => {
          const ini = m.name.split(" ").map((n) => n[0]).join("");
          return (
            <Group
              key={m.email}
              justify="space-between"
              py={12}
              style={{ borderBottom: i < TEAM.length - 1 ? "0.5px solid #eef4ee" : "none" }}
            >
              <Group gap={10}>
                <Box
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: m.bg, color: m.tc, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 600, fontSize: 13,
                  }}
                >
                  {ini}
                </Box>
                <Box>
                  <Text fz={13} fw={500} style={{ color: "#1a2e1a" }}>{m.name}</Text>
                  <Text fz={11} c="dimmed">{m.email}</Text>
                </Box>
              </Group>
              <Badge size="sm" style={{ background: m.bg, color: m.tc, border: "none" }}>{m.role}</Badge>
            </Group>
          );
        })}
      </Stack>
    </Card>
  );
}

export function SettingsPage() {
  return (
    <Tabs defaultValue="bot" color="green">
      <Tabs.List mb={20}>
        <Tabs.Tab value="bot">Bot settings</Tabs.Tab>
        <Tabs.Tab value="company">Company info</Tabs.Tab>
        <Tabs.Tab value="api">API keys</Tabs.Tab>
        <Tabs.Tab value="team">Team</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="bot">     <BotSettings     /></Tabs.Panel>
      <Tabs.Panel value="company"> <CompanySettings /></Tabs.Panel>
      <Tabs.Panel value="api">     <ApiSettings     /></Tabs.Panel>
      <Tabs.Panel value="team">    <TeamSettings    /></Tabs.Panel>
    </Tabs>
  );
}