import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import { levelText } from '../data/constants';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('main');

    // songs.js에서 해당 id의 곡 데이터를 자동으로 가져옵니다!
    const song = songs.find(s => s.id === Number(id)) || songs[0];

    // 실전 영상은 songs.js의 youtubeId, 튜토리얼은 나중에 추가 가능
    const currentVideoId = viewMode === 'main' ? song.youtubeId : (song.tutorialId || song.youtubeId);

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

                {/* 🏷️ 태그 */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                        {song.genre}
                    </span>
                    <span style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                        {levelText[song.level]}
                    </span>
                    {song.isThisWeek && (
                        <span style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                            이번주 수업곡
                        </span>
                    )}
                </div>

                <h1 style={{ fontSize: '22px', fontWeight: '800', lineHeight: '1.4', marginBottom: '8px', wordBreak: 'keep-all' }}>
                    {song.title}
                </h1>
                <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '24px' }}>
                    🎵 {song.artist} · 💃 {song.choreographer}
                </p>

                {/* � 안무 정보 */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#1a1a24', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#ccc' }}>
                        🎼 BPM {song.bpm}
                    </span>
                    <span style={{ background: '#1a1a24', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#ccc' }}>
                        🧱 {song.walls === 0 ? '무한벽' : `${song.walls}벽`}
                    </span>
                    <span style={{ background: '#1a1a24', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#ccc' }}>
                        🔢 {song.counts} 카운트
                    </span>
                </div>

                {/* 📝 스텝시트 */}
                <div style={{ padding: '20px', backgroundColor: '#1a1a24', borderRadius: '12px', border: '1px solid #2a2a35' }}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#ff2d55' }}>📝 스텝시트</h3>
                    {song.steps.map((step, idx) => (
                        <div key={idx} style={{
                            display: 'flex', gap: '12px', marginBottom: idx < song.steps.length - 1 ? '14px' : 0,
                            paddingBottom: idx < song.steps.length - 1 ? '14px' : 0,
                            borderBottom: idx < song.steps.length - 1 ? '1px solid #2a2a35' : 'none'
                        }}>
                            <span style={{
                                flexShrink: 0, background: '#ff2d55', color: '#fff',
                                padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold',
                                height: 'fit-content'
                            }}>
                                {step.count}
                            </span>
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#fff' }}>{step.move}</p>
                                <p style={{ margin: 0, fontSize: '14px', color: '#aaa', lineHeight: '1.5' }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}