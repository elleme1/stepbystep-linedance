import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { ref, onValue, set, remove, update, get, runTransaction } from 'firebase/database';
import { db, authReady } from '../lib/firebase';
import rawProcessedSongs, { getThisWeekSong as getRawThisWeek } from '../data/songs';

const DataContext = createContext();

// 한국시간 기준 오늘 날짜 (YYYY-MM-DD) — toISOString은 UTC라 KST 00~09시 업로드가 전날로 찍힘
export const todayLocal = () => new Date().toLocaleDateString('sv-SE');

export const DataProvider = ({ children }) => {
  const [localSongs, setLocalSongs] = useState([]);
  const [hiddenSongIds, setHiddenSongIds] = useState([]);
  const [songOverrides, setSongOverrides] = useState({});
  // Firebase 첫 스냅샷 수신 여부 — 딥링크 진입 시 '없음'과 '로딩 중'을 구분하기 위함
  const [isLoaded, setIsLoaded] = useState(false);

  // 🔥 Firebase RTDB 실시간 구독 — 모든 디바이스에 즉시 반영
  //    익명 세션(authReady)이 잡힌 뒤에 구독을 붙인다. 보안 규칙이
  //    "auth != null" 로 잠겨도 권한 거부 없이 데이터가 흐르게 하기 위함.
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    authReady.then(() => {
      if (cancelled) return;

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
        setIsLoaded(true);
      });

      const unsubHidden = onValue(ref(db, 'hiddenSongs'), (snap) => {
        const data = snap.val() || {};
        setHiddenSongIds(Object.keys(data).map(Number));
      });

      const unsubOverrides = onValue(ref(db, 'songOverrides'), (snap) => {
        setSongOverrides(snap.val() || {});
      });

      cleanup = () => {
        unsubSongs();
        unsubHidden();
        unsubOverrides();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  // 새로운 곡 추가
  const addSong = async (newSongData) => {
    // ID는 서버의 실제 /songs 기준으로 계산 — 구독 스냅샷이 아직 안 와 있어도
    // 기존 곡을 덮어쓰지 않는다.
    const snap = await get(ref(db, 'songs'));
    const serverIds = Object.values(snap.val() || {}).map(s => s.id || 0);
    const baseIds = rawProcessedSongs.map(s => s.id);
    let nextId = Math.max(0, ...baseIds, ...serverIds) + 1;

    const buildSong = (id) => ({
      id,
      title: newSongData.title || '제목 없음',
      artist: newSongData.artist || '가수 미상',
      youtubeId: newSongData.youtubeId || '',
      tutorialId: newSongData.tutorialId || '',
      thumbnail: newSongData.youtubeId
        ? `https://img.youtube.com/vi/${newSongData.youtubeId}/hqdefault.jpg`
        : '',
      location: newSongData.location || 'kolon',
      addedDate: newSongData.date || todayLocal(),
      isLocal: true,
      genre: newSongData.genre || '장르 미상',
      level: newSongData.level || 2,
      choreographer: newSongData.choreographer || '안무가 미상',
      steps: newSongData.steps || [],
      tags: newSongData.tags || []
    });

    // 관리자 2명(코오롱/중리)이 동시에 등록해도 충돌하지 않도록,
    // 해당 ID 슬롯이 비어 있을 때만 생성하고 점유돼 있으면 +1로 재시도.
    for (let attempt = 0; attempt < 5; attempt++) {
      const result = await runTransaction(ref(db, `songs/${nextId}`), (cur) => {
        if (cur !== null) return; // 다른 관리자가 방금 선점 → abort
        return buildSong(nextId);
      });
      if (result.committed) return result.snapshot.val();
      nextId += 1;
    }
    throw new Error('곡 ID 충돌이 반복됩니다. 잠시 후 다시 시도해주세요.');
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
    const merged = [...localSongs, ...base];

    // 🗓️ "이번주 수업곡" 판정을 병합된 전체 곡 기준으로 동적 재계산.
    //    songs.js의 songSchedule 고정 날짜가 아니라, 관리자 업로드(Firebase)까지
    //    포함한 addedDate를 기준으로, '오늘부터 최근 7일 이내'에 배운 곡을 이번주로 삼는다.
    //    (2026-06-24: 예전엔 '지점별 가장 최근 하루'만 잡아, 그 날 곡이 1개뿐이면
    //     연속재생이 첫 곡에서 멈췄음 → 그 주에 배운 곡들이 모두 연속재생 대상이
    //     되도록 7일로 넓힘.) addedDate는 'YYYY-MM-DD'(sv-SE)라 문자열 비교로 범위 판정.
    const today = todayLocal();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toLocaleDateString('sv-SE');
    const isWithinWeek = (d) => !!d && d >= weekAgoStr && d <= today;

    return merged.map(s => {
      const d = s.addedDate || '';
      const inKolon = s.location === 'kolon' || s.location === 'both';
      const inSindun = s.location === 'sindun' || s.location === 'both';
      return {
        ...s,
        isThisWeekKolon: inKolon && isWithinWeek(d),
        isThisWeekSindun: inSindun && isWithinWeek(d),
        // 하위 호환(전체 폴백): 어느 지점이든 최근 7일이면 true
        isThisWeek: isWithinWeek(d) && (inKolon || inSindun),
      };
    });
  }, [localSongs, hiddenSongIds, songOverrides]);

  // useCallback으로 안정화 — allSongs가 바뀔 때만 함수 identity가 바뀌므로,
  // 소비처가 이 함수를 useMemo/useEffect 의존성에 넣으면 Firebase 갱신이 화면에 반영된다.
  // 정렬은 수업일(addedDate) 내림차순 — 최신 수업곡이 위, 과거가 아래로 일관되게.
  //   (예전엔 [관리자업로드, 기본곡(파일배열순)]으로 잇기만 해서, rawSongs 배열이
  //    뒤섞인 중리 쪽 꼬리가 날짜순을 벗어나 뒤틀려 보였음.)
  const getSongsForLocation = useCallback((locationId) => {
    return allSongs
      .filter(s => s.location === locationId || s.location === 'both')
      .sort((a, b) => {
        const dc = (b.addedDate || '').localeCompare(a.addedDate || '');
        if (dc !== 0) return dc;
        // 같은 날짜면 관리자 업로드를 먼저, 그다음 id 내림차순
        if (!!a.isLocal !== !!b.isLocal) return a.isLocal ? -1 : 1;
        return (b.id || 0) - (a.id || 0);
      });
  }, [allSongs]);

  const getThisWeekSong = useCallback((locationId) => {
    // allSongs에 동적으로 찍힌 이번주 플래그를 그대로 사용 → 홈/안무보관함/연속재생 일관성
    const flag = locationId === 'kolon' ? 'isThisWeekKolon'
      : locationId === 'sindun' ? 'isThisWeekSindun'
      : 'isThisWeek';
    return allSongs.find(s => s[flag]) || getRawThisWeek(locationId);
  }, [allSongs]);

  const value = {
    allSongs,
    localSongs,
    isLoaded,
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
