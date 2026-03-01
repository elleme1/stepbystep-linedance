import { useParams, useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import VideoPlayer from '../components/VideoPlayer';

const levelText = ['자유', '⭐ 입문', '⭐⭐ 초급', '⭐⭐⭐ 중급', '⭐⭐⭐⭐ 고급', '⭐⭐⭐⭐⭐ 최상급'];

export default function VideoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const song = songs.find(s => s.id === Number(id));

    if (!song) {
        return (
            <div className="empty-state">
                <div className="empty-emoji">❌</div>
                <p>곡을 찾을 수 없습니다</p>
                <button className="back-button" onClick={() => navigate(-1)}>← 돌아가기</button>
            </div>
        );
    }

    return (
        <div>
            <button className="back-button" onClick={() => navigate(-1)}>
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

            {/* Step Sheet */}
            <div style={{ marginTop: 'var(--space-lg)' }}>
                <div className="section-title">
                    <h2>📋 스텝시트</h2>
                </div>
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
            </div>
        </div>
    );
}
