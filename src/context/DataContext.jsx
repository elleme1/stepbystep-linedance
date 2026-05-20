import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ref, onValue, set, remove, update } from 'firebase/database';
import { db } from '../lib/firebase';
import rawProcessedSongs, { getThisWeekSong as getRawThisWeek } from '../data/songs';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [localSongs, setLocalSongs] = useState([]);
  const [hiddenSongIds, setHiddenSongIds] = useState([]);
  const [songOverrides, setSongOverrides] = useState({});

  // 🔥 Firebase RTDB 실시간 구독 — 모든 디바이스에 즉시 반영
  useEffect(() => {
    const unsubSongs = onValue(ref(db, 'songs'), (snap) => {
      const data = snap.val() || {};
      const arr = Object.values(data)
        .map(s => ({
          ...s,
          genre: s.genre || '장르 미상',
          level: s.level || 2,
          choreographer: s.choreographer || '안무가 미상'
        }))
        // 최신 업로드가 항상 1번 자리에 오도록 정렬 (addedDate desc, 동률은 id desc)
        .sort((a, b) => {
          const dateCmp = (b.addedDate || '').localeCompare(a.addedDate || '');
          if (dateCmp !== 0) return dateCmp;
          return (b.id || 0) - (a.id || 0);
        });
      setLocalSongs(arr);
    });

    const unsubHidden = onValue(ref(db, 'hiddenSongs'), (snap) => {
      const data = snap.val() || {};
      setHiddenSongIds(Object.keys(data).map(Number));
    });

    const unsubOverrides = onValue(ref(db, 'songOverrides'), (snap) => {
      setSongOverrides(snap.val() || {});
    });

    return () => {
      unsubSongs();
      unsubHidden();
      unsubOverrides();
    };
  }, []);

  // 새로운 곡 추가
  const addSong = async (newSongData) => {
    const allIds = [...rawProcessedSongs, ...localSongs].map(s => s.id);
    const nextId = Math.max(0, ...allIds) + 1;

    const newSong = {
      id: nextId,
      title: newSongData.title || '제목 없음',
      artist: newSongData.artist || '가수 미상',
      youtubeId: newSongData.youtubeId || '',
      tutorialId: newSongData.tutorialId || '',
      thumbnail: newSongData.youtubeId
        ? `https://img.youtube.com/vi/${newSongData.youtubeId}/hqdefault.jpg`
        : '',
      location: newSongData.location || 'kolon',
      addedDate: newSongData.date || new Date().toISOString().split('T')[0],
      isLocal: true,
      genre: newSongData.genre || '장르 미상',
      level: newSongData.level || 2,
      choreographer: newSongData.choreographer || '안무가 미상',
      steps: newSongData.steps || [],
      tags: newSongData.tags || []
    };

    await set(ref(db, `songs/${nextId}`), newSong);
    return newSong;
  };

  // 곡 삭제 — 로컬곡은 RTDB에서 직접 제거, 기본곡은 hiddenSongs에 등록
  const removeSong = async (songId) => {
    const isLocal = localSongs.some(s => s.id === songId);
    if (isLocal) {
      await remove(ref(db, `songs/${songId}`));
    } else {
      await set(ref(db, `hiddenSongs/${songId}`), true);
    }
  };

  // 곡 정보 수정 — 로컬곡은 직접 update, 기본곡은 songOverrides에 패치 저장
  const updateSong = async (songId, updates) => {
    const isLocal = localSongs.some(s => s.id === songId);
    const extra = updates.youtubeId
      ? { thumbnail: `https://img.youtube.com/vi/${updates.youtubeId}/hqdefault.jpg` }
      : {};
    const path = isLocal ? `songs/${songId}` : `songOverrides/${songId}`;
    await update(ref(db, path), { ...updates, ...extra });
  };

  // 전체 데이터 합치기 (숨김 필터 + 덮어쓰기 적용)
  const allSongs = useMemo(() => {
    const base = rawProcessedSongs
      .filter(s => !hiddenSongIds.includes(s.id))
      .map(s => songOverrides[s.id] ? { ...s, ...songOverrides[s.id] } : s);
    return [...localSongs, ...base];
  }, [localSongs, hiddenSongIds, songOverrides]);

  const getSongsForLocation = (locationId) => {
    const filtered = allSongs.filter(s => s.location === locationId || s.location === 'both');
    const local = filtered.filter(s => s.isLocal);
    const original = filtered.filter(s => !s.isLocal);
    return [...local, ...original];
  };

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
