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

            {/* Results Count */}
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>
                {filteredSongs.length}곡
            </p>

            {/* Grid */}
            {filteredSongs.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-emoji">🔍</div>
                    <p>검색 결과가 없습니다</p>
                </div>
            ) : (
                <div className="library-grid">
                    {filteredSongs.map((song) => (
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
            )}
        </div>
    );
}
