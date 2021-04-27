import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import '../styles/addpost.css';
import FirebaseContext from '../context/firebase';
import useUser from '../hooks/useUser';
import { useHistory } from 'react-router-dom';

const AddPost = () => {
  const { firebase } = useContext(FirebaseContext);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useUser();
  const histoty = useHistory();

  useEffect(() => {
    document.title = 'Add Post - Instagram';
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!image || caption === '') return;
    const uploadTask = firebase
      .storage()
      .ref(`images/${image.name}`)
      .put(image);

    const unsub = uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        firebase
          .storage()
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            firebase.firestore().collection('photos').add({
              caption,
              imageSrc: url,
              dateCreated: new Date().getTime(),
              userId: user.userId,
              likes: [],
              comments: [],
            });

            setCaption('');
            setImage(null);
            histoty.push(`/p/${user.username}`);
          });
      }
    );

    return () => unsub();
  };

  return (
    <div>
      <Header />
      <div className='add-post'>
        <form className='add-post__form'>
          <h4 className='add-post__form__title'>Add New Post</h4>
          <input
            type='text'
            name='caption'
            className='add-post__form__input'
            placeholder='Write caption...'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            name='imageSrc'
            className='add-post__form__input'
            type='file'
            onChange={(e) => {
              if (e.target.files[0]) setImage(e.target.files[0]);
            }}
          />
          <button className='add-post__form__button' onClick={handleUpload}>
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
