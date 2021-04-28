import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddComment from './AddComment';
import { useEffect } from 'react';
import FirebaseContext from '../../context/firebase';

const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
  const [comments, setComments] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .onSnapshot((snapShot) => {
        setComments(snapShot.data().comments);
      });
  }, []);

  return (
    <div className='post__comments'>
      {comments.length >= 3 && (
        <p className='post__conmments_viewmore'>
          View all {comments.length} comments
        </p>
      )}

      {comments.slice().map((item) => {
        return (
          <p
            className='post_comments_item'
            key={`${item.comment}-${item.displayName}`}
          >
            <Link to={`/p/${item.displayName}`}>{item.displayName}</Link>
            <span>{item.comment}</span>
          </p>
        );
      })}
      <p className='post__comments_date'>{moment(posted).fromNow()}</p>

      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Comments;
