import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// @ts-ignore
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  return {
    plugins: [react()],
    base: isProduction ? "/BookPlatform_Demo/" : "/",
    publicDir: "public",
    server: {
      proxy: {
        '/api': {
          target: 'https://ndlsearch.ndl.go.jp',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      host: true, // Allow external access
      port: 5173,
    },
  };
});
