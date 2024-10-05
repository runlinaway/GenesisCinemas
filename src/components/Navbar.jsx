import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/_navbar.scss';

function Navbar() {
  const [dropdownMoviesOpen, setDropdownMoviesOpen] = useState(false);
  const [dropdownLocationsOpen, setDropdownLocationsOpen] = useState(false);

  // Toggle dropdowns on hover
  const handleMoviesHover = (isHovering) => {
    setDropdownMoviesOpen(isHovering);
  };

  const handleLocationsHover = (isHovering) => {
    setDropdownLocationsOpen(isHovering);
  };

  return (
    <nav className="navbar">
      <div className="navbar_links">
        {/* Movies Link and Dropdown */}
        <div 
          className="navbar_item" 
          onMouseEnter={() => handleMoviesHover(true)} 
          onMouseLeave={() => handleMoviesHover(false)}
        >
          <Link to="/movies">Movies</Link>
          {dropdownMoviesOpen && (
            <ul className="dropdown">
              <li>Placeholder</li>
            </ul>
          )}
        </div>

        {/* Locations Link and Dropdown */}
        <div 
          className="navbar_item" 
          onMouseEnter={() => handleLocationsHover(true)} 
          onMouseLeave={() => handleLocationsHover(false)}
        >
          <Link to="/locations">Locations</Link>
          {dropdownLocationsOpen && (
            <ul className="dropdown">
              <li>Placeholder</li>
            </ul>
          )}
        </div>

        {/* Other Links */}
        <Link to="/bar">Bar</Link>
        <Link to="/corporate">Corporate Booking</Link>
        <Link to="/faq">FAQ</Link>
      </div>
    </nav>
  );
}

export default Navbar;
