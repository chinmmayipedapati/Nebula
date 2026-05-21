import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Nebula/' : '/',
  server: {
    host: true,            // Bind to all network interfaces
    allowedHosts: true     // Allow localtunnel and ngrok proxies to bypass host checks
  }
});
