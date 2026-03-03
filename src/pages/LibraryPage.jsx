import { useState } from 'react';
import { Link } from 'react-router-dom';
import songs from '../data/songs';

const levelText = ['자유', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
const genres = ['전체', '컨트리', '라틴', '힙합', '팝', '컨트리록'];
const levels = ['전체', '⭐ 입문', '⭐⭐ 초급', '⭐⭐⭐ 중급'];

export default function LibraryPage() {
    const [search, setSearch] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('전체');
    const [selectedLevel, setSelectedLevel] = useState('전체');

    const filteredSongs = songs.filter((song) => {
        const matchSearch =
            search === '' ||
            song.title.toLowerCase().includes(search.toLowerCase()) ||
            song.artist.toLowerCase().includes(search.toLowerCase());

        const matchGenre = selectedGenre === '전체' || song.genre === selectedGenre;

        const matchLevel =
            selectedLevel === '전체' ||
            (selectedLevel.startsWith('⭐ ') && song.level === 1) ||
            (selectedLevel.startsWith('⭐⭐ ') && song.level === 2) ||
            (selectedLevel.startsWith('⭐⭐⭐ ') && song.level === 3);

        return matchSearch && matchGenre && matchLevel;
    });

    const thisWeekSongs = filteredSongs.filter(s => s.isThisWeek);
    const archivedSongs = filteredSongs.filter(s => !s.isThisWeek);

    const renderSongGrid = (songList) => (
        <div className="library-grid">
            {songList.map((song) => (
                <Link to={`/video/${song.id}`} key={song.id}>
                    <div className="library-item">
                        <div className="library-thumb">
                            <img src={song.thumbnail} alt={song.title} loading="lazy" />
                            <div className="play-btn">
                                <div className="play-circle">
                                    <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="library-item-info">
                            <h3>{song.title}</h3>
                            <div className="library-item-meta">
                                <span>{song.artist}</span>
                                <span className={`level-badge level-${song.level}`}>
                                    {levelText[song.level]}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );

    return (
        <div>
            {/* Search */}
            <div className="library-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="곡명, 아티스트 검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Genre Filter */}
            <div className="library-filters">
                {genres.map((g) => (
                    <button
                        key={g}
                        className={`filter-btn ${selectedGenre === g ? 'active' : ''}`}
                        onClick={() => setSelectedGenre(g)}
                    >
                        {g}
                    </button>
                ))}
            </div>

            {/* Level Filter */}
            <div className="library-filters" style={{ marginBottom: 'var(--space-md)' }}>
                {levels.map((l) => (
                    <button
                        key={l}
                        className={`filter-btn ${selectedLevel === l ? 'active' : ''}`}
                        onClick={() => setSelectedLevel(l)}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {/* This Week Songs Section */}
            {thisWeekSongs.length > 0 && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-sm)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            🎵 이번 주 수업곡 <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 400 }}>{thisWeekSongs.length}곡</span>
                        </h3>
                        <Link to="/playlist" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'var(--gradient-primary)',
                            padding: '5px 14px',
                            borderRadius: 'var(--radius-full)',
                            color: 'white',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}>▶ 연속재생</Link>
                    </div>
                    {renderSongGrid(thisWeekSongs)}
                </>
            )}

            {/* Archived Songs Section */}
            {archivedSongs.length > 0 && (
                <>
                    <div style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-sm)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            📦 보관함 <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', fontWeight: 400 }}>{archivedSongs.length}곡</span>
                        </h3>
                    </div>
                    {renderSongGrid(archivedSongs)}
                </>
            )}

            {/* Empty State */}
            {filteredSongs.length === 0 && (
                <div className="empty-state">
                    <div className="empty-emoji">🔍</div>
                    <p>검색 결과가 없습니다</p>
                </div>
            )}
        </div>
    );
}
