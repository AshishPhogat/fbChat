import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCt8xEO8t1wO5Beb8x7xcg31alajn5_Htg",
  authDomain: "fbchat-643a9.firebaseapp.com",
  projectId: "fbchat-643a9",
  storageBucket: "fbchat-643a9.appspot.com",
  messagingSenderId: "139868772925",
  appId: "1:139868772925:web:e3dc1ac205e862778be854"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();