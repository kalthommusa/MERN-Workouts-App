import React from 'react';

// functional component for the footer
const Footer = () => {
  return (
    <footer className="footer">
      <p>
        {/* display current year dynamically and app information */}
        &copy; {new Date().getFullYear()} &bull; Kalthom &bull; Powered by NodeJs, Express, MongoDB, React & ❤️ All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;