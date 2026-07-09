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
import DanceCuePage from './pages/DanceCuePage';

import ReloadPrompt from './ReloadPrompt';

// 🚀 State Reset (충돌 방지 버전 관리)
const APP_VERSION = 'v1.5';

// ⚠️ 사용자 데이터 보존 목록 — 새 localStorage 키를 추가하면 반드시 여기에도 등록할 것.
//    (버전이 바뀌면 아래 목록 외의 키는 전부 삭제된다)
const PRESERVE_KEYS = [
  'sbs-favorites',         // 찜 목록 (FavoritesContext)
  'sbs-practiced',         // 연습 기록 (PracticeContext)
  'sbs-challenges',        // 자이브 챌린지 진행도 (ChallengeContext)
  'sbs-challenge-videos',  // 챌린지 영상 링크 (ChallengeContext)
  'sbs-theme',             // 테마 (ThemeContext)
  'stepbystep-location',   // 장소 선택 (LocationContext)
  'isVipUser',             // VIP 접근 플래그 (HomePage)
  'community_posts',       // 커뮤니티 게시글 (CommunityPage)
  'community_nickname',    // 커뮤니티 닉네임 (CommunityPage)
  'stepApp_likedIds',      // 영상 좋아요 (VideoPage)
  'sbs-install-dismissed', // PWA 설치 배너 닫음 (InstallBanner)
];
const PRESERVE_PREFIXES = ['bookmarks_']; // 영상별 구간 북마크 (useVideoDetail)

const currentVersion = localStorage.getItem('app_version');
if (currentVersion !== APP_VERSION) {
  const backup = {};
  Object.keys(localStorage).forEach((key) => {
    if (PRESERVE_KEYS.includes(key) || PRESERVE_PREFIXES.some(p => key.startsWith(p))) {
      backup[key] = localStorage.getItem(key);
    }
  });

  localStorage.clear(); // 기존 설정 초기화

  Object.entries(backup).forEach(([key, value]) => localStorage.setItem(key, value));
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
            <Route path="/dance-cue" element={<DanceCuePage />} />
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