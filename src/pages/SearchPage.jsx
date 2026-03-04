import { useState } from 'react';
import { Link } from 'react-router-dom';
import songs from '../data/songs';
import { levelStars } from '../data/constants';

const popularSearches = ['Cupid Shuffle', '차차', '컨트리', '입문', 'Bomba'];
const recentSearches = ['Tush Push', '라틴'];

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const results = songs.filter(song =>
        query.length >= 1 && (
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase()) ||
            song.genre.includes(query) ||
            song.choreographer.toLowerCase().includes(query.toLowerCase())
        )
    );

    const handleSearch = (text) => {
        setQuery(text);
        setShowResults(true);
    };

    return (
        <div>
            {/* Search Bar */}
            <div className="search-page-bar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="곡명, 아티스트, 장르로 검색..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                />
                {query && (
                    <button className="search-clear" onClick={() => { setQuery(''); setShowResults(false); }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}
            </div>

            {!showResults || query.length === 0 ? (
                <>
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                        <div style={{ marginBottom: 'var(--space-lg)' }}>
                            <div className="section-title">
                                <h2>🕐 최근 검색</h2>
                            </div>
                            <div className="search-tags">
                                {recentSearches.map(term => (
                                    <button
                                        key={term}
                                        className="search-tag recent"
                                        onClick={() => handleSearch(term)}
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                        <div className="section-title">
                            <h2>🔥 인기 검색</h2>
                        </div>
                        <div className="search-tags">
                            {popularSearches.map((term, idx) => (
                                <button
                                    key={term}
                                    className="search-tag popular"
                                    onClick={() => handleSearch(term)}
                                >
                                    <span className="search-rank">{idx + 1}</span>
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Browse All */}
                    <div style={{ marginTop: 'var(--space-lg)' }}>
                        <div className="section-title">
                            <h2>📚 전체 곡 ({songs.length}곡)</h2>
                        </div>
                        <div className="search-all-list">
                            {songs.map(song => (
                                <Link to={`/video/${song.id}`} key={song.id}>
                                    <div className="glass-card song-card">
                                        <div className="song-thumbnail">
                                            <img src={song.thumbnail} alt={song.title} loading="lazy" />
                                        </div>
                                        <div className="song-info">
                                            <h3>{song.title}</h3>
                                            <div className="song-meta">
                                                <span>{song.artist}</span>
                                                <span className="dot" />
                                                <span>{levelStars[song.level]}</span>
                                                <span className="dot" />
                                                <span>{song.genre}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Search Results */}
                    <p className="search-result-count">
                        "{query}" 검색 결과 {results.length}건
                    </p>

                    {results.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-emoji">🔍</div>
                            <p>검색 결과가 없습니다</p>
                            <p style={{ marginTop: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                다른 키워드로 검색해보세요
                            </p>
                        </div>
                    ) : (
                        <div className="search-results-list">
                            {results.map(song => (
                                <Link to={`/video/${song.id}`} key={song.id}>
                                    <div className="glass-card song-card">
                                        <div className="song-thumbnail">
                                            <img src={song.thumbnail} alt={song.title} loading="lazy" />
                                            <div className="play-overlay">
                                                <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                            </div>
                                        </div>
                                        <div className="song-info">
                                            <h3>{song.title}</h3>
                                            <div className="song-meta">
                                                <span>{song.artist}</span>
                                                <span className="dot" />
                                                <span>{levelStars[song.level]}</span>
                                                <span className="dot" />
                                                <span>{song.genre}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
