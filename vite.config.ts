import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// No GitHub Pages o site fica em https://fellipedsg.github.io/pro-estagio/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/pro-estagio/' : '/',
  plugins: [react()],
  server: { host: true, port: 5173 },
}))
