import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAcmH07-RKQcGjI9IQULxfJwW9l3_ojQpE",
  authDomain: "tabula-ad0c3.firebaseapp.com",
  projectId: "tabula-ad0c3",
  storageBucket: "tabula-ad0c3.appspot.com",
  messagingSenderId: "966429213607",
  appId: "1:966429213607:web:d6603dce2dfd138d202c82"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);