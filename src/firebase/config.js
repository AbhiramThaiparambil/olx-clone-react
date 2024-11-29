import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyB2joJjN4TbSFRUoEWpiKbUZS00jg17KmM",
  authDomain: "reactolx-48f4f.firebaseapp.com",
  projectId: "reactolx-48f4f",
  storageBucket: "reactolx-48f4f.firebasestorage.app",
  messagingSenderId: "129222592766",
  appId: "1:129222592766:web:5036114e5901e9d3bcbdaf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);