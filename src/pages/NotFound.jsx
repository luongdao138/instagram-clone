import React from 'react';
import '../styles/not-found.css';
import { Link, useHistory } from 'react-router-dom';
import * as routes from '../constants/routes';
import { useEffect } from 'react';

const NotFound = () => {
  const history = useHistory();
  useEffect(() => {
    document.title = 'Page Not Found - Instagram';
  });
  return (
    <div className='not-found'>
      <nav>
        <img className='not-found__logo' src='/images/logo.png' alt='' />
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
      </nav>
      <main className='not-found__main'>
        <h3 className='not-found__main__title'>
          Sorry, this page is currently unavailable.
        </h3>
        <p className='not-found__main__msg'>
          The link you follow may be damaged or the page may have been removed.{' '}
          <Link to={routes.DASHBOARD}>Go back to Instagram</Link>
        </p>
      </main>
    </div>
  );
};

export default NotFound;
