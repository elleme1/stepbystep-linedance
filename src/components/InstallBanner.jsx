import { useState, useEffect } from 'react';

export default function InstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [dismissed, setDismissed] = useState(() => {
        return localStorage.getItem('sbs-install-dismissed') === 'true';
    });
    const [isStandalone, setIsStandalone] = useState(false);
    const [showIOSModal, setShowIOSModal] = useState(false);

    useEffect(() => {
        // 이미 설치된 경우 체크
        const standalone = window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
        setIsStandalone(standalone);

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    if (isStandalone || dismissed) return null;

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            if (result.outcome === 'accepted') {
                setDismissed(true);
                localStorage.setItem('sbs-install-dismissed', 'true');
            }
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setDismissed(true);
        localStorage.setItem('sbs-install-dismissed', 'true');
    };

    // iOS에서는 beforeinstallprompt가 없으므로 안내 메시지
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <>
            <div 
                onClick={() => {
                    if (isIOS) setShowIOSModal(true);
                }}
                style={{
                    background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.12) 0%, rgba(91, 141, 217, 0.08) 100%)',
                    border: '1px solid rgba(212, 168, 83, 0.2)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-md)',
                    marginBottom: 'var(--space-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    position: 'relative',
                    cursor: isIOS ? 'pointer' : 'default',
                }}
            >
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>📲</div>
                <div style={{ flex: 1 }}>
                    <p style={{
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '2px',
                    }}>
                        홈 화면에 추가하기
                    </p>
                    <p style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                    }}>
                        {isIOS
                            ? '아이폰 설치 방법 보기 (여기를 누르세요)'
                            : '앱처럼 바로 실행할 수 있어요!'
                        }
                    </p>
                </div>
                {deferredPrompt && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleInstall();
                        }}
                        style={{
                            background: 'var(--gradient-primary)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 'var(--radius-full)',
                            padding: '8px 16px',
                            fontSize: 'var(--font-size-sm)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            flexShrink: 0,
                        }}
                    >
                        설치
                    </button>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss();
                    }}
                    style={{
                        position: 'absolute',
                        top: '6px',
                        right: '8px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '2px',
                    }}
                >
                    ✕
                </button>
            </div>

            {/* iOS 설치 가이드 모달 */}
            {showIOSModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                    padding: '20px',
                    backdropFilter: 'blur(4px)'
                }} onClick={() => setShowIOSModal(false)}>
                    <div style={{
                        backgroundColor: 'var(--bg-card)',
                        padding: '24px',
                        borderRadius: 'var(--radius-xl)',
                        maxWidth: '320px',
                        width: '100%',
                        textAlign: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>🍎 아이폰 설치 방법</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            사파리(Safari)에서 아래 순서대로 눌러주세요.
                        </p>
                        
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '16px',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '16px',
                            textAlign: 'left'
                        }}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'}}>
                                <div style={{
                                    width: '32px', height: '32px', 
                                    background: 'var(--bg-secondary)', 
                                    borderRadius: '50%',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    fontSize: '1.2rem'
                                }}>⍗</div>
                                <div style={{flex: 1}}>
                                    <strong style={{display: 'block', color: 'var(--text-primary)', marginBottom: '4px'}}>1. 공유 버튼 누르기</strong>
                                    <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>화면 맨 아래쪽 화살표 버튼</span>
                                </div>
                            </div>

                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <div style={{
                                    width: '32px', height: '32px', 
                                    background: 'var(--bg-secondary)', 
                                    borderRadius: '8px',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    fontSize: '1.2rem'
                                }}>+</div>
                                <div style={{flex: 1}}>
                                    <strong style={{display: 'block', color: 'var(--text-primary)', marginBottom: '4px'}}>2. 홈 화면에 추가</strong>
                                    <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>메뉴를 조금 올려서 찾아보세요</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowIOSModal(false)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'var(--gradient-primary)',
                                border: 'none',
                                borderRadius: 'var(--radius-full)',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            확인했습니다
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
