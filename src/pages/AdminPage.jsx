import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useData, todayLocal } from '../context/DataContext';

/**
 * 👑 Step-by-Step 코오롱 전용 관리자 대시보드
 * 앱의 다크 네이비 & 골드 디자인 시스템을 적용하여 일체감을 높였습니다.
 */
const AdminPage = () => {
  const navigate = useNavigate();
  const { addSong, removeSong, updateSong, localSongs, allSongs } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [searchParams] = useSearchParams();
  const [editingSongId, setEditingSongId] = useState(null);
  const [editSongUrl, setEditSongUrl] = useState('');
  const [editSongTitle, setEditSongTitle] = useState('');
  const [editSongArtist, setEditSongArtist] = useState('');
  const [editSongTutorialUrl, setEditSongTutorialUrl] = useState('');
  const [editSongNote, setEditSongNote] = useState('');
  const locParam = searchParams.get('loc') || 'kolon';
  const locationName = locParam === 'kolon' ? '코오롱 스포렉스' : '중리 행정복지센터';

  const [loadingMetadata, setLoadingMetadata] = useState(false);

  const [songInfo, setSongInfo] = useState({
    title: '',
    artist: 'Various',
    youtubeUrl: '',
    youtubeId: '',
    tutorialUrl: '',
    tutorialId: '',
    date: todayLocal(),
    location: locParam
  });

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  // 🎵 댄스 큐 앱(dance-instructor-player) 동기화 — 메인곡 업로드/수정 시 호출
  // role 매핑: 우리 'kolon' ↔ 큐앱 'kolong', 우리 'sindun'(중리) ↔ 큐앱 'jungri'
  // 반환: { ok: boolean, reason: string } — 호출자가 toast로 사용자에게 결과 표시
  const syncMainTrackToCueApp = async ({ location, youtubeId, title }) => {
    const apiUrl = import.meta.env.VITE_DANCE_CUE_API;
    const token = import.meta.env.VITE_DANCE_CUE_TOKEN;
    if (!apiUrl || !token) return { ok: false, reason: 'env-missing' };
    if (!youtubeId) return { ok: false, reason: 'no-youtube-id' };
    const role = location === 'kolon' ? 'kolong' : 'jungri';
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role, url, name: title || '' }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.warn('[DanceCue] 큐앱 동기화 실패:', res.status, text);
        return { ok: false, reason: `http-${res.status}` };
      }
      return { ok: true, reason: 'ok' };
    } catch (err) {
      // 큐앱 다운/네트워크 문제로 어드민 흐름이 막히면 안 되므로 경고만 남김
      console.warn('[DanceCue] 큐앱 동기화 네트워크 오류:', err);
      return { ok: false, reason: 'network-error' };
    }
  };

  // 🗑 큐앱 동기화 — 어드민에서 곡 삭제 시 호출
  // 큐앱의 현재 메인이 삭제 대상과 같은 youtubeId일 때만 DELETE
  // (다른 곡이 큐앱 메인인데 옛 곡을 삭제했다고 메인 슬롯을 비우면 안 됨)
  // 반환 { removed, failed } — failed는 '일치했지만 정리에 실패한' role.
  // 호출자가 이를 토스트에 구분 표시해야 큐앱에 지운 곡이 남아 있는 걸 알 수 있다.
  const removeMainTrackFromCueAppIfMatches = async ({ youtubeIdToRemove }) => {
    const apiUrl = import.meta.env.VITE_DANCE_CUE_API;
    const token = import.meta.env.VITE_DANCE_CUE_TOKEN;
    if (!apiUrl || !token || !youtubeIdToRemove) return { removed: [], failed: [] };
    try {
      const cur = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
      if (!cur.ok) return { removed: [], failed: [] };
      const data = await cur.json();
      const removed = [];
      const failed = [];
      // 두 role 모두 검사 — 'both' 곡이거나 사용자가 다른 탭에서 보더라도 안전
      for (const role of ['kolong', 'jungri']) {
        const url = data?.[role]?.url || '';
        if (url.includes(youtubeIdToRemove)) {
          const del = await fetch(`${apiUrl}?role=${role}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (del.ok) removed.push(role);
          else { failed.push(role); console.warn('[DanceCue] 삭제 실패:', role, del.status); }
        }
      }
      return { removed, failed };
    } catch (err) {
      console.warn('[DanceCue] 삭제 동기화 네트워크 오류:', err);
      return { removed: [], failed: [] };
    }
  };

  // ✏️ 큐앱 동기화 — 곡 '수정' 시 호출. 큐앱의 현재 메인이 바로 이 곡일 때만 갱신.
  // (삭제 경로와 같은 가드 — 몇 주 전 곡의 오타만 고쳐도 그 곡이 큐앱 메인을
  //  덮어쓰던 문제 방지. 일치하는 role에만, role별로 정확히 POST한다.)
  const updateCueAppIfCurrentMain = async ({ prevYoutubeId, youtubeId, title }) => {
    const apiUrl = import.meta.env.VITE_DANCE_CUE_API;
    const token = import.meta.env.VITE_DANCE_CUE_TOKEN;
    if (!apiUrl || !token || !prevYoutubeId) return { ok: true, updated: [], skipped: true };
    try {
      const cur = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
      if (!cur.ok) return { ok: false, updated: [], reason: `http-${cur.status}` };
      const data = await cur.json();
      const roles = ['kolong', 'jungri'].filter(r => (data?.[r]?.url || '').includes(prevYoutubeId));
      if (roles.length === 0) return { ok: true, updated: [], skipped: true }; // 이 곡이 메인이 아님 → 건드리지 않음
      const updated = [];
      const url = `https://www.youtube.com/watch?v=${youtubeId}`;
      for (const role of roles) {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ role, url, name: title || '' }),
        });
        if (res.ok) updated.push(role);
        else console.warn('[DanceCue] 수정 동기화 실패:', role, res.status);
      }
      return { ok: updated.length === roles.length, updated };
    } catch (err) {
      console.warn('[DanceCue] 수정 동기화 네트워크 오류:', err);
      return { ok: false, updated: [], reason: 'network-error' };
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const getYoutubeId = (url) => {
    // 쇼츠(shorts/) 주소까지 완벽하게 잡아내는 마법의 가위!
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleMainUrlChange = async (url) => {
    const id = getYoutubeId(url);
    setSongInfo(prev => ({ ...prev, youtubeUrl: url, youtubeId: id || '' }));

    if (id) {
      setLoadingMetadata(true);
      try {
        const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`);
        const data = await response.json();
        if (data.title) {
          const titleParts = data.title.split('-').map(p => p.trim());
          setSongInfo(prev => ({
            ...prev,
            title: titleParts.length > 1 ? titleParts[1] : titleParts[0],
            artist: titleParts.length > 1 ? titleParts[0] : 'Various'
          }));
        } else {
          // noembed가 비공개/삭제 영상 등으로 메타데이터를 못 가져온 경우 — 조용히 넘기면
          // '제목 없음'으로 저장되므로 관리자에게 직접 입력을 안내
          setToastMsg('⚠️ 영상 제목을 자동으로 가져오지 못했습니다. 제목을 직접 입력해주세요.');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        }
      } catch (err) {
        console.error('메타데이터 조회 실패:', err);
        setToastMsg('⚠️ 영상 정보를 가져오지 못했습니다. 제목을 직접 입력해주세요.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      } finally {
        setLoadingMetadata(false);
      }
    }
  };

  const handleTutorialUrlChange = async (url) => {
    const id = getYoutubeId(url);
    setSongInfo(prev => ({ ...prev, tutorialUrl: url, tutorialId: id || '' }));

    // 메인 곡이 없거나 메타데이터가 안 불렸을 때 튜토리얼에서라도 메타데이터를 가져옴
    if (id && !songInfo.youtubeId && !songInfo.title) {
      setLoadingMetadata(true);
      try {
        const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`);
        const data = await response.json();
        if (data.title) {
          const titleParts = data.title.split('-').map(p => p.trim());
          setSongInfo(prev => ({
            ...prev,
            title: prev.title || (titleParts.length > 1 ? titleParts[1] : titleParts[0]),
            artist: prev.artist === 'Various' ? (titleParts.length > 1 ? titleParts[0] : 'Various') : prev.artist
          }));
        }
      } catch (err) {
        console.error('메타데이터 조회 실패:', err);
      } finally {
        setLoadingMetadata(false);
      }
    }
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    // 메인 곡 URL은 필수. 튜토리얼은 메인 곡과 함께 등록되는 보조 영상이므로
    // 단독으로는 곡 데이터를 채울 수 없음 (썸네일/제목/메인영상 모두 메인 URL 기준).
    if (!songInfo.youtubeId) {
      alert('메인 곡 URL을 먼저 입력해주세요.\n튜토리얼은 메인 곡에 첨부되는 보조 영상입니다.');
      return;
    }
    // 자동 추출이 실패하면 제목이 빈 채로 '제목 없음'으로 저장되므로 제출 시점에 차단
    if (!songInfo.title.trim()) {
      alert('곡 제목이 비어 있습니다.\n자동 추출이 실패한 경우 제목을 직접 입력해주세요.');
      return;
    }

    setIsSaving(true);
    try {
      // 🛡️ CTO 비기: 기존 songInfo를 복사하되, location만 현재 탭의 진짜 위치로 강제 덮어쓰기!
      // await 필수 — Firebase 쓰기 실패가 catch에 잡혀야 가짜 성공 토스트가 안 뜬다
      await addSong({ ...songInfo, location: locParam });
      // 🎵 댄스 큐 앱에도 메인곡 동기화 — 결과를 토스트에 반영해 사용자가 도달 여부 확인
      const cue = await syncMainTrackToCueApp({ location: locParam, youtubeId: songInfo.youtubeId, title: songInfo.title });
      setToastMsg(cue.ok
        ? '✅ 등록 완료 + 댄스 큐 앱에 동기화됨'
        : `✅ 등록 완료 (⚠️ 큐 앱 동기화 실패: ${cue.reason})`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      setSongInfo({
        title: '', artist: 'Various', youtubeUrl: '', youtubeId: '',
        tutorialUrl: '', tutorialId: '', date: todayLocal(),
        location: locParam
      });
    } catch (err) {
      console.error('곡 저장 실패:', err);
      alert('저장 중 오류가 발생했습니다. 네트워크 상태를 확인하고 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page-root dark-theme">
        <style>{`
          .admin-page-root { min-height: 100vh; background: #0b1120; color: #f1f0f0; font-family: 'Noto Sans KR', sans-serif; display: flex; align-items: center; justify-content: center; padding: 20px; }
          .login-card { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(212, 168, 83, 0.1); border-radius: 20px; padding: 40px 30px; width: 100%; max-width: 400px; backdrop-filter: blur(20px); text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .login-card h1 { font-size: 1.8rem; margin-bottom: 10px; background: linear-gradient(135deg, #c9952e 0%, #e8c56d 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; }
          .login-card p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 30px; }
          .login-input { width: 100%; padding: 16px; border-radius: 12px; border: 1px solid rgba(212, 168, 83, 0.2); background: rgba(0,0,0,0.2); color: white; margin-bottom: 20px; text-align: center; font-size: 1.2rem; outline: none; transition: 0.3s; }
          .login-input:focus { border-color: #d4a853; box-shadow: 0 0 15px rgba(212, 168, 83, 0.2); }
          .login-btn { width: 100%; padding: 16px; border-radius: 12px; border: none; background: linear-gradient(135deg, #c9952e 0%, #e8c56d 100%); color: #0b1120; font-weight: 800; cursor: pointer; font-size: 1.1rem; transition: 0.3s; }
          .login-btn:active { transform: scale(0.98); }
        `}</style>
        <div className="login-card">
          <h1>STEP-BY-STEP</h1>
          <div style={{ display: 'flex', background: 'rgba(212,168,83,0.1)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(212,168,83,0.3)', width: 'fit-content', margin: '0 auto 20px auto' }}>
            <button 
              type="button"
              onClick={() => navigate('/admin?loc=kolon')}
              style={{ padding: '8px 16px', border: 'none', background: locParam === 'kolon' ? '#c9952e' : 'transparent', color: locParam === 'kolon' ? '#0b1120' : '#e8c56d', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
            >코오롱 관리</button>
            <button 
              type="button"
              onClick={() => navigate('/admin?loc=sindun')}
              style={{ padding: '8px 16px', border: 'none', background: locParam === 'sindun' ? '#c9952e' : 'transparent', color: locParam === 'sindun' ? '#0b1120' : '#e8c56d', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
            >중리 관리</button>
          </div>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              className="login-input" 
              placeholder="비밀번호 4자리 입력" 
              value={password} 
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                if (ADMIN_PASSWORD && val === ADMIN_PASSWORD) setIsAuthenticated(true);
              }}
              autoFocus 
            />
            <button type="submit" className="login-btn">관리자 입장</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-root dark-theme">
      <style>{`
        .admin-page-root { min-height: 100vh; background: #0b1120; color: #f1f0f0; font-family: 'Noto Sans KR', sans-serif; }
        .admin-header { position: sticky; top: 0; z-index: 100; min-height: 64px; height: calc(64px + env(safe-area-inset-top)); box-sizing: border-box; display: flex; align-items: center; justify-content: space-between; padding: env(safe-area-inset-top) 20px 0 20px; background: rgba(11, 17, 32, 0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(212, 168, 83, 0.15); }
        .admin-header h2 { font-size: 1rem; font-weight: 700; background: linear-gradient(135deg, #c9952e 0%, #e8c56d 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; }
        .logout-btn { font-size: 0.8rem; color: #94a3b8; padding: 6px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: transparent; cursor: pointer; }
        .back-home-btn { font-size: 0.85rem; color: #e8c56d; padding: 6px 14px; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 8px; background: rgba(212, 168, 83, 0.1); cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 4px; transition: 0.3s; }
        .back-home-btn:hover { background: rgba(212, 168, 83, 0.2); transform: translateY(-1px); }
        
        .content-wrap { max-width: 600px; margin: 0 auto; padding: 20px; }
        .hero-banner { background: linear-gradient(135deg, rgba(201, 149, 46, 0.1), rgba(232, 197, 109, 0.05)); border: 1px solid rgba(212, 168, 83, 0.1); border-radius: 20px; padding: 30px 20px; text-align: center; margin-bottom: 30px; }
        .hero-banner h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 8px; color: #e8c56d; }
        .hero-banner p { font-size: 0.9rem; color: #94a3b8; margin: 0; }
        
        .form-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 24px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        
        .field-group { margin-bottom: 24px; }
        .field-label { display: block; font-size: 0.9rem; font-weight: 700; color: #e8c56d; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .field-label .badge { background: #d4a853; color: #0b1120; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; }
        
        .input-box { width: 100%; padding: 16px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white; font-size: 1rem; box-sizing: border-box; transition: 0.3s; }
        .input-box:focus { border-color: #d4a853; background: rgba(0,0,0,0.5); outline: none; box-shadow: 0 0 15px rgba(212, 168, 83, 0.1); }
        
        .auto-preview { background: rgba(212, 168, 83, 0.05); border: 1px solid rgba(212, 168, 83, 0.15); border-radius: 14px; padding: 16px; margin-top: -10px; margin-bottom: 24px; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        
        .preview-row { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px; }
        .preview-label { color: #94a3b8; }
        .preview-value { font-weight: 600; color: #f1f0f0; }

        .submit-button { width: 100%; padding: 20px; border-radius: 16px; border: none; background: linear-gradient(135deg, #c9952e 0%, #e8c56d 100%); color: #0b1120; font-size: 1.1rem; font-weight: 900; cursor: pointer; box-shadow: 0 8px 25px rgba(201, 149, 46, 0.3); transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .submit-button:disabled { background: #334155; color: #64748b; box-shadow: none; cursor: not-allowed; }
        .submit-button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(201, 149, 46, 0.4); }
        
        .toast-msg { position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); background: #10b981; color: white; padding: 16px 32px; border-radius: 50px; font-weight: 700; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3); z-index: 1000; animation: bounceUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes bounceUp { from { transform: translate(-50%, 50px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
        
        .spinner { width: 22px; height: 22px; border: 3px solid rgba(11, 17, 32, 0.2); border-radius: 50%; border-top-color: #0b1120; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="back-home-btn" onClick={() => navigate('/')}>🏠 홈</button>
          <div style={{ display: 'flex', background: 'rgba(212,168,83,0.1)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(212,168,83,0.3)' }}>
            <button 
              onClick={() => navigate('/admin?loc=kolon')}
              style={{ padding: '6px 12px', border: 'none', background: locParam === 'kolon' ? '#c9952e' : 'transparent', color: locParam === 'kolon' ? '#0b1120' : '#e8c56d', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
            >코오롱</button>
            <button 
              onClick={() => navigate('/admin?loc=sindun')}
              style={{ padding: '6px 12px', border: 'none', background: locParam === 'sindun' ? '#c9952e' : 'transparent', color: locParam === 'sindun' ? '#0b1120' : '#e8c56d', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
            >중리</button>
          </div>
        </div>
        <button className="logout-btn" onClick={() => setIsAuthenticated(false)}>로그아웃</button>
      </header>

      <div className="content-wrap">
        <div className="hero-banner">
          <h3>오늘의 수업 등록</h3>
          <p>유튜브 링크만 넣으면 모든 정보가 자동 완성됩니다.</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleAddSong}>
            <div className="field-group">
              <label className="field-label"><span className="badge">1</span> 오늘 수업곡 (메인)</label>
              <input 
                type="text" 
                className="input-box"
                placeholder="유튜브 주소 붙여넣기" 
                value={songInfo.youtubeUrl}
                onChange={(e) => handleMainUrlChange(e.target.value)}
              />
            </div>

            {(songInfo.youtubeId || songInfo.tutorialId || loadingMetadata) && (
              <div className="auto-preview">
                {loadingMetadata ? (
                  <div style={{textAlign:'center', color:'#d4a853', fontSize:'.85rem'}}>곡 정보를 불러오는 중...</div>
                ) : (
                  <>
                    {/* 자동으로 1차 채워지지만, 맘에 안 들면 관리자가 언제든 타이핑해서 수정 가능한 인풋! */}
                    <div className="preview-row" style={{ flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                      <span className="preview-label" style={{ fontSize: '0.8rem' }}>노래 제목 (수정 가능):</span>
                      <input 
                        type="text" 
                        className="input-box" 
                        style={{ padding: '10px', fontSize: '0.95rem' }}
                        value={songInfo.title}
                        onChange={(e) => setSongInfo(prev => ({...prev, title: e.target.value}))}
                      />
                    </div>
                    <div className="preview-row" style={{ flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                      <span className="preview-label" style={{ fontSize: '0.8rem' }}>가수명 (수정 가능):</span>
                      <input 
                        type="text" 
                        className="input-box" 
                        style={{ padding: '10px', fontSize: '0.95rem' }}
                        value={songInfo.artist}
                        onChange={(e) => setSongInfo(prev => ({...prev, artist: e.target.value}))}
                      />
                    </div>
                    <div className="preview-row">
                      <span className="preview-label">장소:</span> 
                      <span className="preview-value">{locationName}</span>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="field-group">
              <label className="field-label" style={{ opacity: songInfo.youtubeId ? 1 : 0.4 }}>
                <span className="badge">2</span> 오늘 수업 튜토리얼 (보조/선택)
              </label>
              <input
                type="text"
                className="input-box"
                placeholder={songInfo.youtubeId ? "유튜브 주소 붙여넣기" : "메인 곡 URL을 먼저 입력해주세요"}
                value={songInfo.tutorialUrl}
                onChange={(e) => handleTutorialUrlChange(e.target.value)}
                disabled={!songInfo.youtubeId}
                style={{ opacity: songInfo.youtubeId ? 1 : 0.5, cursor: songInfo.youtubeId ? 'text' : 'not-allowed' }}
              />
              {songInfo.tutorialId && <div style={{fontSize:'.8rem', color:'#10b981', marginTop:'10px', fontWeight:600}}>✅ 튜토리얼 영상이 포함되었습니다.</div>}
            </div>

            <button className="submit-button" disabled={isSaving || !songInfo.youtubeId || loadingMetadata}>
              {isSaving ? <><div className="spinner"></div> 저장 중...</> : '오늘의 수업 업데이트 완료'}
            </button>
          </form>
        </div>

        <div style={{textAlign:'center', fontSize:'.85rem', color:'#64748b', lineHeight:1.6, marginBottom:'30px'}}>
          앱의 메인 화면에 오늘 날짜로 즉시 반영됩니다.<br/>
          곡 정보는 유튜브 영상 제목을 기반으로 자동 추출됩니다.
        </div>

        {/* 📋 전체 곡 관리 섹션 — 항상 표시 */}
        {(() => {
          const locSongs = allSongs.filter(s => s.location === locParam || s.location === 'both');
          return (
            <div className="form-card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#e8c56d', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📋 {locationName} 전체 곡 목록 <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 400 }}>({locSongs.length}곡)</span>
              </h3>
              {locSongs.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', padding: '20px', fontSize: '0.9rem' }}>등록된 곡이 없습니다.</div>
              ) : locSongs.map(song => {
                const isLocal = !!song.isLocal;
                return (
                  <div key={song.id} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '14px', padding: '14px', marginBottom: '10px', border: isLocal ? '1px solid rgba(212,168,83,0.15)' : '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</span>
                          {isLocal && (
                            <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '6px', background: 'rgba(212,168,83,0.2)', color: '#e8c56d', fontWeight: 700, flexShrink: 0 }}>관리자</span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>{song.artist}{song.addedDate ? ` · ${song.addedDate}` : ''}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                        <button
                          onClick={() => {
                            const opening = editingSongId !== song.id;
                            setEditingSongId(opening ? song.id : null);
                            setEditSongUrl('');
                            setEditSongTitle(opening ? (song.title || '') : '');
                            setEditSongArtist(opening ? (song.artist || '') : '');
                            setEditSongTutorialUrl('');
                            setEditSongNote(opening ? (song.description || '') : '');
                          }}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(212,168,83,0.3)', background: editingSongId === song.id ? 'rgba(212,168,83,0.2)' : 'transparent', color: '#e8c56d', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                        >수정</button>
                        <button
                          onClick={async () => {
                            if (!confirm(`"${song.title}"을(를) 삭제하시겠습니까?`)) return;
                            try {
                              // await 필수 — 실패해도 성공 토스트가 뜨면 안 됨
                              await removeSong(song.id);
                            } catch (err) {
                              console.error('곡 삭제 실패:', err);
                              alert('삭제 중 오류가 발생했습니다. 네트워크 상태를 확인해주세요.');
                              return;
                            }
                            // 큐앱 메인 슬롯과 일치하면 같이 정리 — 실패는 토스트에 구분 표시
                            const { removed, failed } = await removeMainTrackFromCueAppIfMatches({ youtubeIdToRemove: song.youtubeId });
                            const suffix = removed.length ? ` (큐앱 ${removed.join(', ')}도 비움)` : '';
                            const warn = failed.length ? ` ⚠️ 큐앱 ${failed.join(', ')} 정리 실패 — 큐앱에 옛 곡이 남아 있을 수 있습니다` : '';
                            setToastMsg(`🗑️ 곡이 삭제되었습니다.${suffix}${warn}`); setShowToast(true); setTimeout(() => setShowToast(false), failed.length ? 5000 : 3000);
                          }}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#ef4444', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                        >삭제</button>
                      </div>
                    </div>
                    {editingSongId === song.id && (
                      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>제목</label>
                          <input
                            type="text" className="input-box"
                            value={editSongTitle}
                            onChange={(e) => setEditSongTitle(e.target.value)}
                            style={{ marginBottom: 0, padding: '10px', fontSize: '0.9rem' }}
                            autoFocus
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>가수</label>
                          <input
                            type="text" className="input-box"
                            value={editSongArtist}
                            onChange={(e) => setEditSongArtist(e.target.value)}
                            style={{ marginBottom: 0, padding: '10px', fontSize: '0.9rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>유튜브 URL (변경 시에만 입력)</label>
                          <input
                            type="text" className="input-box"
                            placeholder="비워두면 영상은 그대로 유지"
                            value={editSongUrl}
                            onChange={(e) => setEditSongUrl(e.target.value)}
                            style={{ marginBottom: 0, padding: '10px', fontSize: '0.9rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                            튜토리얼 URL {song.tutorialId ? '(변경 시에만 입력)' : '(추가하려면 입력)'}
                          </label>
                          <div style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span>현재: {song.tutorialId ? '✅ 등록됨' : '— 없음'}</span>
                            {song.tutorialId && (
                              <button
                                type="button"
                                onClick={async () => {
                                  if (!confirm('튜토리얼 영상을 제거하시겠습니까?')) return;
                                  try {
                                    await updateSong(song.id, { tutorialId: '' });
                                    setToastMsg('🗑️ 튜토리얼 영상이 제거되었습니다.'); setShowToast(true); setTimeout(() => setShowToast(false), 3000);
                                  } catch (err) {
                                    alert('튜토리얼 제거 중 오류가 발생했습니다.');
                                  }
                                }}
                                style={{ background: 'transparent', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', borderRadius: '6px', fontSize: '0.7rem', padding: '2px 8px', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
                              >🗑 제거</button>
                            )}
                          </div>
                          <input
                            type="text" className="input-box"
                            placeholder={song.tutorialId ? "비워두면 그대로 유지" : "튜토리얼 유튜브 주소 붙여넣기"}
                            value={editSongTutorialUrl}
                            onChange={(e) => setEditSongTutorialUrl(e.target.value)}
                            style={{ marginBottom: 0, padding: '10px', fontSize: '0.9rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>📝 안무 노트 / 스텝시트 (줄바꿈 그대로 표시됨)</label>
                          <textarea
                            className="input-box"
                            placeholder="스텝 설명을 붙여넣으세요. 영상 아래 '원장님의 안무 노트'에 표시됩니다."
                            value={editSongNote}
                            onChange={(e) => setEditSongNote(e.target.value)}
                            rows={10}
                            style={{ marginBottom: 0, padding: '10px', fontSize: '0.9rem', resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit' }}
                          />
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                          <button
                            onClick={() => { setEditingSongId(null); setEditSongUrl(''); setEditSongTitle(''); setEditSongArtist(''); setEditSongTutorialUrl(''); setEditSongNote(''); }}
                            style={{ padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                          >취소</button>
                          <button
                            onClick={async () => {
                              const trimmedTitle = editSongTitle.trim();
                              const trimmedArtist = editSongArtist.trim();
                              if (!trimmedTitle) { alert('제목을 입력해주세요.'); return; }

                              const updates = {};
                              if (trimmedTitle !== song.title) updates.title = trimmedTitle;
                              if (trimmedArtist !== (song.artist || '')) updates.artist = trimmedArtist;

                              if (editSongUrl.trim()) {
                                const newId = getYoutubeId(editSongUrl);
                                if (!newId) { alert('유효한 유튜브 링크를 입력해주세요.\nURL을 비우면 영상은 변경되지 않습니다.'); return; }
                                updates.youtubeId = newId;
                              }

                              if (editSongTutorialUrl.trim()) {
                                const newTutId = getYoutubeId(editSongTutorialUrl);
                                if (!newTutId) { alert('유효한 튜토리얼 유튜브 링크를 입력해주세요.\n비우면 기존 튜토리얼은 그대로 유지됩니다.'); return; }
                                if (newTutId !== song.tutorialId) updates.tutorialId = newTutId;
                              }

                              if (editSongNote.trim() !== (song.description || '').trim()) {
                                updates.description = editSongNote.trim();
                              }

                              if (Object.keys(updates).length === 0) {
                                setEditingSongId(null);
                                return;
                              }

                              try {
                                await updateSong(song.id, updates);
                                // 🎵 메인 영상(youtubeId) 또는 제목이 바뀌었으면 댄스 큐 앱에도 반영
                                // 단, 큐앱의 현재 메인이 '이 곡'일 때만 — 옛 곡 수정이 메인 슬롯을 덮어쓰지 않게
                                let cueResultMsg = '';
                                if (updates.youtubeId || updates.title) {
                                  const cue = await updateCueAppIfCurrentMain({
                                    prevYoutubeId: song.youtubeId,
                                    youtubeId: updates.youtubeId || song.youtubeId,
                                    title: updates.title || song.title,
                                  });
                                  if (!cue.skipped) {
                                    cueResultMsg = cue.ok ? ` · 큐 앱(${cue.updated.join(', ')}) 동기화됨` : ` · ⚠️ 큐 앱 실패(${cue.reason || '일부 role'})`;
                                  }
                                }
                                setEditingSongId(null); setEditSongUrl(''); setEditSongTitle(''); setEditSongArtist(''); setEditSongTutorialUrl(''); setEditSongNote('');
                                setToastMsg('✅ 곡 정보가 수정되었습니다.' + cueResultMsg); setShowToast(true); setTimeout(() => setShowToast(false), 4000);
                              } catch (err) {
                                alert('수정 중 오류가 발생했습니다.');
                              }
                            }}
                            style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #c9952e, #e8c56d)', color: '#0b1120', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                          >저장</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {showToast && <div className="toast-msg">{toastMsg}</div>}
    </div>
  );
};

export default AdminPage;
