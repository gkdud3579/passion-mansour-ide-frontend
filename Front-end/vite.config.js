import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // dev 포트
  },
  preview: {
    port: 3000, // preview 포트
  },
  define: {
    global: 'window',
  },
});
