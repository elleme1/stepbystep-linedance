import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const pageTitles = {
    '/': '구양희 STEP-BY-STEP',
    '/schedule': '수업 일정',
    '/videos': '영상',
    '/library': '영상 라이브러리',
    '/playlist': '연속 재생',
    '/announce': '공지사항',
    '/community': '커뮤니티',
    '/search': '검색',
    '/theory': '이론 학습',
};

export default function Layout() {
    const location = useLocation();
    const isVideoDetail = location.pathname.startsWith('/video/');

    // Get page title based on current path
    const title = pageTitles[location.pathname] || '구양희 STEP-BY-STEP';

    return (
        <div className="app-layout">
            {!isVideoDetail && (
                <header className="app-header">
                    <div className="header-inner">
                        <h1>
                            <span className="header-emoji">💃</span>
                            {title}
                        </h1>
                    </div>
                </header>
            )}
            <div className="app-body">
                <BottomNav />
                <main className="page-content">
                    <div className="page-enter" key={location.pathname}>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
