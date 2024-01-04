import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'food-tracker-tests'
    },
  ],
  test: {
    hookTimeout: 50000,
  },
})