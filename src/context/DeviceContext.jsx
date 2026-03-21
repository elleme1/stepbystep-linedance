import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const isMobile = useMemo(() =>
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    || ('ontouchstart' in window && window.innerWidth < 1024)
  , []);

  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    if (!isMobile) { setIsLandscape(false); return; }
    const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
    check();
    window.addEventListener('resize', check);
    const handleOrientation = () => setTimeout(check, 100);
    window.addEventListener('orientationchange', handleOrientation);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', handleOrientation);
    };
  }, [isMobile]);

  return (
    <DeviceContext.Provider value={{ isMobile, isLandscape }}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevice = () => useContext(DeviceContext);
