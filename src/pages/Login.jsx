import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import '../styles/login.css';
import * as routes from '../constants/routes';

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInValid = password === '' || emailAddress === '';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(routes.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
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
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <div className='login__signup'>
            <p>
              Don't have account?{' '}
              <strong onClick={() => history.push(routes.SIGNUP)}>
                Registation
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
