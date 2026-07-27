import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle, Loader2 } from 'lucide-react';
import './Appointment.css';

const SERVICES_OPTIONS = [
  { value: 'Selected Package', label: 'Selected Package' },
  { value: 'Clinical Laboratory', label: 'Clinical Laboratory' },
  { value: 'Blood Pressure (BP)', label: 'Blood Pressure (BP)' },
  { value: 'BMI (Body mass index)', label: 'BMI (Body mass index)' },
  { value: 'Diabetes (RBS, FBS, HbA1c)', label: 'Diabetes (RBS, FBS, HbA1c)' },
  { value: 'Lipid Profile', label: 'Lipid Profile' },
  { value: 'Liver Function Test (LFT)', label: 'Liver Function Test (LFT)' },
  { value: 'Kidney Function Test (KFT)', label: 'Kidney Function Test (KFT)' },
  { value: 'Thyroid Function Test (TFT)', label: 'Thyroid Function Test (TFT)' },
  { value: 'Electrocardiogram (ECG)', label: 'Electrocardiogram (ECG)' },
  { value: 'Ultrasound (USG)', label: 'Ultrasound (USG)' }
];

export default function Appointment() {
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    package: '',
    name: '',
    email: '',
    phone: '',
    appointment: '',
    date: '',
    time: '',
    message: ''
  });
  
  const [timeSlots, setTimeSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submittedDetails, setSubmittedDetails] = useState(null);

  // Parse URL search parameters on load
  useEffect(() => {
    const pkgParam = searchParams.get('package');
    const serviceParam = searchParams.get('service');
    
    let updatedData = { ...formData };
    
    if (pkgParam) {
      updatedData.package = decodeURIComponent(pkgParam);
      updatedData.appointment = 'Selected Package';
    }
    
    if (serviceParam) {
      const decodedService = decodeURIComponent(serviceParam);
      // Try to find matching option
      const matched = SERVICES_OPTIONS.find(
        opt => opt.value.toLowerCase() === decodedService.toLowerCase()
      );
      if (matched) {
        updatedData.appointment = matched.value;
      }
    }
    
    setFormData(prev => ({ ...prev, ...updatedData }));
  }, [searchParams]);

  // Generate slots helper
  const generateTimeSlots = (startHour, endHour) => {
    let slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const start = new Date(0, 0, 0, hour, 0);
      const end = new Date(0, 0, 0, hour + 1, 0);
      const format = (d) => 
        d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push(`${format(start)} - ${format(end)}`);
    }
    return slots;
  };

  // Update slots when date changes
  useEffect(() => {
    if (!formData.date) {
      setTimeSlots([]);
      return;
    }
    
    const selectedDate = new Date(formData.date);
    if (isNaN(selectedDate.getTime())) return;
    
    let slots = [];
    if (selectedDate.getDay() === 0) {
      slots = generateTimeSlots(7, 13); // Sunday: 7 AM - 1 PM
    } else {
      slots = generateTimeSlots(7, 19); // Mon-Sat: 7 AM - 7 PM
    }
    
    setTimeSlots(slots);
    
    // Clear time selection if date changed to avoid invalid slots
    setFormData(prev => ({ ...prev, time: '' }));
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { name, email, phone, appointment, date, time, message, package: pkg } = formData;
    
    // Generate Booking Reference Number (e.g. DDC-284915)
    const refNum = `DDC-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refNum);
    setSubmittedDetails({
      name,
      email,
      phone,
      package: pkg,
      appointment,
      date,
      time,
      message
    });
    
    // Asynchronously submit to Formspree in the background
    try {
      await fetch('https://formspree.io/f/manjkzqy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          BookingRef: refNum,
          Name: name,
          Email: email,
          Phone: phone,
          PackageSelected: pkg || 'None',
          AppointmentType: appointment,
          AppointmentDate: date,
          AppointmentTime: time,
          Message: message || 'N/A'
        })
      });
    } catch (err) {
      console.error("Formspree submission error:", err);
    }
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after booking
    setFormData({
      package: '',
      name: '',
      email: '',
      phone: '',
      appointment: '',
      date: '',
      time: '',
      message: ''
    });
  };

  return (
    <div className="appointment-page animate-fade">
      <section className="appointment-hero">
        <div className="container">
          <h1>Book An Appointment</h1>
          <p className="appointment-hero-sub">Schedule your medical screening or health check-up quickly.</p>
        </div>
      </section>

      <section className="appointment-section container">
        <div className="appointment-layout">
          {/* Instructions Column */}
          <div className="appointment-info-card">
            <h3>Booking Guidelines</h3>
            <ul className="guidelines-list">
              <li>
                <div className="guideline-num">1</div>
                <div>
                  <h4>Select Service or Package</h4>
                  <p>Choose your diagnostic screening type. If you selected a health package, it will be pre-filled.</p>
                </div>
              </li>
              <li>
                <div className="guideline-num">2</div>
                <div>
                  <h4>Choose Date & Slot</h4>
                  <p>Pick a convenient day. Slots dynamically adjust based on clinic hours (Sunday: 7am-1pm; Mon-Sat: 7am-7pm).</p>
                </div>
              </li>
              <li>
                <div className="guideline-num">3</div>
                <div>
                  <h4>Submit Form Request</h4>
                  <p>Submit your details online. Our clinic coordinator will contact you shortly to finalize your appointment.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Column */}
          <div className="appointment-form-card">
            {isSuccess && submittedDetails ? (
              <div className="booking-success-message animate-fade">
                <CheckCircle size={56} className="success-icon" />
                <h2>Booking Received!</h2>
                <p className="success-intro">
                  We have received your appointment request. Our coordinator will contact you shortly to confirm your slot.
                </p>
                
                <div className="receipt-box">
                  <div className="receipt-row">
                    <span className="receipt-label">Reference ID</span>
                    <span className="receipt-value ref-highlight">{bookingRef}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Patient Name</span>
                    <span className="receipt-value">{submittedDetails.name}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Screening For</span>
                    <span className="receipt-value">
                      {submittedDetails.appointment === 'Selected Package' 
                        ? submittedDetails.package 
                        : submittedDetails.appointment}
                    </span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Requested Date</span>
                    <span className="receipt-value">{submittedDetails.date}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Requested Time</span>
                    <span className="receipt-value">{submittedDetails.time}</span>
                  </div>
                </div>

                <div className="success-actions">
                  <a 
                    href={`https://wa.me/918217797657?text=${encodeURIComponent(
                      `Hi Dream Diagnostics, I just submitted an online booking.\n\n` +
                      `👤 Patient: ${submittedDetails.name}\n` +
                      `📦 Screening: ${submittedDetails.appointment === 'Selected Package' ? submittedDetails.package : submittedDetails.appointment}\n` +
                      `📅 Date: ${submittedDetails.date}\n` +
                      `⏰ Time: ${submittedDetails.time}\n` +
                      `🔖 Reference ID: ${bookingRef}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary success-wa-btn"
                  >
                    Chat on WhatsApp (Optional)
                  </a>
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setSubmittedDetails(null);
                    }} 
                    className="btn-link-secondary"
                  >
                    Book Another Appointment
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="appointment-form">
                {formData.package && (
                  <div className="form-group">
                    <label htmlFor="package">Selected Package</label>
                    <div className="input-with-icon">
                      <FileText size={18} className="form-icon" />
                      <input
                        type="text"
                        id="package"
                        name="package"
                        value={formData.package}
                        readOnly
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="form-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="form-icon" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-with-icon">
                      <Phone size={18} className="form-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter 10-digit mobile number"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="10-digit mobile number"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="appointment">Screening / Appointment For</label>
                  <select
                    id="appointment"
                    name="appointment"
                    value={formData.appointment}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--Select screening option--</option>
                    {SERVICES_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="date">Appointment Date</label>
                    <div className="input-with-icon">
                      <Calendar size={18} className="form-icon" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">Time Slot</label>
                    <div className="input-with-icon">
                      <Clock size={18} className="form-icon" />
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        disabled={!formData.date}
                        required
                      >
                        <option value="">
                          {!formData.date ? '--Select date first--' : '--Choose time slot--'}
                        </option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Enter any medical history notes, preferences, or symptoms..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="spinner-icon" size={18} /> Processing...
                    </>
                  ) : (
                    'Confirm & Send WhatsApp'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
