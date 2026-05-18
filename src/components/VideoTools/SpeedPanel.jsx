import React from 'react';

const QUALITY_LABELS = {
    small: '240p', default: '360p', medium: '480p',
    large: '720p', hd720: 'HD', hd1080: 'FHD',
};

export default function SpeedPanel({ speed, speeds, onSpeedChange, quality, qualities, onQualityChange }) {
    const formatSpeed = (s) => {
        if (s === 0.25) return '¼×';
        if (s === 0.5) return '½×';
        if (s === 0.75) return '¾×';
        if (s === 0.8) return '⅘×';
        if (s === 0.9) return '9/10×';
        return `${s}×`;
    };

    return (
        <div className="vd-panel">
            <div className="vd-panel__row">
                {speeds.map(s => (
                    <button
                        key={s}
                        className={`speed-btn ${speed === s ? 'speed-btn--active' : ''}`}
                        onClick={() => onSpeedChange(s)}
                    >
                        {formatSpeed(s)}
                    </button>
                ))}
            </div>
            <div className="quality-row">
                {qualities.map(q => (
                    <button
                        key={q}
                        className={`quality-btn ${quality === q ? 'quality-btn--active' : ''}`}
                        onClick={() => onQualityChange(q)}
                    >
                        {QUALITY_LABELS[q]}
                    </button>
                ))}
            </div>
        </div>
    );
}
