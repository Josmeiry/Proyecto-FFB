
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeJS1ErJSTBQlmzSuCqmCWmrZNtMlNuiA",
  authDomain: "majoad-auth.firebaseapp.com",
  projectId: "majoad-auth",
  storageBucket: "majoad-auth.firebasestorage.app",
  messagingSenderId: "234585198380",
  appId: "1:234585198380:web:df71e491ee737bc944a689"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };