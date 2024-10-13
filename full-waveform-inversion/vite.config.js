import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with '/cases' to the backend server
      '/cases': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})