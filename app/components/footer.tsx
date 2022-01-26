import * as React from 'react';

const Footer = () => {
  return (
    <footer className="footer" >
      <div className="container footer-content">
        <p>&copy; Anthony Fryer {new Date().getFullYear()}!</p>
      </div>
    </footer >
  );
};

export default Footer;
