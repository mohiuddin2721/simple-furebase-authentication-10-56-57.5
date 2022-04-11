import './App.css';
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const provider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    // console.log('object');
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      });
  }

  return (
    <div className="App">
      {
        user.email ?
          <button onClick={handleGoogleSignOut}>Sign out</button>
          :
          <>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
            <button onClick={handleFacebookSignIn}>Facebook Sign in</button>
          </>


      }

      <h1>Name: {user.displayName}</h1>
      <h3>Email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
