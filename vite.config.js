import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // "" as the third argument loads ALL env vars, not only VITE_ ones
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: env.DOLCE_API_BASE_URL,
          changeOrigin: true,
          secure: true,
          headers: {
            "x-internal-api-key": env.DOLCE_API_SECRET,
          },
        },
      },
    },
  };
});
