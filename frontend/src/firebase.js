import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6nJ-C5D9NL774sGHP3GMUVLQfCbVt5Xc",
  authDomain: "netflix-clone-18ec8.firebaseapp.com",
  projectId: "netflix-clone-18ec8",
  storageBucket: "netflix-clone-18ec8.appspot.com",
  messagingSenderId: "363855004306",
  appId: "1:363855004306:web:7b1015b0c26b7f98231c4b",
  measurementId: "G-JSFG93VH23",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
export default db;
