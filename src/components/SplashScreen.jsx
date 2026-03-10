import { useState, useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
    const [phase, setPhase] = useState('enter'); // enter → show → exit

    useEffect(() => {
        // 로고 등장 애니메이션 후 잠시 유지
        const showTimer = setTimeout(() => setPhase('show'), 100);
        // 페이드아웃 시작
        const exitTimer = setTimeout(() => setPhase('exit'), 2000);
        // 완전히 사라진 후 콜백
        const finishTimer = setTimeout(() => onFinish(), 2600);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(exitTimer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(160deg, #0a0a0f 0%, #1a1025 40%, #0d1117 100%)',
            opacity: phase === 'exit' ? 0 : 1,
            transition: 'opacity 0.6s ease-out',
        }}>
            {/* 배경 장식 원 */}
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 168, 83, 0.08) 0%, transparent 70%)',
                filter: 'blur(40px)',
                animation: 'splashGlow 2s ease-in-out infinite alternate',
            }} />

            {/* 댄서 이모지 */}
            <div style={{
                fontSize: '4rem',
                opacity: phase === 'enter' ? 0 : 1,
                transform: phase === 'enter' ? 'scale(0.5) rotate(-20deg)' : 'scale(1) rotate(0deg)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                marginBottom: '16px',
                filter: 'drop-shadow(0 0 20px rgba(212, 168, 83, 0.4))',
            }}>
                💃
            </div>

            {/* 앱 이름 */}
            <div style={{
                opacity: phase === 'enter' ? 0 : 1,
                transform: phase === 'enter' ? 'translateY(20px)' : 'translateY(0)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s',
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #d4a853 0%, #f0d48a 50%, #d4a853 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.05em',
                    textAlign: 'center',
                    margin: 0,
                }}>
                    Step by Step
                </h1>
            </div>

            {/* 서브 텍스트 */}
            <div style={{
                opacity: phase === 'enter' ? 0 : 1,
                transform: phase === 'enter' ? 'translateY(15px)' : 'translateY(0)',
                transition: 'all 0.7s ease 0.6s',
            }}>
                <p style={{
                    fontSize: '0.85rem',
                    color: 'rgba(212, 168, 83, 0.6)',
                    letterSpacing: '0.15em',
                    marginTop: '8px',
                    fontWeight: 500,
                }}>
                    한 걸음씩 배우는 라인댄스
                </p>
            </div>

            {/* 하단 점 애니메이션 */}
            <div style={{
                position: 'absolute',
                bottom: '80px',
                display: 'flex',
                gap: '8px',
                opacity: phase === 'enter' ? 0 : 0.6,
                transition: 'opacity 0.5s ease 0.9s',
            }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#d4a853',
                        animation: `splashDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                ))}
            </div>

            {/* 키프레임 애니메이션 */}
            <style>{`
                @keyframes splashGlow {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.2); opacity: 0.8; }
                }
                @keyframes splashDot {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
