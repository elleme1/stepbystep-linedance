import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChallenge } from '../context/ChallengeContext';
import { jivePlanData } from '../data/jivePlan';
import './ChallengePage.css';

export default function ChallengePage() {
    const navigate = useNavigate();
    const { completedTasks, toggleTask } = useChallenge();
    const [expandedWeeks, setExpandedWeeks] = useState({ 1: true });

    const toggleWeek = (weekNum) => {
        setExpandedWeeks(prev => ({
            ...prev,
            [weekNum]: !prev[weekNum]
        }));
    };

    const handleTaskClick = (task, taskId) => {
        if (task.type === 'song' && task.songId) {
            navigate(`/video/${task.songId}`);
        } else if (task.type === 'theory' && task.videoId) {
            // Optional: navigate to theory page or open youtube url
            window.open(`https://youtu.be/${task.videoId}`, '_blank');
        }
    };

    const calculateProgress = () => {
        let total = 0;
        let completed = 0;
        jivePlanData.weeks.forEach(w => {
            w.sessions.forEach(s => {
                s.tasks.forEach((t, idx) => {
                    total++;
                    if (completedTasks[`${jivePlanData.id}_${w.week}_${s.session}_${idx}`]) {
                        completed++;
                    }
                });
            });
        });
        return Math.round((completed / total) * 100) || 0;
    };

    const progress = calculateProgress();

    return (
        <div className="challenge-container">
            <header className="challenge-header">
                <button className="back-btn" onClick={() => navigate(-1)}>←</button>
                <h1 className="challenge-title">{jivePlanData.title}</h1>
            </header>

            <div className="challenge-hero">
                <p className="challenge-desc">{jivePlanData.description}</p>
                <div className="progress-container">
                    <div className="progress-text">진행률 <strong>{progress}%</strong></div>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="challenge-weeks">
                {jivePlanData.weeks.map(week => (
                    <div key={week.week} className={`week-card ${expandedWeeks[week.week] ? 'expanded' : ''}`}>
                        <div className="week-header" onClick={() => toggleWeek(week.week)}>
                            <div className="week-info">
                                <h2 className="week-title">{week.week}주차: {week.title}</h2>
                                <p className="week-obj">{week.objective}</p>
                            </div>
                            <span className="expand-icon">{expandedWeeks[week.week] ? '▲' : '▼'}</span>
                        </div>

                        {expandedWeeks[week.week] && (
                            <div className="week-body">
                                {week.sessions.map(session => (
                                    <div key={session.session} className="session-card">
                                        <h3 className="session-title">{session.session}회차: {session.title}</h3>
                                        <ul className="task-list">
                                            {session.tasks.map((task, idx) => {
                                                const taskId = `${jivePlanData.id}_${week.week}_${session.session}_${idx}`;
                                                const isCompleted = completedTasks[taskId];
                                                
                                                return (
                                                    <li key={idx} className={`task-item ${isCompleted ? 'completed' : ''}`}>
                                                        <div 
                                                            className="task-checkbox" 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                toggleTask(taskId);
                                                            }}
                                                        >
                                                            {isCompleted ? '✅' : '⬜️'}
                                                        </div>
                                                        <div 
                                                            className="task-content"
                                                            onClick={() => handleTaskClick(task, taskId)}
                                                        >
                                                            <span className={`task-type badge-${task.type}`}>
                                                                {task.type === 'song' ? '🎵 루틴' : task.type === 'theory' ? '📺 영상' : '🏃 연습'}
                                                            </span>
                                                            <span className="task-text">{task.title}</span>
                                                            {(task.type === 'song' || task.type === 'theory') && (
                                                                <span className="task-link-icon">↗</span>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
