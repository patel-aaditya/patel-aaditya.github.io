import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Portfolio deploys to ROOT of patel-aaditya.github.io
// so base is just '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
