import { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut } from './firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signIn = () => signInWithPopup(auth, provider);
  const signOutUser = () => signOut(auth);

  return { user, signIn, signOut: signOutUser };
};

export default useAuth;
