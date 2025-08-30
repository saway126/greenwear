import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
<<<<<<< HEAD
    host: '0.0.0.0',
    port: 5000,
    hmr: {
      clientPort: 443
    },
=======
    host: '0.0.0.0', // Replit에서 모든 호스트 허용
    port: 5000, // Replit 기본 포트
>>>>>>> refactoring-20250829
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    },
    allowedHosts: true // Replit 환경에서 모든 호스트 허용
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
}) 