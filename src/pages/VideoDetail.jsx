import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { songs } from '../data/songs'; // 🚨 40곡 진짜 보물창고 연결! (export 방식에 따라 괄호 유무 조정)

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState('main');
    const [isCinema, setIsCinema] = useState(false); // 🎬 넷플릭스급 시네마 모드 스위치!

    // 💡 [AI가 실패한 미션 1] 다른 곡으로 넘어갈 때마다 화면 윗부분으로 스크롤하고 설정을 깔끔하게 리셋합니다!
    useEffect(() => {
        window.scrollTo(0, 0);
        setViewMode('main');
        setIsCinema(false);
    }, [id]);

    // 현재 곡과 이전/다음 곡 똑똑하게 찾기
    const currentIndex = songs.findIndex(song => String(song.id) === String(id));
    const videoData = currentIndex !== -1 ? songs[currentIndex] : songs[0];

    const prevSong = currentIndex > 0 ? songs[currentIndex - 1] : null;
    const nextSong = currentIndex < songs.length - 1 ? songs[currentIndex + 1] : null;

    const currentVideoId = viewMode === 'main' ? videoData.mainVideoId : (videoData.tutorialVideoId || videoData.mainVideoId);

    // 🎬 시네마 모드 발동 시 화면 전체를 까맣게 덮는 마법의 CSS
    const cinemaStyle = isCinema ? {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 99999, backgroundColor: '#000', display: 'flex', flexDirection: 'column'
    } : {
        width: '100%', aspectRatio: '16/9', backgroundColor: '#000', position: 'relative'
    };

    return (
        <div style={isCinema ? cinemaStyle : { backgroundColor: '#0a0a0f', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>

            {/* 🔙 돌아가기 버튼 (시네마 모드일 땐 방해 안 되게 숨깁니다!) */}
            {!isCinema && (
                <div style={{ padding: 'max(16px, env(safe-area-inset-top)) 16px 16px', display: 'flex', alignItems: 'center', zIndex: 10 }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}
                    >
                        <span style={{ fontSize: '22px', paddingBottom: '2px' }}>‹</span> 돌아가기
                    </button>
                </div>
            )}

            {/* 📺 유튜브 영상 플레이어 */}
            <div style={{ flex: isCinema ? 1 : 'none', width: '100%', position: 'relative', backgroundColor: '#000', aspectRatio: isCinema ? 'auto' : '16/9' }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=${isCinema ? 1 : 0}&rel=0&playsinline=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0 }}
                ></iframe>

                {/* 🎬 시네마 끄기 버튼 (오른쪽 위에 짠! 나타납니다) */}
                {isCinema && (
                    <button
                        onClick={() => setIsCinema(false)}
                        style={{ position: 'absolute', top: 'max(20px, env(safe-area-inset-top))', right: '20px', background: 'rgba(255,45,85,0.8)', border: 'none', color: '#fff', padding: '10px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', zIndex: 10000, backdropFilter: 'blur(5px)' }}
                    >
                        ✕ 화면 작게
                    </button>
                )}
            </div>

            {/* 📝 하단 정보 및 컨트롤러 */}
            {!isCinema && (
                <div style={{ padding: '24px 20px', flex: 1, paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>

                    {/* 🕹️ [AI가 실패한 미션 2] 이전 곡 / 시네마 모드 / 다음 곡 컨트롤 패널 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: '#1c1c26', padding: '8px', borderRadius: '16px', border: '1px solid #2a2a35' }}>
                        <button
                            onClick={() => prevSong && navigate(`/video/${prevSong.id}`)}
                            disabled={!prevSong}
                            style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', color: prevSong ? '#fff' : '#444', fontSize: '14px', fontWeight: 'bold', cursor: prevSong ? 'pointer' : 'default', transition: 'all 0.2s' }}
                        >
                            ⏮ 이전 곡
                        </button>

                        <div style={{ width: '1px', height: '24px', backgroundColor: '#3a3a45' }}></div>

                        <button
                            onClick={() => setIsCinema(true)}
                            style={{ flex: 1.2, padding: '12px 0', background: 'transparent', border: 'none', color: '#ff2d55', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            🎬 전체 화면
                        </button>

                        <div style={{ width: '1px', height: '24px', backgroundColor: '#3a3a45' }}></div>

                        <button
                            onClick={() => nextSong && navigate(`/video/${nextSong.id}`)}
                            disabled={!nextSong}
                            style={{ flex: 1, padding: '12px 0', background: 'transparent', border: 'none', color: nextSong ? '#fff' : '#444', fontSize: '14px', fontWeight: 'bold', cursor: nextSong ? 'pointer' : 'default', transition: 'all 0.2s' }}
                        >
                            다음 곡 ⏭
                        </button>
                    </div>

                    {/* ✨ 기존의 듀얼 스위치 버튼 (실전 vs 스텝 설명) */}
                    <div style={{ display: 'flex', background: '#1c1c26', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
                        <button
                            onClick={() => setViewMode('main')}
                            style={{ flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', backgroundColor: viewMode === 'main' ? '#ff2d55' : 'transparent', color: viewMode === 'main' ? '#fff' : '#888' }}
                        >
                            🎵 음악 맞춰 실전
                        </button>
                        <button
                            onClick={() => setViewMode('tutorial')}
                            style={{ flex: 1, padding: '14px 0', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', backgroundColor: viewMode === 'tutorial' ? '#ff2d55' : 'transparent', color: viewMode === 'tutorial' ? '#fff' : '#888' }}
                        >
                            👣 친절한 스텝 설명
                        </button>
                    </div>

                    {/* 🏷️ 하단 글씨 영역 */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        {videoData.tags && videoData.tags.map((tag, idx) => (
                            <span key={idx} style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px', wordBreak: 'keep-all' }}>
                        {videoData.title}
                    </h1>
                    <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
                        안무가: {videoData.choreographer || '구양희 원장'}
                    </p>

                    <div style={{ padding: '20px', backgroundColor: '#1a1a24', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#ff2d55' }}>📝 원장님의 안무 노트</h3>
                        <p style={{ color: '#ddd', fontSize: '15px', lineHeight: '1.6', margin: 0, wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>
                            {videoData.description || '신나게 스텝을 밟아보세요!'}
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
}