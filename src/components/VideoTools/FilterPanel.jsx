import React from 'react';

export default function FilterPanel({ brightness, contrast, onBrightnessChange, onContrastChange, onReset }) {
    return (
        <div className="vd-panel">
            <div className="filter-row">
                <div className="filter-header">
                    <span className="filter-label">☀️ 밝기</span>
                    <span className="filter-value--pink">{brightness}%</span>
                </div>
                <input
                    type="range" min={50} max={200} value={brightness}
                    onChange={e => onBrightnessChange(Number(e.target.value))}
                    className="filter-slider filter-slider--pink"
                />
            </div>
            <div className="filter-row">
                <div className="filter-header">
                    <span className="filter-label">🔲 대비</span>
                    <span className="filter-value--teal">{contrast}%</span>
                </div>
                <input
                    type="range" min={50} max={200} value={contrast}
                    onChange={e => onContrastChange(Number(e.target.value))}
                    className="filter-slider filter-slider--teal"
                />
            </div>
            <button className="filter-reset-btn" onClick={onReset}>초기화</button>
        </div>
    );
}
