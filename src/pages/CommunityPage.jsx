import { useState } from 'react';
import communityPosts from '../data/community';

const categories = ['전체', '자유', '영상공유', 'Q&A'];

export default function CommunityPage() {
    const [filter, setFilter] = useState('전체');

    const filteredPosts = communityPosts.filter(
        p => filter === '전체' || p.category === filter
    );

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
            {/* Category Tabs */}
            <div className="community-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat === 'Q&A' ? '❓ Q&A' : cat === '영상공유' ? '🎬 영상' : cat === '자유' ? '💬 자유' : '전체'}
                    </button>
                ))}
            </div>

            {/* Posts */}
            {filteredPosts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-emoji">📭</div>
                    <p>게시글이 없습니다</p>
                </div>
            ) : (
                <div className="community-feed">
                    {filteredPosts.map(post => (
                        <div className="glass-card community-post" key={post.id}>
                            {/* Author Row */}
                            <div className="post-author-row">
                                <div className="post-avatar">{post.authorEmoji}</div>
                                <div className="post-author-info">
                                    <span className="post-author-name">{post.author}</span>
                                    <span className="post-date">{formatDate(post.date)}</span>
                                </div>
                                <span className={`category-badge ${post.category === '자유' ? '기타' : post.category === '영상공유' ? '행사' : '수업'}`}>
                                    {post.category}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-content">{post.content}</p>

                            {/* Video indicator */}
                            {post.hasVideo && (
                                <div className="post-video-indicator">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    <span>영상 포함</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="post-actions">
                                <button className={`post-action-btn ${post.isLiked ? 'liked' : ''}`}>
                                    <svg viewBox="0 0 24 24" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    <span>{post.likes}</span>
                                </button>
                                <button className="post-action-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    <span>{post.comments}</span>
                                </button>
                                <button className="post-action-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="18" cy="5" r="3" />
                                        <circle cx="6" cy="12" r="3" />
                                        <circle cx="18" cy="19" r="3" />
                                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* FAB - Write Button */}
            <button className="community-fab" onClick={() => { }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    );
}
