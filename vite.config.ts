import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = '/first-principles/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    chunkSizeWarningLimit: 900,
  },
})
