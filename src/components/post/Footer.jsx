import React from 'react';

const Footer = ({ caption, username }) => {
  return (
    <div className='post__footer'>
      <p className='post__footer__caption'>
        <strong>{username}</strong>
        {caption}
      </p>
    </div>
  );
};

export default Footer;
