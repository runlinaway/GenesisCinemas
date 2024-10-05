import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo'; // Import the Logo component
import Navbar from './Navbar'; // Import the Navbar component
import '../assets/styles/_header.scss'; // SCSS for styling


function Header() {
  console.log("Header component rendered");
  return (
    <header className="header">
      <div className="header__top">
        {/* Centralized Logo */}
        <Logo />

        {/* Member Login Link - Aligned to the right */}
        <div className="member-login">
          <Link to="/login">Member Login</Link>
        </div>
      </div>

      {/* Navbar below the logo */}
      <Navbar />
    </header>
  );
}

export default Header;
