import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getByUserId } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserByUserId() {
      await getByUserId(user.uid, setActiveUser);
      // setActiveUser(response);
    }

    if (user?.uid) getUserByUserId();
  }, [user]);

  return { user: activeUser };
}
