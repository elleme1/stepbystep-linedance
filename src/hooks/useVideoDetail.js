import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * VideoDetail 페이지의 모든 상태와 로직을 관리하는 커스텀 훅
 */
export default function useVideoDetail({ playerRef, mainVideoId, tutorialVideoId, hasTutorial, id, videoData }) {
    // ── 재생 제어 ──
    const [speed, setSpeed] = useState(1);
    const [quality, setQuality] = useState('hd720');
    const [playerReady, setPlayerReady] = useState(false);
    const [isMirror, setIsMirror] = useState(false);

    // ── A-B 구간 반복 ──
    const [pointA, setPointA] = useState(null);
    const [pointB, setPointB] = useState(null);
    const [abLoopActive, setAbLoopActive] = useState(false);
    const abIntervalRef = useRef(null);
    const lastSeekTimeRef = useRef(0);

    // ── PIP ──
    const [isPip, setIsPip] = useState(false);

    // ── 카운트 오버레이 ──
    const [showCount, setShowCount] = useState(false);
    const [bpm, setBpm] = useState(120);
    const [currentBeat, setCurrentBeat] = useState(0);
    const countIntervalRef = useRef(null);

    // ── 북마크 ──
    const [bookmarks, setBookmarks] = useState([]);
    const [bookmarkModal, setBookmarkModal] = useState(null);
    const [bookmarkLabel, setBookmarkLabel] = useState('스텝 포인트');
    const bookmarkInputRef = useRef(null);

    // ── 밝기/대비 ──
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);

    // ── 도구 패널 ──
    const [activeTool, setActiveTool] = useState(null);

    // ── 공유 ──
    const [shareToast, setShareToast] = useState('');
    const shareToastTimerRef = useRef(null);

    // ── 뷰 모드 ──
    const [viewMode, setViewMode] = useState('main');

    // viewMode에 따른 현재 영상 ID 계산
    const currentVideoId = viewMode === 'tutorial' && hasTutorial ? tutorialVideoId : mainVideoId;

    const speeds = [0.25, 0.5, 0.75, 0.8, 0.9, 1, 1.25, 1.5];
    const qualities = ['small', 'default', 'medium', 'large', 'hd720', 'hd1080'];

    // ===========================
    // 유틸리티
    // ===========================
    const getCurrentTime = useCallback(() => {
        return playerRef.current?.getCurrentTime() || 0;
    }, [playerRef]);

    const formatTime = useCallback((sec) => {
        if (sec == null) return '--:--';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${String(s).padStart(2, '0')}`;
    }, []);

    // ===========================
    // 라우트 변경 시 초기화
    // ===========================
    useEffect(() => {
        window.scrollTo(0, 0);
        setViewMode('main');
        setPointA(null);
        setPointB(null);
        setAbLoopActive(false);
    }, [id]);

    // 영상 전환(실전↔튜토리얼 토글 포함) 시 A-B 초기화 — 다른 영상 기준의 구간이
    // 새 영상에 그대로 적용돼 그 지점을 못 넘어가는 문제 방지 (TheoryPage와 동일 패턴)
    useEffect(() => {
        setPointA(null);
        setPointB(null);
        setAbLoopActive(false);
    }, [currentVideoId]);

    // ===========================
    // 플레이어 콜백
    // ===========================
    const handlePlayerReady = useCallback((e) => {
        setPlayerReady(true);
        try {
            const player = e.target;
            player.setPlaybackRate(speed);
            player.setPlaybackQuality(quality);
        } catch (err) {}
    }, [speed, quality]);

    const handleSpeedChange = useCallback((s) => {
        setSpeed(s);
        playerRef.current?.setSpeed(s);
    }, [playerRef]);

    const handleQualityChange = useCallback((q) => {
        setQuality(q);
        playerRef.current?.setQuality(q);
    }, [playerRef]);

    // ===========================
    // A-B 구간 반복
    // ===========================
    const setAPoint = useCallback(() => {
        const t = getCurrentTime();
        setPointA(t);
        // B점이 무효화되면 루프 활성 표시(배지)도 함께 꺼야 상태가 일치한다
        if (pointB !== null && t >= pointB) { setPointB(null); setAbLoopActive(false); }
    }, [getCurrentTime, pointB]);

    const setBPoint = useCallback(() => {
        const t = getCurrentTime();
        if (pointA !== null && t > pointA) {
            setPointB(t);
            setAbLoopActive(true);
        }
    }, [getCurrentTime, pointA]);

    const clearAB = useCallback(() => {
        setPointA(null);
        setPointB(null);
        setAbLoopActive(false);
        clearInterval(abIntervalRef.current);
    }, []);

    useEffect(() => {
        clearInterval(abIntervalRef.current);
        if (abLoopActive && pointA !== null && pointB !== null) {
            abIntervalRef.current = setInterval(() => {
                const t = getCurrentTime();
                const now = Date.now();
                if (t >= pointB && now - lastSeekTimeRef.current > 500) {
                    lastSeekTimeRef.current = now;
                    playerRef.current?.seekTo(pointA, true);
                }
            }, 250);
        }
        return () => clearInterval(abIntervalRef.current);
    }, [abLoopActive, pointA, pointB, getCurrentTime, playerRef]);

    // ===========================
    // PIP
    // ===========================
    const togglePip = useCallback(async () => {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                setIsPip(false);
            } else {
                window.open(
                    `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&playsinline=1`,
                    '_blank',
                    'width=400,height=250,toolbar=0,menubar=0,location=0'
                );
                setIsPip(true);
            }
        } catch (e) {}
    }, [currentVideoId]);

    // ===========================
    // 카운트 오버레이
    // ===========================
    useEffect(() => {
        clearInterval(countIntervalRef.current);
        if (showCount && bpm > 0) {
            const interval = (60 / bpm) * 1000;
            setCurrentBeat(0);
            countIntervalRef.current = setInterval(() => {
                setCurrentBeat(prev => (prev % 8) + 1);
            }, interval);
        }
        return () => clearInterval(countIntervalRef.current);
    }, [showCount, bpm]);

    // ===========================
    // 북마크
    // ===========================
    useEffect(() => {
        if (currentVideoId) {
            const saved = localStorage.getItem(`bookmarks_${currentVideoId}`);
            if (saved) try { setBookmarks(JSON.parse(saved)); } catch (e) {}
            else setBookmarks([]);
        }
    }, [currentVideoId]);

    const saveBookmarks = useCallback((bms) => {
        setBookmarks(bms);
        if (currentVideoId) {
            localStorage.setItem(`bookmarks_${currentVideoId}`, JSON.stringify(bms));
        }
    }, [currentVideoId]);

    const addBookmark = useCallback(() => {
        const t = getCurrentTime();
        setBookmarkLabel('스텝 포인트');
        setBookmarkModal({ time: t });
        setTimeout(() => bookmarkInputRef.current?.focus(), 100);
    }, [getCurrentTime]);

    const confirmBookmark = useCallback(() => {
        if (bookmarkModal && bookmarkLabel.trim()) {
            saveBookmarks(
                [...bookmarks, { time: bookmarkModal.time, label: bookmarkLabel.trim(), id: Date.now() }]
                    .sort((a, b) => a.time - b.time)
            );
        }
        setBookmarkModal(null);
    }, [bookmarkModal, bookmarkLabel, bookmarks, saveBookmarks]);

    const cancelBookmark = useCallback(() => {
        setBookmarkModal(null);
    }, []);

    const jumpToBookmark = useCallback((time) => {
        playerRef.current?.seekTo(time, true);
    }, [playerRef]);

    const deleteBookmark = useCallback((bmId) => {
        saveBookmarks(bookmarks.filter(b => b.id !== bmId));
    }, [bookmarks, saveBookmarks]);

    // ===========================
    // 밝기/대비
    // ===========================
    const resetFilter = useCallback(() => {
        setBrightness(100);
        setContrast(100);
    }, []);

    // ===========================
    // 공유
    // ===========================
    const handleShare = useCallback(async () => {
        const shareUrl = `https://stepbystep-linedance.vercel.app/video/${id}`;
        const youtubeUrl = `https://youtu.be/${currentVideoId}`;
        const shareText = `💃 ${videoData.title}\n\n구향회 스텝바이스텝 라인댄스에서 함께 춰봐요!\n\n🎬 영상: ${youtubeUrl}\n📱 앱: ${shareUrl}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: `💃 ${videoData.title} - 스텝바이스텝`, text: shareText, url: shareUrl });
            } catch (e) {}
        } else {
            try {
                await navigator.clipboard.writeText(shareText);
                setShareToast('📋 링크가 복사되었습니다! 카톡에 붙여넣기 하세요');
                clearTimeout(shareToastTimerRef.current);
                shareToastTimerRef.current = setTimeout(() => setShareToast(''), 2500);
            } catch (e) {
                prompt('아래 링크를 복사하세요:', shareUrl);
            }
        }
    }, [id, currentVideoId, videoData]);

    // ===========================
    // 거울 모드 토글
    // ===========================
    const toggleMirror = useCallback(() => {
        setIsMirror(prev => !prev);
    }, []);

    // ===========================
    // 언마운트 정리
    // ===========================
    useEffect(() => {
        return () => {
            clearInterval(abIntervalRef.current);
            clearInterval(countIntervalRef.current);
            clearTimeout(shareToastTimerRef.current);
        };
    }, []);

    return {
        // 재생
        speed, speeds, quality, qualities, playerReady, isMirror,
        handlePlayerReady, handleSpeedChange, handleQualityChange, toggleMirror,
        // A-B 구간
        pointA, pointB, abLoopActive, setAPoint, setBPoint, clearAB,
        // PIP
        isPip, togglePip,
        // 카운트
        showCount, setShowCount, bpm, setBpm, currentBeat,
        // 북마크
        bookmarks, bookmarkModal, bookmarkLabel, setBookmarkLabel, bookmarkInputRef,
        addBookmark, confirmBookmark, cancelBookmark, jumpToBookmark, deleteBookmark,
        // 필터
        brightness, setBrightness, contrast, setContrast, resetFilter,
        // 도구 패널
        activeTool, setActiveTool,
        // 공유
        shareToast, handleShare,
        // 뷰 모드
        viewMode, setViewMode,
        // 영상 ID
        currentVideoId,
        // 유틸
        formatTime, getCurrentTime,
    };
}
