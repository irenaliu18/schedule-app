import React from 'react';
import { signInWithGoogle, firebaseSignOut, useAuth } from '../../utilities/firebase';

const Banner = () => {
  const user = useAuth();

  return (
    <div className="banner">
      <div className="banner-content">
        <h1>CS Courses for 2018-2019</h1>
        {user ? (
          <button onClick={firebaseSignOut}>Sign Out ({user.displayName})</button>
        ) : (
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        )}
      </div>
    </div>
  );
};
export default Banner;


