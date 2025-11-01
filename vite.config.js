import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          // Split heavy components into separate chunks
          organizers: ['react-window'],
          // Create a chunk for lazy-loaded components
          lazy: ['./src/components/LazyOrganizerSection.jsx', './src/components/LazySection.jsx']
        }
      }
    },
    chunkSizeWarningLimit: 500, // Lower threshold to encourage smaller chunks
    target: 'esnext', // Use modern JS features for better performance
    minify: 'terser', // Better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    open: true,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      port: 5173,
      clientPort: 5173,
      overlay: true,
    },
    // On some Windows setups, file watching needs polling for reliability
    watch: {
      usePolling: false,
    },
  }
})
