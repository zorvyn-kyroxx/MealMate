import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listens on all local IPs (e.g. 0.0.0.0) so devices on your Wi-Fi can connect
    port: 5173
  }
})
