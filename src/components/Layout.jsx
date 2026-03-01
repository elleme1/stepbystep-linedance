import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const pageTitles = {
    '/': '스텝바이스텝',
    '/schedule': '수업 일정',
    '/library': '영상 라이브러리',
    '/announce': '공지사항',
    '/profile': '마이페이지',
    '/challenge': '도전 과제',
    '/community': '커뮤니티',
    '/search': '검색',
};

export default function Layout() {
    const location = useLocation();
    const isVideoDetail = location.pathname.startsWith('/video/');

    // Get page title based on current path
    const title = pageTitles[location.pathname] || '스텝바이스텝';

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
