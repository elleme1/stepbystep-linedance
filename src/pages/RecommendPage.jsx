import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecommendPage() {
    const navigate = useNavigate();

    return (
        <div className="recommend-container" style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            color: '#e8e8f0',
            padding: '0 16px calc(120px + env(safe-area-inset-bottom))',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 0,
            maxWidth: '800px',
            margin: '0 auto',
        }}>
            <style>{`
                /* 상단 고정 네비바 (TheoryPage와 동일 스타일) */
                .recommend-topnav { 
                    position: sticky; top: 0; z-index: 50; display: flex; align-items: center; gap: 8px; 
                    padding: 10px 12px; background: rgba(10,10,15,0.95); backdrop-filter: blur(12px); 
                    border-bottom: 1px solid rgba(255,255,255,.08); margin: -16px -16px 16px -16px; 
                }
                .recommend-topnav-btn { 
                    display: inline-flex; align-items: center; gap: 4px; padding: 8px 14px; border-radius: 10px; 
                    font-size: .82rem; font-weight: 700; border: 1px solid rgba(255,255,255,.12); cursor: pointer; 
                    transition: all .2s; background: rgba(255,255,255,.06); color: #e8e8f0; -webkit-tap-highlight-color: transparent; 
                }
                .recommend-topnav-btn:active { transform: scale(.93); background: rgba(255,255,255,.12); }
                .recommend-topnav-title { flex: 1; text-align: center; font-size: .85rem; font-weight: 700; color: #a0a0c0; }

                /* 히어로 헤더 */
                .recommend-header { 
                    text-align: center; padding: 32px 16px; 
                    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(168, 85, 247, 0.1)); 
                    border-radius: 20px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,.08); 
                }
                .recommend-header h1 { 
                    font-size: 1.6rem; font-weight: 900; 
                    background: linear-gradient(135deg, #f87171, #a855f7); 
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; 
                    margin-bottom: 8px; margin-top: 0; 
                }
                .recommend-subtitle { font-size: .85rem; color: #a0a0c0; line-height: 1.6; }

                /* 비디오 카드 섹션 */
                .recommend-card { 
                    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); 
                    border-radius: 16px; margin-bottom: 24px; overflow: hidden; 
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .recommend-card-header {
                    padding: 16px;
                    border-bottom: 1px solid rgba(255,255,255,.08);
                }
                .recommend-card-title {
                    font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0 0 4px 0;
                    display: flex; align-items: center; gap: 8px;
                }
                .recommend-badge {
                    display: inline-block; padding: 4px 10px; border-radius: 20px;
                    font-size: 0.75rem; font-weight: 700;
                }
                .badge-primary { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
                .badge-secondary { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
                
                .recommend-video-embed { 
                    width: 100%; aspect-ratio: 16/9; padding-bottom: 56.25%; position: relative; background: #000; 
                }
                @supports (aspect-ratio: 16/9) { .recommend-video-embed { padding-bottom: unset; } }
                .recommend-video-embed iframe { 
                    position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; 
                }
                .recommend-desc {
                    padding: 16px; font-size: 0.9rem; color: #d0d0e8; line-height: 1.6;
                }
            `}</style>

            {/* 상단 고정 네비바 */}
            <div className="recommend-topnav">
                <button className="recommend-topnav-btn" onClick={() => navigate(-1)}>← 뒤로</button>
                <span className="recommend-topnav-title">영상모음</span>
                <button className="recommend-topnav-btn" onClick={() => navigate('/')}>🏠 홈</button>
            </div>

            {/* 헤더 */}
            <div className="recommend-header">
                <h1>⭐ 이번 주 강력 영상모음</h1>
                <div className="recommend-subtitle">
                    수강생 여러분을 위한 특별한 영상 모음!<br/>
                    본 안무 영상과 상세한 튜토리얼을 함께 준비했어요.
                </div>
            </div>

            {/* 메인 추천곡 영상 */}
            <div className="recommend-card">
                <div className="recommend-card-header">
                    <h2 className="recommend-card-title">
                        <span>🔥</span> Havana Cha (하바나 차)
                    </h2>
                    <div style={{ marginTop: '8px' }}>
                        <span className="recommend-badge badge-primary">본 안무 영상</span>
                    </div>
                </div>
                <div className="recommend-video-embed">
                    <iframe
                        src="https://www.youtube.com/embed/gTcqjNCsU64"
                        title="Havana Cha 본 안무"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="recommend-desc">
                    음악의 리듬을 느끼며 경쾌하게 스텝을 밟아보세요! 전체적인 안무 흐름을 파악하기 좋은 본 영상입니다.
                </div>
            </div>

            {/* 튜토리얼 영상 */}
            <div className="recommend-card">
                <div className="recommend-card-header">
                    <h2 className="recommend-card-title">
                        <span>📖</span> Havana Cha 상세 튜토리얼
                    </h2>
                    <div style={{ marginTop: '8px' }}>
                        <span className="recommend-badge badge-secondary">튜토리얼 영상</span>
                    </div>
                </div>
                <div className="recommend-video-embed">
                    <iframe
                        src="https://www.youtube.com/embed/wixCZ2dY7gc"
                        title="Havana Cha 튜토리얼"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="recommend-desc">
                    조금 더 자세한 설명이 필요하신가요? 튜토리얼 영상을 보며 한 동작씩 차근차근 따라 해 보세요. 초보자도 쉽게 익힐 수 있습니다!
                </div>
            </div>
        </div>
    );
}
