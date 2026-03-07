import { useState } from 'react';
import { theoryData, categories } from '../data/theory';

export default function TheoryPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedId, setExpandedId] = useState(null);
    const [search, setSearch] = useState('');

    const filtered = theoryData.filter(item => {
        const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchSearch = search === '' ||
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.shortDesc.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    const toggleItem = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getCategoryEmoji = (category) => {
        const cat = categories.find(c => c.key === category);
        return cat ? cat.emoji : '📚';
    };

    const getCategoryLabel = (category) => {
        const cat = categories.find(c => c.key === category);
        return cat ? cat.label : '';
    };

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
                    placeholder="스텝, 용어 검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Category Filter */}
            <div className="library-filters" style={{ marginBottom: 'var(--space-md)' }}>
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        className={`filter-btn ${selectedCategory === cat.key ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.key)}
                    >
                        {cat.emoji} {cat.label}
                    </button>
                ))}
            </div>

            {/* Theory Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {filtered.map((item) => {
                    const isExpanded = expandedId === item.id;
                    return (
                        <div
                            key={item.id}
                            className="glass-card"
                            style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                            onClick={() => toggleItem(item.id)}
                        >
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: '4px', flexWrap: 'wrap' }}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '2px 8px',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: 'var(--font-size-xs)',
                                            fontWeight: 600,
                                            background: item.category === 'step'
                                                ? 'rgba(212, 168, 83, 0.15)'
                                                : item.category === 'term'
                                                    ? 'rgba(91, 141, 217, 0.15)'
                                                    : 'rgba(16, 185, 129, 0.15)',
                                            color: item.category === 'step'
                                                ? 'var(--accent-purple)'
                                                : item.category === 'term'
                                                    ? 'var(--accent-blue)'
                                                    : 'var(--accent-green)'
                                        }}>
                                            {getCategoryEmoji(item.category)} {getCategoryLabel(item.category)}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, marginBottom: '2px' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                        {item.shortDesc}
                                    </p>
                                </div>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        color: 'var(--text-muted)',
                                        flexShrink: 0,
                                        transition: 'transform 0.3s ease',
                                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                        marginTop: 4
                                    }}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>

                            {/* Expanded Content */}
                            <div style={{
                                maxHeight: isExpanded ? '1200px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.4s ease, padding 0.3s ease',
                                paddingTop: isExpanded ? 'var(--space-md)' : '0'
                            }}>
                                {/* Step-by-step content */}
                                <div style={{
                                    borderTop: '1px solid var(--border-color)',
                                    paddingTop: 'var(--space-md)'
                                }}>
                                    <h4 style={{
                                        fontSize: 'var(--font-size-sm)',
                                        fontWeight: 600,
                                        color: 'var(--accent-purple)',
                                        marginBottom: 'var(--space-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        📋 상세 설명
                                    </h4>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: 'var(--radius-md)',
                                        padding: 'var(--space-md)',
                                        marginBottom: 'var(--space-sm)'
                                    }}>
                                        {item.content.split('\n').map((line, i) => (
                                            <div key={i} style={{
                                                fontSize: 'var(--font-size-sm)',
                                                color: 'var(--text-primary)',
                                                lineHeight: 1.8,
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 'var(--space-sm)'
                                            }}>
                                                {line.match(/^\d|^&|^•/) ? (
                                                    <>
                                                        <span style={{
                                                            color: 'var(--accent-purple)',
                                                            fontWeight: 700,
                                                            flexShrink: 0,
                                                            minWidth: '20px'
                                                        }}>
                                                            {line.split(':')[0] || line.split(' ')[0]}
                                                        </span>
                                                        <span style={{ color: 'var(--text-secondary)' }}>
                                                            {line.includes(':') ? line.split(':').slice(1).join(':').trim() : line.substring(2)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span style={{ color: 'var(--text-secondary)' }}>{line}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tips */}
                                    {item.tips && (
                                        <div style={{
                                            background: 'rgba(212, 168, 83, 0.08)',
                                            border: '1px solid rgba(212, 168, 83, 0.15)',
                                            borderRadius: 'var(--radius-md)',
                                            padding: 'var(--space-md)',
                                        }}>
                                            <div style={{
                                                fontSize: 'var(--font-size-sm)',
                                                fontWeight: 600,
                                                color: 'var(--accent-purple)',
                                                marginBottom: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                💡 팁
                                            </div>
                                            <p style={{
                                                fontSize: 'var(--font-size-xs)',
                                                color: 'var(--text-secondary)',
                                                lineHeight: 1.6
                                            }}>
                                                {item.tips}
                                            </p>
                                        </div>
                                    )}

                                    {/* 영상 또는 GIF placeholder */}
                                    {item.videoUrl ? (
                                        <div
                                            style={{
                                                marginTop: 'var(--space-sm)',
                                                borderRadius: 'var(--radius-md)',
                                                overflow: 'hidden',
                                                position: 'relative',
                                                paddingBottom: '177.78%', /* 9:16 Shorts 비율 */
                                                height: 0,
                                                maxWidth: '280px',
                                                margin: 'var(--space-sm) auto 0'
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <iframe
                                                src={`https://www.youtube.com/embed/${item.videoUrl}?rel=0`}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-md)'
                                                }}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={item.title}
                                            />
                                        </div>
                                    ) : item.gifUrl && (
                                        <div style={{
                                            marginTop: 'var(--space-sm)',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: 'var(--radius-md)',
                                            padding: 'var(--space-lg)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 'var(--space-sm)',
                                            border: '1px dashed var(--border-color)'
                                        }}>
                                            <span style={{ fontSize: '2rem' }}>🎬</span>
                                            <span style={{
                                                fontSize: 'var(--font-size-xs)',
                                                color: 'var(--text-muted)',
                                                textAlign: 'center'
                                            }}>
                                                시범 영상 준비 중
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
                <div className="empty-state">
                    <div className="empty-emoji">🔍</div>
                    <p>검색 결과가 없습니다</p>
                </div>
            )}

            {/* Stats */}
            <div style={{
                marginTop: 'var(--space-lg)',
                padding: 'var(--space-md)',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
            }}>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                    📚 총 {theoryData.length}개 항목 ·
                    👟 스텝 {theoryData.filter(t => t.category === 'step').length}개 ·
                    📖 용어 {theoryData.filter(t => t.category === 'term').length}개 ·
                    🧭 방향 {theoryData.filter(t => t.category === 'direction').length}개
                </p>
            </div>
        </div>
    );
}
