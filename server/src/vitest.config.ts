import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'food-tracker-tests'
    },
  ],
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: ['dotenv/config'],
  },
})