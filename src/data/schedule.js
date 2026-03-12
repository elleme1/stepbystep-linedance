// 수업 일정 데이터
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
                location: "문화센터 3층 무용실",
                instructor: "구양희 원장",
                description: "라인댄스를 처음 접하는 분을 위한 기초 클래스",
                song: "Cupid Shuffle",
                maxStudents: 20,
                currentStudents: 15
            },
            {
                id: "mon-2",
                time: "11:10 - 12:10",
                title: "초급반",
                level: 2,
                location: "문화센터 3층 무용실",
                instructor: "구양희 원장",
                description: "기본 스텝을 익힌 분을 위한 초급 클래스",
                song: "Tush Push",
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
                time: "14:00 - 15:00",
                title: "중급반",
                level: 3,
                location: "주민센터 다목적홀",
                instructor: "구양희 원장",
                description: "다양한 턴과 스텝 조합을 배우는 중급 클래스",
                song: "Black Horse",
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
                location: "문화센터 3층 무용실",
                instructor: "구양희 원장",
                description: "라인댄스를 처음 접하는 분을 위한 기초 클래스",
                song: "Cha Cha Slide",
                maxStudents: 20,
                currentStudents: 17
            },
            {
                id: "wed-2",
                time: "11:10 - 12:10",
                title: "초급반",
                level: 2,
                location: "문화센터 3층 무용실",
                instructor: "구양희 원장",
                description: "기본 스텝을 익힌 분을 위한 초급 클래스",
                song: "Bomba",
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
                time: "14:00 - 15:00",
                title: "중급반",
                level: 3,
                location: "주민센터 다목적홀",
                instructor: "구양희 원장",
                description: "다양한 턴과 스텝 조합을 배우는 중급 클래스",
                song: "Copperhead Road",
                maxStudents: 20,
                currentStudents: 16
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
                location: "문화센터 3층 무용실",
                instructor: "구양희 원장",
                description: "배운 곡들을 자유롭게 연습하는 시간",
                song: "다양한 곡",
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

export default schedule;
