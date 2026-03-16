import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songs from '../data/songs';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState('main');
    const [isCinema, setIsCinema] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setViewMode('main');
        setIsCinema(false);
    }, [id]);

    const currentIndex = songs.findIndex(song => String(song.id) === String(id));
    const videoData = currentIndex !== -1 ? songs[currentIndex] : songs[0];

    const prevSong = currentIndex > 0 ? songs[currentIndex - 1] : null;
    const nextSong = currentIndex < songs.length - 1 ? songs[currentIndex + 1] : null;

    // 💡 [기적의 인공지능 번역기] 원장님이 긴 주소를 통째로 넣어도 11자리 암호만 쏙! 뽑아냅니다.
    const extractVideoId = (url) => {
        if (!url) return '';
        const str = String(url).trim();
        // 이미 11자리 암호만 예쁘게 넣었다면 그대로 통과!
        if (str.length === 11 && !str.includes('/')) return str;
        // 긴 주소를 넣었다면 여기서 11자리 암호만 족집게처럼 적출!
        const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? match[1] : str;
    };

    // mainVideoId나 youtubeId 어떤 이름표를 썼든 다 찾아옵니다.
    const rawMainId = videoData.mainVideoId || videoData.youtubeId || '';
    const rawTutorialId = videoData.tutorialVideoId || videoData.tutorialId || rawMainId;

    const currentRawId = viewMode === 'main' ? rawMainId : rawTutorialId;
    const currentVideoId = extractVideoId(currentRawId); // 번역기 통과!

    const cinemaStyle = isCinema ? {
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 99999, backgroundColor: '#000', display: 'flex', flexDirection: 'column'
    } : {
        width: '100%', aspectRatio: '16/9', backgroundColor: '#000', position: 'relative'
    };

    return (
        <div style={isCinema ? cinemaStyle : { backgroundColor: '#0a0a0f', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>

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

                {currentVideoId ? (
                    <iframe
                        width="100%"
                        height="100%"
                        // 🚨 아이폰 먹통 방지를 위해 오리지널 youtube.com 주소 사용!
                        src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=${isCinema ? 1 : 0}&rel=0&playsinline=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    ></iframe>
                ) : (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '14px' }}>
                        영상을 불러오는 중입니다...
                    </div>
                )}

                {isCinema && (
                    <button
                        onClick={() => setIsCinema(false)}
                        style={{ position: 'absolute', top: 'max(20px, env(safe-area-inset-top))', right: '20px', background: 'rgba(255,45,85,0.8)', border: 'none', color: '#fff', padding: '10px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', zIndex: 10000, backdropFilter: 'blur(5px)' }}
                    >
                        ✕ 화면 작게
                    </button>
                )}
            </div>

            {!isCinema && (
                <div style={{ padding: '24px 20px', flex: 1, paddingBottom: 'calc(24px + env(safe-area-inset-bottom))' }}>

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