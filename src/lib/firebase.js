import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

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

  // 이미 로그인된 세션(관리자 포함)이 있으면 그대로 쓰고,
  // 없을 때만 익명 세션을 발급한다 — 무조건 signInAnonymously 하면
  // 브라우저에 남아 있던 관리자 세션을 익명으로 덮어써 버린다.
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      unsub();
      finish(user);
      return;
    }
    signInAnonymously(auth).catch((e) => {
      // 가장 흔한 원인: 콘솔 Authentication > Sign-in method 에서 'Anonymous' 미활성화
      console.warn(
        '[firebase] 익명 로그인 실패 — 콘솔에서 Anonymous 인증을 켜야 합니다:',
        e?.code || e
      );
      finish(null);
    });
  });
});

// 🔑 관리자 입장 = 파이어베이스 이메일 로그인.
//    화면 비밀번호 비교(누구나 번들에서 꺼내 볼 수 있음)를 대신해,
//    DB 규칙(".write": 관리자 이메일만)이 실제로 통하는 세션을 만든다.
//    이메일은 비밀이 아니므로 코드에 둔다. 비밀번호만 비밀이다.
export const ADMIN_EMAIL = 'qaz49489+stepbystep-admin@gmail.com';

export async function adminSignIn(password) {
  const cred = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
  return cred.user;
}
