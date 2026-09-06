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
  // 구독은 해제하지 않고 유지한다: 세션이 중간에 사라지면(관리자 비밀번호
  // 재설정으로 다른 폰의 토큰이 무효화, 계정 비활성 등) user가 null로 다시
  // 오므로 그때 익명 세션을 재발급해 읽기 구독·쓰기가 조용히 죽지 않게 한다.
  // authReady 자체는 첫 user에서 한 번만 resolve.
  onAuthStateChanged(auth, (user) => {
    if (user) {
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
  // 익명 발급이 끝난 뒤에만 시작 — 영속 세션이 없는 기기에서 늦게 끝난 익명
  // 로그인이 관리자 세션을 덮어써 "화면은 관리자, 토큰은 익명"이 되는 경합 차단
  await authReady;
  const cred = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
  return cred.user;
}

// 로그인 실패 사유를 관리자가 알아들을 말로 — 네트워크·계정 문제를
// '비밀번호 오류'로 뭉개면 맞는 비번을 바꿔가며 재시도하다 잠금까지 간다.
export function adminSignInErrorMessage(err) {
  const code = err?.code || '';
  if (code === 'auth/network-request-failed') return '인터넷 연결을 확인한 뒤 다시 눌러주세요.';
  if (code === 'auth/too-many-requests') return '시도가 너무 잦아 잠시 잠겼습니다. 몇 분 뒤 다시 해주세요.';
  if (
    code === 'auth/wrong-password' || code === 'auth/invalid-credential' ||
    code === 'auth/invalid-login-credentials' || code === 'auth/missing-password'
  ) return '비밀번호가 올바르지 않습니다.';
  if (
    code === 'auth/user-disabled' || code === 'auth/user-not-found' ||
    code === 'auth/operation-not-allowed' || code === 'auth/invalid-email'
  ) return `관리자 계정 설정에 문제가 있습니다. 개발 담당에게 알려주세요. (${code})`;
  return `로그인에 실패했습니다. (${code || '알 수 없는 오류'})`;
}

// 쓰기 실패 사유 — 권한 거부(관리자 로그인이 풀림)를 네트워크 오류와 구분
export function writeErrorMessage(err, what) {
  const code = String(err?.code || err?.message || '');
  if (/permission[_ ]denied/i.test(code)) {
    return `${what} 권한이 없습니다. 관리자 로그인이 풀렸을 수 있으니 앱을 다시 열어 로그인해주세요.`;
  }
  return `${what} 중 오류가 발생했습니다. 네트워크 상태를 확인하고 다시 시도해주세요.`;
}
