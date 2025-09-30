import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true
  },
  build: {
    sourcemap: false, // Disable sourcemap for lighter build
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'charts': ['lightweight-charts', 'recharts'],
          'ui': ['swiper', 'lucide-react']
        }
      }
    }
  },
  define: {
    'process.env.VITE_SOURCEMAP': false
  }
})