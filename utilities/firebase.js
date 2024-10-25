import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';




// Your web app's Firebase configuration (replace with your own configuration)
const firebaseConfig = {
    apiKey: "AIzaSyBGr5l2_MQWFJQZaQ9HnpW647Jfh1SLX2Q",
    authDomain: "schedule-app-e8984.firebaseapp.com",
    databaseURL: "https://schedule-app-e8984-default-rtdb.firebaseio.com",
    projectId: "schedule-app-e8984",
    storageBucket: "schedule-app-e8984.appspot.com",
    messagingSenderId: "847722895137",
    appId: "1:847722895137:web:2903757ae52f1524d49060",
    measurementId: "G-ZD8E4JZG9V"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const firebaseSignOut = () => signOut(auth);

// Custom hook to manage user state
export const useAuth = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user || null));
      return unsubscribe;
    }, []);
  
    return user;
  };

export { database, auth};
