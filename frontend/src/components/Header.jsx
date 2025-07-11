import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, ThemeContext } from '../App';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const HeaderContainer = styled.header`
  background-color: var(--card-background);
  color: var(--text-color);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--primary-blue);
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--primary-blue);
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--primary-blue);
  }
`;

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully!');
    // Redirect based on user role or to a generic login page
    if (user.role === 'doctor') {
      navigate('/doctor/login');
    } else if (user.role === 'patient') {
      navigate('/login/patient');
    } else if (user.role === 'admin') {
      navigate('/login/admin');
    } else {
      navigate('/'); // Fallback
    }
  };

  return (
    <HeaderContainer>
      <Logo to={user ? (user.role === 'patient' ? '/patient/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/doctor/dashboard') : '/'}>
        Hospital Booking
      </Logo>
      <NavLinks>
        {user && user.role === 'patient' && (
          <>
            <NavLink to="/patient/dashboard">Hospitals</NavLink>
            <NavLink to="/patient/appointments">My Appointments</NavLink>
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
            <NavLink to="/admin/hospital-profile">Hospital Profile</NavLink>
            <NavLink to="/admin/doctor-management">Doctor Management</NavLink>
          </>
        )}
        {user && user.role === 'doctor' && (
          <>
            <NavLink to="/doctor/dashboard">Dashboard</NavLink>
            <NavLink to="/doctor/appointments">Appointments</NavLink>
            <NavLink to="/doctor/profile">Profile</NavLink>
            {/* Dummy notifications badge */}
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">2</span>
              <NavLink to="/doctor/notifications">🔔</NavLink>
            </div>
            <span className="text-gray-600 text-sm">Dr. {user.fullName ? user.fullName.split(' ')[1] : 'Doctor'}</span>
          </>
        )}
        <IconButton onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </IconButton>
        {user && (
          <IconButton onClick={handleLogout}>
            <FaSignOutAlt />
          </IconButton>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;