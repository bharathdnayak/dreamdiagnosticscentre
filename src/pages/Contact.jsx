import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const PHONES = [
    { label: 'Mobile (Primary)', num: '8217797657', link: 'tel:+918217797657' },
    { label: 'Mobile (Support)', num: '7483902173', link: 'tel:+917483902173' },
    { label: 'Mobile (Emergency)', num: '6362651711', link: 'tel:+916362651711' }
  ];

  return (
    <div className="contact-page animate-fade">
      {/* Page Header */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="contact-hero-sub">We are here to assist you with bookings, reports, and inquiries.</p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="contact-section container">
        <div className="contact-layout">
          {/* Info Side */}
          <div className="contact-info-column">
            <h2>Get in Touch</h2>
            <p className="contact-intro-text">
              Have questions about health packages or laboratory tests? Reach out to our consultants via phone or email, or visit our diagnostics center serving Karkala & nearby regions.
            </p>

            <div className="info-cards-stack">
              {/* Address card */}
              <div className="contact-info-card">
                <MapPin className="info-card-icon" />
                <div className="info-card-content">
                  <h3>Our Location</h3>
                  <p>Karkala Inn, Pulkeri Bypass Circle, Karkala 574114</p>
                  <a
                    href="https://maps.app.goo.gl/zRBn12DHpbANyAAa7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link-btn"
                  >
                    Open in Google Maps <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                  </a>
                </div>
              </div>

              {/* Phones card */}
              <div className="contact-info-card">
                <Phone className="info-card-icon" />
                <div className="info-card-content">
                  <h3>Phone Numbers</h3>
                  <div className="phones-grid">
                    {PHONES.map((ph, idx) => (
                      <div key={idx} className="phone-item">
                        <span className="phone-label">{ph.label}:</span>
                        <a href={ph.link} className="phone-number">{ph.num}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email card */}
              <div className="contact-info-card">
                <Mail className="info-card-icon" />
                <div className="info-card-content">
                  <h3>Email Support</h3>
                  <p>For report queries and corporate checkup bookings:</p>
                  <a href="mailto:ddckarkala25@gmail.com" className="email-link">ddckarkala25@gmail.com</a>
                </div>
              </div>

              {/* Hours card */}
              <div className="contact-info-card">
                <Clock className="info-card-icon" />
                <div className="info-card-content">
                  <h3>Working Hours</h3>
                  <div className="hours-list">
                    <p><strong>Monday to Saturday:</strong> 7:00 am – 7:00 pm</p>
                    <p><strong>Sunday:</strong> 7:00 am – 1:00 pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="contact-map-column animate-slide-up">
            <div className="map-wrapper">
              <iframe
                title="Dream Diagnostic Centre Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.490751305902!2d74.99200127512665!3d13.194476787141713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb57c775ee14f3%3A0xfe08acd012da8f0b!2sDream%20Diagnostic%20Centre!5e0!3m2!1sen!2sin!4v1751618827060!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
