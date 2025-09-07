import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ApplyForm from './components/ApplyForm';
import DisplayBikes from './components/DisplayBikes';
import Login from './components/Login';
import AdminRoute from './components/AdminDashboard/AdminRoute';
import DriverRoute from './components/DriverRoute';
import ContactUs from './components/ContactUs';
import Services from './components/Services';
import Footer from './components/Footer';
import DriverDashboard from './components/DriverDashboard/DriverDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminDrivers from './components/AdminDashboard/AdminDrivers';
import AdminContactMessages from './components/AdminDashboard/AdminContactMessages';
import AdminBikeDetails from './components/AdminDashboard/AdminBikeDetails';
import AboutUs from './components/QuikLinks/AboutUs';
import Careers from './components/QuikLinks/Careers';
import PrivacyPolicy from './components/QuikLinks/PrivacyPolicy';
import TermsOfService from './components/QuikLinks/TermsOfService';
import { AuthProvider } from './services/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/driver/dashboard" element={
            <DriverRoute>
              <DriverDashboard />
            </DriverRoute>
          } />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }>
            <Route path="drivers" element={<AdminDrivers />} />
            <Route path="bikes" element={<AdminBikeDetails />} />
            <Route path="messages" element={<AdminContactMessages />} />
            <Route path="" element={<AdminDrivers />} />
          </Route>
          
          <Route path="*" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow w-full bg-white">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/apply" element={<ApplyForm />} />
                  <Route path="/bikedetails" element={<DisplayBikes />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
