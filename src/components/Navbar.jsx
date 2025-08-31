import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyle = ({isActive}) => ({
    color: isActive ? '#f59e0b' : '#e6eef8',
    textDecoration: 'none',
    fontWeight: '500'
  });

  return (
    <motion.nav 
      initial={{y:-50,opacity:0}} 
      animate={{y:0,opacity:1}} 
      transition={{duration:0.5}} 
      className="navbar"
    >
      <div className="nav-content">
        <button 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/favorites" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Favorites</NavLink>
          <NavLink to="/about" style={linkStyle} onClick={() => setIsMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
        </div>
      </div>
    </motion.nav>
  )
}