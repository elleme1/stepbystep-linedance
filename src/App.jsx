import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 🎨 테마
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PracticeProvider } from './context/PracticeContext';
import { LocationProvider, useLocation } from './context/LocationContext';
import { DeviceProvider } from './context/DeviceContext';
import { DataProvider } from './context/DataContext';
import { ChallengeProvider } from './context/ChallengeContext';

// 🎬 스플래시 화면
import SplashScreen from './components/SplashScreen';
import LocationSelector from './components/LocationSelector';

// 🪟 공통 레이아웃 (상단 타이틀 + 하단 메뉴바를 묶어주는 틀)
import Layout from './components/Layout';

// 📄 메인 4-Tab 화면들
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import TheoryPage from './pages/TheoryPage';
import RecommendPage from './pages/RecommendPage';

// 📄 서브 화면들
import CommunityPage from './pages/CommunityPage';
import SearchPage from './pages/SearchPage';
import VideoDetail from './pages/VideoDetail';
import PlaylistPage from './pages/PlaylistPage';
import AdminPage from './pages/AdminPage';
import ChallengePage from './pages/ChallengePage';

import ReloadPrompt from './ReloadPrompt';

// 🚀 State Reset (충돌 방지 버전 관리)
const APP_VERSION = 'v1.5';
const currentVersion = localStorage.getItem('app_version');
if (currentVersion !== APP_VERSION) {
  // 사용자의 소중한 데이터(커스텀 곡, 즐겨찾기, 연습 기록 등)는 보존!
  const customSongs = localStorage.getItem('custom_songs');
  const favorites = localStorage.getItem('favorites');
  const practiceData = localStorage.getItem('practiceData');
  
  localStorage.clear(); // 기존 설정 초기화
  
  if (customSongs) localStorage.setItem('custom_songs', customSongs);
  if (favorites) localStorage.setItem('favorites', favorites);
  if (practiceData) localStorage.setItem('practiceData', practiceData);
  
  localStorage.setItem('app_version', APP_VERSION);
  console.log(`[App] Version updated to ${APP_VERSION}. Critical user data preserved.`);
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
            <Route path="/video" element={<VideoPage />} />
            <Route path="/theory" element={<TheoryPage />} />
            <Route path="/recommend" element={<RecommendPage />} />

            {/* 서브 경로 */}
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/playlist" element={<PlaylistPage />} />
            <Route path="/challenge/jive" element={<ChallengePage />} />
          </Route>
          
          {/* 👑 관리자 전용 경로 (Layout 외부) */}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <DeviceProvider>
      <DataProvider>
        <ThemeProvider>
          <FavoritesProvider>
            <PracticeProvider>
              <ChallengeProvider>
                <LocationProvider>
                  <AppContent />
                </LocationProvider>
              </ChallengeProvider>
            </PracticeProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </DataProvider>
    </DeviceProvider>
  );
}