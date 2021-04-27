import React, { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import useUser from '../../hooks/useUser';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleToggleLike = async () => {
    await firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        likes: isLiked
          ? FieldValue.arrayRemove(user.userId)
          : FieldValue.arrayUnion(user.userId),
      });
    setLikes((x) => (isLiked ? x - 1 : x + 1));
    setIsLiked((x) => !x);
  };
  return (
    <div className='post__actions'>
      <div>
        {isLiked ? (
          <FavoriteIcon
            style={{ cursor: 'pointer', color: '#0095f6' }}
            onClick={handleToggleLike}
          />
        ) : (
          <FavoriteBorderIcon
            style={{ cursor: 'pointer' }}
            onClick={handleToggleLike}
          />
        )}
        <svg
          className='post__actions_msg-icon'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          tabIndex={0}
          onClick={handleFocus}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
          />
        </svg>
      </div>

      <div className='post__actions_number-like'>
        <span>{likes <= 1 ? `${likes} like` : `${likes} likes`}</span>
      </div>
    </div>
  );
};

export default Actions;
