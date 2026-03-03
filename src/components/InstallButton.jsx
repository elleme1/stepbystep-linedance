import { useState, useEffect } from 'react';

export default function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    if (!deferredPrompt) return null;

    return (
        <button
            onClick={handleInstallClick}
            style={{
                backgroundColor: '#ff3366', color: 'white',
                padding: '16px 20px', borderRadius: '12px', border: 'none',
                fontWeight: 'bold', fontSize: '16px', width: '100%',
                cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                marginBottom: '20px'
            }}
        >
            📱 스마트폰 홈 화면에 앱 설치하기
        </button>
    );
}
