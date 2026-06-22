import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the build works on GitHub Pages (subpath) or any host.
export default defineConfig({
  plugins: [react()],
  base: './',
})
