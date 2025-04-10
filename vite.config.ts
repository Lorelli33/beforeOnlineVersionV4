import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['ethers']
  },
  resolve: {
    alias: {
      // Required for ethers in Vite
      'bn.js': 'bn.js/lib/bn.js'
    }
  },
  server: {
    host: true, // Listen on all addresses
    port: 5173,
    strictPort: false, // Allow fallback to next available port
    proxy: {
      // Proxy admin subdomain requests
      '/admin': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin/, '')
      }
    }
  },
  preview: {
    port: 5173,
    strictPort: false,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
          web3: ['ethers'],
          ui: ['lucide-react', 'recharts', 'mapbox-gl', 'react-map-gl']
        }
      }
    }
  }
});