import React from 'react';
import { LOCATIONS } from '../context/LocationContext';
import './LocationSelector.css';

export default function LocationSelector({ onSelect }) {
  return (
    <div className="location-selector-overlay">
      <div className="location-selector-container">
        {/* 헤더 */}
        <div className="location-selector-header">
          <div className="location-selector-icon">💃</div>
          <h1 className="location-selector-title">어디서 수업하세요?</h1>
          <p className="location-selector-subtitle">
            수업 장소를 선택하시면<br />
            맞춤 수업 영상을 보여드려요!
          </p>
        </div>

        {/* 장소 카드들 */}
        <div className="location-cards">
          {LOCATIONS.map(loc => (
            <button
              key={loc.id}
              className="location-card"
              style={{ '--loc-color': loc.color }}
              onClick={() => onSelect(loc.id)}
            >
              <span className="location-card-emoji">{loc.emoji}</span>
              <span className="location-card-name">{loc.name}</span>
              <span className="location-card-desc">{loc.desc}</span>
              <span className="location-card-arrow">→</span>
            </button>
          ))}
        </div>

        <p className="location-selector-hint">
          💡 나중에 언제든 변경할 수 있어요
        </p>
      </div>
    </div>
  );
}
