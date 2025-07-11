import React from 'react';
import styled from 'styled-components';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: var(--shadow);
  text-align: center;
  color: var(--text-color);
  margin: 20px 0;
`;

const EmptyStateIcon = styled.div`
  font-size: 3em;
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const EmptyStateMessage = styled.p`
  font-size: 1em;
  color: var(--text-light);
  max-width: 400px;
`;

const EmptyState = ({ icon = '💡', title = 'No Data Found', message = 'There is no data to display at the moment. Please check back later or try a different filter.' }) => {
  return (
    <EmptyStateContainer>
      <EmptyStateIcon>{icon}</EmptyStateIcon>
      <EmptyStateTitle>{title}</EmptyStateTitle>
      <EmptyStateMessage>{message}</EmptyStateMessage>
    </EmptyStateContainer>
  );
};

export default EmptyState;