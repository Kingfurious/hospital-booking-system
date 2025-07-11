import styled from 'styled-components';
import Button from '../Button';

const StyledRescheduleButton = styled(Button)`
  background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    background: linear-gradient(135deg, #3a5fc8 0%, #7b46d1 100%);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #a0a0a0 0%, #c0c0c0 100%);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  
  svg {
    font-size: 1rem;
  }
`;

export default StyledRescheduleButton;