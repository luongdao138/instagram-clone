import React from 'react';
import useUser from '../../hooks/useUser';
import User from './User';
import Suggestions from './Suggestions';
import '../../styles/sidebar.css';

const Sidebar = () => {
  const {
    user: { username, fullName, userId, photoURL, following, docId },
  } = useUser();
  return (
    <div className='sidebar'>
      <User username={username} fullName={fullName} photoURL={photoURL} />
      <Suggestions userId={userId} following={following} docId={docId} />
    </div>
  );
};

export default Sidebar;
