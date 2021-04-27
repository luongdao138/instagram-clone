import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import '../styles/signup.css';
import * as routes from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';

const Signup = () => {
  const history = useHistory();
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInValid = password === '' || emailAddress === '';

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const usernameExists = await doesUsernameExist(username);

      if (usernameExists.length !== 0) {
        setPassword('');
        return setError('username already exists!');
      }

      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);
      createdUserResult.user.updateProfile({
        displayName: username,
      });

      await firebase.firestore().collection('users').add({
        userId: createdUserResult.user.uid,
        username: username.toLowerCase(),
        fullName: fullName.toLowerCase(),
        emailAddress: emailAddress.toLocaleLowerCase(),
        following: [],
        followers: [],
        dateCreated: FieldValue.serverTimestamp(),
      });

      history.push(routes.DASHBOARD);
    } catch (error) {
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Signup - Instagram';
  }, []);

  return (
    <div className='login'>
      <div className='wrapper'>
        <div className='login__left'>
          <img
            src='/images/iphone-with-profile.jpg'
            alt=''
            className='login__left__image'
          />
        </div>
        <div className='login__right'>
          <form style={{ marginBottom: '12px' }}>
            <h1 className='login__right__logo'>
              <img src='/images/logo.png' alt='' />
              {error && <span className='login__error'>{error}</span>}
            </h1>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Your username'
              className='login__right__input'
            />
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Your fullname'
              className='login__right__input'
            />
            <input
              type='text'
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder='Email address'
              className='login__right__input'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='login__right__input'
            />
            <button
              className='login__right__button'
              disabled={isInValid}
              style={{
                opacity: isInValid ? '0.4' : '1',
              }}
              type='submit'
              onClick={handleSignup}
            >
              Signup
            </button>
          </form>
          <div className='login__signup'>
            <p>
              Have an account?{' '}
              <strong onClick={() => history.push(routes.LOGIN)}>Login</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
