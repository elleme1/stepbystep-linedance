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
      description: (newSongData.description || '').trim(),
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
    //    기준 창은 '오늘'이 아니라 **그 지점의 마지막 수업일(최신 addedDate)** 기준
    //    최근 7일이다. (2026-07-08 개편: '오늘 기준 7일'은 지점이 한 주라도 쉬면
    //    창이 텅 비어 — 이번주 탭 빈 화면·뱃지 실종·홈과 모순이 생겼음. 마지막
    //    수업일에 앵커하면 언제 봐도 '가장 최근 수업주'의 곡들이 일관되게 잡히고,
    //    시계(new Date) 의존이 사라져 자정 넘김 stale 문제도 없다.)
    //    addedDate는 'YYYY-MM-DD'(sv-SE)라 문자열 비교로 범위 판정.
    const latestFor = (loc) => merged.reduce((max, s) => {
      const matches = s.location === loc || s.location === 'both';
      const d = s.addedDate || '';
      return matches && d > max ? d : max;
    }, '');
    const weekWindowFor = (latest) => {
      if (!latest) return () => false;
      const end = new Date(latest + 'T12:00:00'); // 정오 기준 — 타임존 경계 안전
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      const startStr = start.toLocaleDateString('sv-SE');
      return (d) => !!d && d >= startStr && d <= latest;
    };
    const inKolonWeek = weekWindowFor(latestFor('kolon'));
    const inSindunWeek = weekWindowFor(latestFor('sindun'));

    return merged.map(s => {
      const d = s.addedDate || '';
      const inKolon = s.location === 'kolon' || s.location === 'both';
      const inSindun = s.location === 'sindun' || s.location === 'both';
      const kolonFlag = inKolon && inKolonWeek(d);
      const sindunFlag = inSindun && inSindunWeek(d);
      return {
        ...s,
        isThisWeekKolon: kolonFlag,
        isThisWeekSindun: sindunFlag,
        // 하위 호환(전체 폴백): 어느 지점이든 이번주면 true
        isThisWeek: kolonFlag || sindunFlag,
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
    // allSongs에 동적으로 찍힌 이번주(최근 7일) 플래그를 먼저 사용 → 홈/안무보관함/연속재생 일관성
    const flag = locationId === 'kolon' ? 'isThisWeekKolon'
      : locationId === 'sindun' ? 'isThisWeekSindun'
      : 'isThisWeek';
    const flagged = allSongs.find(s => s[flag]);
    if (flagged) return flagged;
    // 최근 7일 내 수업이 없으면(예: 중리가 한 주 쉰 경우) 옛 기본곡(getRawThisWeek)으로
    // 떨어지지 말고, 그 지점의 '실제 최신 수업곡'(날짜 내림차순 첫 곡)을 보여준다.
    return getSongsForLocation(locationId)[0] || getRawThisWeek(locationId);
  }, [allSongs, getSongsForLocation]);

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
