import React, { createContext, useContext, useState, useEffect } from 'react';

// 수업 장소 정의
export const LOCATIONS = [
  { id: 'kororong', name: '코로롱 센터', emoji: '🏢', color: '#8B5CF6', desc: '코로롱 문화센터 수업' },
  { id: 'sindun', name: '신둔면', emoji: '🏡', color: '#D4A853', desc: '신둔면 수업' },
];

const STORAGE_KEY = 'stepbystep-location';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  // localStorage 동기화
  useEffect(() => {
    try {
      if (selectedLocation) {
        localStorage.setItem(STORAGE_KEY, selectedLocation);
      }
    } catch {
      // localStorage 사용 불가 환경 무시
    }
  }, [selectedLocation]);

  const locationInfo = LOCATIONS.find(l => l.id === selectedLocation) || null;

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      setSelectedLocation,
      locationInfo,
      locations: LOCATIONS,
      isLocationSelected: !!selectedLocation,
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
}

export default LocationContext;
