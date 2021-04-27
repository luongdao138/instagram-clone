import React, { useEffect, useState, useRef, useContext } from 'react';
import useUser from '../../hooks/useUser';
import Skeleton from 'react-loading-skeleton';
import { followUser, unFollowUser } from '../../services/firebase';
import UpdateAvatar from './UpdateAvatar';
import { Dialog } from '@material-ui/core';
import FirebaseContext from '../../context/firebase';

const Header = ({ photoCount, profile, dispatch }) => {
  const ref = useRef(null);
  const { user } = useUser();
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [isFollowingProfile, setIsFollowingProfile] = useState(true);
  const [isOwn, setIsOwn] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && profile) {
      setIsFollowingProfile(user.following?.includes(profile.userId));
      setIsOwn(user.userId === profile.userId);
    }
  }, [user, profile]);

  if (!user || !profile.docId) {
    return <Skeleton count={1} style={{ width: '100%' }} height={200} />;
  }

  const handleFollow = async () => {
    if (isFollowingProfile) {
      await unFollowUser(
        user.docId,
        user.userId,
        profile.docId,
        profile.userId
      );

      setIsFollowingProfile(false);
    } else {
      await followUser(user.docId, user.userId, profile.docId, profile.userId);
      setIsFollowingProfile(true);
    }
  };

  const triggerClick = () => {
    ref.current.click();
  };

  const handleUpdateAvatar = () => {
    if (!user.photoURL) return triggerClick();

    setOpen(true);
  };

  const handleUploadAvatar = (e) => {
    const image = e.target.files[0];
    console.log(image);
    if (!image) return;

    const uploadTask = firebase
      .storage()
      .ref(`avatars/${image.name}`)
      .put(image);

    const unsub = uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        firebase
          .storage()
          .ref('avatars')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            firebase.firestore().collection('users').doc(user.docId).update({
              photoURL: url,
            });
            setOpen(false);
          });
      }
    );

    return () => unsub();
  };

  const handleRemoveAvatar = async () => {
    await firebase.firestore().collection('users').doc(user.docId).update({
      photoURL: FieldValue.delete(),
    });

    setOpen(false);
  };

  return (
    <div className='user-profile__header'>
      <input
        type='file'
        ref={ref}
        hidden
        id='input_update_avatar'
        onChange={handleUploadAvatar}
      />
      <Dialog onBackdropClick={() => setOpen(false)} open={open}>
        <div className='modal__wrapper'>
          <h4>Change Avatar</h4>
          <button
            className='modal__wrapper__button'
            style={{
              color: '#0095f6',
              fontWeight: '700',
            }}
            onClick={triggerClick}
          >
            Update photo
          </button>
          <button
            className='modal__wrapper__button'
            style={{
              color: 'red',
              fontWeight: '700',
            }}
            onClick={handleRemoveAvatar}
          >
            Remove current photo
          </button>
          <button
            className='modal__wrapper__button'
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Dialog>
      <div className='user-profile__wrapper'>
        <div>
          <button
            disabled={!isOwn}
            style={{ cursor: isOwn ? 'pointer' : 'revert' }}
            onClick={handleUpdateAvatar}
          >
            <img
              src={
                isOwn
                  ? user.photoURL
                    ? user.photoURL
                    : '/images/avatars/user.png'
                  : profile.photoURL
                  ? profile.photoURL
                  : '/images/avatars/user.png'
              }
              className='user-profile__image'
              alt=''
            />
          </button>
          {/* {isOwn && user.photoURL && (
            <div className='user-profile__update-btn__wrapper'>
              <div>
                <button>Update Photo</button>
                <input type='file' hidden />
              </div>
              <div>
                <button>Remove Current Photo</button>
                <input type='file' hidden />
              </div>
            </div>
          )} */}
          <div className='user-profile__info__fullname res'>
            {profile.fullName}
          </div>
        </div>

        <div className='user-profile__info'>
          <div className='user-profile__info__username'>
            <span>{profile.username}</span>
            {isOwn ? (
              <button>Edit profile</button>
            ) : isFollowingProfile ? (
              <button onClick={handleFollow}>Unfollow</button>
            ) : (
              <button onClick={handleFollow}>Follow</button>
            )}
          </div>
          <div className='user-profile__info__follow'>
            <span>
              <strong>{photoCount}</strong>
              {photoCount > 1 ? 'posts' : 'post'}
            </span>
            <span>
              <strong>{profile.followers?.length}</strong>
              {profile.followers?.length > 1 ? 'followers' : 'follower'}
            </span>
            <span>
              Following<strong> {profile.following?.length}</strong>
              {profile.following?.length > 1 ? 'users' : 'user'}
            </span>
          </div>
          <div className='user-profile__info__fullname'>{profile.fullName}</div>
        </div>
      </div>
      <div className='user-profile__info__follow res'>
        <span>
          <strong>{photoCount}</strong>
          {photoCount > 1 ? 'posts' : 'post'}
        </span>
        <span>
          <strong>{profile.followers?.length}</strong>
          {profile.followers?.length > 1 ? 'followers' : 'follower'}
        </span>
        <span>
          Following<strong> {profile.following?.length}</strong>
          {profile.following?.length > 1 ? 'users' : 'user'}
        </span>
      </div>
      {isOwn && !user.photoURL && <UpdateAvatar docId={user.docId} />}
    </div>
  );
};

export default Header;
