import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        // Group small vendor modules so the browser makes fewer requests on first load.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/lucide-react|@radix-ui|class-variance-authority|clsx|tailwind-merge/.test(id))
            return "ui-vendor";
        },
      },
    },
  },
});
