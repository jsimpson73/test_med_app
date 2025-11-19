import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
  }, []);

  // Listen for appointment cancellation
  useEffect(() => {
    const handleStorageChange = () => {
      const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));
      
      if (!storedAppointmentData) {
        setShowNotification(false);
        setAppointmentData(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <div>
      {children}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="appointment-notification">
          <div className="notification-content">
            <button className="close-btn" onClick={handleClose}>×</button>
            <h3 className="notification-title">Appointment Confirmed</h3>
            <div className="notification-details">
              <p><strong>Patient:</strong> {username}</p>
              <p><strong>Doctor:</strong> {doctorData?.name}</p>
              <p><strong>Speciality:</strong> {doctorData?.speciality}</p>
              <p><strong>Date:</strong> {appointmentData?.date}</p>
              <p><strong>Time:</strong> {appointmentData?.time}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;