import React from 'react';
import './SchedulePage.css'; // ✨ 일정표 전용 예쁜 디자인 연결

export default function SchedulePage() {
    // 💡 원장님의 진짜 스케줄로 완벽하게 교체되었습니다!
    const scheduleData = [
        {
            id: 1,
            date: '이번 주 목요일',
            isToday: true, // 🔴 예쁜 핑크색 효과를 확인하시라고 '오늘' 불을 켜두었습니다!
            time: '오전 10:40 ~ 11:50',
            title: '오전 라인댄스 정규반',
            location: '코로롱스포렉스'
        },
        {
            id: 2,
            date: '다음 주 화요일',
            isToday: false,
            time: '오전 10:40 ~ 11:50',
            title: '오전 라인댄스 정규반',
            location: '코로롱스포렉스'
        },
        {
            id: 3,
            date: '다음 주 목요일',
            isToday: false,
            time: '오전 10:40 ~ 11:50',
            title: '오전 라인댄스 정규반',
            location: '코로롱스포렉스'
        },
        {
            id: 4,
            date: '다다음 주 화요일',
            isToday: false,
            time: '오전 10:40 ~ 11:50',
            title: '오전 라인댄스 정규반',
            location: '코로롱스포렉스'
        }
    ];

    return (
        <div className="schedule-container">

            {/* 1. 상단 안내 헤더 */}
            <div className="schedule-header">
                <h1 className="schedule-title">📅 수업 일정</h1>
                <p className="schedule-subtitle">구향회 원장님의 라인댄스 수업 시간표입니다.</p>

                {/* 센스 있는 원장님의 한마디 박스 */}
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
                            {/* 마지막 항목이 아니면 아래로 내려가는 선을 그어줍니다 */}
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
                                    onClick={() => alert('실제 앱에서는 [코로롱스포렉스] 길찾기 지도가 열립니다! 🗺️')}
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