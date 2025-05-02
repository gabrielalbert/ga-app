import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/header_logo.png';
import { BsColumnsGap } from "react-icons/bs";
import { TbDragDrop } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
        <img alt="Grow and Achive" src={logo} width={56}/>          
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>
          <IoMdHome /> Home
          </Link>
          <Link to="/fillin" className="nav-item" onClick={() => setIsOpen(false)}>
          <BsColumnsGap /> Fill In
          </Link>
          <Link to="/match" className="nav-item" onClick={() => setIsOpen(false)}>
          <TbDragDrop /> Match Word
          </Link>
               
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isOpen ? 'active' : ''}`}></span>          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;