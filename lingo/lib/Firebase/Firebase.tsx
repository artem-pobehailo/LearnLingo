import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAyu4eUpRqhrYS1fvDXFj5QLlKYvy35pA8',
  authDomain: 'learn-lingo-artem.firebaseapp.com',
  projectId: 'learn-lingo-artem',
  storageBucket: 'learn-lingo-artem.firebasestorage.app',
  messagingSenderId: '292869310420',
  appId: '1:292869310420:web:7606e06538543e8af47841',
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
