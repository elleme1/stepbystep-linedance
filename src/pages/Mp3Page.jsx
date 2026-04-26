import React, { useState, useMemo } from 'react';
import songs from '../data/songs';
import { levelText } from '../data/constants';
import './Mp3Page.css';

export default function Mp3Page() {
    const [activeTab, setActiveTab] = useState('트로트'); // '트로트' or '자이브'
    const [playingId, setPlayingId] = useState(null);

    // 현재 선택된 장르에 맞는 곡 필터링
    const displaySongs = useMemo(() => {
        return songs.filter(song => {
            if (activeTab === '트로트') return song.genre === '트로트';
            if (activeTab === '자이브') return song.genre === '자이브';
            return false;
        });
    }, [activeTab]);

    const currentSong = useMemo(() => {
        return playingId ? songs.find(s => s.id === playingId) : null;
    }, [playingId]);

    const getLevelClass = (level) => {
        if (level <= 1) return 'level-easy';
        if (level === 2) return 'level-medium';
        return 'level-hard';
    };

    const handlePlay = (id) => {
        setPlayingId(playingId === id ? null : id);
    };

    const handleAudioEnded = (currentId) => {
        const currentIndex = displaySongs.findIndex(song => song.id === currentId);
        if (currentIndex !== -1 && currentIndex < displaySongs.length - 1) {
            // mp3Url이 있는 다음 곡을 찾아서 재생
            let nextId = null;
            for (let i = currentIndex + 1; i < displaySongs.length; i++) {
                if (displaySongs[i].mp3Url) {
                    nextId = displaySongs[i].id;
                    break;
                }
            }
            setPlayingId(nextId);
        } else {
            // 마지막 곡이거나 다음 곡이 없으면 재생 중지
            setPlayingId(null);
        }
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
                            className={`mp3-list-item ${playingId === song.id ? 'playing' : ''}`}
                            onClick={() => handlePlay(song.id)}
                        >
                            {/* 썸네일 및 재생 오버레이 */}
                            <div className="mp3-thumbnail">
                                <img src={song.thumbnail} alt={song.title} />
                                <div className="mp3-play-overlay">
                                    {playingId === song.id ? '⏸' : '▶'}
                                </div>
                            </div>

                            {/* 곡 정보 */}
                            <div className="mp3-info-wrapper">
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
                                
                                {playingId === song.id && !song.mp3Url && (
                                    <div className="mp3-audio-error" style={{ color: '#ff4b4b', fontSize: '0.85rem', marginTop: '8px' }}>
                                        ⚠️ 준비된 MP3 파일이 없습니다.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 하단 고정 스티키 플레이어 (단일 audio 태그 재사용으로 모바일 자동재생 제한 회피) */}
            {currentSong && currentSong.mp3Url && (
                <div className="mp3-sticky-player">
                    <div className="mp3-sticky-info">
                        <span className="mp3-sticky-title">{currentSong.title}</span>
                        <span className="mp3-sticky-artist">{currentSong.artist}</span>
                    </div>
                    <audio 
                        controls 
                        autoPlay 
                        src={currentSong.mp3Url} 
                        style={{ width: '100%', height: '40px', outline: 'none' }}
                        onEnded={() => handleAudioEnded(currentSong.id)}
                    >
                        브라우저가 오디오 재생을 지원하지 않습니다.
                    </audio>
                </div>
            )}
        </div>
    );
}
