import React from 'react';
import useUser from '../../hooks/useUser';
import User from './User';
import Suggestions from './Suggestions';
import '../../styles/sidebar.css';

const Sidebar = () => {
  const { user } = useUser();
  return (
    <div className='sidebar'>
      <User
        username={user?.username}
        fullName={user?.fullName}
        photoURL={user?.photoURL}
      />
      <Suggestions
        userId={user?.userId}
        following={user?.following}
        docId={user?.docId}
      />
    </div>
  );
};

export default Sidebar;
