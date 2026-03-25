import React from 'react';

const BPM_PRESETS = [80, 100, 120, 140, 160];

export default function CountPanel({ showCount, onToggle, bpm, onBpmChange }) {
    return (
        <div className="vd-panel">
            <div className="vd-panel__row">
                <button
                    className={`count-toggle-btn ${showCount ? 'count-toggle-btn--active' : ''}`}
                    onClick={onToggle}
                >
                    {showCount ? '⏹ 카운트 끄기' : '▶ 카운트 켜기'}
                </button>
            </div>
            <div className="vd-panel__row--spaced">
                <span className="bpm-label">BPM</span>
                <button className="bpm-round-btn" onClick={() => onBpmChange(Math.max(60, bpm - 5))}>−</button>
                <span className="bpm-value">{bpm}</span>
                <button className="bpm-round-btn" onClick={() => onBpmChange(Math.min(200, bpm + 5))}>+</button>
            </div>
            <div className="vd-panel__row" style={{ marginTop: '8px' }}>
                {BPM_PRESETS.map(b => (
                    <button
                        key={b}
                        className={`bpm-preset-btn ${bpm === b ? 'bpm-preset-btn--active' : ''}`}
                        onClick={() => onBpmChange(b)}
                    >
                        {b}
                    </button>
                ))}
            </div>
        </div>
    );
}
