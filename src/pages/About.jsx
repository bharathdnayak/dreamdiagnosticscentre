import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import './About.css';

export default function About() {
  const VALUES = [
    {
      title: 'Customer-Centric Care',
      desc: 'Prioritizing the health, comfort, and well-being of every customer through personalized attention and compassionate service.',
      icon: <Heart className="value-icon-svg" />
    },
    {
      title: 'Trust & Transparency',
      desc: 'Building lasting relationships by delivering honest and dependable services with clear and prompt reports.',
      icon: <ShieldCheck className="value-icon-svg" />
    },
    {
      title: 'Innovation & Technology',
      desc: 'Continuously adopting advanced medical technologies and automated analyzers to improve testing accuracy.',
      icon: <Award className="value-icon-svg" />
    },
    {
      title: 'Excellence in Quality',
      desc: 'Upholding the highest standards in laboratory testing, regular calibrations, and strict safety guidelines.',
      icon: <Award className="value-icon-svg" />
    }
  ];

  return (
    <div className="about-page animate-fade">
      {/* Page Header */}
      <section className="about-hero">
        <div className="container">
          <h1>About Our Diagnostic Centre</h1>
          <p className="about-hero-sub">Providing reliable diagnostics with speed, care, and precision in Karkala.</p>
        </div>
      </section>

      {/* Main Intro */}
      <section className="about-intro-section container">
        <div className="about-intro-card">
          <div className="about-intro-text reveal-left">
            <h2>Who We Are</h2>
            <p>
              At <strong>Dream Diagnostic Centre</strong>, we believe <strong>health comes first</strong>. Established with the aim of providing affordable and accurate medical tests, we have built trust in the community by delivering quality care and reliable reports.
            </p>
            <p>
              Located in <strong>Karkala, Karnataka</strong>, we offer a wide range of diagnostic services — from advanced imaging and pathology to routine health checkups. With modern infrastructure, cutting-edge technology, and an experienced team, we ensure timely and precise results for every customer.
            </p>
          </div>
          <div className="about-intro-image reveal-right">
            <img src="/lab.jpg" alt="Diagnostics laboratory equipment" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mv-card reveal-left">
              <div className="mv-icon-container">
                <Target size={32} />
              </div>
              <h3>Our Mission</h3>
              <p>
                Our mission is to make advanced diagnostic services accessible to everyone, delivering precise results with speed and care. We are committed to empowering individuals to take control of their health through reliable testing, timely reporting, and compassionate support.
              </p>
            </div>
            
            <div className="mv-card reveal-right">
              <div className="mv-icon-container">
                <Eye size={32} />
              </div>
              <h3>Our Vision</h3>
              <p>
                Our vision is to create a healthier society by emerging as a leader in affordable, reliable, and technology-driven diagnostic solutions, setting new benchmarks for accuracy and customer care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section container">
        <div className="section-header-center reveal">
          <h2>Our Core Values</h2>
          <p>The principles that guide our everyday diagnostics and customer care services</p>
        </div>
        
        <div className="values-grid">
          {VALUES.map((val, idx) => (
            <div key={idx} className={`value-card reveal delay-${(idx + 1) * 100}`}>
              <div className="value-icon-box">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Laboratory Technology Showcase */}
      <section className="tech-showcase-section container">
        <div className="section-header-center reveal">
          <h2>Advanced Laboratory Analyzers</h2>
          <p>We deploy high-precision automated systems to guarantee clinical accuracy and rapid reporting</p>
        </div>
        
        <div className="tech-grid">
          <div className="tech-card glass-card reveal-left">
            <span className="tech-badge-tag bio">Biochemistry</span>
            <h3>Fully Automated Biochemistry Analyzer</h3>
            <p>
              Processes Blood Glucose Levels, Lipid Profiles, Liver Parameters (LFT), and Kidney Metrics (KFT) using spectrophotometric measurement and automated calibrations, eliminating manual errors.
            </p>
          </div>
          
          <div className="tech-card glass-card reveal">
            <span className="tech-badge-tag hem">Haematology</span>
            <h3>3-Part Differential Cell Counter</h3>
            <p>
              Delivers rapid Complete Blood Count (CBC) assays, platelets, and white blood cell indices using electronic impedance technology, ensuring high accuracy on cell differentiation.
            </p>
          </div>
          
          <div className="tech-card glass-card reveal-right">
            <span className="tech-badge-tag imm">Immunoassay</span>
            <h3>CLIA Hormonal Testing Analyzer</h3>
            <p>
              Leverages Chemiluminescence Immunoassay (CLIA) for Thyroid Panels, PCOD / PCOS Hormonal Analysis, Vitamin B12, and Vitamin D3, achieving ultra-sensitive detection levels for absolute diagnostic confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
