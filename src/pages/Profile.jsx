import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getUserByUsername } from '../services/firebase';
import UserProfile from '../components/profile';
import '../styles/profile.css';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function getUser() {
      const user = await getUserByUsername(username);

      if (user) {
        setUser(user);
        document.title = `${user.fullName} - @${username}`;
      } else history.push('/not-found');
    }

    getUser();
  }, [username, history]);

  return (
    <div>
      <Header />
      <UserProfile user={user} />
    </div>
  );
};

export default Profile;
