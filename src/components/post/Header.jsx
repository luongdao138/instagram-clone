import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ photoURL, username }) => {
  return (
    <div className='post__header'>
      <Link to={`/p/${username}`} className='post__header__link'>
        <img
          className='post__header__img'
          src={photoURL ? photoURL : '/images/avatars/user.png'}
          alt=''
        />
        <p className='post__header__username'>{username}</p>
      </Link>
    </div>
  );
};

export default Header;
