import React from 'react';

export default function BookmarkPanel({ bookmarks, onAdd, onJump, onDelete, formatTime }) {
    return (
        <div className="vd-panel">
            <button className="bookmark-add-btn" onClick={onAdd}
                style={{ marginBottom: bookmarks.length ? '10px' : 0 }}
            >
                ➕ 현재 시점 북마크 추가
            </button>
            {bookmarks.map(bm => (
                <div key={bm.id} className="bookmark-item">
                    <button className="bookmark-time-btn" onClick={() => onJump(bm.time)}>
                        {formatTime(bm.time)}
                    </button>
                    <span className="bookmark-label">{bm.label}</span>
                    <button className="bookmark-delete-btn" onClick={() => onDelete(bm.id)}>✕</button>
                </div>
            ))}
            {bookmarks.length === 0 && (
                <p className="vd-panel__hint">아직 북마크가 없어요</p>
            )}
        </div>
    );
}
