import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // 'prompt' 모드는 사용자 클릭 전까지 옛 번들이 살아남아 새 기능이 안 보이는 사례가 자주 발생.
      // 'autoUpdate' + skipWaiting/clientsClaim/cleanupOutdatedCaches 로 다음 로드 시 무조건 새 SW가
      // 활성화되고 옛 캐시가 정리되도록 한다.
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.png', 'logo-192.png', 'logo-512.png'],
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
          },
          {
            src: 'logo-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,jpg}'],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      }
    })
  ],
})
