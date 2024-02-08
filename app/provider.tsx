"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
/**
 * Provides a React Query client and provider to enable React Query in the application.
 * Wraps the given children in a QueryClientProvider with a configured QueryClient instance.
 */

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
