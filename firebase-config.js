// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: 'notes-app-ab225.firebaseapp.com',
  projectId: 'notes-app-ab225',
  storageBucket: 'notes-app-ab225.firebasestorage.app',
  messagingSenderId: '318661635901',
  appId: '1:318661635901:web:1773193936f99859a49f54',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app); // Pass the initialized app to getFirestore()
