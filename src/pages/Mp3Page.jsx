import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import songs from '../data/songs';
import { levelText } from '../data/constants';
import './Mp3Page.css';

export default function Mp3Page() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('트로트'); // '트로트' or '자이브'

    // 현재 선택된 장르에 맞는 곡 필터링
    const displaySongs = useMemo(() => {
        return songs.filter(song => {
            if (activeTab === '트로트') return song.genre === '트로트';
            if (activeTab === '자이브') return song.genre === '자이브';
            return false;
        });
    }, [activeTab]);

    const getLevelClass = (level) => {
        if (level <= 1) return 'level-easy';
        if (level === 2) return 'level-medium';
        return 'level-hard';
    };

    return (
        <div className="mp3-container">
            {/* 상단 헤더 및 필터 탭 */}
            <div className="mp3-header-wrapper">
                <h1 className="mp3-page-title">🎵 MP3 모음</h1>
                <p className="mp3-page-subtitle">트로트와 자이브 곡들을 모아서 들어보세요.</p>

                <div className="mp3-tab-container">
                    <button
                        className={`mp3-tab ${activeTab === '트로트' ? 'active' : ''}`}
                        onClick={() => setActiveTab('트로트')}
                    >
                        🎤 트로트곡
                    </button>
                    <button
                        className={`mp3-tab ${activeTab === '자이브' ? 'active' : ''}`}
                        onClick={() => setActiveTab('자이브')}
                    >
                        💃 자이브곡
                    </button>
                </div>
            </div>

            {/* 음원 리스트 */}
            <div className="mp3-list">
                {displaySongs.length === 0 ? (
                    <div className="empty-state">
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🥺</div>
                        등록된 {activeTab}곡이 없습니다.
                    </div>
                ) : (
                    displaySongs.map(song => (
                        <div
                            key={song.id}
                            className="mp3-list-item"
                            onClick={() => navigate(`/video/${song.id}`)}
                        >
                            {/* 썸네일 및 재생 오버레이 */}
                            <div className="mp3-thumbnail">
                                <img src={song.thumbnail} alt={song.title} />
                                <div className="mp3-play-overlay">▶</div>
                            </div>

                            {/* 곡 정보 */}
                            <div className="mp3-info">
                                <h3 className="mp3-title">{song.title}</h3>
                                <p className="mp3-artist">{song.artist} {song.choreographer !== 'Unknown' && `· ${song.choreographer}`}</p>
                                
                                <div className="mp3-badges">
                                    <span className="mp3-badge-genre">{song.genre}</span>
                                    <span className={`mp3-badge-level ${getLevelClass(song.level)}`}>
                                        {levelText[song.level]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
