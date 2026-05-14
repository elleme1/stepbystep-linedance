import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ChallengeContext = createContext();

const loadInitialTasks = () => {
    try {
        const saved = JSON.parse(localStorage.getItem('sbs-challenges'));
        if (saved) return saved;
    } catch { /* JSON parse 실패 시 fallthrough */ }
    return {}; // { "challengeId_week_session_taskIdx": true }
};

const loadInitialVideos = () => {
    try {
        const saved = JSON.parse(localStorage.getItem('sbs-challenge-videos'));
        if (saved) return saved;
    } catch { /* JSON parse 실패 시 fallthrough */ }
    return {}; // { "challengeId_week_session": "url" }
};

const persistTasks = (value) => {
    try {
        localStorage.setItem('sbs-challenges', JSON.stringify(value));
    } catch { /* QuotaExceeded 등 무시 */ }
};

const persistVideos = (value) => {
    try {
        localStorage.setItem('sbs-challenge-videos', JSON.stringify(value));
    } catch { /* 무시 */ }
};

export function ChallengeProvider({ children }) {
    const [completedTasks, setCompletedTasks] = useState(loadInitialTasks);
    const [videoLinks, setVideoLinks] = useState(loadInitialVideos);

    const toggleTask = useCallback((taskId) => {
        setCompletedTasks(prev => {
            const next = { ...prev };
            if (next[taskId]) {
                delete next[taskId];
            } else {
                next[taskId] = true;
            }
            persistTasks(next);
            return next;
        });
    }, []);

    const isTaskCompleted = useCallback((taskId) => {
        return !!completedTasks[taskId];
    }, [completedTasks]);

    const saveVideoLink = useCallback((sessionId, url) => {
        setVideoLinks(prev => {
            const next = { ...prev };
            if (url) {
                next[sessionId] = url;
            } else {
                delete next[sessionId];
            }
            persistVideos(next);
            return next;
        });
    }, []);

    const getVideoLink = useCallback((sessionId) => {
        return videoLinks[sessionId] || null;
    }, [videoLinks]);

    return (
        <ChallengeContext.Provider value={{ 
            completedTasks, 
            toggleTask, 
            isTaskCompleted,
            videoLinks,
            saveVideoLink,
            getVideoLink
        }}>
            {children}
        </ChallengeContext.Provider>
    );
}

export function useChallenge() {
    return useContext(ChallengeContext);
}
