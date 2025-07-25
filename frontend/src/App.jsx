import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

// Pages
import PatientLoginPage from './pages/PatientLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import PatientRegistrationPage from './pages/PatientRegistrationPage';
import AdminRegistrationPage from './pages/AdminRegistrationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PatientDashboard from './pages/PatientDashboard';
import HospitalDetailsPage from './pages/HospitalDetailsPage';
import PatientAppointmentsPage from './pages/PatientAppointmentsPage';
import AdminDashboard from './pages/AdminDashboard';
import HospitalProfileManagement from './pages/HospitalProfileManagement';
import DoctorManagement from './pages/DoctorManagement';
import DoctorLoginPage from './pages/DoctorLoginPage';
import DoctorRegistrationPage from './pages/DoctorRegistrationPage';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorProfilePage from './pages/DoctorProfilePage';
import DoctorAvailabilityPage from './pages/DoctorAvailabilityPage';
import DoctorAppointmentsPage from './pages/DoctorAppointmentsPage';
import DoctorNotificationsPage from './pages/DoctorNotificationsPage';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';

// Contexts
const AuthContext = createContext(null);
const ThemeContext = createContext(null);

// Auth Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: 'patient' | 'admin', id: '...' }

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Theme Provider
const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={{}}> {/* styled-components ThemeProvider */}
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Simulate loading

  useEffect(() => {
    // Simulate async auth check
    const checkAuth = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust loading time as needed
    return () => clearTimeout(checkAuth);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login/patient" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/error" replace state={{ code: 403, message: 'Access Denied', description: 'You do not have permission to view this page.' }} />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProviderWrapper>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            {/* Root Route - Redirect to Patient Login */}
            <Route path="/" element={<Navigate to="/login/patient" replace />} />
            
            {/* Authentication Routes */}
            <Route path="/login/patient" element={<PatientLoginPage />} />
            <Route path="/login/admin" element={<AdminLoginPage />} />
            <Route path="/register/patient" element={<PatientRegistrationPage />} />
            <Route path="/register/admin" element={<AdminRegistrationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
            <Route path="/patient/hospitals/:hospitalId" element={<ProtectedRoute allowedRoles={['patient']}><HospitalDetailsPage /></ProtectedRoute>} />
            <Route path="/patient/doctors/:doctorId" element={<ProtectedRoute allowedRoles={['patient']}><DoctorProfilePage /></ProtectedRoute>} />
            <Route path="/patient/appointments" element={<ProtectedRoute allowedRoles={['patient']}><PatientAppointmentsPage /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/hospital-profile" element={<ProtectedRoute allowedRoles={['admin']}><HospitalProfileManagement /></ProtectedRoute>} />
            <Route path="/admin/doctor-management" element={<ProtectedRoute allowedRoles={['admin']}><DoctorManagement /></ProtectedRoute>} />

            {/* Doctor Routes */}
            <Route path="/doctor/login" element={<DoctorLoginPage />} />
            <Route path="/doctor/register" element={<DoctorRegistrationPage />} />
            <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/doctor/profile" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorProfilePage /></ProtectedRoute>} />
            <Route path="/doctor/availability" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorAvailabilityPage /></ProtectedRoute>} />
            <Route path="/doctor/appointments" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorAppointmentsPage /></ProtectedRoute>} />
            <Route path="/doctor/notifications" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorNotificationsPage /></ProtectedRoute>} />

            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ThemeProviderWrapper>
      </AuthProvider>
    </Router>
  );
}

export { AuthContext, ThemeContext };
export default App;
