import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('main');

    // 🚨 [완벽해진 보물창고] 서랍 번호를 1, 2, 3번으로 고쳤습니다!
    const videoDB = [
        {
            id: '1', // 밖에서 1번 카드를 눌렀을 때
            title: "[쉬운중급] Why - Tiggy Line Dance",
            choreographer: "LinedanceEunheeYoon",
            tags: ["유로댄스", "★★ 초급", "최신안무"],
            description: "A B A A, A B A A Tag, A B A A\n\n발동작이 헷갈리신다면 위 탭에서 [친절한 스텝 설명]을 눌러 천천히 복습해 보세요!",
            mainVideoId: "M7lc1UVf-VE",     // (테스트용) 구글 개발자 공식 테스트 영상
            tutorialVideoId: "M7lc1UVf-VE"
        },
        {
            id: '2', // 밖에서 2번 카드를 눌렀을 때
            title: "[발라드] 정말 잘해왔어 (You've Done Really Well)",
            choreographer: "헬로핑 (Helloping)",
            tags: ["발라드", "★★ 초급"],
            description: "아름다운 발라드 음악에 맞춰 추는 우아한 라인댄스입니다.\n감정을 담아 부드럽게 스텝을 밟아보세요.",
            mainVideoId: "M7lc1UVf-VE",
            tutorialVideoId: "M7lc1UVf-VE"
        },
        {
            id: '3', // 👈 아까 원장님이 밖에서 누르신 3번 카드의 진짜 서랍입니다!!
            title: "[입문] This Is My Life",
            choreographer: "NEW CHOREO",
            tags: ["팝", "★ 입문"],
            description: "라인댄스를 처음 접하시는 분들도 쉽게 따라 할 수 있는 아주 신나는 입문용 안무입니다!\n자신감 있게 즐겨보세요!",
            mainVideoId: "M7lc1UVf-VE",
            tutorialVideoId: "M7lc1UVf-VE"
        }
    ];

    // 창고에서 번호에 맞는 데이터를 똑똑하게 꺼냅니다. (없으면 1번을 꺼냅니다)
    const videoData = videoDB.find(video => String(video.id) === String(id)) || videoDB[0];
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

                {/* 🏷️ 하단 글씨 영역 (창고에서 꺼내온 정보가 자동으로 들어갑니다!) */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {videoData.tags.map((tag, idx) => (
                        <span key={idx} style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px', wordBreak: 'keep-all' }}>
                    {videoData.title} {/* 👈 창고에서 꺼내온 제목 */}
                </h1>
                <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
                    안무가: {videoData.choreographer}
                </p>

                <div style={{ padding: '20px', backgroundColor: '#1a1a24', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#ff2d55' }}>📝 원장님의 안무 노트</h3>
                    <p style={{ color: '#ddd', fontSize: '15px', lineHeight: '1.6', margin: 0, wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>
                        {videoData.description} {/* 👈 창고에서 꺼내온 설명 */}
                    </p>
                </div>

            </div>
        </div>
    );
}