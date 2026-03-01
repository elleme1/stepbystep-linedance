import { useState, useRef, useEffect } from 'react';

export default function VideoPlayer({ youtubeId }) {
    const [speed, setSpeed] = useState(1);
    const [isMirror, setIsMirror] = useState(false);
    const playerRef = useRef(null);
    const iframeRef = useRef(null);

    const speeds = [0.5, 0.75, 1, 1.25];

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(tag, firstScript);
        }

        const initPlayer = () => {
            if (window.YT && window.YT.Player && iframeRef.current) {
                playerRef.current = new window.YT.Player(iframeRef.current, {
                    videoId: youtubeId,
                    playerVars: {
                        rel: 0,
                        modestbranding: 1,
                        playsinline: 1,
                    },
                    events: {
                        onReady: (event) => {
                            event.target.setPlaybackRate(speed);
                        }
                    }
                });
            }
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
            }
        };
    }, [youtubeId]);

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
        if (playerRef.current && playerRef.current.setPlaybackRate) {
            playerRef.current.setPlaybackRate(newSpeed);
        }
    };

    return (
        <div>
            <div className={`video-player-wrapper ${isMirror ? 'mirror' : ''}`}>
                <div className="video-container">
                    <div ref={iframeRef} />
                </div>
            </div>

            <div className="video-controls">
                {speeds.map((s) => (
                    <button
                        key={s}
                        className={`speed-btn ${speed === s ? 'active' : ''}`}
                        onClick={() => handleSpeedChange(s)}
                    >
                        {s}x
                    </button>
                ))}
                <button
                    className={`mirror-btn ${isMirror ? 'active' : ''}`}
                    onClick={() => setIsMirror(!isMirror)}
                >
                    🪞 거울모드
                </button>
            </div>
        </div>
    );
}
