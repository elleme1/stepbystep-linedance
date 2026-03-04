import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
    const navItems = [
        { path: '/', icon: '🏠', label: '홈' },
        { path: '/schedule', icon: '📅', label: '일정' },
        { path: '/video', icon: '🎬', label: '영상' },
        { path: '/theory', icon: '📘', label: '이론' },
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