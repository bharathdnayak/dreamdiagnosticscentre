import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Activity, Heart, Eye, ArrowRight } from 'lucide-react';
import './Services.css';

const SERVICES = [
  {
    id: 'clinical-lab',
    title: 'Clinical Laboratory',
    image: '/lab.jpg',
    param: 'Clinical Laboratory',
    desc: 'Advanced biochemistry, hematology, and pathology testing with automated analyzers and certified technicians.'
  },
  {
    id: 'blood-pressure',
    title: 'Blood Pressure (BP)',
    image: '/bp.jpg',
    param: 'Blood Pressure (BP)',
    desc: 'Instant and accurate blood pressure monitoring and consultation to keep your heart health in check.'
  },
  {
    id: 'ecg',
    title: 'ECG',
    image: '/ecg.jpg',
    param: 'Electrocardiogram (ECG)',
    desc: 'Electrocardiogram testing to record the electrical signals in your heart and diagnose cardiac conditions.'
  },
  {
    id: 'bmi',
    title: 'BMI (Body Mass Index)',
    image: '/bmi.jpg',
    param: 'BMI (Body mass index)',
    desc: 'Body Mass Index calculations based on height and weight to assess overall fitness and weight categories.'
  },
  {
    id: 'height',
    title: 'Height',
    image: '/h.jpg',
    param: 'Height',
    desc: 'Standard physical measurement tracking, essential for body composition calculations and regular wellness logs.'
  },
  {
    id: 'weight',
    title: 'Weight',
    image: '/w.jpg',
    param: 'Weight',
    desc: 'Precise weight tracking, helping patients monitor fitness goals, drug dosages, and overall metabolism.'
  }
];

export default function Services() {
  const navigate = useNavigate();

  const handleBook = (serviceName) => {
    navigate(`/appointment?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="services-page animate-fade">
      {/* Page Header */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Diagnostic Facilities</h1>
          <p className="services-hero-sub">State-of-the-art diagnostics and patient care services in Karkala.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section container">
        <div className="services-header-intro reveal">
          <h2>Clinical Facilities & Screening</h2>
          <p>Equipped with modern calibration standards and automated analysers for maximum testing accuracy.</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((serv, index) => (
            <div
              key={serv.id}
              className={`service-card reveal delay-${((index % 3) + 1) * 100}`}
            >
              <div className="service-image">
                <img src={serv.image} alt={serv.title} />
              </div>
              <div className="service-info">
                <h3>{serv.title}</h3>
                <p>{serv.desc}</p>
                <button
                  onClick={() => handleBook(serv.param)}
                  className="btn-primary service-book-btn"
                >
                  Book Screening <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Notice section */}
      <section className="diagnostics-features container">
        <div className="features-grid">
          <div className="feature-item reveal delay-100">
            <Activity className="feature-icon" />
            <h4>Automated Analyzers</h4>
            <p>Our biochemistry and hematology tests are processed using high-precision automated diagnostic machines.</p>
          </div>
          <div className="feature-item reveal delay-200">
            <Stethoscope className="feature-icon" />
            <h4>Qualified Personnel</h4>
            <p>Our laboratory is staffed by experienced pathologists and clinical laboratory technicians.</p>
          </div>
          <div className="feature-item reveal delay-300">
            <Heart className="feature-icon" />
            <h4>Timely Calibrations</h4>
            <p>Regular system calibrations and test validation procedures are done to ensure reliable reports.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
