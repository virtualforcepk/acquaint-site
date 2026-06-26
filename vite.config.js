import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// './' for GitHub Pages (subpath deploy); '/' for Vercel (root deploy).
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : './',
})
