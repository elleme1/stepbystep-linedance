import React from 'react';

const TOOLS = [
    { key: 'speed', label: '🐢 속도', toggle: true },
    { key: 'ab', label: '🔁 구간', toggle: true },
    { key: 'count', label: '🥁 카운트', toggle: true },
    { key: 'bookmark', label: '🔖 북마크', toggle: true },
    { key: 'filter', label: '🔆 화면', toggle: true },
];

export default function ToolBar({
    activeTool, setActiveTool,
    isMirror, onToggleMirror,
    onTogglePip, onShare,
}) {
    const toggleTool = (key) => setActiveTool(activeTool === key ? null : key);

    return (
        <div className="tool-bar">
            {TOOLS.map(({ key, label }) => (
                <button
                    key={key}
                    className={`tool-btn ${activeTool === key ? 'tool-btn--active' : ''}`}
                    onClick={() => toggleTool(key)}
                >
                    {label}
                </button>
            ))}
            <button
                className={`tool-btn ${isMirror ? 'tool-btn--active' : ''}`}
                onClick={onToggleMirror}
            >
                🪞 거울
            </button>
            <button className="tool-btn" onClick={onTogglePip}>📌 팝업</button>
            <button className="tool-btn" onClick={onShare}>🔗 공유</button>
        </div>
    );
}
