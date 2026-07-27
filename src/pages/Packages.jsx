import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Stethoscope, ArrowRight, ShieldCheck, Heart, X } from 'lucide-react';
import './Packages.css';

const PACKAGES = [
  {
    id: 'diabetic-profile',
    title: 'DIABETIC PROFILE (5 TESTS)',
    category: 'Targeted Screens',
    image: '/dai.jpg',
    tests: ['FASTING BLOOD SUGAR (FBS)', 'HbA1c (GLYCOSYLATED HAEMOGLOBIN)', 'RENAL FUNCTION TEST (RFT)', 'POST PRANDIAL BLOOD SUGAR (PPBS)'],
    featured: true
  },
  {
    id: 'bone-health-profile',
    title: 'BONE HEALTH PROFILE (5 TESTS)',
    category: 'Targeted Screens',
    image: '/bone.jpg',
    tests: ['ALKALINE PHOSPHATASE (ALP)', 'SERUM ALBUMIN', 'SERUM CALCIUM', 'SERUM PHOSPHORUS', 'VITAMIN D3']
  },
  {
    id: 'allergy-profile',
    title: 'ALLERGY PROFILE (20 TESTS)',
    category: 'Targeted Screens',
    image: '/allergy.jpg',
    tests: ['ABSOLUTE EOSINOPHIL COUNT (AEC)', 'COMPLETE BLOOD COUNT WITH ESR (CBC WITH ESR)', 'IgE LEVEL']
  },
  {
    id: 'anaemia-profile',
    title: 'ANAEMIA PROFILE (25 TESTS)',
    category: 'Targeted Screens',
    image: '/an.jpg',
    tests: ['IRON', 'SERUM FERRITIN', 'TOTAL IRON BINDING CAPACITY (TIBC)', 'TRANSFERRIN SATURATION', 'COMPLETE BLOOD COUNT (CBC)', 'PERIPHERAL SMEAR']
  },
  {
    id: 'mini-health-package',
    title: 'MINI HEALTH PACKAGE (61 TESTS)',
    category: 'General Wellness',
    image: '/mini.jpg',
    tests: ['BLOOD UREA NITROGEN (BUN)', 'ESTIMATED GLOMERULAR FILTRATION RATE (eGFR)', 'FASTING BLOOD SUGAR (FBS)', 'LIPID PROFILE TEST (LPT)', 'RENAL FUNCTION TEST (RFT)', 'COMPLETE URINE ANALYSIS', 'COMPLETE BLOOD COUNT (CBC)'],
    featured: true
  },
  {
    id: 'kidney-health-profile',
    title: 'KIDNEY HEALTH PROFILE (9 TESTS)',
    category: 'Targeted Screens',
    image: '/kidney.jpg',
    tests: ['BLOOD UREA', 'BLOOD UREA NITROGEN (BUN)', 'ESTIMATED GLOMERULAR FILTRATION RATE (eGFR)', 'SERUM CALCIUM', 'SERUM CREATININE', 'SERUM PHOSPHORUS', 'SERUM POTASSIUM (K+)', 'SERUM SODIUM (NA+)', 'SERUM URIC ACID']
  },
  {
    id: 'fever-profile',
    title: 'FEVER PROFILE (36 TESTS)',
    category: 'Targeted Screens',
    image: '/fev.jpg',
    tests: ['URINE ROUTINE', 'COMPLETE BLOOD COUNT WITH ESR (CBC WITH ESR)', 'DENGUE PROFILE (IgG, IgM & Ns1Ag)', 'MALARIAL PARASITE (CARD TEST)', 'C-REACTIVE PROTEIN (CRP)', 'WIDAL SLIDE']
  },
  {
    id: 'joint-health-profile',
    title: 'JOINT HEALTH PROFILE (7 TESTS)',
    category: 'Targeted Screens',
    image: '/joint.jpg',
    tests: ['RHEUMATOID FACTOR (RA)', 'SERUM CALCIUM', 'SERUM PHOSPHORUS', 'SERUM URIC ACID', 'VITAMIN D3', 'ASO TITRE (ASLO)', 'C-REACTIVE PROTEIN (CRP)']
  },
  {
    id: 'cardiac-profile',
    title: 'CARDIAC PROFILE (6 TESTS)',
    category: 'Targeted Screens',
    image: '/car.jpg',
    tests: ['ASPARTATE AMINOTRANSFERASE (SGOT/AST)', 'CPK (CK NAK)', 'CPK-MB', 'LDH', 'BP (BLOOD PRESSURE)', 'ECG (ELECTROCARDIOGRAM)']
  },
  {
    id: 'basic-health-package',
    title: 'BASIC HEALTH PACKAGE (79 TESTS)',
    category: 'General Wellness',
    image: '/bas.jpg',
    tests: ['BLOOD UREA NITROGEN (BUN)', 'ESTIMATED GLOMERULAR FILTRATION RATE (eGFR)', 'FASTING BLOOD SUGAR (FBS)', 'HbA1c (GLYCOSYLATED HAEMOGLOBIN)', 'LIPID PROFILE TEST (LPT)', 'LIVER FUNCTION TEST (LFT)', 'RENAL FUNCTION TEST (RFT)', 'SERUM CALCIUM', 'SERUM ELECTROLYTES', 'SERUM PHOSPHORUS', 'COMPLETE URINE ANALYSIS', 'COMPLETE BLOOD COUNT (CBC)']
  },
  {
    id: 'senior-citizen-health-package',
    title: 'SENIOR CITIZEN HEALTH PACKAGE',
    category: 'Specialized Care',
    image: '/senior.jpg',
    tests: ['FASTING BLOOD SUGAR (FBS)', 'HbA1c (GLYCOSYLATED HAEMOGLOBIN)', 'LIPID PROFILE TEST (LPT)', 'LIVER FUNCTION TEST (LFT)', 'RENAL FUNCTION TEST (RFT)', 'SERUM CALCIUM', 'SERUM POTASSIUM (K+)', 'SERUM SODIUM (Na+)', 'BP (BLOOD PRESSURE)', 'ECG (ELECTROCARDIOGRAM)', 'COMPLETE URINE ANALYSIS', 'COMPLETE BLOOD COUNT (CBC)', 'TSH'],
    featured: true
  },
  {
    id: 'anc-profile',
    title: 'ANC PROFILE (19 TESTS)',
    category: 'Targeted Screens',
    image: '/anc.jpg',
    tests: ['RANDOM BLOOD SUGAR (RBS)', 'URINE ROUTINE', 'BLEEDING TIME (BT)', 'CLOTTING TIME (CT)', 'BLOOD GROUP & RH TYPE', 'HAEMOGLOBIN (Hb)', 'PLATELET COUNT', 'TSH', 'HCV (CARD TEST)', 'HEPATITIS B SURFACE ANTIGEN (HBsAg) (CARD)', 'HIV 1 & 2 (CARD)', 'VDRL (CARD)']
  },
  {
    id: 'regular-health-package',
    title: 'REGULAR HEALTH PACKAGE (87 TESTS)',
    category: 'General Wellness',
    image: '/reg.jpg',
    tests: ['BLOOD UREA NITROGEN (BUN)', 'ESTIMATED GLOMERULAR FILTRATION RATE (eGFR)', 'FASTING BLOOD SUGAR (FBS)', 'HbA1c (GLYCOSYLATED HAEMOGLOBIN)', 'IRON PROFILE', 'LIPID PROFILE TEST (LPT)', 'LIVER FUNCTION TEST (LFT)', 'RENAL FUNCTION TEST (RFT)', 'SERUM CALCIUM', 'SERUM ELECTROLYTES', 'SERUM PHOSPHORUS', 'COMPLETE URINE ANALYSIS', 'COMPLETE BLOOD COUNT (CBC)', 'CA - 125', 'PSA', 'THYROID PROFILE (T3, T4, TSH)']
  },
  {
    id: 'executive-health-package',
    title: 'EXECUTIVE HEALTH PACKAGE (89 TESTS)',
    category: 'General Wellness',
    image: '/exe.jpg',
    tests: ['BLOOD UREA NITROGEN (BUN)', 'ESTIMATED GLOMERULAR FILTRATION RATE (eGFR)', 'FASTING BLOOD SUGAR (FBS)', 'HbA1c (GLYCOSYLATED HAEMOGLOBIN)', 'IRON PROFILE', 'LIPID PROFILE TEST (LPT)', 'LIVER FUNCTION TEST (LFT)', 'RENAL FUNCTION TEST (RFT)', 'SERUM CALCIUM', 'SERUM ELECTROLYTES', 'SERUM PHOSPHORUS', 'COMPLETE URINE ANALYSIS', 'COMPLETE BLOOD COUNT (CBC)', 'CA-125', 'PSA', 'THYROID PROFILE (T3, T4, TSH)', 'VITAMIN B-12', 'VITAMIN D3']
  },
  {
    id: 'comprehensive-health-package',
    title: 'COMPREHENSIVE HEALTH PACKAGE (96 TESTS)',
    category: 'General Wellness',
    image: '/com.jpg',
    tests: ['BLOOD UREA NITROGEN (BUN)', 'ESTIMATED GLOMERULAR FILTRATION RATE (eGFR)', 'FASTING BLOOD SUGAR (FBS)', 'HbA1c (GLYCOSYLATED HAEMOGLOBIN)', 'IRON PROFILE', 'LIPASE', 'LIPID PROFILE TEST (LPT)', 'LIVER FUNCTION TEST (LFT)', 'RENAL FUNCTION TEST (RFT)', 'SERUM AMYLASE', 'SERUM CALCIUM', 'SERUM ELECTROLYTES', 'SERUM PHOSPHORUS', 'COMPLETE URINE ANALYSIS', 'COMPLETE BLOOD COUNT (CBC)', 'HIGH SENSITIVE CRP (hsCRP)', 'CA - 125', 'PSA', 'THYROID PROFILE (T3, T4, TSH)', 'VITAMIN B-12', 'VITAMIN D3', 'APOLIPOPROTEIN-A1 (APO-A1)', 'APOLIPOPROTEIN-B (APO-B)', 'LIPOPROTEIN-A (Lp-a)'],
    featured: true
  },
  {
    id: 'women-health-care-package',
    title: 'WOMEN HEALTH CARE PACKAGE',
    category: 'Specialized Care',
    image: '/women.jpg',
    tests: ['FASTING BLOOD SUGAR (FBS)', 'HbA1c (GLYCOSYLATED HAEMOGLOBIN)', 'LIPID PROFILE TEST (LPT)', 'LIVER FUNCTION TEST (LFT)', 'RENAL FUNCTION TEST (RFT)', 'SERUM CALCIUM', 'BP (BLOOD PRESSURE)', 'ECG (ELECTROCARDIOGRAM)', 'COMPLETE URINE ANALYSIS', 'COMPLETE BLOOD COUNT (CBC)', 'CA-125', 'THYROID PROFILE (T3, T4, TSH)'],
    featured: true
  }
];

const CATEGORIES = ['All', 'General Wellness', 'Targeted Screens', 'Specialized Care'];

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedModalPkg, setSelectedModalPkg] = useState(null);
  const navigate = useNavigate();

  // Filter logic
  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      const matchesCategory = activeCategory === 'All' || pkg.category === activeCategory;
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.tests.some((test) => test.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  const handleBook = (pkgTitle) => {
    // Encodes package title for query string
    navigate(`/appointment?package=${encodeURIComponent(pkgTitle)}`);
  };

  return (
    <div className="packages-page animate-fade">
      {/* Page Header */}
      <section className="packages-hero">
        <div className="container">
          <h1>Health & Diagnostics Packages</h1>
          <p className="packages-hero-sub">Choose from our list of comprehensive healthcare check-ups tailored to your clinical needs.</p>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="filters-section container">
        <div className="search-filter-wrapper">
          {/* Search bar */}
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search by package name or specific tests (e.g., FBS, CBC, TSH)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search health packages"
            />
          </div>

          {/* Category Pill Filters */}
          <div className="category-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="packages-grid-section container">
        {filteredPackages.length > 0 ? (
          <div className="packages-grid">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="package-card animate-slide-up">
                {pkg.featured && <span className="featured-tag"><Heart size={12} style={{ fill: 'white', marginRight: '4px' }} /> Recommended</span>}
                <div className="pkg-image-wrapper">
                  <img src={pkg.image} alt={pkg.title} />
                  <span className="pkg-badge">{pkg.category}</span>
                </div>
                <div className="pkg-content">
                  <h3>{pkg.title}</h3>
                  <p className="pkg-test-count">{pkg.tests.length} Parameters Tested</p>
                  <div className="pkg-actions">
                    <button onClick={() => setSelectedModalPkg(pkg)} className="btn-secondary pkg-details-btn">
                      View Details
                    </button>
                    <button onClick={() => handleBook(pkg.title)} className="btn-primary pkg-book-btn">
                      Book Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results-card">
            <Stethoscope size={48} className="no-results-icon animate-float" />
            <h3>No Packages Found</h3>
            <p>We couldn't find any health packages matching "{searchTerm}". Try checking your spelling or selecting "All" categories.</p>
            <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} className="btn-secondary">
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Home Sample Collection Banner */}
      <section className="home-collection-banner container">
        <div className="banner-card">
          <div className="banner-text">
            <h3>Need Home Sample Collection?</h3>
            <p>Get tested from the comfort of your home. Contact us to schedule a home sample collection by our certified lab technicians in Karkala.</p>
          </div>
          <a href="https://wa.me/918217797657?text=Hi%2C%20I%20want%20to%20book%20a%20home%20sample%20collection." target="_blank" rel="noopener noreferrer" className="btn-primary banner-whatsapp-btn">
            Contact on WhatsApp
          </a>
        </div>
      </section>

      {/* View Details Modal */}
      {selectedModalPkg && (
        <div className="modal-overlay animate-fade" onClick={() => setSelectedModalPkg(null)}>
          <div className="details-modal animate-scale" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedModalPkg(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="modal-header">
              <span className="modal-category-badge">{selectedModalPkg.category}</span>
              <h3>{selectedModalPkg.title}</h3>
              <p className="modal-subtitle">{selectedModalPkg.tests.length} tests included in this profile</p>
            </div>
            <div className="modal-body">
              <h4>List of Included Tests:</h4>
              <ul className="modal-tests-grid">
                {selectedModalPkg.tests.map((test, index) => (
                  <li key={index}>
                    <ShieldCheck size={16} className="modal-check-icon" />
                    <span>{test}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => {
                  setSelectedModalPkg(null);
                  handleBook(selectedModalPkg.title);
                }} 
                className="btn-primary modal-book-btn"
              >
                Book Package Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
