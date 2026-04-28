import React from 'react';

export default function RecommendWidget() {
  return (
    <section className="vip-section">
      <div className="vip-header">
          <h2 className="vip-title">⭐ 이번 주 강력 추천!</h2>
          <span className="level-badge">Tutorial</span>
      </div>

      <div className="vip-card" style={{ padding: '0', overflow: 'hidden', backgroundColor: '#000' }}>
        {/* 유튜브 Iframe 플레이어 영역 */}
        <div style={{ 
          position: 'relative', 
          paddingBottom: '56.25%', // 16:9 비율
          height: 0, 
          width: '100%'
        }}>
          <iframe
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              border: 'none'
            }}
            src="https://www.youtube.com/embed/wixCZ2dY7gc" 
            title="추천 영상 (Havana Cha 튜토리얼)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <div style={{ padding: '15px 5px 5px 5px', textAlign: 'center' }}>
        <p style={{ color: '#ccc', fontSize: '0.95rem', margin: 0, lineHeight: '1.6' }}>
          수강생 여러분을 위한 특별 <strong>Havana Cha</strong> 튜토리얼을<br />지금 바로 확인해 보세요!
        </p>
      </div>
    </section>
  );
}