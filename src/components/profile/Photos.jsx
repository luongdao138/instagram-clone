import React from 'react';
import { Grid } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import Photo from './Photo';
import useUser from '../../hooks/useUser';

const Photos = ({ photos, profile }) => {
  const { user } = useUser();
  if (!photos) {
    return (
      <Skeleton
        count={1}
        style={{
          width: '100%',
          marginTop: '40px',
        }}
        height={500}
      />
      // </div>
    );
  }

  return (
    <Grid container style={{ margin: '50px 0' }}>
      {photos.map((photo) => (
        <Photo photo={photo} profile={profile} user={user} key={photo.docId} />
      ))}
    </Grid>
  );
};

export default Photos;
