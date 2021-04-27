import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { getPhotosByUserId } from '../../services/firebase';
import Header from './Header';
import Photos from './Photos';
import UpdateAvatar from './UpdateAvatar';

const initState = {
  profile: {},
  photosCollection: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const UserProfile = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(async () => {
    async function getProfileAndPhotos() {
      if (user) {
        await getPhotosByUserId(user, (user1 = user, photos) => {
          dispatch({
            type: 'LOAD_PROFILE',
            payload: {
              profile: user1,
              photosCollection: photos,
            },
          });
        });
      }
    }
    getProfileAndPhotos();
  }, [user]);

  return (
    <div className='user_profile'>
      <Header
        photoCount={state.photosCollection?.length}
        profile={state.profile}
        dispatch={dispatch}
      />

      <Photos photos={state.photosCollection} profile={state.profile} />
    </div>
  );
};

export default UserProfile;
