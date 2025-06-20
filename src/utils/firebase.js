// src/utils/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBUcd9bIA5RzFOU_QDB6yUTSQrrcmOU80Q',
  authDomain: 'prognosticos-app.firebaseapp.com',
  projectId: 'prognosticos-app',
  storageBucket: 'prognosticos-app.appspot.com',
  messagingSenderId: '305486951489',
  appId: '1:305486951489:web:d75550ef3e2837753f82c0'
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// 💡 estes só funcionam no cliente (browser)
let auth, db;

if (typeof window !== 'undefined') {
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };

