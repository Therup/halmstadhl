import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaQMEXaAJVyQUy52kX7M_6Mt5X6l5hawU",
  authDomain: "hockey-5189c.firebaseapp.com",
  projectId: "hockey-5189c",
  storageBucket: "hockey-5189c.appspot.com",
  messagingSenderId: "763919776356",
  appId: "1:763919776356:web:df9f1a9e8d89f012ac3d71",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
