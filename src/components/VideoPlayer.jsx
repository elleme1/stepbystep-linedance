import { useState, useRef } from 'react';
import useYouTubePlayer from './YouTubePlayer/useYouTubePlayer';

export default function VideoPlayer({ youtubeId }) {
    const [speed, setSpeed] = useState(1);
    const [isMirror, setIsMirror] = useState(false);
    const containerRef = useRef(null);

    const speeds = [0.5, 0.75, 0.8, 0.9, 1, 1.25];

    const player = useYouTubePlayer({
        containerRef,
        videoId: youtubeId,
        autoplay: false,
        onReady: (e) => {
            e.target.setPlaybackRate(speed);
        },
    });

    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);
        player.setSpeed(newSpeed);
    };

    return (
        <div>
            <div className={`video-player-wrapper ${isMirror ? 'mirror' : ''}`}>
                <div className="video-container">
                    <div ref={containerRef} />
                </div>
            </div>

            <div className="video-controls">
                {speeds.map((s) => {
                    let label = `${s}x`;
                    if (s === 0.5) label = '½×';
                    if (s === 0.75) label = '¾×';
                    if (s === 0.8) label = '⅘×';
                    if (s === 0.9) label = '9/10×';
                    return (
                        <button
                            key={s}
                            className={`speed-btn ${speed === s ? 'active' : ''}`}
                            onClick={() => handleSpeedChange(s)}
                        >
                            {label}
                        </button>
                    );
                })}
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
