"use client";

import { useState } from "react";
import {
  Box, Card, Text, TextInput, PasswordInput,
  Button, Group, Checkbox, Anchor, Stack,
} from "@mantine/core";

const G = "#00C853";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail]       = useState("admin@automate-ng.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // TODO: Replace with real auth
    // const res = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    // });
    // if (!res.ok) { setLoading(false); return; }
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    onLogin();
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "#f4f6f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        shadow="sm"
        style={{
          width: 380,
          background: "#fff",
          border: "0.5px solid #d4e8d4",
          borderRadius: 16,
          padding: "32px 28px",
        }}
      >
        <Group gap={10} mb={24}>
          <Box
            style={{
              width: 36, height: 36,
              background: G, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 16,
            }}
          >
            A
          </Box>
          <Text fw={700} fz={16} style={{ color: "#1a2e1a" }}>
            Automate<span style={{ color: G }}>NG</span>
          </Text>
        </Group>

        <Text fz={13} c="dimmed" mb={24}>
          Sign in to your admin dashboard
        </Text>

        <Stack gap={14}>
          <TextInput
            label="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            styles={{
              label: { fontSize: 11, letterSpacing: "0.5px", color: "#4a6a4a", marginBottom: 4 },
              input: { border: "0.5px solid #d4e8d4", borderRadius: 8 },
            }}
          />
          <PasswordInput
            label="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            styles={{
              label: { fontSize: 11, letterSpacing: "0.5px", color: "#4a6a4a", marginBottom: 4 },
              input: { border: "0.5px solid #d4e8d4", borderRadius: 8 },
            }}
          />
          <Group justify="space-between">
            <Checkbox label="Remember me" size="xs" color="green" />
            <Anchor fz={12} style={{ color: G }}>Forgot password?</Anchor>
          </Group>
          <Button
            color="green"
            fullWidth
            loading={loading}
            onClick={handleLogin}
            mt={4}
            style={{ borderRadius: 8 }}
          >
            Sign in →
          </Button>
        </Stack>

        <Text fz={12} c="dimmed" ta="center" mt={16}>
          Demo: enter any email + password
        </Text>
      </Card>
    </Box>
  );
}