import React, { useContext, useState, useEffect } from 'react';
import FirebaseContext from '../../context/firebase';
import useUser from '../../hooks/useUser';
import SendIcon from '@material-ui/icons/Send';

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState('');
  const { user } = useUser();
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.length >= 1) {
      // setComments([...comments, { displayName: user.username, comment }]);
      await firebase
        .firestore()
        .collection('photos')
        .doc(docId)
        .update({
          comments: FieldValue.arrayUnion({
            displayName: user.username,
            comment,
          }),
        });
      setComment('');
    }
  };

  return (
    <div className='post__add-comment'>
      <form onSubmit={handleSubmitComment}>
        <input
          ref={commentInput}
          type='text'
          placeholder='Add a comment...'
          className='post__add-comment__input'
          name='add-comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='button'
          className='post__add-comment__icon'
          onClick={handleSubmitComment}
          disabled={comment.length < 1}
        >
          <SendIcon className='' />
        </button>
      </form>
    </div>
  );
};

export default AddComment;
