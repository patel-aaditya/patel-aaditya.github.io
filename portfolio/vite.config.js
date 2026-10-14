import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// "preview" mode builds a single self-contained bundle (no public/ files,
// everything relative) that scripts/inline.mjs folds into one HTML page.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'preview' ? './' : '/',
  publicDir: mode === 'preview' ? false : 'public',
  build: {
    assetsInlineLimit: mode === 'preview' ? 100000000 : 4096,
  },
}))
