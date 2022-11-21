// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
    REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID
} from '@env';

const firebaseConfig = {
    apiKey: "AIzaSyCcjvM2Qjg-e7cZUbsI1dEpStnfeHXQOP0",
    authDomain: "fitra-1b651.firebaseapp.com",
    projectId: "fitra-1b651",
    storageBucket: "fitra-1b651.appspot.com",
    messagingSenderId: "428074694067",
    appId: "1:428074694067:web:10d32d6cfddfabce3a87c6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);

export const storage = getStorage(app);