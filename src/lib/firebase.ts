import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Default to empty config if environment variables are not set
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-mode',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-mode',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-mode',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-mode',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'demo-mode',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'demo-mode'
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export a function to check if we're in demo mode
export const isFirebaseConfigured = () => {
  return import.meta.env.VITE_FIREBASE_API_KEY !== undefined;
};

export { auth };