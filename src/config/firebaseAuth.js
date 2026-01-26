
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgZ_b8vu7kGlyA8logjG-WZNUcDFqSU88",
  authDomain: "swiggy-project-10f9d.firebaseapp.com",
  projectId: "swiggy-project-10f9d",
  storageBucket: "swiggy-project-10f9d.firebasestorage.app",
  messagingSenderId: "703328247994",
  appId: "1:703328247994:web:47490685f5b6b33219e283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()


export {auth, provider};