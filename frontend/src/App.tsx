import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { clearError } from './store/slices/authSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AwarenessPage from './pages/AwarenessPage';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientSoundUpload from './pages/PatientSoundUpload';
import SoundAnalysisResult from './pages/SoundAnalysisResult';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/awareness" element={<AwarenessPage />} />
            <Route path="/sound-upload" element={<PatientSoundUpload />} />
            <Route
              path="/analysis-result"
              element={
                <SoundAnalysisResult
                  recordingDate="2024-03-20"
                  result={{
                    condition: 'Mild Asthma',
                    confidence: 92,
                    severity: 'mild',
                    recommendations: [
                      'Schedule a follow-up with your healthcare provider',
                      'Continue using prescribed inhaler as directed',
                      'Monitor symptoms and keep a diary',
                      'Avoid known triggers',
                    ],
                  }}
                />
              }
            />
            {/* No props needed here */}
            <Route path="/doctor/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
