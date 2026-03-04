import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import VideoPlayer from '../components/VideoPlayer';
import { levelText } from '../data/constants';

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const song = songs.find(s => s.id === Number(id));
    const [showSteps, setShowSteps] = useState(false);

    // 안전한 뒤로가기: 히스토리가 없으면 영상 목록으로 이동
    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/video', { replace: true });
        }
    };

    if (!song) {
        return (
            <div className="empty-state">
                <div className="empty-emoji">❌</div>
                <p>곡을 찾을 수 없습니다</p>
                <button className="back-button" onClick={goBack}>← 돌아가기</button>
            </div>
        );
    }

    return (
        <div>
            <button className="back-button" onClick={goBack}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                돌아가기
            </button>

            {/* Video Player */}
            <VideoPlayer youtubeId={song.youtubeId} />

            {/* Song Info */}
            <div className="video-info-header">
                <h1>{song.title}</h1>
                <div className="video-info-tags">
                    <span className={`level-badge level-${song.level}`}>
                        {levelText[song.level]}
                    </span>
                    <span className="info-tag">🎵 {song.artist}</span>
                    <span className="info-tag">🎼 BPM {song.bpm}</span>
                    <span className="info-tag">🧱 {song.walls === 0 ? '무한벽' : `${song.walls}벽`}</span>
                    <span className="info-tag">🔢 {song.counts} 카운트</span>
                    <span className="info-tag">🎭 {song.genre}</span>
                    <span className="info-tag">💃 {song.choreographer}</span>
                </div>
            </div>

            {/* Step Sheet Toggle Button */}
            <div style={{ marginTop: 'var(--space-lg)' }}>
                <button
                    className="step-sheet-toggle"
                    onClick={() => setShowSteps(!showSteps)}
                >
                    <span>📋 스텝시트</span>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            width: '20px',
                            height: '20px',
                            transition: 'transform 0.3s ease',
                            transform: showSteps ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                {showSteps && (
                    <div className="step-sheet">
                        {song.steps.map((step, idx) => (
                            <div className="step-item" key={idx}>
                                <div className="step-count">{step.count}</div>
                                <div className="step-content">
                                    <h4>{step.move}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
