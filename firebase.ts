import { initializeApp } from 'firebase/app';
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
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

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

provider.addScope( "openid https://www.googleapis.com/auth/youtube.upload")

export const auth = getAuth();

auth.languageCode = 'en';

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);