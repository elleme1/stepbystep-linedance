import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ChallengeContext = createContext();

const loadInitial = () => {
    try {
        const saved = JSON.parse(localStorage.getItem('sbs-challenges'));
        if (saved) return saved;
    } catch { /* JSON parse 실패 시 fallthrough */ }
    return {}; // { "challengeId_week_session_taskIdx": true }
};

const persist = (value) => {
    try {
        localStorage.setItem('sbs-challenges', JSON.stringify(value));
    } catch { /* QuotaExceeded 등 무시 */ }
};

export function ChallengeProvider({ children }) {
    const [completedTasks, setCompletedTasks] = useState(loadInitial);

    const toggleTask = useCallback((taskId) => {
        setCompletedTasks(prev => {
            const next = { ...prev };
            if (next[taskId]) {
                delete next[taskId];
            } else {
                next[taskId] = true;
            }
            persist(next);
            return next;
        });
    }, []);

    const isTaskCompleted = useCallback((taskId) => {
        return !!completedTasks[taskId];
    }, [completedTasks]);

    return (
        <ChallengeContext.Provider value={{ completedTasks, toggleTask, isTaskCompleted }}>
            {children}
        </ChallengeContext.Provider>
    );
}

export function useChallenge() {
    return useContext(ChallengeContext);
}
