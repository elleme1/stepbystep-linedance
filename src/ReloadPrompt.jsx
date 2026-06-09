import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
  // registerType이 'autoUpdate'(vite.config.js)라 새 SW는 자동 활성화·자동 reload된다.
  // 따라서 needRefresh('업데이트' 버튼 UI)는 발화하지 않는 죽은 분기여서 제거하고
  // 오프라인 준비 안내만 남긴다.
  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW({
    onRegistered(r) {
      // 5분마다 백그라운드에서 업데이트 확인
      if (r) {
        setInterval(() => {
          r.update()
        }, 1000 * 60 * 5)
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
  }

  if (!offlineReady) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(30, 30, 40, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #ff2d55',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      zIndex: 9999,
      width: '90%',
      maxWidth: '320px',
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <p style={{ margin: '0 0 12px 0', fontSize: '15px', lineHeight: '1.5', fontWeight: 'bold' }}>
        <span>✨ 앱이 오프라인에서<br/>작동할 준비가 되었습니다!</span>
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => close()}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#333', color: '#ccc', fontWeight: 'bold', cursor: 'pointer' }}
        >
          닫기
        </button>
      </div>
    </div>
  )
}

export default ReloadPrompt
