import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    // This is the correct way to handle client-side routing in Vite
    proxy: {
      // Redirect all requests that don't match a static file to index.html
      '.*': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => '/index.html',
      },
    },
  },
})
