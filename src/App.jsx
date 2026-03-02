import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import LibraryPage from './pages/LibraryPage';
import VideoDetail from './pages/VideoDetail';
import AnnouncePage from './pages/AnnouncePage';
import ProfilePage from './pages/ProfilePage';
import ChallengePage from './pages/ChallengePage';
import CommunityPage from './pages/CommunityPage';
import SearchPage from './pages/SearchPage';
import PlaylistPage from './pages/PlaylistPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/announce" element={<AnnouncePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/challenge" element={<ChallengePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
