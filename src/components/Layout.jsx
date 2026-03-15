import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const { theme, toggleTheme } = useTheme();

    const isMainTab = path === '/' || path === '/schedule' || path === '/video' || path === '/theory';
    const isOurSubPage = path.startsWith('/community') || path.startsWith('/search');

    // 🚨 [진짜 찐 최종! 고집 센 유령 버튼 가두기 마법!]
    if (!isMainTab && !isOurSubPage) {
        return (
            <div style={{ backgroundColor: 'var(--bg-primary)', height: '100dvh', display: 'flex', flexDirection: 'column' }}>

                {/* 1. 아이폰 다이내믹 아일랜드(카메라 구멍) 공간만큼 위에서 강제로 까만 벽을 밀어냅니다! (최소 54px 확보) */}
                <div style={{ height: 'max(54px, env(safe-area-inset-top))', flexShrink: 0, backgroundColor: 'var(--bg-primary)' }}></div>

                {/* 2. 마법의 투명 유리방! (transform 속성이 '돌아가기 버튼'이 천장을 뚫고 도망가지 못하게 꽉 가둬줍니다!) */}
                <div style={{ flex: 1, position: 'relative', transform: 'translateZ(0)', zIndex: 1, overflow: 'auto' }}>
                    <Outlet />
                </div>

            </div>
        );
    }

    const getHeaderTitle = () => {
        if (path === '/') return '구양희 스텝바이스텝 💃';
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
                    {isOurSubPage && (
                        <button
                            onClick={() => navigate(-1)}
                            style={{ position: 'absolute', left: '16px', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '24px', cursor: 'pointer', padding: '0 8px' }}
                        >
                            ←
                        </button>
                    )}
                    {/* 테마 토글 버튼 */}
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
                    <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', padding: '0 40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                paddingBottom: isMainTab ? 'calc(120px + env(safe-area-inset-bottom))' : 'env(safe-area-inset-bottom)'
            }}>
                <Outlet />
            </main>

            {isMainTab && (
                <BottomNav />
            )}

        </div>
    );
}
