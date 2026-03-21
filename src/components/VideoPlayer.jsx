import { useState, useRef } from 'react';
import useYouTubePlayer from './YouTubePlayer/useYouTubePlayer';

export default function VideoPlayer({ youtubeId }) {
    const [speed, setSpeed] = useState(1);
    const [isMirror, setIsMirror] = useState(false);
    const containerRef = useRef(null);

    const speeds = [0.5, 0.75, 1, 1.25];

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
