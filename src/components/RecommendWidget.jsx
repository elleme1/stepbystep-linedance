import React, { useState } from 'react';

export default function RecommendWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. 우측 하단 동동 떠 있는(Floating) 핑크색 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '90px', right: '20px',
          backgroundColor: '#ff4081', color: 'white',
          padding: '12px 22px', borderRadius: '30px',
          border: 'none', boxShadow: '0 4px 15px rgba(255, 64, 129, 0.4)',
          cursor: 'pointer', zIndex: 10000,
          fontWeight: 'bold', fontSize: '15px',
          display: 'flex', alignItems: 'center', gap: '6px'
        }}
      >
        <span>⭐</span> 추천곡 코너
      </button>

      {/* 2. 버튼을 누르면 화면 중앙에 뜨는 모달 팝업 */}
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', // 더 진한 배경
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 10001
        }}>
          <div style={{
            backgroundColor: '#1e1e1e',
            color: 'white', padding: '30px', borderRadius: '20px',
            width: '90%', maxWidth: '420px', textAlign: 'center',
            position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255, 64, 129, 0.3)'
          }}>
            {/* 닫기 버튼 (우측 상단 X) */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute', top: '15px', right: '15px',
                background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none',
                width: '32px', height: '32px', borderRadius: '50%',
                fontSize: '18px', cursor: 'pointer', display: 'flex', 
                alignItems: 'center', justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <h2 style={{ marginTop: '0', color: '#ff4081', fontSize: '1.4rem' }}>이번 주 강력 추천! 🎬</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '20px' }}>
              수강생 여러분을 위한 특별 추천 영상과<br />튜토리얼을 확인해 보세요!
            </p>

            {/* 유튜브 Iframe 플레이어 영역 */}
            <div style={{ 
              position: 'relative', 
              paddingBottom: '56.25%', // 16:9 비율
              height: 0, 
              overflow: 'hidden', 
              borderRadius: '12px',
              backgroundColor: '#000'
            }}>
              <iframe
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  border: 'none'
                }}
                src="https://www.youtube.com/embed/WPv-cmrO5rY" // 최근 업데이트된 '환희' 영상 추천
                title="추천 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: '25px',
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
    </>
  );
}