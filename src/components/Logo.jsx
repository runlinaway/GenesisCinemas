import React, { useEffect, useState } from 'react';
import '../assets/styles/_logo.scss';

const Logo = () => {
  const [isTop, setIsTop] = useState(true);

  // Scroll detection to update logo state
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`logo ${isTop ? 'logo-play' : 'logo-flat'}`}>
      <span className="letter">G</span>
      <span className="letter">E</span>
      <span className="letter">N</span>
      <span className="letter">E</span>
      <span className="letter">S</span>
      <span className="letter">I</span>
      <span className="letter">S</span>

    </div>
  );
};

export default Logo;
