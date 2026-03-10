import { createContext, useContext, useState, useCallback } from 'react';

const PracticeContext = createContext();

export function PracticeProvider({ children }) {
    const [practiced, setPracticed] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('sbs-practiced'));
            // 오늘 날짜가 아닌 데이터는 리셋
            if (saved && saved.date === new Date().toDateString()) {
                return saved;
            }
            return { date: new Date().toDateString(), items: [] };
        } catch { return { date: new Date().toDateString(), items: [] }; }
    });

    const togglePracticed = useCallback((id) => {
        setPracticed(prev => {
            const items = prev.items.includes(id)
                ? prev.items.filter(i => i !== id)
                : [...prev.items, id];
            const next = { date: new Date().toDateString(), items };
            localStorage.setItem('sbs-practiced', JSON.stringify(next));
            return next;
        });
    }, []);

    const isPracticed = useCallback((id) => practiced.items.includes(id), [practiced]);
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
