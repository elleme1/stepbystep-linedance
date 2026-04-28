import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 🎨 테마
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PracticeProvider } from './context/PracticeContext';
import { LocationProvider, useLocation } from './context/LocationContext';
import { DeviceProvider } from './context/DeviceContext';

// 🎬 스플래시 화면
import SplashScreen from './components/SplashScreen';
import LocationSelector from './components/LocationSelector';

// 🪟 공통 레이아웃 (상단 타이틀 + 하단 메뉴바를 묶어주는 틀)
import Layout from './components/Layout';

// 📄 메인 4-Tab 화면들
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import VideoPage from './pages/VideoPage';
import TheoryPage from './pages/TheoryPage';
import RecommendPage from './pages/RecommendPage';

// 📄 서브 화면들
import CommunityPage from './pages/CommunityPage';
import SearchPage from './pages/SearchPage';
import VideoDetail from './pages/VideoDetail';
import PlaylistPage from './pages/PlaylistPage';

import ReloadPrompt from './ReloadPrompt';

// 🚀 State Reset (충돌 방지 버전 관리)
const APP_VERSION = 'v1.2';
const currentVersion = localStorage.getItem('app_version');
if (currentVersion !== APP_VERSION) {
  localStorage.clear(); // 기존 데이터 모두 초기화
  localStorage.setItem('app_version', APP_VERSION);
  console.log(`[App] Version updated to ${APP_VERSION}. LocalStorage cleared.`);
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);
  const { isLocationSelected, setSelectedLocation } = useLocation();

  return (
    <>
      <ReloadPrompt />
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      {/* 📍 장소 미선택 시 선택 화면 표시 */}
      {!showSplash && !isLocationSelected && (
        <LocationSelector onSelect={setSelectedLocation} />
      )}

      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>

            {/* 메인 4-Tab 경로 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/theory" element={<TheoryPage />} />
            <Route path="/recommend" element={<RecommendPage />} />

            {/* 서브 경로 */}
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/playlist" element={<PlaylistPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <DeviceProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <PracticeProvider>
            <LocationProvider>
              <AppContent />
            </LocationProvider>
          </PracticeProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </DeviceProvider>
  );
}