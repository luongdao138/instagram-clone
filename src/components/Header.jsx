import React, { useContext } from 'react';
import FirebaseContext from '../context/firebase';
import * as routes from '../constants/routes';
import '../styles/header.css';
import { Link, useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useUser from '../hooks/useUser';

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useUser();
  const history = useHistory();
  return (
    <nav>
      <Link to={routes.DASHBOARD}>
        <img className='not-found__logo' src='/images/logo.png' alt='' />
      </Link>
      {!user ? (
        <div className='not-found__btn-container'>
          <button
            className='not-found__button'
            onClick={() => history.push(routes.LOGIN)}
          >
            Login
          </button>
          <button
            onClick={() => history.push(routes.SIGNUP)}
            className='not-found__button signup'
          >
            Registration
          </button>
        </div>
      ) : (
        <div className='header__info'>
          <IconButton onClick={() => history.push(routes.DASHBOARD)}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={() => firebase.auth().signOut()}>
            <ExitToAppIcon />
          </IconButton>
          <img
            src={user.photoURL ? user.photoURL : '/images/avatars/user.png'}
            className='header__avatar'
            alt=''
          />
        </div>
      )}
    </nav>
  );
};

export default Header;
