import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('stayhealthy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('stayhealthy_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stayhealthy_user');
    setAppointments([]);
    setNotifications([]);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('stayhealthy_user', JSON.stringify(updatedUser));
  };

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'booked'
    };
    setAppointments(prev => [...prev, newAppointment]);
    
    // Add notification
    const notification = {
      id: Date.now(),
      type: 'success',
      message: `Appointment booked successfully with ${appointment.doctorName} on ${appointment.date} at ${appointment.time}`,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
  };

  const cancelAppointment = (appointmentId) => {
    const appointment = appointments.find(a => a.id === appointmentId);
    setAppointments(prev => prev.filter(a => a.id !== appointmentId));
    
    // Add notification
    const notification = {
      id: Date.now(),
      type: 'info',
      message: `Appointment with ${appointment.doctorName} cancelled`,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
  };

  const addReview = (review) => {
    const reviewData = {
      ...review,
      id: Date.now(),
      patientName: user.name,
      patientEmail: user.email,
      createdAt: new Date().toISOString()
    };
    
    // This would normally be stored in a database
    console.log('Review added:', reviewData);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isLoading,
    appointments,
    addAppointment,
    cancelAppointment,
    notifications,
    clearNotifications,
    addReview,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};