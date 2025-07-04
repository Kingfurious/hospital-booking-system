import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  background-color: var(--card-background);
  color: var(--text-color);
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-blue);
  color: var(--white);
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  color: var(--primary-blue);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SwitchRoleText = styled.p`
  margin-top: 1.5rem;
  color: var(--text-color);
`;

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'password') {
      login({ role: 'admin', id: 'admin123' });
      toast.success('Logged in as Administrator!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid administrator credentials.');
    }
  };

  return (
    <PageContainer>
      <FormCard>
        <Title>Administrator Login</Title>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit">Login</Button>
        </form>
        <StyledLink to="/forgot-password">Forgot Password?</StyledLink>
        <StyledLink to="/register/admin">Don't have an account? Register here</StyledLink>
        <SwitchRoleText>
          Are you a patient? <StyledLink to="/login/patient">Login as Patient</StyledLink>
        </SwitchRoleText>
      </FormCard>
    </PageContainer>
  );
};

export default AdminLoginPage;