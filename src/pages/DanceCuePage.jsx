import React, { useState } from 'react';

// 🎚️ 댄스 큐 — 수업 현장용 독립 앱(dance-instructor-player) 런처.
//    자이브 코너의 서브탭이었다가 하단 메뉴로 승격(이식). 강사 전용이라
//    비밀번호 게이트를 거친 뒤 새 탭으로 연다. 스텝앱과 데이터·인증 독립.
export default function DanceCuePage() {
    const DANCE_CUE_APP_URL = 'https://dance-instructor-player.vercel.app/';
    const DANCE_CUE_PAGE_PASSWORD = import.meta.env.VITE_DANCE_CUE_PAGE_PASSWORD || '0402';
    const [cuePassword, setCuePassword] = useState('');
    // 잠금 해제는 기기당 1회 — 탭을 잠깐 다녀와도 비번을 다시 묻지 않게 영속화
    // (자이브 방 'jive-gate-ok'와 동일 패턴, App.jsx PRESERVE_KEYS 등록)
    const [cueUnlocked, setCueUnlocked] = useState(() => localStorage.getItem('dance-cue-gate-ok') === '1');
    const [cueError, setCueError] = useState(false);

    return (
        <div style={{ padding: '20px 16px calc(90px + env(safe-area-inset-bottom))', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '14px', marginBottom: '14px', border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.03)' }}>
                    <span style={{ fontSize: '1.3rem' }}>🎚️</span>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary, #e8e8f0)', margin: 0, flex: 1 }}>댄스 큐</h2>
                    <span style={{ fontSize: '.72rem', color: '#a0a0c0', border: '1px solid rgba(255,255,255,.15)', borderRadius: '999px', padding: '3px 10px', whiteSpace: 'nowrap' }}>강사 전용 · 독립 앱</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '14px', padding: '20px' }}>
                    <p style={{ fontSize: '.85rem', color: '#a0a0c0', marginBottom: '18px', lineHeight: '1.6' }}>
                        수업 현장용 <strong>댄스 큐</strong> 앱으로 연결됩니다. 스텝앱과는 <strong>독립된 별도 앱</strong>이며 강사 전용이라 비밀번호가 필요합니다.
                    </p>

                    {!cueUnlocked ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (cuePassword === DANCE_CUE_PAGE_PASSWORD) {
                                    localStorage.setItem('dance-cue-gate-ok', '1');
                                    setCueUnlocked(true);
                                    setCueError(false);
                                } else {
                                    setCueError(true);
                                }
                            }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                        >
                            <input
                                type="password"
                                inputMode="numeric"
                                placeholder="비밀번호 입력"
                                value={cuePassword}
                                onChange={(e) => { setCuePassword(e.target.value); setCueError(false); }}
                                autoFocus
                                style={{
                                    width: '100%', padding: '14px', borderRadius: '12px',
                                    border: `1px solid ${cueError ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
                                    background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '1.05rem',
                                    textAlign: 'center', letterSpacing: '0.3em', outline: 'none', boxSizing: 'border-box',
                                }}
                            />
                            {cueError && (
                                <div style={{ fontSize: '.8rem', color: '#ef4444', textAlign: 'center' }}>
                                    비밀번호가 올바르지 않습니다.
                                </div>
                            )}
                            <button
                                type="submit"
                                style={{
                                    width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                                    background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff',
                                    fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
                                }}
                            >🔓 잠금 해제</button>
                        </form>
                    ) : (
                        /* 잠금 해제 → 큐앱을 화면 '안에' 끼워 넣는다.
                           새 탭으로 내보내면 (특히 설치형 PWA에서) 스텝앱으로 돌아올
                           단추가 없어 갇히는 문제가 있었음 — 여기서는 하단 메뉴가
                           그대로 살아 있어 언제든 다른 탭으로 나갈 수 있다. */
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{
                                width: '100%', height: 'calc(100dvh - 320px)', minHeight: '420px',
                                borderRadius: '14px', overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,.12)', background: '#000',
                            }}>
                                <iframe
                                    src={DANCE_CUE_APP_URL}
                                    title="댄스 큐"
                                    allow="autoplay; fullscreen; encrypted-media"
                                    allowFullScreen
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                />
                            </div>
                            <div style={{ fontSize: '.75rem', color: '#10b981', textAlign: 'center', fontWeight: 600 }}>
                                ✅ 아래 메뉴를 누르면 언제든 다른 화면으로 이동할 수 있습니다.
                            </div>
                            <button
                                onClick={() => window.open(DANCE_CUE_APP_URL, '_blank', 'noopener,noreferrer')}
                                style={{
                                    width: '100%', padding: '10px', borderRadius: '10px',
                                    border: '1px solid rgba(139,92,246,0.4)', background: 'transparent',
                                    color: '#a78bfa', fontSize: '.85rem', fontWeight: 700, cursor: 'pointer',
                                }}
                            >🔗 새 창에서 크게 열기</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
