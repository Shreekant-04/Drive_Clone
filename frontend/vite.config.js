import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default {
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};

