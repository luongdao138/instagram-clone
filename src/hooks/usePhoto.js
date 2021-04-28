import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { getPhotos } from '../services/firebase';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user) {
        const { userId, following } = user;
        if (following && following.length > 0) {
          // get the photos if length > 0
          await getPhotos(userId, following, setPhotos);
        } else if (following && following.length === 0) setPhotos([]);
      }
    }

    getTimelinePhotos();
  }, [user]);

  return { photos };
}
