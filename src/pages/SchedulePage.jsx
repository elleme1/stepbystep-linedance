import React from 'react';
import './SchedulePage.css';
import { useLocation } from '../context/LocationContext';
import LocationBadge from '../components/LocationBadge';

export default function SchedulePage() {
    const { selectedLocation, locationInfo } = useLocation();

    // 📍 장소별 수업 일정 데이터
    const allScheduleData = {
        kolon: [
            {
                id: 1,
                date: '이번 주 화요일',
                isToday: false,
                time: '오전 10:40 ~ 11:50',
                title: '오전 라인댄스 정규반',
                location: '코오롱스포렉스'
            },
            {
                id: 2,
                date: '이번 주 목요일',
                isToday: true,
                time: '오전 10:40 ~ 11:50',
                title: '오전 라인댄스 정규반',
                location: '코오롱스포렉스'
            },
            {
                id: 3,
                date: '다음 주 화요일',
                isToday: false,
                time: '오전 10:40 ~ 11:50',
                title: '오전 라인댄스 정규반',
                location: '코오롱스포렉스'
            },
            {
                id: 4,
                date: '다음 주 목요일',
                isToday: false,
                time: '오전 10:40 ~ 11:50',
                title: '오전 라인댄스 정규반',
                location: '코오롱스포렉스'
            }
        ],
        sindun: [
            {
                id: 5,
                date: '이번 주 월요일',
                isToday: false,
                time: '오전 10:40 ~ 11:50',
                title: '라인댄스 정규반',
                location: '중리 행정복지센터'
            },
            {
                id: 6,
                date: '이번 주 수요일',
                isToday: false,
                time: '오전 10:40 ~ 11:50',
                title: '라인댄스 정규반',
                location: '중리 행정복지센터'
            },
            {
                id: 7,
                date: '다음 주 월요일',
                isToday: false,
                time: '오전 10:40 ~ 11:50',
                title: '라인댄스 정규반',
                location: '중리 행정복지센터'
            },
            {
                id: 8,
                date: '다음 주 수요일',
                isToday: false,
                time: '오전 10:40 ~ 11:50',
                title: '라인댄스 정규반',
                location: '중리 행정복지센터'
            }
        ]
    };

    const scheduleData = allScheduleData[selectedLocation] || allScheduleData.kolon;

    const getMapLink = (loc) => {
        if (loc.includes('코오롱')) {
            return 'https://map.naver.com/p/search/%EC%BD%94%EB%A1%9C%EB%A1%B1%EC%8A%A4%ED%8F%AC%EB%A0%89%EC%8A%A4';
        }
        return 'https://map.naver.com/p/search/%EC%8B%A0%EB%91%94%EB%A9%B4%20%EC%A3%BC%EB%AF%BC%EC%9E%90%EC%B9%98%EC%84%BC%ED%84%B0';
    };

    return (
        <div className="schedule-container">

            {/* 1. 상단 안내 헤더 */}
            <div className="schedule-header">
                <h1 className="schedule-title">📅 수업 일정</h1>
                <p className="schedule-subtitle">
                    구향회 선생님의 {locationInfo ? `${locationInfo.emoji} ${locationInfo.name}` : ''} 수업 시간표
                </p>

                {/* 📍 장소 뱃지 */}
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}>
                    <LocationBadge />
                </div>

                {/* 센스 있는 선생님 한마디 박스 */}
                <div className="info-box">
                    <span className="info-icon">💡</span>
                    <p>수업 시작 <strong>10분 전</strong>까지 도착해서 가볍게 몸을 풀어주세요!</p>
                </div>
            </div>

            {/* 2. 세로 타임라인 리스트 */}
            <div className="timeline-wrapper">
                {scheduleData.map((item, index) => (
                    <div key={item.id} className={`timeline-item ${item.isToday ? 'is-today' : ''}`}>

                        {/* 왼쪽 연결선과 동그라미 기둥 */}
                        <div className="timeline-indicator">
                            <div className="timeline-dot"></div>
                            {index !== scheduleData.length - 1 && <div className="timeline-line"></div>}
                        </div>

                        {/* 오른쪽 수업 정보 카드 */}
                        <div className="timeline-card">

                            {/* 날짜와 '오늘' 뱃지 */}
                            <div className="card-header">
                                <span className="date-text">{item.date}</span>
                                {item.isToday && <span className="today-badge">오늘</span>}
                            </div>

                            {/* 시간과 수업 이름 */}
                            <p className="class-time">{item.time}</p>
                            <h3 className="class-title">{item.title}</h3>

                            {/* 장소와 지도 버튼 */}
                            <div className="card-footer">
                                <span className="class-location">📍 {item.location}</span>
                                <button
                                    className="map-btn"
                                    onClick={() => window.open(getMapLink(item.location), '_blank')}
                                >
                                    지도 보기
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}