import React, { useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import Services from './pages/Services';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import './App.css';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Set up scroll reveal observer (Athenahealth style)
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Liquid Glass mouse-shine reflections tracking handlers
    const handleMouseMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      el.style.setProperty('--mouse-x', `${xPercent}%`);
      el.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    const handleMouseLeave = (e) => {
      const el = e.currentTarget;
      el.style.setProperty('--mouse-x', '50%');
      el.style.setProperty('--mouse-y', '50%');
    };

    const targetSelectors = [
      '.glass-card',
      '.hero-cta-card',
      '.about-intro-card',
      '.mv-card',
      '.value-card',
      '.review-card',
      '.service-card',
      '.package-card',
      '.contact-info-card',
      '.appointment-info-card',
      '.appointment-form-card',
      '.btn-primary',
      '.btn-secondary',
      '.book-now-btn',
      '.logo-title',
      '.nav-link'
    ];

    const elements = document.querySelectorAll(targetSelectors.join(', '));
    elements.forEach((el) => {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      elements.forEach((el) => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [location]);

  // Generate stable bubbles styles once on load
  const bubbleStyles = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      size: Math.random() * 25 + 10, // 10px to 35px
      left: Math.random() * 100,      // 0% to 100%
      delay: Math.random() * 8,       // 0s to 8s delay
      duration: Math.random() * 6 + 8 // 8s to 14s speed
    }));
  }, []);

  return (
    <div className="app-layout">
      {/* Background Floating Bubbles */}
      <div className="bubble-container">
        {bubbleStyles.map((style, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${style.size}px`,
              height: `${style.size}px`,
              left: `${style.left}%`,
              animationDelay: `${style.delay}s`,
              animationDuration: `${style.duration}s`
            }}
          ></div>
        ))}
      </div>

      {/* SVG Liquid Refraction Filter */}
      <svg style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="liquid-refraction">
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/services" element={<Services />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
