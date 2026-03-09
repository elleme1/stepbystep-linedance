import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 🚨 [핵심!] 가짜 마네킹을 버리고, 원장님의 40곡 진짜 보물창고(songs.js)를 드디어 연결합니다!
import songs from '../data/songs';
import { levelStars } from '../data/constants';

export default function SearchPage() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    // 💡 [똑똑한 검색 마법] 원장님이 입력한 글자가 '제목, 안무가, 장르, 레벨'에 있는지 실시간으로 뒤져서 가져옵니다!
    const searchResults = !keyword.trim()
        ? [] // 검색어가 없으면 아무것도 안 띄움
        : songs.filter(song => {
            const term = keyword.toLowerCase();
            // 제목, 아티스트, 안무가, 장르 중 하나라도 검색어가 포함되면 정답(true) 처리!
            const matchTitle = song.title?.toLowerCase().includes(term);
            const matchArtist = song.artist?.toLowerCase().includes(term);
            const matchChoreographer = song.choreographer?.toLowerCase().includes(term);
            const matchGenre = song.genre?.toLowerCase().includes(term);
            // 레벨 매칭 (입문, 초급, 중급 등)
            const levelText = levelStars[song.level]?.text?.toLowerCase() || '';
            const matchLevel = levelText.includes(term);

            return matchTitle || matchArtist || matchChoreographer || matchGenre || matchLevel;
        });

    return (
        <div style={{ backgroundColor: '#0a0a0f', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* 1. 상단 고정 검색바 영역 */}
            <div style={{
                padding: 'max(16px, env(safe-area-inset-top)) 16px 16px',
                borderBottom: '1px solid #1a1a24',
                position: 'sticky', top: 0,
                backgroundColor: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(10px)', zIndex: 50
            }}>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="곡명, 안무가, 장르(초급, 팝) 검색..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                            width: '100%', padding: '14px 40px 14px 44px', borderRadius: '12px',
                            border: '1px solid #2a2a35', backgroundColor: '#1c1c26', color: '#fff',
                            fontSize: '15px', boxSizing: 'border-box', outline: 'none'
                        }}
                        autoFocus
                    />
                    {/* X 버튼 (누르면 검색어 싹 지워짐) */}
                    {keyword && (
                        <button
                            onClick={() => setKeyword('')}
                            style={{
                                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                background: 'none', border: 'none', color: '#888', fontSize: '18px', cursor: 'pointer', padding: '4px'
                            }}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* 2. 하단 결과 영역 */}
            <div style={{ padding: '20px', flex: 1, paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' }}>

                {!keyword.trim() ? (
                    // 검색어 입력 전 (추천 해시태그 띄워주기)
                    <div style={{ textAlign: 'center', marginTop: '60px', color: '#666' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎧</div>
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>
                            찾으시는 곡명이나 안무가,<br />장르를 검색해 보세요.
                        </p>
                        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            {['Why', '입문', '초급', '팝', '발라드'].map(tag => (
                                <button
                                    key={tag} onClick={() => setKeyword(tag)}
                                    style={{ background: '#1c1c26', border: '1px solid #2a2a35', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', color: '#ddd', cursor: 'pointer' }}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : searchResults.length > 0 ? (
                    // 진짜 검색 결과가 있을 때 (원장님의 40곡 창고에서 꺼내온 카드들!)
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#aaa' }}>
                            총 <span style={{ color: '#ff2d55', fontWeight: 'bold' }}>{searchResults.length}</span>개의 곡을 찾았습니다.
                        </p>

                        {searchResults.map(song => (
                            <div
                                key={song.id}
                                onClick={() => navigate(`/video/${song.id}`)}
                                style={{ display: 'flex', gap: '16px', backgroundColor: '#14141d', padding: '12px', borderRadius: '12px', cursor: 'pointer', border: '1px solid #1a1a24' }}
                            >
                                {/* 썸네일 자동 추출 */}
                                <div style={{ width: '120px', height: '68px', borderRadius: '8px', backgroundColor: '#000', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                                    {song.youtubeId ? (
                                        <img
                                            src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`}
                                            alt={song.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '12px' }}>
                                            No Image
                                        </div>
                                    )}
                                    {/* 작은 핑크색 재생 아이콘 */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                        <div style={{ width: '24px', height: '24px', backgroundColor: 'rgba(255,45,85,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '2px', boxSizing: 'border-box' }}>
                                            <span style={{ color: '#fff', fontSize: '10px' }}>▶</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 오른쪽 곡 글씨 정보 */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                                    <div style={{ display: 'flex', gap: '4px', marginBottom: '6px', flexWrap: 'wrap' }}>
                                        {song.genre && (
                                            <span style={{ fontSize: '10px', color: '#ff2d55', backgroundColor: 'rgba(255,45,85,0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                                                {song.genre}
                                            </span>
                                        )}
                                        {levelStars[song.level] && (
                                            <span style={{ fontSize: '10px', color: '#60a5fa', backgroundColor: 'rgba(96,165,250,0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                                                {levelStars[song.level].text}
                                            </span>
                                        )}
                                    </div>
                                    <h3 style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: '600', lineHeight: '1.3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {song.title}
                                    </h3>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {song.choreographer || '안무가 미상'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // 검색 결과가 0개일 때
                    <div style={{ textAlign: 'center', marginTop: '60px', color: '#666' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🥲</div>
                        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.5' }}>
                            '<strong style={{ color: '#fff' }}>{keyword}</strong>'에 대한<br />검색 결과가 없습니다.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}