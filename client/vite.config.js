import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { "/api": "https://mern-quickkart-agentic-ai-1.onrender.com", "/uploads": "https://mern-quickkart-agentic-ai-1.onrender.com" } },
});
