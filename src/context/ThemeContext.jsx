import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // 저장 키를 'sbs-theme2'로 올림 — 2026-07 '화사한 라이트' 개편에서 기본값을
    // light로 바꾸면서, 예전 자동 저장된 'dark'(사용자가 고른 게 아님)에 묶이지
    // 않고 전 회원이 새 기본을 한 번 받게 한다. 이후 토글 선택은 그대로 저장됨.
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('sbs-theme2') || 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('sbs-theme2', theme);
        // 상태바·브라우저 툴바 색을 테마에 맞춤 (iOS 홈화면 앱은 status-bar-style=default에서 이 색을 따름)
        try {
            const meta = document.querySelector('meta[name="theme-color"]');
            if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1120' : '#fff7f5');
        } catch (e) { /* 무시 */ }
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
