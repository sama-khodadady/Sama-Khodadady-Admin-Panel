import React from "react";
import defaultOptions from "src/configs/reactQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function QueryProvider({ children }) {
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
