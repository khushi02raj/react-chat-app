import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-app-41402.firebaseapp.com",
  projectId: "react-chat-app-41402",
  storageBucket: "react-chat-app-41402.firebasestorage.app",
  messagingSenderId: "75658308415",
  appId: "1:75658308415:web:09af85f67e6b1615d4018a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage = getStorage()