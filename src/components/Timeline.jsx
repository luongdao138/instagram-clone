import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhoto';
import '../styles/timeline.css';
import Post from '../components/post';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Timeline = () => {
  const { photos } = usePhotos();
  const history = useHistory();
  return (
    <div className='timeline'>
      {!photos ? (
        <Skeleton
          count={4}
          height={400}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      ) : photos.length > 0 ? (
        photos.map((photo) => <Post key={photo.docId} post={photo} />)
      ) : (
        <p className='timeline__message'>Follow people to see photos</p>
      )}
      <IconButton
        className='timeline__add-icon'
        onClick={() => {
          history.push('/add');
        }}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default Timeline;
