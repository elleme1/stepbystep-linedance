import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState('main');

    const videoData = {
        title: "[쉬운중급] Why - Tiggy Line Dance",
        choreographer: "LinedanceEunheeYoon",
        tags: ["유로댄스", "★★ 초급", "최신안무"],
        description: "A B A A, A B A A Tag, A B A A\n\n발동작이 헷갈리신다면 위 탭에서 [친절한 스텝 설명]을 눌러 천천히 복습해 보세요!",

        // 🚨 [마법의 열쇠!] 100% 재생되는 원장님의 진짜 유튜브 아이디로 갈아끼웠습니다!
        mainVideoId: "cmJiGKTb6v4",     // 실전 영상: [Easy Intermediate] Why - Tiggy Line Dance
        tutorialVideoId: "yECbULnTDhI"  // 튜토리얼 영상: [스텝설명] I Got a Picture (테스트를 위해 원장님의 다른 튜토리얼을 넣었습니다)
    };

    const currentVideoId = viewMode === 'main' ? videoData.mainVideoId : videoData.tutorialVideoId;

    return (
        <div style={{ backgroundColor: '#0a0a0f', minHeight: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>

            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', zIndex: 10 }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff',
                        fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)'
                    }}
                >
                    <span style={{ fontSize: '22px', paddingBottom: '2px' }}>‹</span> 돌아가기
                </button>
            </div>

            {/* 📺 유튜브 영상 플레이어 */}
            <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000' }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <div style={{ padding: '24px 20px', flex: 1, paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>

                {/* ✨ 듀얼 스위치 버튼 */}
                <div style={{ display: 'flex', background: '#1c1c26', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
                    <button
                        onClick={() => setViewMode('main')}
                        style={{
                            flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: viewMode === 'main' ? '#ff2d55' : 'transparent',
                            color: viewMode === 'main' ? '#fff' : '#888'
                        }}
                    >
                        🎵 음악 맞춰 실전
                    </button>

                    <button
                        onClick={() => setViewMode('tutorial')}
                        style={{
                            flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: viewMode === 'tutorial' ? '#ff2d55' : 'transparent',
                            color: viewMode === 'tutorial' ? '#fff' : '#888'
                        }}
                    >
                        👣 친절한 스텝 설명
                    </button>
                </div>

                {/* 🏷️ 하단 글씨 영역 */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {videoData.tags.map((tag, idx) => (
                        <span key={idx} style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px', wordBreak: 'keep-all' }}>
                    {videoData.title}
                </h1>
                <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
                    안무가: {videoData.choreographer}
                </p>

                <div style={{ padding: '20px', backgroundColor: '#1a1a24', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#ff2d55' }}>📝 원장님의 안무 노트</h3>
                    <p style={{ color: '#ddd', fontSize: '15px', lineHeight: '1.6', margin: 0, wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>
                        {videoData.description}
                    </p>
                </div>

            </div>
        </div>
    );
}