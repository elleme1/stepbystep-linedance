import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VideoDetail() { // 💡 이름만 VideoDetail로 깔끔하게 맞췄습니다!
    const { id } = useParams();
    const navigate = useNavigate();

    // 🚨 [핵심 마법] 현재 회원님이 어떤 영상을 보고 있는지 기억하는 장치입니다!
    // 처음엔 'main'(실전 댄스)으로 시작하고, 버튼을 누르면 'tutorial'(스텝 설명)로 바뀝니다.
    const [viewMode, setViewMode] = useState('main');

    // 💡 [임시 데이터] 나중에 원장님의 진짜 유튜브 주소 2개가 들어갈 자리입니다.
    const videoData = {
        title: "[쉬운중급] Why - Tiggy Line Dance",
        choreographer: "LinedanceEunheeYoon",
        tags: ["유로댄스", "★★ 초급", "최신안무"],
        description: "A B A A, A B A A Tag, A B A A\n\n발동작이 헷갈리신다면 위 탭에서 [친절한 스텝 설명]을 눌러 천천히 복습해 보세요!",

        // 🚨 테스트를 위해 제가 임의로 유튜브 아이디 2개를 넣어두었습니다.
        // 나중에 원장님이 찍으신 진짜 유튜브 영상 주소 맨 끝의 '영어+숫자' 아이디로만 갈아끼우시면 됩니다!
        mainVideoId: "V_jHc_NqgYc",     // 1. 음악 맞춰서 신나게 추는 실전 영상 ID
        tutorialVideoId: "J-_c34L4Bpw"  // 2. 원장님이 천천히 설명해 주시는 튜토리얼 영상 ID
    };

    // 회원님이 누른 스위치에 따라 위에 띄울 유튜브 영상 ID를 똑똑하게 고릅니다!
    const currentVideoId = viewMode === 'main' ? videoData.mainVideoId : videoData.tutorialVideoId;

    return (
        <div style={{ backgroundColor: '#0a0a0f', minHeight: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>

            {/* 🔙 1. 갇히지 않는 튼튼한 돌아가기 버튼 (상단 여백은 Layout에서 처리함) */}
            <div style={{
                padding: '16px', display: 'flex', alignItems: 'center', zIndex: 10
            }}>
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

            {/* 📺 2. 꽉 찬 유튜브 영상 플레이어 */}
            <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000' }}>
                <iframe
                    width="100%"
                    height="100%"
                    // 회원님이 누른 버튼에 따라 아래 src 주소가 실시간으로 휙휙 바뀝니다!
                    src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 📝 3. 하단 정보 및 대망의 [스위치 버튼] 영역 */}
            <div style={{ padding: '24px 20px', flex: 1, paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>

                {/* ✨ [핵심 스위치 버튼] 실전 댄스 vs 스텝 튜토리얼 */}
                <div style={{
                    display: 'flex', background: '#1c1c26', borderRadius: '12px', padding: '4px', marginBottom: '24px'
                }}>
                    {/* 실전 댄스 버튼 */}
                    <button
                        onClick={() => setViewMode('main')}
                        style={{
                            flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                            transition: 'all 0.3s ease', // 스르륵 부드럽게 색깔이 바뀌는 애니메이션
                            backgroundColor: viewMode === 'main' ? '#ff2d55' : 'transparent',
                            color: viewMode === 'main' ? '#fff' : '#888'
                        }}
                    >
                        🎵 음악 맞춰 실전
                    </button>

                    {/* 스텝 튜토리얼 버튼 */}
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

                {/* 🏷️ 영상 제목과 태그 정보 */}
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

                {/* 💡 안무 노트 박스 */}
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