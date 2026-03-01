import { useState } from 'react';
import schedule from '../data/schedule';

const levelText = ['자유', '입문', '초급', '중급', '고급', '최상급'];

export default function SchedulePage() {
    const today = new Date();
    const todayDayIndex = today.getDay(); // 0=Sun, 1=Mon, ...
    // Convert to our schedule index (0=Mon ... 6=Sun)
    const scheduleIndex = todayDayIndex === 0 ? 6 : todayDayIndex - 1;

    const [selectedDay, setSelectedDay] = useState(scheduleIndex);
    const currentSchedule = schedule[selectedDay];

    return (
        <div>
            {/* Day Tabs */}
            <div className="schedule-tabs" style={{ marginBottom: 'var(--space-lg)' }}>
                {schedule.map((day, idx) => (
                    <button
                        key={day.id}
                        className={`day-tab ${selectedDay === idx ? 'active' : ''} ${scheduleIndex === idx ? 'today' : ''}`}
                        onClick={() => setSelectedDay(idx)}
                    >
                        <span className="day-name">{day.day}</span>
                        <span className="day-en">{day.dayEn}</span>
                    </button>
                ))}
            </div>

            {/* Classes for Selected Day */}
            {currentSchedule.classes.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-emoji">🏖️</div>
                    <p>{currentSchedule.day}요일은 수업이 없습니다</p>
                    <p style={{ marginTop: '4px' }}>푹 쉬고 다음 수업에서 만나요!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    {currentSchedule.classes.map((cls) => (
                        <div className="glass-card class-card" key={cls.id}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span className="class-time">{cls.time}</span>
                                <span className={`level-badge level-${cls.level}`}>
                                    {levelText[cls.level]}
                                </span>
                            </div>

                            <h3 className="class-title">{cls.title}</h3>

                            <div className="class-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{cls.location}</span>
                            </div>

                            <div className="class-detail" style={{ marginTop: '4px' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18V5l12-2v13" />
                                    <circle cx="6" cy="18" r="3" />
                                    <circle cx="18" cy="16" r="3" />
                                </svg>
                                <span>수업곡: {cls.song}</span>
                            </div>

                            <div className="class-detail" style={{ marginTop: '4px' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <line x1="20" y1="8" x2="20" y2="14" />
                                    <line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                                <span>{cls.description}</span>
                            </div>

                            <div className="class-capacity">
                                <div className="capacity-bar">
                                    <div
                                        className="capacity-fill"
                                        style={{ width: `${(cls.currentStudents / cls.maxStudents) * 100}%` }}
                                    />
                                </div>
                                <span className="capacity-text">{cls.currentStudents}/{cls.maxStudents}명</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
