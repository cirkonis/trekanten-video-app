import { initializeApp } from 'firebase/app';
import {getStorage, ref} from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    storageBucket: "gs://trekanten-video-app.appspot.com",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();
