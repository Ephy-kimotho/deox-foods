import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-night-100 p-4 text-center">
      <div className="container mx-auto">
        <p className="font-sans text-sm md:text-base">&copy; {new Date().getFullYear()} Deox Foods. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;