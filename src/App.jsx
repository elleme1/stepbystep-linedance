import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 🎨 테마
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { PracticeProvider } from './context/PracticeContext';

// 🎬 스플래시 화면
import SplashScreen from './components/SplashScreen';

// 🪟 공통 레이아웃 (상단 타이틀 + 하단 메뉴바를 묶어주는 틀)
import Layout from './components/Layout';

// 📄 메인 4-Tab 화면들
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import VideoPage from './pages/VideoPage';
import TheoryPage from './pages/TheoryPage';

// 📄 서브 화면들
import CommunityPage from './pages/CommunityPage';
import SearchPage from './pages/SearchPage';
import VideoDetail from './pages/VideoDetail';
import PlaylistPage from './pages/PlaylistPage';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <PracticeProvider>
          {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>

                {/* 메인 4-Tab 경로 */}
                <Route path="/" element={<HomePage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/video" element={<VideoPage />} />
                <Route path="/theory" element={<TheoryPage />} />

                {/* 서브 경로 */}
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/playlist" element={<PlaylistPage />} />

              </Route>
            </Routes>
          </BrowserRouter>
        </PracticeProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}