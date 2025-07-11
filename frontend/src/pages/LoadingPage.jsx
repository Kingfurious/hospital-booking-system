import React from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../components/LoadingSpinner';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
`;

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
};

export default LoadingPage;