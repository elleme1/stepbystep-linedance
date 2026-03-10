import { useState, useEffect } from 'react';

export default function InstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [dismissed, setDismissed] = useState(() => {
        return localStorage.getItem('sbs-install-dismissed') === 'true';
    });
    const [isStandalone, setIsStandalone] = useState(false);

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
        <div style={{
            background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.12) 0%, rgba(91, 141, 217, 0.08) 100%)',
            border: '1px solid rgba(212, 168, 83, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-md)',
            marginBottom: 'var(--space-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            position: 'relative',
        }}>
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
                        ? '공유 버튼(□↑) → "홈 화면에 추가"를 눌러주세요'
                        : '앱처럼 바로 실행할 수 있어요!'
                    }
                </p>
            </div>
            {deferredPrompt && (
                <button
                    onClick={handleInstall}
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
                onClick={handleDismiss}
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
    );
}
