import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from '../context/LocationContext';
import './BottomNav.css';

export default function BottomNav() {
    const { selectedLocation } = useLocation();

    const navItems = [
        { path: '/', icon: '🏠', label: '홈' },
        { path: '/video', icon: '🎬', label: '수업영상' },
        { path: '/theory', icon: '📘', label: '자이브' },
        // ✏️ 등록 — 관리자용 게시 지름길. 현재 장소를 들고 /admin으로 이동
        //    (비밀번호 게이트가 있어 회원이 눌러도 입력 화면에서 멈춤)
        { path: `/admin?loc=${selectedLocation || 'kolon'}`, icon: '✏️', label: '등록' },
        { path: '/recommend', icon: '⭐', label: '영상모음' },
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}