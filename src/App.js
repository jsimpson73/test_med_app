import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Notification from './Components/Notification/Notification';
import Navbar from './Components/Navbar/Navbar';  
import LandingPage from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import SignUp from './Components/Sign_up/Sign_up';
import Appointments from './Components/Appointments/Appointments';
import HealthTips from './Components/HealthTips/HealthTips';
import SelfCheckup from './Components/SelfCheckup/SelfCheckup';
import Reviews from './Components/Reviews/Reviews';
import Profile from './Components/Profile/Profile';
import Reports from './Components/Reports/Reports';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Notification>
          <Navbar />
    
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/self-checkup" element={<SelfCheckup />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            <Route path="/review-form" element={<ReviewForm />} />
            <Route path="/profile-card" element={<ProfileCard />} />
            <Route path="/reports-layout" element={<ReportsLayout />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;