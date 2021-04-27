import React from 'react';
import './user.css';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const User = ({ username, fullName, photoURL }) => {
  if (!username) {
    return <Skeleton count={1} height={50} />;
  }

  return (
    <div className='user'>
      <img
        className='user__avatar'
        src={photoURL ? photoURL : '/images/avatars/user.png'}
      />
      <Link
        to={`/p/${username}`}
        style={{
          textDecoration: 'none',
          color: '#333',
        }}
      >
        <div className='user__info'>
          <div className='user__info__username'>{username}</div>
          <div className='user__info__fullName'>{fullName}</div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(User);
