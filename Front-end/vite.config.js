import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/sentiment': {
          // In Docker dev, use the service name 'backend'. 
          // Locally, use localhost.
          target: env.VITE_API_TARGET || 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
    // This allows you to use process.env style vars if needed
    define: {
      'process.env': env
    }
  }
})