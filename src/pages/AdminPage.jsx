import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

/**
 * 👑 Step-by-Step 코오롱 전용 관리자 대시보드
 * 앱의 다크 네이비 & 골드 디자인 시스템을 적용하여 일체감을 높였습니다.
 */
const AdminPage = () => {
  const navigate = useNavigate();
  const { addSong } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loadingMetadata, setLoadingMetadata] = useState(false);

  const [songInfo, setSongInfo] = useState({
    title: '',
    artist: 'Various',
    youtubeUrl: '',
    youtubeId: '',
    tutorialUrl: '',
    tutorialId: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
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
        }
      } catch (err) {
        console.error('메타데이터 조회 실패:', err);
      } finally {
        setLoadingMetadata(false);
      }
    }
  };

  const handleTutorialUrlChange = (url) => {
    const id = getYoutubeId(url);
    setSongInfo(prev => ({ ...prev, tutorialUrl: url, tutorialId: id || '' }));
  };

  const handleAddSong = (e) => {
    e.preventDefault();
    if (!songInfo.youtubeId) {
      alert('메인 수업곡 주소를 입력해주세요.');
      return;
    }

    setIsSaving(true);
    try {
      addSong(songInfo); // 실제 저장 호출
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setSongInfo({
        title: '', artist: 'Various', youtubeUrl: '', youtubeId: '',
        tutorialUrl: '', tutorialId: '', date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
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
          <p>코오롱 스포렉스 관리자 로그인</p>
          <form onSubmit={handleLogin}>
            <input type="password" className="login-input" placeholder="비밀번호 입력" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
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
        .admin-header { position: sticky; top: 0; z-index: 100; height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; background: rgba(11, 17, 32, 0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(212, 168, 83, 0.15); }
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
          <h2>👑 코오롱 관리</h2>
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

            {(songInfo.youtubeId || loadingMetadata) && (
              <div className="auto-preview">
                {loadingMetadata ? (
                  <div style={{textAlign:'center', color:'#d4a853', fontSize:'.85rem'}}>곡 정보를 불러오는 중...</div>
                ) : (
                  <>
                    <div className="preview-row"><span className="preview-label">노래:</span> <span className="preview-value">{songInfo.title}</span></div>
                    <div className="preview-row"><span className="preview-label">가수:</span> <span className="preview-value">{songInfo.artist}</span></div>
                    <div className="preview-row"><span className="preview-label">장소:</span> <span className="preview-value">코오롱 스포렉스</span></div>
                  </>
                )}
              </div>
            )}

            <div className="field-group" style={{opacity: songInfo.youtubeId ? 1 : 0.5}}>
              <label className="field-label"><span className="badge">2</span> 오늘 수업 튜토리얼 (선택)</label>
              <input 
                type="text" 
                className="input-box"
                placeholder="유튜브 주소 붙여넣기" 
                value={songInfo.tutorialUrl}
                onChange={(e) => handleTutorialUrlChange(e.target.value)}
                disabled={!songInfo.youtubeId}
              />
              {songInfo.tutorialId && <div style={{fontSize:'.8rem', color:'#10b981', marginTop:'10px', fontWeight:600}}>✅ 튜토리얼 영상이 포함되었습니다.</div>}
            </div>

            <button className="submit-button" disabled={isSaving || !songInfo.youtubeId || loadingMetadata}>
              {isSaving ? <><div className="spinner"></div> 저장 중...</> : '오늘의 수업 업데이트 완료'}
            </button>
          </form>
        </div>

        <div style={{textAlign:'center', fontSize:'.85rem', color:'#64748b', lineHeight:1.6}}>
          앱의 메인 화면에 오늘 날짜로 즉시 반영됩니다.<br/>
          곡 정보는 유튜브 영상 제목을 기반으로 자동 추출됩니다.
        </div>
      </div>

      {showToast && <div className="toast-msg">✅ 오늘의 수업곡이 성공적으로 등록되었습니다!</div>}
    </div>
  );
};

export default AdminPage;
