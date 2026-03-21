import React from 'react';

/**
 * 시네마 모드 오버레이
 * - 가로: 상단 그라데이션 바 (돌아가기 + 제목 + 화면작게), 자동 숨김/표시
 * - 세로: 개별 fixed 버튼 (돌아가기 원형, 화면작게 핑크)
 *
 * @param {Object} props
 * @param {boolean} props.isLandscape - 가로 모드 여부
 * @param {boolean} props.showOverlay - 오버레이 표시 상태
 * @param {string}  props.title - 영상 제목
 * @param {function} props.onBack - 돌아가기 클릭
 * @param {function} props.onExit - 시네마 종료 (화면작게)
 */
export default function CinemaOverlay({ isLandscape, showOverlay, title, onBack, onExit }) {
  const buttonStyle = {
    background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none',
    borderRadius: '20px', padding: '7px 16px',
    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    touchAction: 'manipulation',
  };

  if (isLandscape) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '52px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
        display: 'flex', alignItems: 'center',
        padding: '0 max(12px, env(safe-area-inset-left))',
        gap: '10px',
        zIndex: 10000,
        pointerEvents: showOverlay ? 'auto' : 'none',
        opacity: showOverlay ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <button
          onClick={onBack}
          onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onBack(); }}
          style={buttonStyle}
        >‹ 돌아가기</button>
        <span style={{
          color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 600,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
        }}>{title}</span>
        <button
          onClick={onExit}
          onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onExit(); }}
          style={buttonStyle}
        >✕ 화면작게</button>
      </div>
    );
  }

  // 세로 시네마: 개별 고정 버튼
  return (
    <>
      <button
        onClick={onBack}
        onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onBack(); }}
        style={{
          position: 'fixed', top: 'max(8px, env(safe-area-inset-top))', left: '12px', zIndex: 10000,
          background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', fontSize: '18px',
          borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
          pointerEvents: 'auto', touchAction: 'manipulation',
        }}
        aria-label="돌아가기"
      >←</button>
      <button
        onClick={onExit}
        onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); onExit(); }}
        style={{
          position: 'fixed', top: 'max(8px, env(safe-area-inset-top))', right: '12px', zIndex: 10000,
          background: 'rgba(255,45,85,0.9)', border: 'none', color: '#fff', fontSize: '14px', fontWeight: 'bold',
          borderRadius: '20px', padding: '10px 16px', cursor: 'pointer',
          pointerEvents: 'auto', touchAction: 'manipulation',
        }}
      >✕ 화면 작게</button>
    </>
  );
}
