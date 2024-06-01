import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@images", replacement: "/src/assets/images" },
      { find: "@components", replacement: "/src/components" },
      { find: "@interface", replacement: "/src/interface" },
      { find: "@layout", replacement: "/src/layout" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@router", replacement: "/src/router" },
      { find: "@router-root", replacement: "/src/router/root" },
      { find: "@service", replacement: "/src/service" },
      { find: "@store", replacement: "/src/store" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@ui", replacement: "/src/components/ui" },
      { find: "@token-service", replacement: "/src/utils/tokenService" },
      { find: "@http", replacement: "/src/service/config/http" },
      { find: "@validation", replacement: "/src/utils/validation" },
    ],
  },
});
