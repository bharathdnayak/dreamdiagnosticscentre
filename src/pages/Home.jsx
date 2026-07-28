import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Heart, ArrowRight, Quote, ShieldCheck, MapPin, Award, Users, Clock } from 'lucide-react';
import './Home.css';

const SLIDES = [
  {
    image: '/slides1.jpg',
    title: 'Modern Lab Technology',
    subtitle: 'Equipped with high-end diagnostic machines for accurate results.',
    btnText: 'Know More',
    link: '/about',
    isExternal: false
  },
  {
    image: '/slides2.jpg',
    title: 'Complete Health Packages',
    subtitle: 'Affordable packages tailored for your regular health check-ups.',
    btnText: 'Explore Packages',
    link: '/packages',
    isExternal: false
  },
  {
    image: '/slides3.jpg',
    title: 'Contact Our Team',
    subtitle: 'Have questions? Our health consultants are ready to help.',
    btnText: 'Contact Us',
    link: '/contact',
    isExternal: false
  },
  {
    image: '/4.jpg',
    title: 'Visit Our Center',
    subtitle: 'Karkala Inn — your nearby health partner.',
    btnText: 'Find Us',
    link: 'https://maps.app.goo.gl/zRBn12DHpbANyAAa7',
    isExternal: true
  }
];

const REVIEWS = [
  {
    name: 'Prajna Acharya',
    initial: 'P',
    time: '1 month ago',
    text: 'The staffs were incredibly helpful and patient, making my experience very comfortable. The tests performed quickly and efficiently, and the results were also accurate. Overall the facility was clean and well maintained which made me feel safe and secure.',
    stars: 5
  },
  {
    name: 'Narasimha Murthy',
    initial: 'N',
    time: '1 month ago',
    text: 'Best Lab for getting tests done. Having the best automated analysers for Biochemistry and Haematology, timely calibrations and well qualified personnel, I personally feel this DREAM DIAGNOSTIC CENTRE is a boon Karkala. Best wishes and thanks for the management and staff.',
    stars: 5
  },
  {
    name: 'Axnisha j shetty',
    initial: 'A',
    time: '1 month ago',
    text: 'Many patients report positive experiences at medical labs, praising their staff’s professionalism, efficiency, and the quality of their services. Handling patients was too good 😊',
    stars: 5
  }
];

const FAQ_ITEMS = [
  {
    q: "How long should I fast before a blood test?",
    a: "Fasting requirements vary. For Blood Sugar (FBS) and Lipids/Cholesterol tests, a fast of 8-12 hours is recommended. You may drink plain water, but avoid coffee, tea, juices, and smoking during this period."
  },
  {
    q: "How soon will I receive my diagnostic reports?",
    a: "Most routine clinical biochemistry and hematology reports are processed and ready on the same day. Special culture or antibody screens may take 24-48 hours. Reports will be sent directly via email, WhatsApp, or can be collected in person."
  },
  {
    q: "How do I schedule a home sample collection?",
    a: "You can book directly by calling us at +91-8217797657 or messaging our booking coordinator on WhatsApp. Please specify your location, requested date/time, and doctor's prescription if any."
  },
  {
    q: "Are diagnostic reports from Dream Diagnostic Centre calibrated?",
    a: "Yes. All our analyzers undergo strict daily calibration controls and quarterly external quality assessment controls (EQAS) to guarantee absolute clinical accuracy and reliability in compliance with medical laboratory guidelines."
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [reportQuery, setReportQuery] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Auto sliding
  useEffect(() => {
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="home-page">
      {/* Slider Carousel */}
      <section className="slider-section" aria-label="Hero Carousel">
        <div className="carousel">
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${slide.image})` }}
            >
              <div className="slide-content animate-slide-up">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                {slide.isExternal ? (
                  <a href={slide.link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {slide.btnText}
                  </a>
                ) : (
                  <Link to={slide.link} className="btn-primary">
                    {slide.btnText}
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* Nav Arrows */}
          <button className="carousel-arrow prev" onClick={prevSlide} aria-label="Previous Slide">
            <ChevronLeft size={24} />
          </button>
          <button className="carousel-arrow next" onClick={nextSlide} aria-label="Next Slide">
            <ChevronRight size={24} />
          </button>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2000+ Trusted Customers Spotlight Banner */}
      <section className="trusted-spotlight-section container reveal">
        <div className="trusted-spotlight-card">
          <div className="trusted-badge-header">
            <span className="trusted-live-pulse"></span>
            <span className="trusted-tag">LOCAL COMMUNITY SPOTLIGHT</span>
          </div>
          <h2>Trusted by 2,000+ Patients</h2>
          <p>
            Delivering 100% accurate lab test results, automated analyzer precision, and compassionate diagnostic care to families across Karkala and nearby regions.
          </p>

          <div className="trusted-stats-grid">
            <div className="stat-box">
              <div className="stat-icon-wrapper">
                <Users size={24} className="stat-icon" />
              </div>
              <span className="stat-number">2,000+</span>
              <span className="stat-label">Trusted Patients</span>
            </div>
            <div className="stat-box">
              <div className="stat-icon-wrapper">
                <Award size={24} className="stat-icon" />
              </div>
              <span className="stat-number">100%</span>
              <span className="stat-label">Calibrated Accuracy</span>
            </div>
            <div className="stat-box">
              <div className="stat-icon-wrapper">
                <Star size={24} className="stat-icon" />
              </div>
              <span className="stat-number">4.9 ★</span>
              <span className="stat-label">Google Rating</span>
            </div>
            <div className="stat-box">
              <div className="stat-icon-wrapper">
                <Clock size={24} className="stat-icon" />
              </div>
              <span className="stat-number">Same Day</span>
              <span className="stat-label">Report Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero CTA section */}
      <section className="hero-cta-section container reveal">
        <div className="hero-cta-card">
          <div className="hero-cta-info">
            <span className="badge">Healthcare Diagnostics</span>
            <h2>Your Health, Our Priority</h2>
            <p>Get accurate, reliable, and timely diagnostic results with our high-tech laboratory facilities in Karkala.</p>
          </div>
          <Link to="/appointment" className="btn-secondary">
            Book Appointment
          </Link>
        </div>
      </section>

      {/* About Us section */}
      <section className="about-us-parallax">
        <div className="about-us-overlay" style={{ backgroundImage: `url('/1.jpg')` }}></div>
        <div className="about-us-container container">
          <div className="about-us-content reveal">
            <h2>About Dream Diagnostic Centre</h2>
            <p>
              At Dream Diagnostic Centre, we’re redefining diagnostic care with accuracy, speed, and compassion. Our expert team and advanced technology ensure you get trusted results—because your health deserves nothing less.
            </p>
            <Link to="/about" className="about-more-link">
              Learn More About Our Team <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Home Sample Collection Spotlight */}
      <section className="home-collection-spotlight container reveal">
        <div className="collection-card-wrapper glass-card">
          <div className="collection-info-panel">
            <span className="collection-badge">Home Care Convenience</span>
            <h2>Home Sample Collection</h2>
            <p>
              Skip the travel and waiting lines! Our certified phlebotomists will visit your home or office in Karkala to collect your blood/urine samples with complete safety, sterile comfort, and strict hygiene protocols.
            </p>
            <ul className="collection-features-list">
              <li>
                <ShieldCheck size={18} className="feat-check" />
                <span>Certified & Trained Lab Technicians</span>
              </li>
              <li>
                <ShieldCheck size={18} className="feat-check" />
                <span>100% Sterile & Vacuum-sealed Equipment</span>
              </li>
              <li>
                <ShieldCheck size={18} className="feat-check" />
                <span>Safe Temperature-controlled Transport</span>
              </li>
            </ul>

            <div className="collection-action-row">
              <a 
                href="https://wa.me/918217797657?text=Hi%2C%20I%20want%20to%20schedule%20a%20home%20sample%20collection." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                Schedule Home Visit
              </a>
              <a href="tel:8217797657" className="btn-secondary call-btn">
                Call +91 82177 97657
              </a>
            </div>
          </div>
          <div className="collection-graphic-panel">
            <img src="/senior.jpg" alt="Home Sample Collection Service" />
          </div>
        </div>
      </section>

      {/* Packages Spotlight Banner */}
      <section className="packages-spotlight-section container">
        <div className="packages-spotlight-card">
          <div className="spotlight-text reveal-left">
            <div className="spotlight-header">
              <Heart className="spotlight-icon" />
              <span>Spotlight Feature</span>
            </div>
            <h2>Complete Health Packages*</h2>
            <p>
              Take charge of your health today. We offer a comprehensive list of wellness check-ups tailored to your age, lifestyle, and clinical needs. Keep track of your vitals with our premium packages.
            </p>
            <Link to="/packages" className="spotlight-btn">
              View Packages <ChevronRight size={20} className="arrow-icon" />
            </Link>
            <small className="disclaimer">*Home sample collection facility available upon request. Terms apply.</small>
          </div>
          <div className="spotlight-image-container reveal-right">
            <img src="/change.jpg" alt="Happy family showing good health" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <h2>What Our Customers Are Saying</h2>
          <p className="reviews-subtitle">Real experiences from patients who visited Dream Diagnostic Centre</p>
          
          <div className="reviews-grid">
            {REVIEWS.map((review, index) => (
              <div key={index} className={`review-card reveal delay-${(index + 1) * 100}`}>
                <Quote className="quote-icon" />
                <div className="review-header">
                  <div className="review-avatar">{review.initial}</div>
                  <div className="review-author-info">
                    <h4>{review.name}</h4>
                    <span className="review-time">{review.time}</span>
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-stars">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} size={18} fill="#ff6600" color="#ff6600" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="reviews-cta-container">
            <a
              href="https://www.google.com/search?q=Dream+Diagnostic+Centre+Reviews#lrd=0x3bbb57c775ee14f3:0xfe08acd012da8f0b,3,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="google-review-btn"
            >
              Review us on Google <ArrowRight size={18} style={{ marginLeft: '6px' }} />
            </a>
          </div>
        </div>
      </section>

      {/* Pre-Test Guidelines & FAQ Section */}
      <section className="faq-section container reveal">
        <h2>Guidelines & FAQs</h2>
        <p className="faq-subtitle">Pre-test guidelines and general information for patients</p>
        
        <div className="faq-wrapper">
          <div className="guidelines-card glass-card">
            <h3>Pre-Test Instructions</h3>
            <ul className="guidelines-steps">
              <li>
                <span className="step-tag fasting">Fasting</span>
                <p>Fasting for 10-12 hours is mandatory for FBS, PPBS, and Lipid Profiles. Do not eat any food or drink tea/coffee; plain water is allowed.</p>
              </li>
              <li>
                <span className="step-tag meds">Medications</span>
                <p>Consult your physician regarding taking your regular daily medications before giving sample blood draws.</p>
              </li>
              <li>
                <span className="step-tag urine">Urine / Stool</span>
                <p>Use only sterile containers provided by our lab. Collect mid-stream urine samples for accurate clinical diagnostics.</p>
              </li>
            </ul>
          </div>
          
          <div className="faq-accordion">
            {FAQ_ITEMS.map((faq, index) => (
              <div key={index} className={`faq-item glass-card ${openFaq === index ? 'open' : ''}`}>
                <button className="faq-trigger" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  <ChevronRight className="faq-chevron" size={18} />
                </button>
                <div className="faq-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
