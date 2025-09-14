import React, { useState, useEffect } from 'react'

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer section-black">
      <div className="container">
        <div className="footer-content">
          <div className="footer-nav">
            <a href="#home" className="nav-link" onClick={() => scrollToSection('home')}>Home</a>
            <a href="#problems" className="nav-link" onClick={() => scrollToSection('problems')}>Problems</a>
            <a href="#timeline" className="nav-link" onClick={() => scrollToSection('timeline')}>Timeline</a>
            <a href="#prizes" className="nav-link" onClick={() => scrollToSection('prizes')}>Prizes</a>
            <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          <div className="footer-copy">
            <h4>©2025 Hack2TechSustain 2.0, MIT Campus, Anna University.</h4>
            <p>Designed with 🩶 by Web Development Team</p>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button id="back-to-top" className="back-to-top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </footer>
  )
}

export default Footer