import React, { useState } from 'react';
import { useLocation, LOCATIONS } from '../context/LocationContext';
import './LocationBadge.css';

export default function LocationBadge() {
  const { selectedLocation, setSelectedLocation, locationInfo } = useLocation();
  const [showPicker, setShowPicker] = useState(false);

  if (!locationInfo) return null;

  return (
    <div className="location-badge-wrapper">
      <button
        className="location-badge"
        style={{ '--badge-color': locationInfo.color }}
        onClick={() => setShowPicker(!showPicker)}
      >
        <span className="location-badge-emoji">{locationInfo.emoji}</span>
        <span className="location-badge-name">{locationInfo.name}</span>
        <span className={`location-badge-arrow ${showPicker ? 'open' : ''}`}>▼</span>
      </button>

      {showPicker && (
        <div className="location-picker-dropdown">
          {LOCATIONS.filter(l => l.id !== selectedLocation).map(loc => (
            <button
              key={loc.id}
              className="location-picker-item"
              style={{ '--item-color': loc.color }}
              onClick={() => {
                localStorage.setItem('stepbystep-location', loc.id);
                setSelectedLocation(loc.id);
                setShowPicker(false);
                window.location.reload();
              }}
            >
              <span>{loc.emoji}</span>
              <span>{loc.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
