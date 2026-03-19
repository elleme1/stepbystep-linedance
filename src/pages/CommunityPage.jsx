import React, { useState, useEffect, useRef } from 'react';
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

    // 댓글 관련 상태
    const [openCommentPostId, setOpenCommentPostId] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [commentNickname, setCommentNickname] = useState('');
    const commentInputRef = useRef(null);

    // 🎉 신규 회원 환영 팝업 상태
    const [showWelcome, setShowWelcome] = useState(false);
    const [welcomeName, setWelcomeName] = useState('');
    const [welcomeMsg, setWelcomeMsg] = useState('');

    // 게시글 목록 (localStorage에서 불러오기)
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem('community_posts');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { /* ignore */ }
        }
        return [
            {
                id: 1, category: '📢 공지사항', author: '구양희 원장', isDirector: true, time: '2시간 전',
                content: '회원님들~ 오늘 수업 때 배운 안무 영상이 [영상 보관함]에 업로드 되었습니다! 주말 동안 집에서 영상 보시면서 복습 꼭 해오세요~ 사랑합니다 ❤️',
                image: null, likes: 45, commentList: [
                    { id: 101, author: '초보댄서 영희', time: '1시간 전', text: '감사합니다 원장님! 열심히 복습할게요~ 💪' },
                    { id: 102, author: '스텝여왕 금자', time: '30분 전', text: '영상 올려주셔서 감사해요! 집에서 틀어놓고 연습 중이에요 ㅎㅎ' }
                ], isLiked: false
            },
            {
                id: 2, category: '👋 가입인사', author: '초보댄서 영희', isDirector: false, time: '5시간 전',
                content: '안녕하세요! 이번 달부터 화목 오전반에서 수업 듣게 된 영희입니다. 라인댄스는 처음이라 많이 뚝딱거리지만 잘 부탁드립니다!!',
                image: null, likes: 28, commentList: [
                    { id: 201, author: '구양희 원장', time: '4시간 전', text: '영희님 환영합니다~! 천천히 하면 금방 늘어요 화이팅! 🎉' }
                ], isLiked: true
            },
            {
                id: 3, category: '💃 댄스 수다', author: '스텝여왕 금자', isDirector: false, time: '1일 전',
                content: '어제 새로 산 댄스화 신고 뛰었더니 발이 하나도 안 아프네요 호호~ 다들 무릎 조심하시고 내일 뵙겠습니다.',
                image: null, likes: 15, commentList: [], isLiked: false
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
            commentList: [],
            isLiked: false
        };

        const newPosts = [newPost, ...posts];
        savePosts(newPosts);

        // 모달 닫기 + 초기화
        setShowWriteModal(false);
        setWriteContent('');
        localStorage.setItem('community_nickname', writeNickname.trim());

        showToast('✅ 글이 등록되었습니다!');
        setActiveTab(writeCategory);
    };

    // localStorage에서 저장된 닉네임 불러오기 + 첫 방문 체크
    useEffect(() => {
        const savedNick = localStorage.getItem('community_nickname');
        if (savedNick) {
            setWriteNickname(savedNick);
            setCommentNickname(savedNick);
        } else {
            // 닉네임이 없으면 첫 방문 → 환영 팝업!
            setTimeout(() => setShowWelcome(true), 800);
        }
    }, []);

    // 🎉 환영 팝업 — 가입인사 등록
    const handleWelcomeSubmit = () => {
        if (!welcomeName.trim()) {
            showToast('✋ 닉네임을 입력해 주세요!');
            return;
        }

        // 닉네임 저장
        const nick = welcomeName.trim();
        localStorage.setItem('community_nickname', nick);
        setWriteNickname(nick);
        setCommentNickname(nick);

        // 가입인사 메시지가 있으면 게시글로 등록
        if (welcomeMsg.trim()) {
            const now = new Date();
            const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
            const newPost = {
                id: Date.now(),
                category: '👋 가입인사',
                author: nick,
                isDirector: false,
                time: timeStr,
                content: welcomeMsg.trim(),
                image: null,
                likes: 0,
                commentList: [],
                isLiked: false
            };
            savePosts([newPost, ...posts]);
            setActiveTab('👋 가입인사');
            showToast(`🎉 ${nick}님, 환영합니다! 가입인사가 등록되었어요!`);
        } else {
            showToast(`🎉 ${nick}님, 환영합니다!`);
        }

        setShowWelcome(false);
    };

    // 환영 팝업 건너뛰기
    const handleWelcomeSkip = () => {
        if (welcomeName.trim()) {
            localStorage.setItem('community_nickname', welcomeName.trim());
            setWriteNickname(welcomeName.trim());
            setCommentNickname(welcomeName.trim());
        }
        setShowWelcome(false);
        showToast('언제든 글쓰기로 가입인사 할 수 있어요! 😊');
    };

    // 댓글 창 열릴 때 입력란에 포커스
    useEffect(() => {
        if (openCommentPostId && commentInputRef.current) {
            setTimeout(() => commentInputRef.current?.focus(), 300);
        }
    }, [openCommentPostId]);

    // 글 삭제
    const handleDeletePost = (id) => {
        const newPosts = posts.filter(p => p.id !== id);
        savePosts(newPosts);
        showToast('🗑️ 글이 삭제되었습니다.');
    };

    // 💬 댓글 토글
    const toggleComments = (postId) => {
        if (openCommentPostId === postId) {
            setOpenCommentPostId(null);
        } else {
            setOpenCommentPostId(postId);
            setCommentText('');
        }
    };

    // 💬 댓글 작성
    const handleSubmitComment = (postId) => {
        const nickname = commentNickname.trim() || writeNickname.trim();
        if (!nickname) {
            showToast('✋ 닉네임을 먼저 입력해 주세요!');
            return;
        }
        if (!commentText.trim()) {
            showToast('✋ 댓글 내용을 입력해 주세요!');
            return;
        }

        const now = new Date();
        const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newComment = {
            id: Date.now(),
            author: nickname,
            time: timeStr,
            text: commentText.trim()
        };

        const newPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    commentList: [...(post.commentList || []), newComment]
                };
            }
            return post;
        });

        savePosts(newPosts);
        setCommentText('');
        localStorage.setItem('community_nickname', nickname);
        setCommentNickname(nickname);
        setWriteNickname(nickname);
        showToast('💬 댓글이 등록되었습니다!');
    };

    // 💬 댓글 삭제
    const handleDeleteComment = (postId, commentId) => {
        const newPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    commentList: (post.commentList || []).filter(c => c.id !== commentId)
                };
            }
            return post;
        });
        savePosts(newPosts);
        showToast('🗑️ 댓글이 삭제되었습니다.');
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
                            <button
                                className={`action-btn comment-btn ${openCommentPostId === post.id ? 'comment-active' : ''}`}
                                onClick={() => toggleComments(post.id)}
                            >
                                <span className="icon">💬</span>
                                <span>댓글 {(post.commentList || []).length}</span>
                            </button>
                        </div>

                        {/* 💬 댓글 영역 */}
                        {openCommentPostId === post.id && (
                            <div className="comment-section">
                                {/* 기존 댓글 목록 */}
                                {(post.commentList || []).length > 0 && (
                                    <div className="comment-list">
                                        {(post.commentList || []).map(comment => (
                                            <div key={comment.id} className="comment-item">
                                                <div className="comment-avatar">
                                                    {comment.author.charAt(0)}
                                                </div>
                                                <div className="comment-content">
                                                    <div className="comment-meta">
                                                        <span className="comment-author">{comment.author}</span>
                                                        <span className="comment-time">{comment.time}</span>
                                                    </div>
                                                    <p className="comment-text">{comment.text}</p>
                                                </div>
                                                <button
                                                    className="comment-delete-btn"
                                                    onClick={() => handleDeleteComment(post.id, comment.id)}
                                                >✕</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 댓글 입력 영역 */}
                                <div className="comment-input-area">
                                    {!commentNickname && !writeNickname && (
                                        <input
                                            type="text"
                                            className="comment-nickname-input"
                                            placeholder="닉네임"
                                            value={commentNickname}
                                            onChange={e => setCommentNickname(e.target.value)}
                                            maxLength={20}
                                        />
                                    )}
                                    <div className="comment-input-row">
                                        <div className="comment-input-avatar">
                                            {(commentNickname || writeNickname || '?').charAt(0)}
                                        </div>
                                        <input
                                            ref={commentInputRef}
                                            type="text"
                                            className="comment-input"
                                            placeholder="댓글을 입력하세요..."
                                            value={commentText}
                                            onChange={e => setCommentText(e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                                    handleSubmitComment(post.id);
                                                }
                                            }}
                                            maxLength={200}
                                        />
                                        <button
                                            className="comment-submit-btn"
                                            onClick={() => handleSubmitComment(post.id)}
                                            disabled={!commentText.trim()}
                                        >
                                            등록
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

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

            {/* 🎉 신규 회원 환영 팝업 */}
            {showWelcome && (
                <div className="write-modal-overlay" onClick={handleWelcomeSkip}>
                    <div className="welcome-modal" onClick={e => e.stopPropagation()}>
                        <div className="welcome-header">
                            <div className="welcome-emoji">🎉</div>
                            <h2 className="welcome-title">환영합니다!</h2>
                            <p className="welcome-subtitle">구양희 스텝바이스텝 라인댄스에<br/>오신 것을 환영합니다!</p>
                        </div>

                        <div className="welcome-body">
                            <div className="write-field">
                                <label>닉네임을 알려주세요 ✨</label>
                                <input
                                    type="text"
                                    className="write-input"
                                    placeholder="예: 초보댄서 영희"
                                    value={welcomeName}
                                    onChange={e => setWelcomeName(e.target.value)}
                                    maxLength={20}
                                    autoFocus
                                />
                            </div>

                            <div className="write-field">
                                <label>가입인사를 남겨보세요 💃 <span style={{ color: '#666', fontWeight: 400 }}>(선택)</span></label>
                                <textarea
                                    className="write-textarea"
                                    placeholder="안녕하세요! 오늘부터 함께해요~ 잘 부탁드립니다! 😊"
                                    value={welcomeMsg}
                                    onChange={e => setWelcomeMsg(e.target.value)}
                                    rows={3}
                                    maxLength={300}
                                />
                            </div>
                        </div>

                        <div className="welcome-footer">
                            <button className="write-cancel-btn" onClick={handleWelcomeSkip}>나중에 할게요</button>
                            <button className="write-submit-btn" onClick={handleWelcomeSubmit}>
                                {welcomeMsg.trim() ? '가입인사 등록! 🙌' : '시작하기! 🙌'}
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