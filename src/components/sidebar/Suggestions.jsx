import React, { useEffect, useState } from 'react';
import './suggestions.css';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestionProfile from './SuggestionProfile';

const Suggestions = ({ userId, following, docId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const res = await getSuggestedProfiles(userId, following);
      setProfiles(res);
    }

    if (userId) suggestedProfiles();
  }, [userId]);

  if (!profiles) {
    return <Skeleton count={1} height={150} />;
  }

  if (profiles.length === 0) return null;

  return (
    <div className='suggestions'>
      <h5>Suggestions for you</h5>

      <div className='suggestions__wrapper'>
        {profiles.map((profile) => (
          <SuggestionProfile
            loggedInUserDocId={docId}
            loggedInUserId={userId}
            profile={profile}
            key={profile.docId}
          />
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
