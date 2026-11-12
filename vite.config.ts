import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// La salida va a "build" porque el proyecto de Vercel existente usa el preset de Create React App.
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'build' },
})
