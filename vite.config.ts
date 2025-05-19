import { fileURLToPath, URL } from "node:url"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    strictPort: true,
    port: 3080,
    proxy: {
      "/api/apptica": {
        target: "https://api.apptica.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/apptica/, ""),
        secure: true,
      },
    },
  },
  preview: {
    host: true,
    strictPort: true,
    port: 3000,
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
})
