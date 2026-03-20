import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext';
import { useLocation as useLocationCtx, LOCATIONS } from '../context/LocationContext';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const { theme, toggleTheme } = useTheme();
    const { selectedLocation, setSelectedLocation, locationInfo } = useLocationCtx();

    const isMainTab = path === '/' || path === '/schedule' || path === '/video' || path === '/theory';
    const isOurSubPage = path.startsWith('/community') || path.startsWith('/search');

    // 📍 장소 전환 함수 (코오롱 ↔ 신둔면 토글)
    const toggleLocation = () => {
        const next = selectedLocation === 'kolon' ? 'sindun' : 'kolon';
        setSelectedLocation(next);
        // localStorage에 즉시 저장 후 리로드하여 모든 데이터 확실히 반영
        try { localStorage.setItem('stepbystep-location', next); } catch {}
        window.location.reload();
    };

    // 🚨 서브 페이지 레이아웃
    if (!isMainTab && !isOurSubPage) {
        return (
            <div style={{ backgroundColor: 'var(--bg-primary)', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
                <div className="layout-sub-topbar" style={{ height: 'max(54px, env(safe-area-inset-top))', flexShrink: 0, backgroundColor: 'var(--bg-primary)' }}></div>
                <div style={{ flex: 1, position: 'relative', zIndex: 1, overflow: 'auto', paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}>
                    <Outlet />
                </div>
                <BottomNav />
            </div>
        );
    }

    const getHeaderTitle = () => {
        if (path === '/') return '구향회 스텝바이스텝 💃';
        if (path === '/schedule') return '수업 일정';
        if (path === '/video') return '영상 보관함';
        if (path === '/theory') return '마스터 클래스';
        if (path.startsWith('/community')) return '회원 소통방';
        if (path.startsWith('/search')) return '통합 검색';
        return '';
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

            <header style={{
                position: 'sticky', top: 0, zIndex: 9998,
                backgroundColor: theme === 'dark' ? 'rgba(10, 10, 15, 0.95)' : 'rgba(245, 243, 239, 0.95)', backdropFilter: 'blur(10px)',
                paddingTop: 'max(54px, env(safe-area-inset-top))',
                borderBottom: '1px solid var(--border-color)'
            }}>
                <div style={{ position: 'relative', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isOurSubPage ? (
                        <button
                            onClick={() => navigate(-1)}
                            style={{ position: 'absolute', left: '16px', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '24px', cursor: 'pointer', padding: '0 8px' }}
                        >
                            ←
                        </button>
                    ) : (
                        /* 📍 장소 전환 토글 버튼 (왼쪽) — 관리자가 한 탭으로 전환 */
                        <button
                            onClick={toggleLocation}
                            style={{
                                position: 'absolute',
                                left: '12px',
                                background: locationInfo
                                    ? `linear-gradient(135deg, ${locationInfo.color}22, ${locationInfo.color}44)`
                                    : 'rgba(255,255,255,0.1)',
                                border: `1px solid ${locationInfo?.color || '#666'}55`,
                                borderRadius: '20px',
                                padding: '4px 10px',
                                fontSize: '13px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: locationInfo?.color || 'var(--text-primary)',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                            }}
                            title="장소 전환"
                        >
                            <span style={{ fontSize: '14px' }}>{locationInfo?.emoji || '📍'}</span>
                            <span>{locationInfo ? (locationInfo.id === 'kolon' ? '코오롱' : '신둔면') : ''}</span>
                            <span style={{ fontSize: '10px', opacity: 0.6 }}>⇄</span>
                        </button>
                    )}

                    {/* 테마 토글 버튼 (오른쪽) */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            position: 'absolute',
                            right: '16px',
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            padding: '4px',
                            transition: 'transform 0.3s ease',
                        }}
                        title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', padding: '0 90px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {getHeaderTitle()}
                    </h1>
                </div>
            </header>

            <main style={{
                flex: 1,
                width: '100%',
                maxWidth: '100vw',
                boxSizing: 'border-box',
                overflowX: 'hidden',
                position: 'relative',
                zIndex: 1,
                isolation: 'isolate',
                paddingBottom: 'calc(120px + env(safe-area-inset-bottom))'
            }}>
                <Outlet />
            </main>

            <BottomNav />

        </div>
    );
}
