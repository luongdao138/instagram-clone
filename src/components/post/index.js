import React, { useRef } from 'react';
import '../../styles/post.css';
import Image from './Image';
import Header from './Header';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';

const Post = ({ post }) => {
  const inputRef = useRef(null);
  const handleFocus = () => inputRef.current.focus();

  return (
    <div className='post'>
      <Header username={post.username} photoURL={post.photoURL} />
      <Image imageSrc={post.imageSrc} />
      <Actions
        docId={post.docId}
        totalLikes={post.likes.length}
        likedPhoto={post.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={post.caption} username={post.username} />
      <Comments
        docId={post.docId}
        comments={post.comments}
        posted={post.dateCreated}
        commentInput={inputRef}
      />
    </div>
  );
};

export default Post;
