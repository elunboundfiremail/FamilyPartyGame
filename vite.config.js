import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para GitHub Pages
  base: '/FamilyPartyGame/',
  
  server: {
    port: 5173,
    host: true, // Permite acceso desde la red local
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/database'],
          'animation-vendor': ['framer-motion'],
        }
      }
    }
  }
})
