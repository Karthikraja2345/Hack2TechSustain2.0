import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-particles"></div>
      <div className="container">
        <div className="nav-brand">
          <h2>H2TS 2.0</h2>
        </div>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`} id="nav-menu">
          <a href="#home" className="nav-link" onClick={() => scrollToSection('home')}>Home</a>
          <a href="#sponsors" className="nav-link" onClick={() => scrollToSection('sponsors')}>Sponsors</a>
          <a href="#problems" className="nav-link" onClick={() => scrollToSection('problems')}>Problems</a>
          <a href="#timeline" className="nav-link" onClick={() => scrollToSection('timeline')}>Timeline</a>
          <a href="#prizes" className="nav-link" onClick={() => scrollToSection('prizes')}>Prizes</a>
          <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a>
        </div>
        <div className="nav-toggle" id="nav-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar