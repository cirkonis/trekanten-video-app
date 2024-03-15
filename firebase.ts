import { initializeApp } from 'firebase/app';
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAnalytics} from "@firebase/analytics";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "trekanten-video-app.firebaseapp.com",
    databaseURL: "https://trekanten-video-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "trekanten-video-app",
    messagingSenderId: "599078698344",
    appId: "1:599078698344:web:2cde5b2caa027a19e46add",
    measurementId: "G-S3TGTBBL1Y",
    storageBucket: "gs://trekanten-video-app.appspot.com",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

// const analytics = getAnalytics(app);