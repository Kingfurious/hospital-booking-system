import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  text-align: center;
  padding: 20px;
`;

const ErrorCode = styled.h1`
  font-size: 6em;
  margin-bottom: 0.2em;
  color: var(--primary-color);
`;

const ErrorMessage = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
`;

const ErrorDescription = styled.p`
  font-size: 1.2em;
  margin-bottom: 2em;
  max-width: 600px;
`;

const HomeLink = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-dark-color);
  }
`;

const ErrorPage = ({ code = 404, message = 'Page Not Found', description = 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.' }) => {
  return (
    <ErrorContainer>
      <ErrorCode>{code}</ErrorCode>
      <ErrorMessage>{message}</ErrorMessage>
      <ErrorDescription>{description}</ErrorDescription>
      <HomeLink to="/">Go to Homepage</HomeLink>
    </ErrorContainer>
  );
};

export default ErrorPage;