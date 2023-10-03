import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      port: env.VITE_APP_FRONTEND_PORT,
      proxy: {
        "/api": {
          target: `http://localhost:${env.VITE_APP_BACKEND_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      react({
        babel: {
          // presets: [],
          plugins: [
            [
              "module-resolver",
              {
                alias: {
                  "~": "./src",
                },
              },
            ],
          ],
          // babelrc: true,
          // configFile: true,
        },
      }),
    ],
  };
});
