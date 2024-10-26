// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} &bull; Kalthom &bull; Powered by NodeJs, Express, MongoDB, React & ❤️ All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;