import React from 'react';
import { signInWithGoogle, firebaseSignOut, useAuth } from '../../utilities/firebase';

const Banner = ({ title }) => {
  const user = useAuth();

  return (
    <div className="banner">
      <h1>{title}</h1>
      {user ? (
        <button onClick={firebaseSignOut}>Sign Out ({user.displayName})</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};
export default Banner;


