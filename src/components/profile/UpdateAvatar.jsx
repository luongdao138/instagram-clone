import React, { useContext } from 'react';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import FirebaseContext from '../../context/firebase';

const UpdateAvatar = ({ docId }) => {
  const { firebase } = useContext(FirebaseContext);
  const handleChangeAvatar = (e) => {
    const image = e.target.files[0];
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
            firebase.firestore().collection('users').doc(docId).update({
              photoURL: url,
            });
          });
      }
    );

    return () => unsub();
  };

  return (
    <div className='user-profile__update-avatar'>
      <div className='camera'>
        <PhotoCameraIcon />
      </div>
      <p className='main__title'>Add avatar</p>
      <p className='sub__title'>
        Add your profile picture to let your friends know it is you.
      </p>
      <input
        type='file'
        className='add-avatar__input'
        onChange={handleChangeAvatar}
      />
    </div>
  );
};

export default UpdateAvatar;
