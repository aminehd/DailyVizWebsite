import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dailyviz/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://backend:3000',
        changeOrigin: true
      }
    },
    allowedHosts: [
      'aminehdadsetan.net',
      'www.aminehdadsetan.net',
      'hackernewsranked.com',
      'www.hackernewsranked.com',
    ]
  }
})