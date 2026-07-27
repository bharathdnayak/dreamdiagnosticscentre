import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  // Handle theme toggling
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Close mobile drawer on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <NavLink to="/" className="logo-title">
          <img src="/d.jpg" alt="Dream Diagnostics Logo" />
          <div className="title-text">
            <h1>Dream Diagnostic Centre</h1>
            <span className="subtitle">Karkala</span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink>
          <NavLink to="/packages" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Health Packages</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Our Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact Us</NavLink>
        </nav>

        {/* Action Button */}
        <div className="header-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <NavLink to="/appointment" className="book-now-btn">Book Now</NavLink>
          
          {/* Hamburger Icon */}
          <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-overlay ${isOpen ? 'show' : ''}`} onClick={toggleMenu}></div>
      <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="logo-title">
            <img src="/d.jpg" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Dream Diagnostics</h2>
          </div>
          <div className="mobile-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="close-btn" onClick={toggleMenu} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="mobile-nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}>About Us</NavLink>
          <NavLink to="/packages" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}>Health Packages</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}>Our Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}>Contact Us</NavLink>
          <NavLink to="/appointment" className="mobile-book-btn">Book Appointment</NavLink>
        </div>
      </nav>
    </header>
  );
}
