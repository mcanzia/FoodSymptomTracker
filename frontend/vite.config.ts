import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    port: Number(process.env.VITE_FRONTEND_PORT)
  },
  plugins: [
    vue()
  ]
})