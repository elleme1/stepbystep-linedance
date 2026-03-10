import { useState } from 'react';
import { theoryData, categories } from '../data/theory';
import { useFavorites } from '../context/FavoritesContext';
import { usePractice } from '../context/PracticeContext';

export default function TheoryPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedId, setExpandedId] = useState(null);
    const [search, setSearch] = useState('');
    const [expandedCategories, setExpandedCategories] = useState({});
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState('all');
    const { toggleFavorite, isFavorite } = useFavorites();
    const { togglePracticed, isPracticed, practiceCount } = usePractice();

    const levelFilters = [
        { key: 'all', label: '전체', emoji: '📋' },
        { key: 'beginner', label: '초급', emoji: '🟢' },
        { key: 'silver', label: 'Silver', emoji: '🔵' },
        { key: 'gold', label: 'Gold', emoji: '🟡' },
    ];

    const ITEMS_PER_CATEGORY = 3;

    const filtered = theoryData.filter(item => {
        const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchSearch = search === '' ||
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.shortDesc.toLowerCase().includes(search.toLowerCase());
        const matchFav = !showFavoritesOnly || isFavorite(item.id);
        const matchLevel = selectedLevel === 'all' || !item.level || item.level === selectedLevel;
        return matchCategory && matchSearch && matchFav && matchLevel;
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

    const toggleCategoryExpand = (catKey) => {
        setExpandedCategories(prev => ({ ...prev, [catKey]: !prev[catKey] }));
    };

    // 카테고리별 그룹핑
    const groupedByCategory = categories.filter(c => c.key !== 'all').reduce((acc, cat) => {
        acc[cat.key] = filtered.filter(item => item.category === cat.key);
        return acc;
    }, {});

    const renderCategoryGroup = (catKey, items) => {
        if (items.length === 0) return null;
        const isExpCat = expandedCategories[catKey];
        const visibleItems = isExpCat ? items : items.slice(0, ITEMS_PER_CATEGORY);
        const hasMore = items.length > ITEMS_PER_CATEGORY;
        const cat = categories.find(c => c.key === catKey);
        return { cat, items, visibleItems, hasMore, isExpCat };
    };

    return (
        <div>
            {/* 오늘의 연습 진행률 */}
            {practiceCount > 0 && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-sm) var(--space-md)',
                    marginBottom: 'var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                }}>
                    <span style={{ fontSize: '1.2rem' }}>🏃</span>
                    <span style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 700,
                        color: 'var(--accent-green)',
                    }}>
                        오늘 {practiceCount}개 스텝 연습 완료! 🎉
                    </span>
                </div>
            )}

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
                <button
                    className={`filter-btn ${showFavoritesOnly ? 'active' : ''}`}
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                >
                    ⭐ 즐겨찾기
                </button>
            </div>

            {/* 난이도 서브 필터 (자이브 카테고리 선택 시 또는 전체 보기 시) */}
            {(selectedCategory === 'jive' || selectedCategory === 'all') && (
                <div style={{
                    display: 'flex',
                    gap: 'var(--space-xs)',
                    marginBottom: 'var(--space-md)',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                }}>
                    {levelFilters.map(lf => (
                        <button
                            key={lf.key}
                            className={`filter-btn ${selectedLevel === lf.key ? 'active' : ''}`}
                            onClick={() => setSelectedLevel(lf.key)}
                            style={{ fontSize: 'var(--font-size-xs)', padding: '4px 12px' }}
                        >
                            {lf.emoji} {lf.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Theory Cards - 카테고리별 그룹 렌더링 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                {(selectedCategory === 'all'
                    ? categories.filter(c => c.key !== 'all')
                    : categories.filter(c => c.key === selectedCategory)
                ).map(cat => {
                    const items = filtered.filter(item => item.category === cat.key);
                    if (items.length === 0) return null;
                    const isExpCat = expandedCategories[cat.key];
                    const visibleItems = isExpCat ? items : items.slice(0, ITEMS_PER_CATEGORY);
                    const hasMore = items.length > ITEMS_PER_CATEGORY;

                    return (
                        <div key={cat.key}>
                            {/* 카테고리 헤더 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: 'var(--space-sm)',
                                paddingBottom: '8px',
                                borderBottom: '1px solid var(--border-color)'
                            }}>
                                <span style={{ fontSize: '1.2rem' }}>{cat.emoji}</span>
                                <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--text-primary)' }}>
                                    {cat.label}
                                </h3>
                                <span style={{
                                    fontSize: 'var(--font-size-xs)',
                                    color: 'var(--text-muted)',
                                    background: 'rgba(255,255,255,0.06)',
                                    padding: '2px 8px',
                                    borderRadius: 'var(--radius-full)'
                                }}>
                                    {items.length}개
                                </span>
                            </div>

                            {/* 카드 목록 */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {visibleItems.map((item) => {
                                    const isExpanded = expandedId === item.id;
                                    return (
                                        <div
                                            key={item.id}
                                            className="glass-card"
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                borderLeft: isPracticed(item.id) ? '3px solid var(--accent-green)' : 'none',
                                            }}
                                            onClick={() => toggleItem(item.id)}
                                        >
                                            {/* Header */}
                                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-sm)' }}>
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 700, marginBottom: '2px' }}>
                                                        {item.title}
                                                    </h3>
                                                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                                        {item.shortDesc}
                                                    </p>
                                                </div>
                                                {/* 연습 체크 + 즐겨찾기 */}
                                                <div style={{ display: 'flex', gap: '2px', flexShrink: 0, alignItems: 'center' }}>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); togglePracticed(item.id); }}
                                                        style={{
                                                            background: 'none', border: 'none',
                                                            fontSize: '16px', cursor: 'pointer', padding: '2px',
                                                            transition: 'transform 0.2s ease',
                                                            transform: isPracticed(item.id) ? 'scale(1.15)' : 'scale(1)',
                                                        }}
                                                        title={isPracticed(item.id) ? '연습 취소' : '연습 완료'}
                                                    >
                                                        {isPracticed(item.id) ? '✅' : '⬜'}
                                                    </button>
                                                    {/* 즐겨찾기 버튼 */}
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            fontSize: '18px',
                                                            cursor: 'pointer',
                                                            flexShrink: 0,
                                                            padding: '2px',
                                                            transition: 'transform 0.2s ease',
                                                            transform: isFavorite(item.id) ? 'scale(1.2)' : 'scale(1)',
                                                        }}
                                                        title={isFavorite(item.id) ? '즐겨찾기 해제' : '즐겨찾기'}
                                                    >
                                                        {isFavorite(item.id) ? '⭐' : '☆'}
                                                    </button>
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

                                                    {item.videoUrl ? (
                                                        <div
                                                            style={{
                                                                marginTop: '12px',
                                                                borderRadius: '12px',
                                                                overflow: 'hidden',
                                                                width: '100%',
                                                                aspectRatio: '16 / 9',
                                                                background: '#000',
                                                                position: 'relative'
                                                            }}
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <iframe
                                                                src={`https://www.youtube-nocookie.com/embed/${item.videoUrl}?rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&disablekb=0`}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    border: 'none'
                                                                }}
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                title={item.title}
                                                            />
                                                            {/* 상단 제목/YouTube 링크 차단 오버레이 */}
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                height: '40px',
                                                                pointerEvents: 'auto',
                                                                zIndex: 2,
                                                                cursor: 'default'
                                                            }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} />
                                                            {/* 하단 우측 YouTube 워터마크 차단 */}
                                                            <div style={{
                                                                position: 'absolute',
                                                                bottom: '40px',
                                                                right: 0,
                                                                width: '120px',
                                                                height: '30px',
                                                                pointerEvents: 'auto',
                                                                zIndex: 2,
                                                                cursor: 'default'
                                                            }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} />
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

                            {/* 더보기 / 접기 버튼 */}
                            {
                                hasMore && (
                                    <button
                                        onClick={() => toggleCategoryExpand(cat.key)}
                                        style={{
                                            width: '100%',
                                            marginTop: 'var(--space-sm)',
                                            padding: '10px',
                                            background: 'rgba(255, 255, 255, 0.04)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--accent-purple)',
                                            fontSize: 'var(--font-size-sm)',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {isExpCat
                                            ? `접기 ▲`
                                            : `더보기 (+${items.length - ITEMS_PER_CATEGORY}개) ▼`
                                        }
                                    </button>
                                )
                            }
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {
                filtered.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-emoji">🔍</div>
                        <p>검색 결과가 없습니다</p>
                    </div>
                )
            }

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
                    🧭 방향 {theoryData.filter(t => t.category === 'direction').length}개 ·
                    🕺 자이브 {theoryData.filter(t => t.category === 'jive').length}개
                </p>
            </div>
        </div>
    );
}
