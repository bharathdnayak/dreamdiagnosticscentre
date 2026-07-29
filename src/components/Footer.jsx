import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, FileText } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section footer-about">
          <div className="footer-logo">
            <img src="/d.jpg" alt="Dream Diagnostics Logo" />
            <h3>Dream Diagnostic Centre</h3>
          </div>
          <p className="footer-desc">
            Dream Diagnostic Centre is a modern healthcare diagnostics center providing quality and affordable services across Karkala & nearby regions. Our mission is to ensure timely, reliable, and accurate diagnosis for everyone.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/packages">Health Packages</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section footer-contact">
          <h4>Get in Touch</h4>
          <ul className="contact-list">
            <li>
              <Phone size={18} className="contact-icon" />
              <div className="contact-details">
                <a href="tel:+918217797657">+91-8217797657</a>
                <span className="separator">/</span>
                <a href="tel:+916362651711">+91-6362651711</a>
                <span className="separator">/</span>
                <a href="tel:+917483902173">+91-7483902173</a>
              </div>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <a href="mailto:ddckarkala25@gmail.com">ddckarkala25@gmail.com</a>
            </li>
            <li>
              <MapPin size={18} className="contact-icon align-start" />
              <span>Karkala Inn, Pulkeri Bypass Circle, Karkala 574114</span>
            </li>
          </ul>
          
          <div className="social-links">
            <a href="https://www.instagram.com/_dreamdiagnosticcentre" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {new Date().getFullYear()} Dream Diagnostic Centre. All rights reserved.</p>
          <div className="legal-links">
            <a href="#" onClick={(e) => e.preventDefault()}><ShieldCheck size={14} style={{ marginRight: '4px' }} /> Privacy Policy</a>
            <span className="bullet">•</span>
            <a href="#" onClick={(e) => e.preventDefault()}><FileText size={14} style={{ marginRight: '4px' }} /> Terms and Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
