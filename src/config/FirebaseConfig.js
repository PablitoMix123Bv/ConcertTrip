// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDVWYJdeRCNGcVfY3nOzDLAlJcy9YSIEY",
  authDomain: "concerttrip-403d5.firebaseapp.com",
  projectId: "concerttrip-403d5",
  storageBucket: "concerttrip-403d5.firebasestorage.app",
  messagingSenderId: "673728410022",
  appId: "1:673728410022:web:2537439f609b3a966e5f67"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});