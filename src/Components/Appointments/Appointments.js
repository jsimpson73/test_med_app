import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { specialties, doctors } from '../../data/mockData';
import Popup from 'reactjs-popup';
import './Appointments.css';

const Appointments = () => {
  const { user, addAppointment, cancelAppointment, appointments } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showInstantForm, setShowInstantForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phone: '',
    date: '',
    time: ''
  });
  const [instantForm, setInstantForm] = useState({
    name: '',
    phone: ''
  });
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  useEffect(() => {
    let filtered = doctors;
    
    if (selectedSpecialty) {
      filtered = filtered.filter(doc => doc.specialty === selectedSpecialty);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredDoctors(filtered);
  }, [selectedSpecialty, searchTerm]);

  const handleBookAppointment = (doctor) => {
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }
    setSelectedDoctor(doctor);
    setShowBookingForm(true);
  };

  const handleInstantConsultation = (doctor) => {
    if (!user) {
      alert('Please login to book an instant consultation');
      return;
    }
    setSelectedDoctor(doctor);
    setShowInstantForm(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    const appointment = {
      doctorName: selectedDoctor.name,
      doctorId: selectedDoctor.id,
      specialty: selectedDoctor.specialty,
      ...bookingForm
    };
    
    addAppointment(appointment);
    setShowBookingForm(false);
    setBookingForm({ patientName: '', phone: '', date: '', time: '' });
  };

  const handleInstantSubmit = (e) => {
    e.preventDefault();
    
    const appointment = {
      doctorName: selectedDoctor.name,
      doctorId: selectedDoctor.id,
      specialty: selectedDoctor.specialty,
      ...instantForm,
      date: new Date().toLocaleDateString(),
      time: 'Now',
      type: 'instant'
    };
    
    addAppointment(appointment);
    setShowInstantForm(false);
    setInstantForm({ name: '', phone: '' });
  };

  const handleCancelAppointment = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelForm(true);
  };

  const confirmCancelAppointment = () => {
    cancelAppointment(appointmentToCancel.id);
    setShowCancelForm(false);
    setAppointmentToCancel(null);
  };

  const getAvailableTimeSlots = (doctor) => {
    // Filter out already booked time slots
    const bookedSlots = appointments
      .filter(apt => apt.doctorId === doctor.id && apt.date === new Date().toLocaleDateString())
      .map(apt => apt.time);
    
    return doctor.availability.filter(slot => !bookedSlots.includes(slot));
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>Medical Appointments</h1>
        <p>Book appointments with certified doctors for your healthcare needs</p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-section">
        <div className="search-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <i className="fa fa-search"></i>
          </div>
          
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="specialty-filter"
          >
            <option value="">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* My Appointments Section */}
      {user && appointments.length > 0 && (
        <div className="my-appointments">
          <h2>My Appointments</h2>
          <div className="appointment-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-info">
                  <h3>{appointment.doctorName}</h3>
                  <p><i className="fa fa-stethoscope"></i> {appointment.specialty}</p>
                  <p><i className="fa fa-calendar"></i> {appointment.date}</p>
                  <p><i className="fa fa-clock"></i> {appointment.time}</p>
                  <p><i className="fa fa-user"></i> {appointment.patientName}</p>
                  <p><i className="fa fa-phone"></i> {appointment.phone}</p>
                </div>
                <button 
                  onClick={() => handleCancelAppointment(appointment)}
                  className="cancel-btn"
                >
                  Cancel Appointment
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctors Grid */}
      <div className="doctors-section">
        <h2>Available Doctors</h2>
        {filteredDoctors.length === 0 ? (
          <div className="no-doctors">
            <i className="fa fa-search"></i>
            <p>No doctors found matching your criteria.</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-image">
                  <img src={doctor.image} alt={doctor.name} />
                </div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialty">{doctor.specialty}</p>
                  <div className="doctor-details">
                    <p><i className="fa fa-briefcase"></i> {doctor.experience} years experience</p>
                    <p><i className="fa fa-graduation-cap"></i> {doctor.education}</p>
                    <div className="rating">
                      <i className="fa fa-star"></i>
                      <span>{doctor.rating}</span>
                    </div>
                  </div>
                  <div className="doctor-actions">
                    <button 
                      onClick={() => handleBookAppointment(doctor)}
                      className="book-btn"
                    >
                      Book Appointment
                    </button>
                    <button 
                      onClick={() => handleInstantConsultation(doctor)}
                      className="instant-btn"
                    >
                      Instant Consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      <Popup open={showBookingForm} closeOnDocumentClick={false}>
        <div className="booking-modal">
          <div className="modal-header">
            <h3>Book Appointment with {selectedDoctor?.name}</h3>
            <button onClick={() => setShowBookingForm(false)} className="close-btn">
              <i className="fa fa-times"></i>
            </button>
          </div>
          <form onSubmit={handleBookingSubmit}>
            <div className="form-group">
              <label>Patient Name</label>
              <input
                type="text"
                required
                value={bookingForm.patientName}
                onChange={(e) => setBookingForm({...bookingForm, patientName: e.target.value})}
                placeholder="Enter patient name"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                required
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-group">
              <label>Appointment Date</label>
              <input
                type="date"
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label>Available Time Slots</label>
              <select
                required
                value={bookingForm.time}
                onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
              >
                <option value="">Select a time slot</option>
                {selectedDoctor && getAvailableTimeSlots(selectedDoctor).map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button type="submit" className="submit-btn">Book Now</button>
              <button type="button" onClick={() => setShowBookingForm(false)} className="cancel-modal-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Popup>

      {/* Instant Consultation Modal */}
      <Popup open={showInstantForm} closeOnDocumentClick={false}>
        <div className="booking-modal instant-modal">
          <div className="modal-header">
            <h3>Instant Consultation with {selectedDoctor?.name}</h3>
            <button onClick={() => setShowInstantForm(false)} className="close-btn">
              <i className="fa fa-times"></i>
            </button>
          </div>
          <form onSubmit={handleInstantSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                required
                value={instantForm.name}
                onChange={(e) => setInstantForm({...instantForm, name: e.target.value})}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                required
                value={instantForm.phone}
                onChange={(e) => setInstantForm({...instantForm, phone: e.target.value})}
                placeholder="Enter phone number"
              />
            </div>
            <p className="instant-note">
              <i className="fa fa-info-circle"></i>
              This consultation will be scheduled for the next available slot today.
            </p>
            <div className="modal-actions">
              <button type="submit" className="submit-btn">Book Now</button>
              <button type="button" onClick={() => setShowInstantForm(false)} className="cancel-modal-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Popup>

      {/* Cancel Appointment Modal */}
      <Popup open={showCancelForm} closeOnDocumentClick={false}>
        <div className="booking-modal cancel-modal">
          <div className="modal-header">
            <h3>Cancel Appointment</h3>
            <button onClick={() => setShowCancelForm(false)} className="close-btn">
              <i className="fa fa-times"></i>
            </button>
          </div>
          {appointmentToCancel && (
            <div className="cancel-details">
              <p>Are you sure you want to cancel the following appointment?</p>
              <div className="appointment-summary">
                <p><strong>Doctor:</strong> {appointmentToCancel.doctorName}</p>
                <p><strong>Specialty:</strong> {appointmentToCancel.specialty}</p>
                <p><strong>Date:</strong> {appointmentToCancel.date}</p>
                <p><strong>Time:</strong> {appointmentToCancel.time}</p>
                <p><strong>Patient:</strong> {appointmentToCancel.patientName}</p>
              </div>
            </div>
          )}
          <div className="modal-actions">
            <button onClick={confirmCancelAppointment} className="confirm-cancel-btn">
              Cancel Appointment
            </button>
            <button onClick={() => setShowCancelForm(false)} className="keep-btn">
              Keep Appointment
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Appointments;