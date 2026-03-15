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
        gifUrl: '/assets/gifs/grapevine.png',
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
        gifUrl: '/assets/gifs/jazzbox.png',
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
        gifUrl: '/assets/gifs/coasterstep.png',
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
        gifUrl: '/assets/gifs/shuffle.png',
        videoUrl: 'JHECavueoZc'
    },
    {
        id: 'step_05',
        category: 'step',
        title: '피봇 턴 (Pivot Turn)',
        shortDesc: '앞으로 딛고 몸을 회전하는 2카운트 턴 스텝',
        content: '1: 오른발 앞으로\n2: 왼발 축으로 180도 회전 (왼쪽으로)',
        tips: '축 발(왼발)의 볼에 체중을 실고 회전. 시선을 먼저 돌리면 자연스럽습니다.',
        keywords: ['피봇 턴', 'pivot turn', '피봇'],
        gifUrl: '/assets/gifs/pivotturn.png',
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
        gifUrl: '/assets/gifs/rockingchair.png',
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
        gifUrl: '/assets/gifs/kickballchange.png',
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
        gifUrl: '/assets/gifs/vineturn.png',
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
        videoUrl: 'xDzhJ_H10hg'
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
    // ===== 자이브 초급 (Pre-Bronze & Bronze) =====
    {
        id: 'jive_01',
        category: 'jive',
        level: 'beginner',
        title: '1. Basic in Place (베이직 인 플레이스)',
        shortDesc: '제자리에서 락 스텝과 샤세를 밟는 가장 기초적인 동작',
        content: '자이브의 가장 기본 스텝으로, 제자리에서 체중 이동만으로 춥니다.\n\n■ 카운트: 1-2, 3&4, 5&6\n\n1: 왼발 뒤로 록 (Rock Back)\n2: 오른발 제자리 리커버 (Recover)\n3: 왼발 옆으로 (Chasse Left)\n&: 오른발 모아\n4: 왼발 옆으로\n5: 오른발 옆으로 (Chasse Right)\n&: 왼발 모아\n6: 오른발 옆으로\n\n■ 리듬: Slow-Slow-Quick·Quick·Slow-Quick·Quick·Slow',
        tips: '볼(앞꿈치)로 딛으면 바운스감이 살아납니다. 샤세는 작고 가볍게!',
        keywords: ['자이브', 'jive', '베이직 인 플레이스', 'basic in place'],
        gifUrl: null,
        videoUrl: 'jlY_nxpQJIQ'
    },
    {
        id: 'jive_02',
        category: 'jive',
        level: 'beginner',
        title: '2. Fallaway Rock (폴어웨이 락)',
        shortDesc: '파트너와 V자 모양으로 물러나며 락 스텝을 밟는 동작',
        content: '파트너와 함께 V자 모양(폴어웨이 포지션)으로 살짝 물러나며 락 스텝을 밟습니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1: 왼발 뒤로 록 (폴어웨이 방향)\n2: 오른발 리커버\n3&4: 샤세 (왼쪽)\n5&6: 샤세 (오른쪽)\n\n■ 폴어웨이 포지션: 남녀가 V자로 벌어지며 뒤로 물러남',
        tips: '폴어웨이 시 파트너와의 텐션(연결감)을 유지하세요.',
        keywords: ['폴어웨이 락', 'fallaway rock', '폴어웨이'],
        gifUrl: null,
        videoUrl: 'ai49xGmnc9g'
    },
    {
        id: 'jive_03',
        category: 'jive',
        level: 'beginner',
        title: '3. Fallaway Throwaway (폴어웨이 스로우어웨이)',
        shortDesc: '여성을 바깥으로 밀어내어 오픈 포지션을 만드는 스텝',
        content: '남성이 여성을 바깥쪽으로 툭 던지듯(Throwaway) 밀어내어 오픈 포지션을 만듭니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 폴어웨이 록 스텝\n3&4: 남성 샤세 + 여성을 밖으로 밀어냄\n5&6: 샤세 (오픈 포지션)\n\n■ 핵심: 클로즈드 → 오픈 포지션 전환',
        tips: '밀어낼 때 팔이 아닌 몸 전체의 리드를 사용하세요.',
        keywords: ['폴어웨이 스로우어웨이', 'fallaway throwaway'],
        gifUrl: null,
        videoUrl: 'hp_ohutv_ds'
    },
    {
        id: 'jive_04',
        category: 'jive',
        level: 'beginner',
        title: '4. Link (링크)',
        shortDesc: '오픈에서 다시 마주 잡는 클로즈드 포지션 스텝',
        content: '떨어져 있는 오픈 상태에서 서로 당기며 다시 클로즈드 포지션을 만듭니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝 (오픈 포지션)\n3&4: 샤세하며 서로 당겨옴\n5&6: 샤세 (클로즈드 포지션 완성)\n\n■ 핵심: 오픈 → 클로즈드 포지션 전환',
        tips: '록 스텝의 탄력을 이용해 자연스럽게 당기세요.',
        keywords: ['링크', 'link', '자이브 링크'],
        gifUrl: null,
        videoUrl: 'LMilE769YY8'
    },
    {
        id: 'jive_05',
        category: 'jive',
        level: 'beginner',
        title: '5. Change of Places R to L (우에서 좌로)',
        shortDesc: '여성을 오른쪽에서 왼쪽으로 언더암 턴 시키는 자리바꿈',
        content: '남성이 여성을 오른쪽에서 왼쪽으로 언더암 턴 시키는 자리바꿈입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 남성이 왼손을 올려 여성을 팔 아래로 통과시킴\n5&6: 샤세로 자리바꿈 완성',
        tips: '리드하는 손을 자연스럽게 올리고, 여성의 턴 경로를 방해하지 마세요.',
        keywords: ['체인지 오브 플레이스', 'change of places', '우에서 좌로'],
        gifUrl: null,
        videoUrl: 'YlJ8yyVIxFw'
    },
    {
        id: 'jive_06',
        category: 'jive',
        level: 'beginner',
        title: '6. Change of Places L to R (좌에서 우로)',
        shortDesc: '여성을 왼쪽에서 오른쪽으로 턴시키는 자리바꿈 스텝',
        content: '남성이 여성을 왼쪽에서 오른쪽으로 리드하며 턴시키는 자리바꿈 스텝입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 여성을 왼쪽에서 오른쪽으로 리드\n5&6: 샤세로 자리바꿈 완성\n\n■ 5번(R to L)과 세트로 자주 사용됨',
        tips: '5번→6번을 연속으로 연습하면 감각이 빨리 잡힙니다.',
        keywords: ['체인지 오브 플레이스', 'change of places', '좌에서 우로'],
        gifUrl: null,
        videoUrl: 'eCcLkIuzYCw'
    },
    {
        id: 'jive_07',
        category: 'jive',
        level: 'beginner',
        title: '7. Change of Hands Behind the Back',
        shortDesc: '등 뒤로 손을 바꿔 잡으며 세련되게 자리를 교차하는 스텝',
        content: '남성이 등 뒤로 손을 바꿔 잡으며 여성과 자리를 세련되게 교차합니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 등 뒤에서 손 바꿔 잡기\n5&6: 샤세하며 자리바꿈 완성',
        tips: '등 뒤에서 손을 바꿀 때 허리를 살짝 틀면 더 자연스럽습니다.',
        keywords: ['체인지 오브 핸드', 'change of hands behind back'],
        gifUrl: null,
        videoUrl: 'Bc8OMBLO_vM'
    },
    {
        id: 'jive_08',
        category: 'jive',
        level: 'beginner',
        title: '8. Hip Bump (힙 범프)',
        shortDesc: '나란히 서서 엉덩이를 가볍게 맞부딪히는 장난스러운 동작',
        content: '남녀가 나란히 서서 엉덩이를 가볍게 튕기며 맞부딪히는 장난스러운 동작입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝 (나란히 서서)\n3&4: 샤세하며 힙 범프\n5&6: 반대쪽 힙 범프\n\n■ Left Shoulder Shove라고도 불림',
        tips: '범프는 부드럽고 장난스럽게! 너무 세게 부딪히면 위험합니다.',
        keywords: ['힙 범프', 'hip bump', '숄더 쇼브'],
        gifUrl: null,
        videoUrl: 'VCelHhoxi-o'
    },
    {
        id: 'jive_09',
        category: 'jive',
        level: 'beginner',
        title: '9. American Spin (아메리칸 스핀)',
        shortDesc: '여성이 제자리에서 팽이 스핀을 도는 화려한 동작',
        content: '남성의 리드를 받아 여성이 제자리 우회전 스핀을 도는 화려한 동작입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 남성이 여성을 밀어 우회전 스핀 리드\n5&6: 샤세 (스핀 후 안정)',
        tips: '스핀 시 머리(스팟팅)를 먼저 돌리면 어지럽지 않습니다.',
        keywords: ['아메리칸 스핀', 'american spin', '스핀'],
        gifUrl: null,
        videoUrl: 'jJMBxv5z_4U'
    },
    {
        id: 'jive_10',
        category: 'jive',
        level: 'beginner',
        title: '10. The Walks (더 워크스)',
        shortDesc: '나란히 무릎 바운스를 주며 경쾌하게 앞으로 걷는 스텝',
        content: '남녀가 나란히 무릎 바운스를 주며 경쾌하게 앞으로 걷습니다.\n\n■ 카운트: S S S S\n\n1: 오른발 앞으로 (무릎 바운스)\n2: 왼발 앞으로\n3: 오른발 앞으로\n4: 왼발 앞으로\n\n■ 자이브 특유의 바운스를 유지하며 걷기',
        tips: '발을 내딛을 때 무릎을 살짝 구부려 바운스감을 주세요.',
        keywords: ['더 워크스', 'the walks', '자이브 워크'],
        gifUrl: null,
        videoUrl: 'rSFTnvsThP8'
    },
    {
        id: 'jive_11',
        category: 'jive',
        level: 'beginner',
        title: '11. Stop and Go (스탑 앤 고)',
        shortDesc: '여성을 보냈다가 멈춰 세운 후 다시 당기는 밀당 스텝',
        content: '여성을 앞으로 보냈다가 멈춰 세운 후(Stop), 다시 당겨오는(Go) 밀당 스텝입니다.\n\n■ 카운트: QQ QaQ QaQ x 2\n\n1단계(Stop): 여성을 앞으로 보내 멈춤\n2단계(Go): 다시 당겨서 원래 자리로',
        tips: '멈출 때 프레임을 단단하게 유지해야 정확히 멈춥니다.',
        keywords: ['스탑 앤 고', 'stop and go'],
        gifUrl: null,
        videoUrl: 'vGubOhW9ATI'
    },
    {
        id: 'jive_12',
        category: 'jive',
        level: 'beginner',
        title: '12. Mooch (무치)',
        shortDesc: '발을 뻗거나 차며 지그재그로 움직이는 스텝',
        content: '남녀가 마주 보고 발을 뻗거나 차는(Flick) 동작을 섞어가며 지그재그로 움직입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 샤세 + 플릭(발차기)\n5&6: 반대쪽 샤세 + 플릭',
        tips: '플릭은 무릎 아래에서 가볍게! 너무 크게 차면 밸런스를 잃습니다.',
        keywords: ['무치', 'mooch'],
        gifUrl: null,
        videoUrl: 'driRiyoLYlE'
    },
    {
        id: 'jive_13',
        category: 'jive',
        level: 'beginner',
        title: '13. Whip (휩)',
        shortDesc: '여성을 깊게 당겨 채찍처럼 빠르게 1회전하는 스텝',
        content: '남성이 여성을 깊게 당겨 채찍(Whip)처럼 빠르게 1회전 우회전하는 스텝입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 여성을 당기며 1회전 우회전\n5&6: 샤세로 마무리',
        tips: '당길 때 중심을 낮추고, 프레임을 단단하게 유지하세요.',
        keywords: ['휩', 'whip', '자이브 휩'],
        gifUrl: null,
        videoUrl: 'aduj861nX3I'
    },
    {
        id: 'jive_14',
        category: 'jive',
        level: 'beginner',
        title: '14. Whip Throwaway (휩 스로우어웨이)',
        shortDesc: '휩으로 1바퀴 회전 후 여성을 밖으로 밀어보내는 스텝',
        content: '휩(Whip) 회전 후 마지막에 여성을 밖으로 밀어보내는 스텝입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 휩 회전\n5&6: 여성을 밖으로 밀어냄 (Throwaway)\n\n■ 휩 + 스로우어웨이의 조합',
        tips: '회전의 모멘텀을 이용해 자연스럽게 밀어내세요.',
        keywords: ['휩 스로우어웨이', 'whip throwaway'],
        gifUrl: null,
        videoUrl: 'r-S_vkAF6tg'
    },

    // ===== 자이브 중급 (Silver) =====
    {
        id: 'jive_15',
        category: 'jive',
        level: 'silver',
        title: '15. Reverse Whip (리버스 휩)',
        shortDesc: '일반 휩과 반대 방향(좌회전)으로 감아 도는 고난도 휩',
        content: '일반적인 우회전 휩과 반대인 좌회전으로 강하게 감아 도는 스텝입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 좌회전 방향으로 강하게 감아 돌기\n5&6: 샤세로 마무리',
        tips: '좌회전이 익숙하지 않으면 느린 음악부터 연습하세요.',
        keywords: ['리버스 휩', 'reverse whip'],
        gifUrl: null,
        videoUrl: '_lnirSps148'
    },
    {
        id: 'jive_16',
        category: 'jive',
        level: 'silver',
        title: '16. Windmill (윈드밀)',
        shortDesc: '풍차처럼 양팔을 펴고 마주 보며 회전하는 역동적 동작',
        content: '풍차처럼 남녀가 양팔을 팽팽하게 펴고 마주 보며 회전합니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 양팔을 펴고 풍차 회전\n5&6: 회전 완료 및 샤세',
        tips: '양팔의 텐션을 일정하게 유지하며 회전하세요.',
        keywords: ['윈드밀', 'windmill'],
        gifUrl: null,
        videoUrl: 'j7opyqZ1pAo'
    },
    {
        id: 'jive_17',
        category: 'jive',
        level: 'silver',
        title: '17. Spanish Arms (스패니시 암스)',
        shortDesc: '투우사처럼 팔을 감싸며 여성을 회전시키는 우아한 스텝',
        content: '투우사처럼 팔을 위로 둥글게 감싸 안았다가 풀며 여성을 회전시킵니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 팔을 머리 위로 감싸기\n5&6: 팔을 풀며 여성 회전',
        tips: '팔을 감쌀 때 어깨를 내리고 우아하게 표현하세요.',
        keywords: ['스패니시 암스', 'spanish arms'],
        gifUrl: null,
        videoUrl: '8U45seGS4Xg'
    },
    {
        id: 'jive_18',
        category: 'jive',
        level: 'silver',
        title: '18. Rolling off the Arm (롤링 오프 디 암)',
        shortDesc: '여성이 남성 팔에 감기듯 돌며 스핀하는 동작',
        content: '여성이 남성의 팔뚝에 감기듯 돌았다가 풀려나오며 스핀하는 동작입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 여성이 남성 팔에 감기며 회전\n5&6: 팔에서 풀려나오며 스핀',
        tips: '여성은 남성의 리드를 따르며 무리하게 힘을 주지 마세요.',
        keywords: ['롤링 오프 디 암', 'rolling off the arm'],
        gifUrl: null,
        videoUrl: 'ALzEr7tWXBY'
    },
    {
        id: 'jive_19',
        category: 'jive',
        level: 'silver',
        title: '19. Simple Spin (심플 스핀)',
        shortDesc: '두 손을 놓고 여성이 빠르게 제자리 스핀을 도는 동작',
        content: '남성의 리드 후 두 손을 놓고 여성이 빠르게 제자리 스핀을 돕니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3: 스핀 모멘텀 전달 후 손 놓기\n&4: 여성 프리 스핀\n5&6: 샤세로 다시 연결',
        tips: '스핀 전 축 발을 확실하게 세우세요.',
        keywords: ['심플 스핀', 'simple spin'],
        gifUrl: null,
        videoUrl: 'GSpUms6v5QY'
    },
    {
        id: 'jive_20',
        category: 'jive',
        level: 'silver',
        title: '20. Miami Special (마이애미 스페셜)',
        shortDesc: '머리 위로 팔을 넘기며 화려하게 자리바꿈하는 스텝',
        content: '오른손을 맞잡고 남성이 여성의 머리 위로 팔을 넘기며 자리를 바꿉니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 오른손을 넘기며 여성 회전\n5&6: 자리바꿈 완성',
        tips: '팔을 넘길 때 여성 머리와 충분한 간격을 유지하세요.',
        keywords: ['마이애미 스페셜', 'miami special'],
        gifUrl: null,
        videoUrl: '3SMk-fG8y8o'
    },

    // ===== 자이브 고급 (Gold) =====
    {
        id: 'jive_21',
        category: 'jive',
        level: 'gold',
        title: '21. Curly Whip (컬리 휩)',
        shortDesc: '여성을 나선형으로 턴 후 휩으로 연결하는 스텝',
        content: '여성을 나선형(Curly)으로 턴 시킨 직후 휩으로 연결합니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3&4: 컬리 턴 (나선형 회전)\n5&6: 휩으로 연결',
        tips: '컬리 턴에서 휩으로 끊기지 않게 매끄럽게 연결하세요.',
        keywords: ['컬리 휩', 'curly whip'],
        gifUrl: null,
        videoUrl: 'uXxFId_TDNk'
    },
    {
        id: 'jive_22',
        category: 'jive',
        level: 'gold',
        title: '22. Shoulder Spin (숄더 스핀)',
        shortDesc: '여성의 어깨를 밀어 연속 스핀하게 하는 고난도 스텝',
        content: '남성이 여성의 어깨를 살짝 밀어 연속 스핀하게 하는 고난도 스텝입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝\n3: 어깨를 밀어 스핀 개시\n&4: 여성 연속 스핀\n5&6: 샤세로 안정',
        tips: '어깨를 밀 때 손바닥을 펴고 가볍게, 세게 밀지 마세요.',
        keywords: ['숄더 스핀', 'shoulder spin'],
        gifUrl: null,
        videoUrl: 'Nz4f7oH3Cx0'
    },
    {
        id: 'jive_23',
        category: 'jive',
        level: 'gold',
        title: '23. Toe Heel Swivels (토 힐 스위블스)',
        shortDesc: '발끝과 뒤꿈치를 번갈아 비틀며 추는 리드미컬한 발동작',
        content: '발끝(Toe)과 뒤꿈치(Heel)를 번갈아 비틀어(Swivel) 추는 리드미컬한 발동작입니다.\n\n■ 카운트: Q Q Q Q\n\n1: 오른발 토 (발끝 비틀기)\n2: 오른발 힐 (뒤꿈치 비틀기)\n3: 왼발 토\n4: 왼발 힐',
        tips: '무릎을 유연하게, 골반이 자연스럽게 따라가게 하세요.',
        keywords: ['토 힐 스위블', 'toe heel swivels', '스위블'],
        gifUrl: null,
        videoUrl: '6tQ1Y3HvuB0'
    },
    {
        id: 'jive_24',
        category: 'jive',
        level: 'gold',
        title: '24. Chugging (처깅)',
        shortDesc: '기차처럼 발을 끌며 뒤로 물러나는 코믹한 스텝',
        content: '무릎을 굽힌 채 기차가 움직이듯 발을 끌며 뒤로 물러나는 코믹한 스텝입니다.\n\n■ 카운트: QaQ QaQ (반복)\n\n1&2: 오른발 처깅 (뒤로 끌며 이동)\n3&4: 왼발 처깅',
        tips: '무릎을 충분히 구부리고 기차 흉내를 내듯 재미있게!',
        keywords: ['처깅', 'chugging'],
        gifUrl: null,
        videoUrl: 'ElTbM9bjcDM'
    },
    {
        id: 'jive_25',
        category: 'jive',
        level: 'gold',
        title: '25. Chicken Walks (치킨 워크스)',
        shortDesc: '닭이 걷듯 무릎을 굽히고 톡톡 튀며 걷는 스텝',
        content: '닭처럼 무릎을 굽히고 발끝으로 톡톡 튀며 걷는 스텝입니다.\n\n■ 카운트: S S S S\n\n1: 오른발 앞 (닭 걸음)\n2: 왼발 앞\n3: 오른발 앞\n4: 왼발 앞',
        tips: '무릎을 확실하게 들어올리고 발끝으로 톡톡 찍듯이 걸으세요.',
        keywords: ['치킨 워크', 'chicken walks'],
        gifUrl: null,
        videoUrl: 'FrXyeclEdj0'
    },
    {
        id: 'jive_26',
        category: 'jive',
        level: 'gold',
        title: '26. Catapult (캐터펄트)',
        shortDesc: '투석기처럼 텐션으로 강하게 튕겨 스핀시키는 역동적 동작',
        content: '여성을 당겼다가 투석기처럼 강하게 튕겨내어 스핀시키는 역동적 동작입니다.\n\n■ 카운트: QQ QaQ QaQ\n\n1-2: 록 스텝 (텐션 축적)\n3&4: 텐션 해제, 강하게 튕겨냄\n5&6: 여성 스핀 및 샤세',
        tips: '당기는 힘을 점진적으로 축적한 뒤 폭발적으로 해제하세요.',
        keywords: ['캐터펄트', 'catapult'],
        gifUrl: null,
        videoUrl: 'IBmiQBHVx9M'
    },
    {
        id: 'jive_27',
        category: 'jive',
        level: 'gold',
        title: '27. Stalking Walks, Flicks into Break',
        shortDesc: '맹수처럼 걷다가 발을 차고 급정지하는 강렬한 스텝',
        content: '맹수처럼 살금살금 걷다가(Stalking) 강하게 발차기(Flick) 후 급정지(Break)하는 강렬한 스텝입니다.\n\n■ 카운트: S S S S + QQ\n\n1: 오른발 스토킹 워크\n2: 왼발 스토킹 워크\n3: 플릭 (강한 발차기)\n4: 브레이크 (급정지)',
        tips: '스토킹은 느리고 긴장감 있게, 플릭은 날카롭고 폭발적으로!',
        keywords: ['스토킹 워크', 'stalking walks', '플릭', 'flicks'],
        gifUrl: null,
        videoUrl: '6vvmSKOGuAc'
    }
];

export const categories = [
    { key: 'all', label: '전체', emoji: '📚' },
    { key: 'step', label: '기초 스텝', emoji: '👟' },
    { key: 'term', label: '용어', emoji: '📖' },
    { key: 'direction', label: '방향', emoji: '🧭' },
    { key: 'jive', label: '자이브', emoji: '🕺' }
];
