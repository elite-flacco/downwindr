import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

const root = createRoot(document.getElementById("root")!);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// Enable proper HMR with React Refresh and handle connection errors
if (import.meta.hot) {
  import.meta.hot.accept((err) => {
    if (err) {
      console.error('HMR update error:', err);
      // Force a full page reload if hot update fails
      window.location.reload();
    }
  });
  
  // Log connection status
  import.meta.hot.on('vite:beforeUpdate', (payload) => {
    console.log('vite:beforeUpdate', payload);
  });
  
  import.meta.hot.on('vite:error', (err) => {
    console.error('vite:error', err);
  });
}
