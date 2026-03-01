import { useState } from 'react';
import announcements from '../data/announcements';

const categories = ['전체', '수업', '행사', '기타'];

export default function AnnouncePage() {
    const [filter, setFilter] = useState('전체');
    const [expandedId, setExpandedId] = useState(null);

    const filtered = announcements.filter(
        (a) => filter === '전체' || a.category === filter
    );

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diff === 0) return '오늘';
        if (diff === 1) return '어제';
        if (diff < 7) return `${diff}일 전`;

        return dateStr.replace(/-/g, '.');
    };

    return (
        <div>
            {/* Category Filter */}
            <div className="announce-filters">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Announcements List */}
            {filtered.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-emoji">📭</div>
                    <p>공지사항이 없습니다</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    {filtered.map((a) => (
                        <div
                            className="glass-card announce-card"
                            key={a.id}
                            onClick={() => toggleExpand(a.id)}
                        >
                            <div className="announce-header">
                                <div>
                                    <div className="announce-title-row">
                                        {a.isPinned && <span className="pinned-icon">📌</span>}
                                        <span className={`category-badge ${a.category}`}>{a.category}</span>
                                    </div>
                                    <h3 style={{ marginTop: '6px' }}>{a.title}</h3>
                                    <p className="announce-date">{formatDate(a.date)}</p>
                                </div>
                                <svg
                                    className={`announce-expand-icon ${expandedId === a.id ? 'expanded' : ''}`}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                            <div className={`announce-body ${expandedId === a.id ? 'expanded' : ''}`}>
                                <div className="announce-body-content">
                                    {a.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
