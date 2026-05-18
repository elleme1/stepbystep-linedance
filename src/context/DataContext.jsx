import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import rawProcessedSongs, { getThisWeekSong as getRawThisWeek, getSongsForLocation as getRawForLocation } from '../data/songs';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [localSongs, setLocalSongs] = useState([]);
  const [hiddenSongIds, setHiddenSongIds] = useState([]);
  const [songOverrides, setSongOverrides] = useState({});

  // 앱 시작 시 localStorage에서 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('custom_songs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const sanitized = parsed.map(s => ({
            ...s,
            genre: s.genre || '장르 미상',
            level: s.level || 2,
            choreographer: s.choreographer || '안무가 미상'
        }));
        setLocalSongs(sanitized);
      } catch (e) {
        console.error('Failed to parse local songs:', e);
      }
    }
    // 숨긴 곡 ID 로드
    try {
      const hidden = localStorage.getItem('hidden_song_ids');
      if (hidden) setHiddenSongIds(JSON.parse(hidden));
    } catch (e) {}
    // 기본곡 덮어쓰기 로드
    try {
      const overrides = localStorage.getItem('song_overrides');
      if (overrides) setSongOverrides(JSON.parse(overrides));
    } catch (e) {}
  }, []);

  // 새로운 곡 추가 (관리자 페이지에서 호출)
  const addSong = (newSongData) => {
    const allIds = [...rawProcessedSongs, ...localSongs].map(s => s.id);
    const nextId = Math.max(0, ...allIds) + 1;

    const newSong = {
      id: nextId,
      title: newSongData.title || '제목 없음',
      artist: newSongData.artist || '가수 미상',
      youtubeId: newSongData.youtubeId,
      tutorialId: newSongData.tutorialId || "",
      thumbnail: `https://img.youtube.com/vi/${newSongData.youtubeId}/hqdefault.jpg`,
      location: newSongData.location || 'kolon',
      addedDate: newSongData.date || new Date().toISOString().split('T')[0],
      isLocal: true,
      genre: newSongData.genre || '장르 미상',
      level: newSongData.level || 2,
      choreographer: newSongData.choreographer || '안무가 미상',
      steps: newSongData.steps || [],
      tags: newSongData.tags || []
    };

    const updatedLocal = [newSong, ...localSongs];
    setLocalSongs(updatedLocal);
    localStorage.setItem('custom_songs', JSON.stringify(updatedLocal));
    return newSong;
  };

  // 곡 삭제 — 로컬곡은 직접 삭제, 기본곡은 숨김 처리
  const removeSong = (songId) => {
    const isLocal = localSongs.some(s => s.id === songId);
    if (isLocal) {
      const updatedLocal = localSongs.filter(s => s.id !== songId);
      setLocalSongs(updatedLocal);
      localStorage.setItem('custom_songs', JSON.stringify(updatedLocal));
    } else {
      const updated = [...hiddenSongIds, songId];
      setHiddenSongIds(updated);
      localStorage.setItem('hidden_song_ids', JSON.stringify(updated));
    }
  };

  // 곡 정보 수정 — 로컬곡은 직접 수정, 기본곡은 덮어쓰기 저장
  const updateSong = (songId, updates) => {
    const isLocal = localSongs.some(s => s.id === songId);
    if (isLocal) {
      const updatedLocal = localSongs.map(s => {
        if (s.id !== songId) return s;
        const updated = { ...s, ...updates };
        if (updates.youtubeId) {
          updated.thumbnail = `https://img.youtube.com/vi/${updates.youtubeId}/hqdefault.jpg`;
        }
        return updated;
      });
      setLocalSongs(updatedLocal);
      localStorage.setItem('custom_songs', JSON.stringify(updatedLocal));
    } else {
      const newOverrides = { ...songOverrides, [songId]: { ...(songOverrides[songId] || {}), ...updates } };
      if (updates.youtubeId) {
        newOverrides[songId].thumbnail = `https://img.youtube.com/vi/${updates.youtubeId}/hqdefault.jpg`;
      }
      setSongOverrides(newOverrides);
      localStorage.setItem('song_overrides', JSON.stringify(newOverrides));
    }
  };

  // 전체 데이터 합치기 (숨김 필터 + 덮어쓰기 적용)
  const allSongs = useMemo(() => {
    const base = rawProcessedSongs
      .filter(s => !hiddenSongIds.includes(s.id))
      .map(s => songOverrides[s.id] ? { ...s, ...songOverrides[s.id] } : s);
    return [...localSongs, ...base];
  }, [localSongs, hiddenSongIds, songOverrides]);

  // 장소별 필터링 및 정렬 로직 (기존 songs.js 로직 확장)
  const getSongsForLocation = (locationId) => {
    const filtered = allSongs.filter(s => s.location === locationId || s.location === 'both');
    
    // 로컬 데이터는 무조건 최상단에, 나머지는 기존 정렬 유지
    const local = filtered.filter(s => s.isLocal);
    const original = filtered.filter(s => !s.isLocal);
    return [...local, ...original];
  };

  // 이번주 곡 가져오기 (로컬 데이터가 있으면 최신 로컬 데이터를 우선)
  const getThisWeekSong = (locationId) => {
    const local = localSongs.find(s => s.location === locationId || s.location === 'both');
    if (local) return local;
    return getRawThisWeek(locationId);
  };

  const value = {
    allSongs,
    localSongs,
    addSong,
    removeSong,
    updateSong,
    getSongsForLocation,
    getThisWeekSong
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
