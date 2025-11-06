"use client";
import DashBoardHeader from "../components/dashBoardHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DashBoardHeader />
        {children}
      </QueryClientProvider>
    </>
  );
}
