import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

// 🔐 보안 규칙을 ".read"/".write": "auth != null" 로 잠글 수 있도록,
//    방문자(회원·관리자)에게 익명 세션을 발급한다.
//    - 콘솔에서 Anonymous 인증이 아직 안 켜졌거나 실패해도 앱이 멈추지 않도록
//      authReady는 항상 resolve된다(성공: user, 실패: null).
//    - DataContext는 authReady 이후에 onValue 구독을 붙여, 규칙이 잠긴 뒤에도
//      권한 거부로 화면이 비는 일을 막는다.
export const authReady = new Promise((resolve) => {
  let settled = false;
  const finish = (user) => {
    if (settled) return;
    settled = true;
    resolve(user);
  };

  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      unsub();
      finish(user);
    }
  });

  signInAnonymously(auth).catch((e) => {
    // 가장 흔한 원인: 콘솔 Authentication > Sign-in method 에서 'Anonymous' 미활성화
    console.warn(
      '[firebase] 익명 로그인 실패 — 콘솔에서 Anonymous 인증을 켜야 합니다:',
      e?.code || e
    );
    finish(null); // 이 시점 규칙은 아직 open이므로 읽기/쓰기는 그대로 동작
  });
});
