import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDASNYvNRyH-IFOFoF8WLgLk2iRdTOls0E",
  authDomain: "video-45a84.firebaseapp.com",
  projectId: "video-45a84",
  storageBucket: "video-45a84.appspot.com",
  messagingSenderId: "447430721470",
  appId: "1:447430721470:web:4a273e0704271934e143ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;