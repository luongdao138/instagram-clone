import React from 'react';
import { useState } from 'react';
import './suggestionProfile.css';
import { followUser, unFollowUser } from '../../services/firebase';

const SuggestionProfile = ({ profile, loggedInUserDocId, loggedInUserId }) => {
  const [followed, setFollowed] = useState(false);
  const { username, photoURL, fullName, userId, docId } = profile;

  const handleFollowrUser = async () => {
    if (followed) {
      setFollowed(false);
      await unFollowUser(loggedInUserDocId, loggedInUserId, docId, userId);
    } else {
      setFollowed(true);
      await followUser(loggedInUserDocId, loggedInUserId, docId, userId);
    }
  };

  return (
    <article className='profile'>
      <div className='profile__info'>
        <img
          className='profile__info__img'
          src={photoURL ? photoURL : '/images/avatars/user.png'}
          alt=''
        />
        <div className='profile__info__name'>
          <p className='profile__info__username'>{username}</p>
          <p className='profile__info__fullName'>{fullName}</p>
        </div>
      </div>
      <button className='profile__button' onClick={handleFollowrUser}>
        {followed ? 'Unfollow' : 'Follow'}
      </button>
    </article>
  );
};

export default SuggestionProfile;
