import React from 'react';

export default function BookmarkModal({ bookmark, label, onLabelChange, onConfirm, onCancel, formatTime, inputRef }) {
    if (!bookmark) return null;

    return (
        <div className="bookmark-modal-overlay" onClick={onCancel}>
            <div className="bookmark-modal" onClick={e => e.stopPropagation()}>
                <h3 className="bookmark-modal__title">🔖 북마크 추가</h3>
                <p className="bookmark-modal__subtitle">
                    {formatTime(bookmark.time)} 시점에 메모를 입력하세요
                </p>
                <input
                    ref={inputRef}
                    type="text"
                    value={label}
                    onChange={e => onLabelChange(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') onConfirm();
                        if (e.key === 'Escape') onCancel();
                    }}
                    placeholder="스텝 포인트"
                    className="bookmark-modal__input"
                />
                <div className="bookmark-modal__actions">
                    <button className="bookmark-modal__cancel-btn" onClick={onCancel}>취소</button>
                    <button className="bookmark-modal__save-btn" onClick={onConfirm}>저장</button>
                </div>
            </div>
        </div>
    );
}
