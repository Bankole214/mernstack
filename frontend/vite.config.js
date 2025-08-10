// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // base: '/frontend/',
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         // changeOrigin: true,
//         // rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig(({ mode }) => ({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: mode === "development" ? process.env.VITE_API_URL : undefined, // in production, no proxy — use full API URL in fetch
//       },
//     },
//   },
// }));


import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: mode === "development" ? env.VITE_API_URL : undefined,
        },
      },
    },
  };
});
