import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDVWYJdeRCNGcVfY3nOzDLAlJcy9YSIEY",
  authDomain: "concerttrip-403d5.firebaseapp.com",
  projectId: "concerttrip-403d5",
  storageBucket: "concerttrip-403d5.firebasestorage.app",
  messagingSenderId: "673728410022",
  appId: "1:673728410022:web:2537439f609b3a966e5f67"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);  