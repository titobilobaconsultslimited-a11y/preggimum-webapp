import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EmergencyBanner from './components/EmergencyBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import EmergencyModal from './components/EmergencyModal';

// Pages
import Home from './pages/Home';
import CarePathways from './pages/CarePathways';
import Doctors from './pages/Doctors';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AppointmentsPage from './pages/AppointmentsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

import useScrollAnimation from './hooks/useScrollAnimation';
import { api } from './services/api';

function App() {
  useScrollAnimation();
  const navigate = useNavigate();

  // Modals & User State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedClinician, setSelectedClinician] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => api.getUser());
  const [appointmentCount, setAppointmentCount] = useState(0);

  // Load patient appointments count on mount
  useEffect(() => {
    async function checkAppointments() {
      try {
        const apts = await api.getAppointments();
        setAppointmentCount(apts.length);
      } catch (e) {
        console.warn(e);
      }
    }
    checkAppointments();
  }, [currentUser]);

  const handleOpenBooking = (service = null, clinician = null) => {
    setSelectedService(service);
    setSelectedClinician(clinician);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedService(null);
    setSelectedClinician(null);
  };

  const handleBookingSuccess = (newApt) => {
    setAppointmentCount((prev) => prev + 1);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      {/* Top Clinical Safety / Emergency Banner */}
      <EmergencyBanner onOpenEmergencyGuide={() => setEmergencyOpen(true)} />

      {/* Main Responsive Sticky Navbar */}
      <Navbar 
        onOpenBooking={() => handleOpenBooking()}
        onOpenAuth={() => setAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        appointmentCount={appointmentCount}
      />

      {/* Main View Router */}
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home onOpenBooking={handleOpenBooking} onOpenEmergencyGuide={() => setEmergencyOpen(true)} />} />
          <Route path="/pathways" element={<CarePathways onOpenBooking={handleOpenBooking} />} />
          <Route path="/doctors" element={<Doctors onOpenBooking={handleOpenBooking} />} />
          <Route path="/blog" element={<Blog onOpenEmergencyGuide={() => setEmergencyOpen(true)} />} />
          <Route path="/contact" element={<Contact onOpenEmergencyGuide={() => setEmergencyOpen(true)} />} />
          <Route path="/appointments" element={<AppointmentsPage onOpenBooking={handleOpenBooking} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>

      {/* Comprehensive Healthcare Footer */}
      <Footer onOpenEmergencyGuide={() => setEmergencyOpen(true)} />

      {/* Interactive Multi-step Consultation Booking Modal */}
      <BookingModal 
        isOpen={bookingOpen} 
        onClose={handleCloseBooking}
        preselectedService={selectedService}
        preselectedClinician={selectedClinician}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Patient Authentication Modal (Login & Register) */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Emergency Danger Signs Guide Modal */}
      <EmergencyModal 
        isOpen={emergencyOpen} 
        onClose={() => setEmergencyOpen(false)}
      />
    </div>
  );
}

export default App;
