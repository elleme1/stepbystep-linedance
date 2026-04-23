import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const PracticeContext = createContext();

const getToday = () => new Date().toDateString();

const loadInitial = () => {
    try {
        const saved = JSON.parse(localStorage.getItem('sbs-practiced'));
        if (saved && saved.date === getToday()) {
            return saved;
        }
    } catch { /* JSON parse 실패 시 fallthrough */ }
    return { date: getToday(), items: [] };
};

const persist = (value) => {
    try {
        localStorage.setItem('sbs-practiced', JSON.stringify(value));
    } catch { /* QuotaExceeded 등 무시 */ }
};

export function PracticeProvider({ children }) {
    const [practiced, setPracticed] = useState(loadInitial);

    // ⏰ 자정 전환 감지 — visibility / focus / 60초 interval
    //    탭을 열어둔 채 자정을 넘겨도 "오늘 진행률"이 자동 초기화됨
    useEffect(() => {
        const checkRollover = () => {
            const today = getToday();
            setPracticed(prev => {
                if (prev.date === today) return prev;
                const next = { date: today, items: [] };
                persist(next);
                return next;
            });
        };
        document.addEventListener('visibilitychange', checkRollover);
        window.addEventListener('focus', checkRollover);
        const iv = setInterval(checkRollover, 60_000);
        return () => {
            document.removeEventListener('visibilitychange', checkRollover);
            window.removeEventListener('focus', checkRollover);
            clearInterval(iv);
        };
    }, []);

    const togglePracticed = useCallback((id) => {
        setPracticed(prev => {
            const today = getToday();
            // interval이 발화하기 전 자정을 넘긴 경우에도 안전하게 롤오버
            const base = prev.date === today ? prev.items : [];
            const items = base.includes(id)
                ? base.filter(i => i !== id)
                : [...base, id];
            const next = { date: today, items };
            persist(next);
            return next;
        });
    }, []);

    const isPracticed = useCallback((id) => practiced.items.includes(id), [practiced.items]);
    const practiceCount = practiced.items.length;

    return (
        <PracticeContext.Provider value={{ togglePracticed, isPracticed, practiceCount }}>
            {children}
        </PracticeContext.Provider>
    );
}

export function usePractice() {
    return useContext(PracticeContext);
}
