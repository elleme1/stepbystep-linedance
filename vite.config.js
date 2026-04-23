import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'auto',
      includeAssets: ['favicon.png', 'logo-192.png'],
      manifest: {
        name: '스텝바이스텝',
        short_name: '스텝바이스텝',
        description: '라인댄스 회원을 위한 수업 일정, 안무 영상, 공지사항 앱',
        theme_color: '#0a0a0f',
        icons: [
          {
            src: 'logo-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,jpg}']
      }
    })
  ],
})
