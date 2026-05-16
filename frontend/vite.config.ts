import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'HireReady - AI Resume Analyzer',
        short_name: 'HireReady',
        description: 'AI-powered resume analyzer and career coach',
        theme_color: '#3b82f6',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.svg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.svg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
