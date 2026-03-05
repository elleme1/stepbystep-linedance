import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    const isMainTab = path === '/' || path === '/schedule' || path === '/video' || path === '/theory';
    const isOurSubPage = path.startsWith('/community') || path.startsWith('/search');

    // 🚨 [진짜 찐 최종! 고집 센 유령 버튼 가두기 마법!]
    if (!isMainTab && !isOurSubPage) {
        return (
            <div style={{ backgroundColor: '#0a0a0f', height: '100dvh', display: 'flex', flexDirection: 'column' }}>

                {/* 1. 아이폰 다이내믹 아일랜드(카메라 구멍) 공간만큼 위에서 강제로 까만 벽을 밀어냅니다! (최소 54px 확보) */}
                <div style={{ height: 'max(54px, env(safe-area-inset-top))', flexShrink: 0, backgroundColor: '#0a0a0f' }}></div>

                {/* 2. 마법의 투명 유리방! (transform 속성이 '돌아가기 버튼'이 천장을 뚫고 도망가지 못하게 꽉 가둬줍니다!) */}
                <div style={{ flex: 1, position: 'relative', transform: 'translateZ(0)' }}>
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
        <div style={{ backgroundColor: '#0a0a0f', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

            <header style={{
                position: 'sticky', top: 0, zIndex: 50,
                backgroundColor: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(10px)',
                // 메인 화면들도 혹시 몰라 카메라에 안 가려지게 최소 54px 안전장치 추가!
                paddingTop: 'max(54px, env(safe-area-inset-top))',
                borderBottom: '1px solid #1a1a24'
            }}>
                <div style={{ position: 'relative', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isOurSubPage && (
                        <button
                            onClick={() => navigate(-1)}
                            style={{ position: 'absolute', left: '16px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', padding: '0 8px' }}
                        >
                            ←
                        </button>
                    )}
                    <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#ffffff', padding: '0 40px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
