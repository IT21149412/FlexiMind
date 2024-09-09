import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBLCuyp8Swz6KAbP8CjsFjeEDavvENbfes",
    authDomain: "fleximind-5a1f7.firebaseapp.com",
    projectId: "fleximind-5a1f7",
    storageBucket: "fleximind-5a1f7.appspot.com",
    messagingSenderId: "700400905017",
    appId: "1:700400905017:web:8620fd1ed5b47bebca96e8"
};

// Initialize Firebase if it's not already initialized
const app = initializeApp(firebaseConfig);

// Get the Firebase Authentication instance
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(app);

const db = getFirestore(app);

export { auth, db, storage };


