// 수업 일정 데이터 (장소별)
const schedule = [
    {
        id: 1,
        day: "월",
        dayEn: "MON",
        classes: [
            {
                id: "mon-1",
                time: "10:00 - 11:00",
                title: "입문반",
                level: 1,
                location: "kororong",
                locationName: "코오롱 스포렉스",
                instructor: "구향회 선생님",
                description: "라인댄스를 처음 접하는 분을 위한 기초 클래스",
                maxStudents: 20,
                currentStudents: 15
            },
            {
                id: "mon-2",
                time: "11:10 - 12:10",
                title: "초급반",
                level: 2,
                location: "kororong",
                locationName: "코오롱 스포렉스",
                instructor: "구향회 선생님",
                description: "기본 스텝을 익힌 분을 위한 초급 클래스",
                maxStudents: 25,
                currentStudents: 22
            }
        ]
    },
    {
        id: 2,
        day: "화",
        dayEn: "TUE",
        classes: [
            {
                id: "tue-1",
                time: "10:00 - 11:00",
                title: "입문반",
                level: 1,
                location: "sindun",
                locationName: "신둔면",
                instructor: "구향회 선생님",
                description: "라인댄스를 처음 접하는 분을 위한 기초 클래스",
                maxStudents: 20,
                currentStudents: 15
            },
            {
                id: "tue-2",
                time: "11:10 - 12:10",
                title: "초급반",
                level: 2,
                location: "sindun",
                locationName: "신둔면",
                instructor: "구향회 선생님",
                description: "기본 스텝을 익힌 분을 위한 초급 클래스",
                maxStudents: 20,
                currentStudents: 18
            }
        ]
    },
    {
        id: 3,
        day: "수",
        dayEn: "WED",
        classes: [
            {
                id: "wed-1",
                time: "10:00 - 11:00",
                title: "입문반",
                level: 1,
                location: "kororong",
                locationName: "코오롱 스포렉스",
                instructor: "구향회 선생님",
                description: "라인댄스를 처음 접하는 분을 위한 기초 클래스",
                maxStudents: 20,
                currentStudents: 17
            },
            {
                id: "wed-2",
                time: "11:10 - 12:10",
                title: "초급반",
                level: 2,
                location: "kororong",
                locationName: "코오롱 스포렉스",
                instructor: "구향회 선생님",
                description: "기본 스텝을 익힌 분을 위한 초급 클래스",
                maxStudents: 25,
                currentStudents: 20
            }
        ]
    },
    {
        id: 4,
        day: "목",
        dayEn: "THU",
        classes: [
            {
                id: "thu-1",
                time: "10:00 - 11:00",
                title: "입문반",
                level: 1,
                location: "sindun",
                locationName: "신둔면",
                instructor: "구향회 선생님",
                description: "라인댄스를 처음 접하는 분을 위한 기초 클래스",
                maxStudents: 20,
                currentStudents: 16
            },
            {
                id: "thu-2",
                time: "11:10 - 12:10",
                title: "초급반",
                level: 2,
                location: "sindun",
                locationName: "신둔면",
                instructor: "구향회 선생님",
                description: "기본 스텝을 익힌 분을 위한 초급 클래스",
                maxStudents: 20,
                currentStudents: 14
            }
        ]
    },
    {
        id: 5,
        day: "금",
        dayEn: "FRI",
        classes: [
            {
                id: "fri-1",
                time: "10:00 - 11:30",
                title: "자유연습반",
                level: 0,
                location: "kororong",
                locationName: "코오롱 스포렉스",
                instructor: "구향회 선생님",
                description: "배운 곡들을 자유롭게 연습하는 시간",
                maxStudents: 30,
                currentStudents: 12
            }
        ]
    },
    {
        id: 6,
        day: "토",
        dayEn: "SAT",
        classes: []
    },
    {
        id: 7,
        day: "일",
        dayEn: "SUN",
        classes: []
    }
];

// 유틸 함수: 장소별 일정 필터
export function getScheduleForLocation(locationId) {
    if (!locationId) return schedule;
    return schedule.map(day => ({
        ...day,
        classes: day.classes.filter(c => c.location === locationId)
    }));
}

export default schedule;
