import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => (props.primary ? 'var(--primary-blue)' : 'var(--secondary-gray)')};
  color: ${(props) => (props.primary ? 'var(--white)' : 'var(--text-color)')};
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  border: ${(props) => (props.primary ? 'none' : '1px solid var(--border-color)')};

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#e0e0e0')};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default Button;