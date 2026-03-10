export const theoryData = [
    // ===== 기초 스텝 =====
    {
        id: 'step_01',
        category: 'step',
        title: '그레이프바인 (Grapevine)',
        shortDesc: '옆으로 이동하며 발을 엇갈리게 딛는 4카운트 기초 스텝',
        content: '1: 오른발 옆으로\n2: 왼발을 오른발 뒤로 교차\n3: 오른발 옆으로\n4: 왼발 터치',
        tips: '무게 중심을 낮추고 상체는 정면 유지. 발끝이 아닌 발바닥 전체로 딛기.',
        keywords: ['그레이프바인', 'grapevine', '바인', 'vine'],
        gifUrl: '/assets/gifs/grapevine.gif',
        videoUrl: 'F0AoFke-Dj0'
    },
    {
        id: 'step_02',
        category: 'step',
        title: '재즈 박스 (Jazz Box)',
        shortDesc: '정사각형 모양으로 발을 딛는 4카운트 스텝',
        content: '1: 오른발 왼발 앞으로 교차\n2: 왼발 뒤로\n3: 오른발 옆으로\n4: 왼발 모아 터치',
        tips: '교차할 때 자연스럽게 무릎을 살짝 구부리면 부드러운 동작이 됩니다.',
        keywords: ['재즈 박스', 'jazz box', '재즈박스'],
        gifUrl: '/assets/gifs/jazzbox.gif',
        videoUrl: 'dLPxdftFI3Q'
    },
    {
        id: 'step_03',
        category: 'step',
        title: '코스터 스텝 (Coaster Step)',
        shortDesc: '뒤로 갔다 앞으로 돌아오는 3카운트 스텝',
        content: '1: 오른발 뒤로\n&: 왼발을 오른발 옆에 모아\n2: 오른발 앞으로',
        tips: '빠른 "&" 카운트에서 균형을 잃지 않도록 작은 보폭으로!',
        keywords: ['코스터 스텝', 'coaster step', '코스터'],
        gifUrl: '/assets/gifs/coasterstep.gif',
        videoUrl: 'rVaEk1BEsqQ'
    },
    {
        id: 'step_04',
        category: 'step',
        title: '셔플 (Shuffle)',
        shortDesc: '한 방향으로 빠르게 이동하는 3카운트 스텝',
        content: '1: 오른발 옆으로\n&: 왼발 모아\n2: 오른발 옆으로',
        tips: '바닥을 스치듯 미끄러지는 느낌으로. 발을 높이 들지 마세요.',
        keywords: ['셔플', 'shuffle'],
        gifUrl: '/assets/gifs/shuffle.gif',
        videoUrl: 'F0AoFke-Dj0'
    },
    {
        id: 'step_05',
        category: 'step',
        title: '피봇 턴 (Pivot Turn)',
        shortDesc: '앞으로 딛고 몸을 회전하는 2카운트 턴 스텝',
        content: '1: 오른발 앞으로\n2: 왼발 축으로 180도 회전 (왼쪽으로)',
        tips: '축 발(왼발)의 볼에 체중을 실고 회전. 시선을 먼저 돌리면 자연스럽습니다.',
        keywords: ['피봇 턴', 'pivot turn', '피봇'],
        gifUrl: '/assets/gifs/pivotturn.gif',
        videoUrl: 'aC1Sj83qO08'
    },
    {
        id: 'step_06',
        category: 'step',
        title: '록킹 체어 (Rocking Chair)',
        shortDesc: '앞뒤로 체중을 옮기는 4카운트 스텝',
        content: '1: 오른발 앞으로 (체중 이동)\n2: 왼발로 되돌아오기\n3: 오른발 뒤로 (체중 이동)\n4: 왼발로 되돌아오기',
        tips: '흔들의자처럼 부드럽게 앞뒤로. 상체도 자연스럽게 따라가세요.',
        keywords: ['록킹 체어', 'rocking chair', '록 스텝', 'rock step', '록'],
        gifUrl: '/assets/gifs/rockingchair.gif',
        videoUrl: 'Jvw0-OkNRog'
    },
    {
        id: 'step_07',
        category: 'step',
        title: '킥 볼 체인지 (Kick Ball Change)',
        shortDesc: '킥 후 빠르게 체중을 바꾸는 3카운트 스텝',
        content: '1: 오른발 앞으로 킥\n&: 오른발 볼(앞꿈치)로 착지\n2: 왼발로 체중 이동',
        tips: '킥은 높이보다 정확한 타이밍이 중요! "&" 카운트를 놓치지 마세요.',
        keywords: ['킥 볼 체인지', 'kick ball change', '킥볼체인지'],
        gifUrl: '/assets/gifs/kickballchange.gif',
        videoUrl: 'zr54EyYKmzU'
    },
    {
        id: 'step_08',
        category: 'step',
        title: '바인 턴 (Vine Turn)',
        shortDesc: '그레이프바인에 회전을 추가한 4카운트 스텝',
        content: '1: 오른발 옆으로\n2: 왼발 뒤로 교차\n3: 오른발로 1/4 턴 (오른쪽)\n4: 왼발 터치',
        tips: '3카운트에서 턴할 때 오른발 볼(앞꿈치)을 축으로 사용하세요.',
        keywords: ['바인 턴', 'vine turn', '바인턴'],
        gifUrl: '/assets/gifs/vineturn.gif',
        videoUrl: 'jL9VbBlSn0k'
    },

    // ===== 추가 스텝 (자동매칭용) =====
    {
        id: 'step_09',
        category: 'step',
        title: '사이드 터치 (Side Touch)',
        shortDesc: '옆으로 발을 딛고 터치하는 2카운트 기본 스텝',
        content: '1: 오른발 옆으로\n2: 왼발 오른발 옆에 터치',
        tips: '가장 기본적인 스텝! 리듬에 맞춰 자연스럽게 무게 이동하세요.',
        keywords: ['사이드 터치', 'side touch', '사이드 스텝', 'side step'],
        gifUrl: null,
        videoUrl: '36AxDAxyOGA'
    },
    {
        id: 'step_10',
        category: 'step',
        title: '워크 & 턴 (Walk & Turn)',
        shortDesc: '앞으로 걸어가면서 방향을 전환하는 스텝',
        content: '1: 오른발 앞으로\n2: 왼발 앞으로\n3: 오른발 앞으로 (턴 준비)\n4: 1/4 턴 하며 왼발 터치',
        tips: '워크할 때 보폭을 일정하게 유지하고, 턴 시 축 발의 볼을 활용하세요.',
        keywords: ['워크', 'walk', '앞 워크', 'forward walk'],
        gifUrl: null,
        videoUrl: 'F0AoFke-Dj0'
    },
    {
        id: 'step_11',
        category: 'step',
        title: '힙 범프 (Hip Bump)',
        shortDesc: '엉덩이를 좌우로 밀어내는 리듬 스텝',
        content: '1: 엉덩이를 오른쪽으로\n2: 엉덩이를 왼쪽으로',
        tips: '무릎을 살짝 구부리고 상체는 최대한 고정. 엉덩이만 움직이세요!',
        keywords: ['힙 범프', 'hip bump', '힙범프'],
        gifUrl: null,
        videoUrl: 'KY6WiqREjAI'
    },
    {
        id: 'step_12',
        category: 'step',
        title: '크로스 스텝 (Cross Step)',
        shortDesc: '발을 교차하여 딛는 스텝',
        content: '1: 오른발을 왼발 앞으로 교차\n2: 왼발 옆으로 (또는 뒤로)',
        tips: '교차 시 무릎이 서로 살짝 스치는 느낌으로. 엉덩이가 자연스럽게 회전합니다.',
        keywords: ['크로스', 'cross', '크로스 스텝'],
        gifUrl: null,
        videoUrl: '_9vBDIU-uaQ'
    },
    {
        id: 'step_13',
        category: 'step',
        title: '스웨이 (Sway)',
        shortDesc: '체중을 좌우로 부드럽게 이동하는 스텝',
        content: '1: 오른쪽으로 체중 이동 (무릎 살짝 구부리며)\n2: 왼쪽으로 체중 이동',
        tips: '상체도 함께 자연스럽게 기울이면 더 우아한 동작이 됩니다.',
        keywords: ['스웨이', 'sway', '힙 스웨이', 'hip sway'],
        gifUrl: null,
        videoUrl: 'pZvjCgA8vlY'
    },
    {
        id: 'step_14',
        category: 'step',
        title: 'V 스텝 (V Step)',
        shortDesc: 'V자 모양으로 앞으로 벌렸다 모으는 4카운트 스텝',
        content: '1: 오른발 앞 대각선\n2: 왼발 앞 대각선\n3: 오른발 제자리로\n4: 왼발 모아',
        tips: '발끝이 벌어지며 V자를 그리는 느낌. 리듬감 있게!',
        keywords: ['v 스텝', 'v step'],
        gifUrl: null,
        videoUrl: 'G5dmC6xRQhA'
    },
    {
        id: 'step_15',
        category: 'step',
        title: '쿠카라차 (Cucaracha)',
        shortDesc: '라틴 댄스의 기본 사이드 스텝',
        content: '1: 오른발 옆으로 (체중 이동)\n2: 오른발 되돌아오기\n3: 왼발 옆으로 (체중 이동)\n4: 왼발 되돌아오기',
        tips: '힙 모션을 넣으면 더 라틴 느낌! 무릎에서 힙으로 움직임이 전달되게.',
        keywords: ['쿠카라차', 'cucaracha'],
        gifUrl: null,
        videoUrl: 'tgPXN6ABHp8'
    },
    {
        id: 'step_16',
        category: 'step',
        title: '위빙 (Weave)',
        shortDesc: '앞뒤로 교차하며 옆으로 이동하는 스텝',
        content: '1: 오른발 옆으로\n2: 왼발 뒤로 교차\n3: 오른발 옆으로\n4: 왼발 앞으로 교차',
        tips: '그레이프바인의 확장 버전. 교차할 때 상체 방향을 유지하세요.',
        keywords: ['위빙', 'weave', 'weaving'],
        gifUrl: null,
        videoUrl: 'RAJKB9tgEN0'
    },

    // ===== 용어 =====
    {
        id: 'term_01',
        category: 'term',
        title: '월 (Wall)',
        shortDesc: '라인댄스에서 바라보는 방향',
        content: '라인댄스는 보통 4면(4-wall) 또는 2면(2-wall)으로 춤을 춥니다.\n\n• 4-Wall: 한 세트가 끝날 때마다 90° 회전하여 4방향을 번갈아 봄\n• 2-Wall: 한 세트가 끝날 때마다 180° 회전하여 2방향을 번갈아 봄\n• 1-Wall: 항상 같은 방향을 보고 춤',
        tips: '처음에는 앞 벽만 보고 연습한 뒤, 다른 벽도 시도해보세요.',
        keywords: [],
        gifUrl: null
    },
    {
        id: 'term_02',
        category: 'term',
        title: '카운트 (Count)',
        shortDesc: '음악의 박자를 세는 기본 단위',
        content: '라인댄스는 보통 8카운트(8-count) 단위로 동작을 구성합니다.\n\n• 8카운트 = 음악의 1마디 (대부분의 팝/컨트리 기준)\n• "&" 카운트: 박자 사이에 들어가는 빠른 반박자 (예: 1-&-2)\n• 리스타트(Restart): 중간에 처음으로 돌아가는 것',
        tips: '음악 없이 소리로 카운트를 세면서 연습하면 박자 감각이 빨리 늡니다.',
        keywords: [],
        gifUrl: null
    },
    {
        id: 'term_03',
        category: 'term',
        title: '태그 (Tag)',
        shortDesc: '루틴 중간에 삽입되는 추가 동작',
        content: '태그는 음악의 특정 구간(주로 코러스 전/후)에 추가되는 짧은 동작입니다.\n\n• 보통 4~8카운트\n• 안무 설명서에 "Tag after Wall 3" 등으로 표기\n• 태그 후 원래 루틴을 이어감',
        tips: '태그 위치를 미리 파악하고 음악을 들으며 연습하세요.',
        keywords: [],
        gifUrl: null
    },
    {
        id: 'term_04',
        category: 'term',
        title: 'BPM',
        shortDesc: 'Beats Per Minute - 1분당 박자 수',
        content: '음악의 빠르기를 나타내는 수치입니다.\n\n• 80~100 BPM: 느린 곡 (왈츠, 발라드)\n• 100~120 BPM: 보통 속도 (대부분의 수업곡)\n• 120~140 BPM: 빠른 곡 (차차, 삼바 등)\n• 140+ BPM: 매우 빠른 곡',
        tips: '처음 배울 때는 0.75배속으로 천천히 연습한 뒤 원래 속도로!',
        keywords: [],
        gifUrl: null
    },

    // ===== 방향 =====
    {
        id: 'dir_01',
        category: 'direction',
        title: '방향 용어 가이드',
        shortDesc: '라인댄스에서 사용하는 방향 표현 정리',
        content: '• Forward: 앞으로\n• Back / Behind: 뒤로\n• Side / Apart: 옆으로\n• Together: 모아\n• Cross (front): 앞으로 교차\n• Cross (behind): 뒤로 교차\n• Diagonal: 대각선\n• Center: 중앙으로',
        tips: '영어 방향 용어에 익숙해지면 스텝시트를 읽기가 훨씬 쉬워집니다!',
        keywords: [],
        gifUrl: null
    },
    {
        id: 'jive_01',
        category: 'jive',
        title: '자이브 베이직 인 플레이스 (Jive Basic In Place)',
        shortDesc: '제자리에서 추는 자이브의 가장 기본적인 6카운트 스텝',
        content: '자이브 베이직 인 플레이스는 제자리에서 체중 이동만으로 추는 자이브의 핵심 기초 스텝입니다.\n\n■ 카운트 구성: 1-2, 3&4, 5&6 (총 6카운트)\n\n1: 왼발 뒤로 록 (Rock Back) — 체중을 왼발로 이동\n2: 오른발 제자리 리커버 (Recover) — 체중을 오른발로 되돌림\n3: 왼발 옆으로 작게 (Chasse Left)\n&: 오른발 모아\n4: 왼발 옆으로\n5: 오른발 옆으로 작게 (Chasse Right)\n&: 왼발 모아\n6: 오른발 옆으로\n\n■ 리듬 패턴: Slow - Slow - Quick-Quick-Slow - Quick-Quick-Slow\n■ 음악 박자: 4/4박자 기준, 1소절에 6카운트가 배분됨',
        tips: '록 스텝(1-2)에서 뒤꿈치를 들고 볼(앞꿈치)로 딛으면 바운스감이 살아납니다. 샤세(3&4, 5&6)는 작고 가볍게! 무릎을 살짝 구부리고 탄력 있게 바운스하는 것이 자이브의 핵심입니다. 처음에는 0.75배속으로 천천히 연습한 뒤 원래 속도(약 140~176 BPM)로 올려보세요.',
        keywords: ['자이브', 'jive', '베이직 인 플레이스', 'basic in place', '자이브 베이직', 'jive basic'],
        gifUrl: null,
        videoUrl: 'jlY_nxpQJIQ'
    }
];

export const categories = [
    { key: 'all', label: '전체', emoji: '📚' },
    { key: 'step', label: '기초 스텝', emoji: '👟' },
    { key: 'term', label: '용어', emoji: '📖' },
    { key: 'direction', label: '방향', emoji: '🧭' },
    { key: 'jive', label: '자이브', emoji: '🕺' }
];
