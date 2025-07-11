import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../App';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
`;

const FormCard = styled.div`
  background-color: var(--card-background);
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--input-background);
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--input-background);
  color: var(--text-color);
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const StyledLink = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SwitchRoleText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: var(--text-color);
  font-size: 0.875rem;
`;

const DoctorRegistrationPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const specializations = [
    'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology',
    'Oncology', 'Radiology', 'General Surgery', 'Internal Medicine', 'Ophthalmology'
  ];

  const hospitals = [
    'City General Hospital', 'St. Jude Medical Center', 'Community Health Clinic',
    'University Hospital', 'Green Valley Hospital'
  ];

  const validateForm = () => {
    if (!fullName || !email || !password || !confirmPassword ||
        !specialization || !yearsOfExperience || !hospitalName) {
      setError('All fields are required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (Number(yearsOfExperience) < 0) {
      setError('Years of experience cannot be negative.');
      return false;
    }
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email address is invalid.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Mock registration logic
    setTimeout(() => {
      toast.success('Doctor Registration Successful!');
      navigate('/doctor/login');
      setLoading(false);
    }, 1000);
  };

  return (
    <PageContainer>
      <FormCard>
        <Title>Doctor Registration</Title>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="specialization">Specialization</Label>
            <Select
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            <Input
              type="number"
              id="yearsOfExperience"
              placeholder="Enter years of experience"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="hospitalName">Hospital Name</Label>
            <Select
              id="hospitalName"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital} value={hospital}>{hospital}</option>
              ))}
            </Select>
          </FormGroup>
          {error && <ErrorText>{error}</ErrorText>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <StyledLink to="/doctor/login">Already have an account? Login here</StyledLink>
        <SwitchRoleText>
          Are you a patient? <StyledLink to="/login/patient">Login as Patient</StyledLink>
        </SwitchRoleText>
        <SwitchRoleText>
          Are you an administrator? <StyledLink to="/login/admin">Login as Admin</StyledLink>
        </SwitchRoleText>
      </FormCard>
    </PageContainer>
  );
};

export default DoctorRegistrationPage;