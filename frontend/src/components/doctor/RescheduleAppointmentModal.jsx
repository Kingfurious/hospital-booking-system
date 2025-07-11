import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import Button from '../Button';
import FormInput from '../FormInput';
import { FaCalendarAlt, FaUserAlt, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const PatientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f7fafc;
  border-radius: 8px;
`;

const PatientAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
  font-size: 1.5rem;
`;

const PatientDetails = styled.div`
  flex: 1;
`;

const PatientName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
`;

const AppointmentTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #718096;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const DateTimeInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const CancelButton = styled(Button)`
  background-color: #e2e8f0;
  color: #4a5568;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #cbd5e0;
  }
`;

const ConfirmButton = styled(Button)`
  background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    background: linear-gradient(135deg, #3a5fc8 0%, #7b46d1 100%);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const RescheduleAppointmentModal = ({ isOpen, onClose, appointment, onReschedule }) => {
  const [newDateTime, setNewDateTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (appointment) {
      // Pre-fill with current appointment date/time if available
      const currentApptDate = new Date(appointment.date);
      const formattedDateTime = currentApptDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
      setNewDateTime(formattedDateTime);
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDateTime) {
      setError('Please select a new date and time.');
      return;
    }
    const selectedDate = new Date(newDateTime);
    const now = new Date();

    if (selectedDate <= now) {
      setError('New appointment time must be in the future.');
      return;
    }

    setError('');
    onReschedule(newDateTime);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reschedule Appointment">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          {appointment && (
            <PatientInfo>
              <PatientAvatar>
                <FaUserAlt />
              </PatientAvatar>
              <PatientDetails>
                <PatientName>{appointment.patientName}</PatientName>
                <AppointmentTime>
                  <FaCalendarAlt />
                  <span>Current: {new Date(appointment.date).toLocaleDateString()}</span>
                  <FaClock />
                  <span>{new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </AppointmentTime>
              </PatientDetails>
            </PatientInfo>
          )}
          
          <FormGroup>
            <Label htmlFor="newDateTime">Select New Date and Time</Label>
            <DateTimeInput
              id="newDateTime"
              name="newDateTime"
              type="datetime-local"
              value={newDateTime}
              onChange={(e) => setNewDateTime(e.target.value)}
              required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormGroup>
          
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              <FaTimes /> Cancel
            </CancelButton>
            <ConfirmButton type="submit">
              <FaCheck /> Confirm Reschedule
            </ConfirmButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RescheduleAppointmentModal;