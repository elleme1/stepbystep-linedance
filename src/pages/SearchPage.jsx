import React, { useState } from 'react';
import './SearchPage.css'; // ✨ 검색방 전용 디자인 연결

export default function SearchPage() {
    const [keyword, setKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // 💡 어르신들이 가장 많이 찾는 추천 해시태그 (터치 한 번으로 검색 끝!)
    const popularTags = ['#초급', '#텍사스타임', '#팝송', '#다이어트', '#스트레칭', '#차차차'];

    // 검색 실행 함수 (돋보기 누르거나 해시태그 누를 때 작동)
    const handleSearch = (term) => {
        if (!term) return;
        // '#' 기호가 있으면 떼고 깔끔하게 검색어에 넣기
        const cleanTerm = term.replace('#', '');

        setKeyword(cleanTerm);
        setIsSearching(true);

        // 진짜 앱처럼 0.8초 동안 검색하는 척(로딩) 하다가 결과를 짠! 보여줍니다
        setTimeout(() => {
            setIsSearching(false);
        }, 800);
    };

    return (
        <div className="search-container">

            {/* 1. 큼직한 검색창 영역 */}
            <div className="search-header">
                <div className="search-input-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="안무 제목이나 장르를 검색하세요"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(keyword)}
                    />
                    {/* 글씨가 있을 때만 엑스(X) 버튼이 생겨서 한 번에 지울 수 있게 해줍니다 */}
                    {keyword && (
                        <button className="clear-btn" onClick={() => setKeyword('')}>✕</button>
                    )}
                </div>
            </div>

            {/* 2. 어르신 맞춤형 원터치 해시태그 버튼들 (검색 안 했을 때만 보임) */}
            {!keyword && !isSearching && (
                <div className="recommend-section">
                    <h3 className="section-title">🔥 인기 검색어 (터치해보세요!)</h3>
                    <p className="section-subtitle">자판을 칠 필요 없이 톡! 누르기만 하세요.</p>
                    <div className="tag-cloud">
                        {popularTags.map(tag => (
                            <button
                                key={tag}
                                className="hashtag-btn"
                                onClick={() => handleSearch(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 3. 검색 결과 영역 */}
            <div className="result-section">
                {isSearching ? (
                    // 검색 중일 때 빙글빙글 도는 핑크색 로딩 애니메이션
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>열심히 안무를 찾고 있습니다... 💃</p>
                    </div>
                ) : keyword ? (
                    // 검색이 끝났을 때 보여주는 결과 화면
                    <div className="search-result">
                        <p className="result-info">
                            <strong className="highlight">'{keyword}'</strong> 검색 결과입니다.
                        </p>
                        {/* 데모용 가짜 영상 카드 1 */}
                        <div className="result-card">
                            <div className="result-thumbnail">
                                <span className="play-icon">▶</span>
                            </div>
                            <div className="result-details">
                                <span className="badge">초급</span>
                                <h4 className="result-title">텍사스 타임 (Texas Time)</h4>
                                <p className="result-desc">구양희 원장 · 3개월 전</p>
                            </div>
                        </div>
                        {/* 데모용 가짜 영상 카드 2 */}
                        <div className="result-card">
                            <div className="result-thumbnail" style={{ backgroundColor: '#2a2a35' }}>
                                <span className="play-icon">▶</span>
                            </div>
                            <div className="result-details">
                                <span className="badge">입문</span>
                                <h4 className="result-title">기초 스텝 모음</h4>
                                <p className="result-desc">구양희 원장 · 5개월 전</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // 아무것도 검색 안 했을 때 (초기 화면) 하단 안내
                    <div className="empty-state">
                        <div className="empty-icon">🎧</div>
                        <p>예전에 배웠던 안무가 기억 안 나시나요?</p>
                        <p className="sub-text">위의 핑크색 버튼을 터치해보세요!</p>
                    </div>
                )}
            </div>

        </div>
    );
}