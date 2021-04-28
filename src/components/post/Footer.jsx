import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ caption, username }) => {
  return (
    <div className='post__footer'>
      <p className='post__footer__caption'>
        <Link style={{ textDecoration: 'none' }} to={`/p/${username}`}>
          <strong>{username}</strong>
        </Link>
        {caption}
      </p>
    </div>
  );
};

export default Footer;
