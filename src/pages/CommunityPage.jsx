import React, { useState } from 'react';
import './CommunityPage.css';

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('전체글');
    const tabs = ['전체글', '📢 공지사항', '👋 가입인사', '💃 댄스 수다'];

    // ✨ [핵심 해결책] 팝업 오류를 막고 예쁜 진짜 앱 알림(Toast)을 띄워주는 기능
    const [toastMsg, setToastMsg] = useState('');
    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 2500); // 2.5초 뒤에 스르륵 사라집니다
    };

    const [posts, setPosts] = useState([
        {
            id: 1, category: '📢 공지사항', author: '구양희 원장', isDirector: true, time: '2시간 전',
            content: '회원님들~ 오늘 수업 때 배운 "텍사스 타임" 영상이 [영상 보관함]에 업로드 되었습니다! 주말 동안 집에서 영상 보시면서 복습 꼭 해오세요~ 사랑합니다 ❤️',
            image: null, likes: 45, comments: 12, isLiked: false
        },
        {
            id: 2, category: '👋 가입인사', author: '초보댄서 영희', isDirector: false, time: '5시간 전',
            content: '안녕하세요! 이번 달부터 화목 오전반에서 수업 듣게 된 영희입니다. 라인댄스는 처음이라 많이 뚝딱거리지만 잘 부탁드립니다!!',
            image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=400',
            likes: 28, comments: 8, isLiked: true
        },
        {
            id: 3, category: '💃 댄스 수다', author: '스텝여왕 금자', isDirector: false, time: '1일 전',
            content: '어제 새로 산 댄스화 신고 뛰었더니 발이 하나도 안 아프네요 호호~ 다들 무릎 조심하시고 내일 뵙겠습니다.',
            image: null, likes: 15, comments: 3, isLiked: false
        }
    ]);

    const displayPosts = activeTab === '전체글' ? posts : posts.filter(p => p.category === activeTab);

    const toggleLike = (id) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                const newLiked = !post.isLiked;
                // ❤️ 하트를 누르면 칭찬 알림이 뜹니다!
                if (newLiked) showToast('❤️ 게시글에 좋아요를 눌렀습니다!');
                return {
                    ...post,
                    isLiked: newLiked,
                    likes: newLiked ? post.likes + 1 : post.likes - 1
                };
            }
            return post;
        }));
    };

    return (
        <div className="community-container">

            <div className="community-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`comm-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="post-list">
                {displayPosts.map(post => (
                    <div key={post.id} className={`post-card ${post.isDirector ? 'director-card' : ''}`}>

                        <div className="post-header">
                            <div className={`post-avatar ${post.isDirector ? 'director-avatar' : ''}`}>
                                {post.isDirector ? '👑' : post.author.charAt(0)}
                            </div>
                            <div className="post-author-info">
                                <div className="author-name-row">
                                    <span className="post-author">{post.author}</span>
                                    {post.isDirector && <span className="director-badge">원장님</span>}
                                </div>
                                <span className="post-time">{post.time} · {post.category}</span>
                            </div>
                        </div>

                        <div className="post-body">
                            <p className="post-text">{post.content}</p>
                            {post.image && (
                                <div className="post-image-wrapper">
                                    <img src={post.image} alt="첨부 사진" className="post-image" />
                                </div>
                            )}
                        </div>

                        <div className="post-footer">
                            {/* ❤️ 하트 버튼 */}
                            <button
                                className={`action-btn like-btn ${post.isLiked ? 'liked' : ''}`}
                                onClick={() => toggleLike(post.id)}
                            >
                                <span className="icon">{post.isLiked ? '❤️' : '🤍'}</span>
                                <span>좋아요 {post.likes}</span>
                            </button>

                            {/* 💬 오류를 일으키던 옛날 팝업(alert)을 지우고, 예쁜 토스트 창으로 변경! */}
                            <button className="action-btn comment-btn" onClick={() => showToast('💬 [댓글 쓰기] 기능은 준비 중입니다!')}>
                                <span className="icon">💬</span>
                                <span>댓글 {post.comments}</span>
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* ✏️ 글쓰기 버튼도 토스트 알림창으로 변경! */}
            <button
                className="fab-write-btn"
                onClick={() => showToast('✍️ [새 글 쓰기] 화면을 준비 중입니다!')}
            >
                <span className="fab-icon">✏️</span>
                <span className="fab-text">글쓰기</span>
            </button>

            {/* ✨ [핵심] 화면 아래에서 스르륵 나타나는 진짜 앱 알림창 (Toast) */}
            {toastMsg && (
                <div className="toast-message">
                    {toastMsg}
                </div>
            )}

        </div>
    );
}