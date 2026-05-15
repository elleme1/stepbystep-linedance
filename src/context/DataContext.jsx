import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import rawProcessedSongs, { getThisWeekSong as getRawThisWeek, getSongsForLocation as getRawForLocation } from '../data/songs';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [localSongs, setLocalSongs] = useState([]);

  // 앱 시작 시 localStorage에서 데이터 로드
  useEffect(() => {
    const saved = localStorage.getItem('custom_songs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 누락된 메타데이터로 인한 UI 깨짐(undefined 표시) 방지
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
  }, []);

  // 새로운 곡 추가 (관리자 페이지에서 호출)
  const addSong = (newSongData) => {
    // 1. 새 ID 생성 (기존 최대 ID + 1)
    const allIds = [...rawProcessedSongs, ...localSongs].map(s => s.id);
    const nextId = Math.max(0, ...allIds) + 1;

    const newSong = {
      id: nextId,
      title: newSongData.title || '제목 없음',
      artist: newSongData.artist || '가수 미상',
      youtubeId: newSongData.youtubeId,
      tutorialId: newSongData.tutorialId || "",
      thumbnail: `https://img.youtube.com/vi/${newSongData.youtubeId}/hqdefault.jpg`,
      location: newSongData.location || 'kolon', // 선택된 장소 적용
      addedDate: newSongData.date || new Date().toISOString().split('T')[0],
      isLocal: true, // 로컬에서 추가된 데이터임을 표시
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

  // 전체 데이터 합치기
  const allSongs = useMemo(() => {
    // 로컬 데이터를 앞에 두어 최신순 유지 (정렬 로직은 각 페이지에서 처리됨)
    return [...localSongs, ...rawProcessedSongs];
  }, [localSongs]);

  // 장소별 필터링 및 정렬 로직 (기존 songs.js 로직 확장)
  const getSongsForLocation = (locationId) => {
    const filtered = allSongs.filter(s => s.location === locationId || s.location === 'both');
    
    // 로컬 데이터는 무조건 최상단에, 나머지는 기존 정렬 유지
    const local = filtered.filter(s => s.isLocal);
    const original = getRawForLocation(locationId); // 기존 정렬된 데이터
    return [...local, ...original];
    
    return getRawForLocation(locationId);
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
