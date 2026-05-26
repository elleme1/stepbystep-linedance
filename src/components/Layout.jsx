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

    const isMainTab = path === '/' || path === '/video' || path === '/theory' || path === '/recommend';
    const isOurSubPage = path.startsWith('/community') || path.startsWith('/search');

    // 📍 장소 전환 함수 (코오롱 ↔ 중리 행정복지센터 토글)
    const toggleLocation = () => {
        const next = selectedLocation === 'kolon' ? 'sindun' : 'kolon';
        setSelectedLocation(next);
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
        if (path === '/video') return '수업영상 보관함';
        if (path === '/theory') return '자이브';
        if (path === '/recommend') return '영상 모음';
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
                            <span>{locationInfo ? (locationInfo.id === 'kolon' ? '코오롱' : '중리') : ''}</span>
                            <span style={{ fontSize: '10px', opacity: 0.6 }}>⇄</span>
                        </button>
                    )}

                    {/* 테마 토글 버튼 (오른쪽) — 현재 모드 아이콘을 보여줌 */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            background: theme === 'dark'
                                ? 'rgba(99, 102, 241, 0.18)'
                                : 'rgba(245, 158, 11, 0.18)',
                            border: `1px solid ${theme === 'dark' ? 'rgba(99, 102, 241, 0.45)' : 'rgba(245, 158, 11, 0.45)'}`,
                            borderRadius: '20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            padding: '4px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.3s ease',
                        }}
                        title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
                        aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
                    >
                        <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
                        <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: theme === 'dark' ? '#a5b4fc' : '#d97706',
                            letterSpacing: '0.3px',
                        }}>
                            {theme === 'dark' ? '다크' : '라이트'}
                        </span>
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
                paddingBottom: 'calc(80px + env(safe-area-inset-bottom))'
            }}>
                <Outlet />
            </main>

            <BottomNav />

        </div>
    );
}
