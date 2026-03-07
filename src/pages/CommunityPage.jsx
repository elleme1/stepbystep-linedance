import React, { useState } from 'react';
import './CommunityPage.css';

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('전체글');
    const tabs = ['전체글', '📢 공지사항', '👋 가입인사', '💃 댄스 수다'];

    // 토스트 알림
    const [toastMsg, setToastMsg] = useState('');
    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 2500);
    };

    // 글쓰기 모달 상태
    const [showWriteModal, setShowWriteModal] = useState(false);
    const [writeCategory, setWriteCategory] = useState('💃 댄스 수다');
    const [writeNickname, setWriteNickname] = useState('');
    const [writeContent, setWriteContent] = useState('');

    // 게시글 목록 (localStorage에서 불러오기)
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('community_posts');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { /* ignore */ }
        }
        return [
            {
                id: 1, category: '📢 공지사항', author: '구향회 원장', isDirector: true, time: '2시간 전',
                content: '회원님들~ 오늘 수업 때 배운 안무 영상이 [영상 보관함]에 업로드 되었습니다! 주말 동안 집에서 영상 보시면서 복습 꼭 해오세요~ 사랑합니다 ❤️',
                image: null, likes: 45, comments: 12, isLiked: false
            },
            {
                id: 2, category: '👋 가입인사', author: '초보댄서 영희', isDirector: false, time: '5시간 전',
                content: '안녕하세요! 이번 달부터 화목 오전반에서 수업 듣게 된 영희입니다. 라인댄스는 처음이라 많이 뚝딱거리지만 잘 부탁드립니다!!',
                image: null, likes: 28, comments: 8, isLiked: true
            },
            {
                id: 3, category: '💃 댄스 수다', author: '스텝여왕 금자', isDirector: false, time: '1일 전',
                content: '어제 새로 산 댄스화 신고 뛰었더니 발이 하나도 안 아프네요 호호~ 다들 무릎 조심하시고 내일 뵙겠습니다.',
                image: null, likes: 15, comments: 3, isLiked: false
            }
        ];
    });

    // 게시글 저장 (변경 시 localStorage에 저장)
    const savePosts = (newPosts) => {
        setPosts(newPosts);
        localStorage.setItem('community_posts', JSON.stringify(newPosts));
    };

    const displayPosts = activeTab === '전체글' ? posts : posts.filter(p => p.category === activeTab);

    const toggleLike = (id) => {
        const newPosts = posts.map(post => {
            if (post.id === id) {
                const newLiked = !post.isLiked;
                if (newLiked) showToast('❤️ 좋아요!');
                return {
                    ...post,
                    isLiked: newLiked,
                    likes: newLiked ? post.likes + 1 : post.likes - 1
                };
            }
            return post;
        });
        savePosts(newPosts);
    };

    // 새 글 작성 제출
    const handleSubmitPost = () => {
        if (!writeNickname.trim()) {
            showToast('✋ 닉네임을 입력해 주세요!');
            return;
        }
        if (!writeContent.trim()) {
            showToast('✋ 내용을 입력해 주세요!');
            return;
        }

        const now = new Date();
        const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newPost = {
            id: Date.now(),
            category: writeCategory,
            author: writeNickname.trim(),
            isDirector: false,
            time: timeStr,
            content: writeContent.trim(),
            image: null,
            likes: 0,
            comments: 0,
            isLiked: false
        };

        const newPosts = [newPost, ...posts];
        savePosts(newPosts);

        // 모달 닫기 + 초기화
        setShowWriteModal(false);
        setWriteContent('');
        // 닉네임은 유지 (다음 글 쓸 때 편하도록)
        localStorage.setItem('community_nickname', writeNickname.trim());

        showToast('✅ 글이 등록되었습니다!');

        // 해당 카테고리로 탭 이동
        setActiveTab(writeCategory);
    };

    // localStorage에서 저장된 닉네임 불러오기
    useState(() => {
        const savedNick = localStorage.getItem('community_nickname');
        if (savedNick) setWriteNickname(savedNick);
    });

    // 글 삭제
    const handleDeletePost = (id) => {
        const newPosts = posts.filter(p => p.id !== id);
        savePosts(newPosts);
        showToast('🗑️ 글이 삭제되었습니다.');
    };

    const writableCategories = ['👋 가입인사', '💃 댄스 수다'];

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
                {displayPosts.length === 0 && (
                    <div className="empty-posts">
                        <p>📝 아직 글이 없습니다.</p>
                        <p>첫 번째 글을 작성해 보세요!</p>
                    </div>
                )}
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
                            {/* 본인 글 삭제 버튼 (원장님 글은 삭제 불가) */}
                            {!post.isDirector && (
                                <button
                                    className="post-delete-btn"
                                    onClick={() => handleDeletePost(post.id)}
                                    title="삭제"
                                >✕</button>
                            )}
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
                            <button
                                className={`action-btn like-btn ${post.isLiked ? 'liked' : ''}`}
                                onClick={() => toggleLike(post.id)}
                            >
                                <span className="icon">{post.isLiked ? '❤️' : '🤍'}</span>
                                <span>좋아요 {post.likes}</span>
                            </button>
                            <button className="action-btn comment-btn" onClick={() => showToast('💬 댓글 기능은 준비 중입니다!')}>
                                <span className="icon">💬</span>
                                <span>댓글 {post.comments}</span>
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* ✏️ 글쓰기 FAB 버튼 */}
            <button
                className="fab-write-btn"
                onClick={() => setShowWriteModal(true)}
            >
                <span className="fab-icon">✏️</span>
                <span className="fab-text">글쓰기</span>
            </button>

            {/* 📝 글쓰기 모달 */}
            {showWriteModal && (
                <div className="write-modal-overlay" onClick={() => setShowWriteModal(false)}>
                    <div className="write-modal" onClick={e => e.stopPropagation()}>
                        <div className="write-modal-header">
                            <h3>✏️ 새 글 쓰기</h3>
                            <button className="write-modal-close" onClick={() => setShowWriteModal(false)}>✕</button>
                        </div>

                        <div className="write-modal-body">
                            {/* 카테고리 선택 */}
                            <div className="write-field">
                                <label>카테고리</label>
                                <div className="write-category-group">
                                    {writableCategories.map(cat => (
                                        <button
                                            key={cat}
                                            className={`write-cat-btn ${writeCategory === cat ? 'active' : ''}`}
                                            onClick={() => setWriteCategory(cat)}
                                        >{cat}</button>
                                    ))}
                                </div>
                            </div>

                            {/* 닉네임 */}
                            <div className="write-field">
                                <label>닉네임</label>
                                <input
                                    type="text"
                                    className="write-input"
                                    placeholder="예: 초보댄서 영희"
                                    value={writeNickname}
                                    onChange={e => setWriteNickname(e.target.value)}
                                    maxLength={20}
                                />
                            </div>

                            {/* 내용 */}
                            <div className="write-field">
                                <label>내용</label>
                                <textarea
                                    className="write-textarea"
                                    placeholder="회원님들과 나누고 싶은 이야기를 적어주세요 💃"
                                    value={writeContent}
                                    onChange={e => setWriteContent(e.target.value)}
                                    rows={5}
                                    maxLength={500}
                                />
                                <span className="write-char-count">{writeContent.length}/500</span>
                            </div>
                        </div>

                        <div className="write-modal-footer">
                            <button className="write-cancel-btn" onClick={() => setShowWriteModal(false)}>취소</button>
                            <button className="write-submit-btn" onClick={handleSubmitPost}>
                                등록하기 ✨
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 토스트 */}
            {toastMsg && (
                <div className="toast-message">
                    {toastMsg}
                </div>
            )}

        </div>
    );
}