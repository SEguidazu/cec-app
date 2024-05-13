import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        display: "standalone",
        display_override: ["window-controls-overlay"],
        lang: "es-AR",
        name: "Socios CEC",
        short_name: "Socios CEC",
        description: "Web para acceso de socios del club CEC Liceo Militar",
        theme_color: "#0A4C7D",
        background_color: "#0A4C7D",
        icons: [
          {
            src: "favicon-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "favicon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "favicon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
