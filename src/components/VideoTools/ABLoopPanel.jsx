import React from 'react';

export default function ABLoopPanel({ pointA, pointB, abLoopActive, onSetA, onSetB, onClear, formatTime }) {
    return (
        <div className="vd-panel">
            <div className="vd-panel__row" style={{ alignItems: 'center' }}>
                <button className="ab-btn ab-btn--a" onClick={onSetA}>
                    A 지점 {pointA !== null ? `(${formatTime(pointA)})` : '설정'}
                </button>
                <span className="ab-arrow">→</span>
                <button className="ab-btn ab-btn--b" onClick={onSetB}>
                    B 지점 {pointB !== null ? `(${formatTime(pointB)})` : '설정'}
                </button>
                {abLoopActive && (
                    <button className="ab-btn ab-btn--clear" onClick={onClear}>
                        ✕ 해제
                    </button>
                )}
            </div>
            <p className="vd-panel__hint">
                {!pointA
                    ? '▶ 영상 재생 후 A 지점을 설정하세요'
                    : !pointB
                        ? '▶ B 지점을 설정하면 자동 반복됩니다'
                        : '🔁 A-B 구간 반복 중'}
            </p>
        </div>
    );
}
