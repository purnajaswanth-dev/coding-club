import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const hash = env.VITE_HASH_ROUTER === 'true';
  return {
    plugins: [react()],
    // Normal routing needs absolute asset paths ('/'); hash routing works from any folder ('./').
    base: hash ? './' : '/',
    server: {
      port: 5173,
      // When your backend runs locally, uncomment to proxy /api calls to it:
      // proxy: { '/api': 'http://localhost:8080' },
    },
  };
});
