import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhO2h2vrpoI9-GGEhPBdhkvpDxuVorbBM",
  authDomain: "luxhome-b7f99.firebaseapp.com",
  projectId: "luxhome-b7f99",
  storageBucket: "luxhome-b7f99.firebasestorage.app",
  messagingSenderId: "168545445896",
  appId: "1:168545445896:web:ce064e11b1b28360d889bd",
  measurementId: "G-EEJXQ7L386"
};

// Initialize Firebase (Singleton pattern)
let app;
let db: any = null;
let analytics: Analytics | null = null;

try {
    // Initialize app
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    
    // Initialize Firestore
    db = getFirestore(app);
    
    // Initialize Analytics (only in browser environment)
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(app);
    }
    
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

export { db, analytics };
