"use client";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "@mantine/core/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <QueryClientProvider client={queryClient}>
          {/*
            ✅ CHANGED: "dark" → "light"
            This is the only change from your original layout.tsx
          */}
          <MantineProvider defaultColorScheme="light">
            {children}
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}