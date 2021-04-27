import { Grid, Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Post from '../../components/post';
import { useEffect } from 'react';

const Photo = ({ photo, profile, user }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (photo && user) photo.userLikedPhoto = photo.likes.includes(user.userId);
  }, [user, photo]);

  return (
    <Grid item xs={4}>
      <div className='user-profile__photo__item'>
        <img src={photo.imageSrc} alt='' />
        <div
          className='user-profile__photo__item__black'
          onClick={() => setOpen(true)}
        ></div>
        <div className='user-profile__photo__item__info'>
          <span>
            <FavoriteIcon
              onClick={() => setOpen(true)}
              style={{ color: '#fff', marginRight: '4px', cursor: 'pointer' }}
            />{' '}
            {photo.likes.length}
          </span>
          <span>
            <svg
              className='post__actions_msg-icon'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              tabIndex={0}
              onClick={() => setOpen(true)}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              />
            </svg>
            {photo.comments.length}
          </span>
        </div>
      </div>
      <Dialog open={open} onBackdropClick={() => setOpen(false)}>
        <Post
          post={{
            ...photo,
            username: profile.username,
            photoURL: profile.photoURL,
          }}
        />
      </Dialog>
    </Grid>
  );
};

export default Photo;
