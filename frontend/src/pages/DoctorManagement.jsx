import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockData } from '../data/mockData';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';

const ManagementContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-blue);
  margin-bottom: 2rem;
  text-align: center;
`;

const FormCard = styled.div`
  background-color: var(--card-background);
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  background-color: var(--card-background);
  color: var(--text-color);
`;

const AvailabilitySection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
`;

const CalendarContainer = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
    font-family: 'Roboto', sans-serif;
    background-color: var(--card-background);
    color: var(--text-color);
  }
  .react-calendar__navigation button {
    color: var(--primary-blue);
  }
  .react-calendar__month-view__days__day--weekend {
    color: var(--red-error);
  }
  .react-calendar__tile--active {
    background-color: var(--primary-blue) !important;
    color: var(--white) !important;
  }
  .react-calendar__tile--now {
    background-color: var(--secondary-gray) !important;
  }
  .react-calendar__tile--hasActive {
    background-color: var(--primary-blue);
    color: var(--white);
  }
`;

const TimeslotInputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
`;

const TimeslotList = styled.ul`
  list-style: none;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TimeslotItem = styled.li`
  background-color: var(--primary-blue);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const RemoveTimeslotButton = styled.button`
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    color: var(--red-error);
  }
`;

const StatusToggle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const StatusButton = styled(Button)`
  background-color: ${(props) => (props.active ? 'var(--green-success)' : 'var(--secondary-gray)')};
  color: ${(props) => (props.active ? 'var(--white)' : 'var(--text-color)')};
  &:hover {
    background-color: ${(props) => (props.active ? '#218838' : '#e0e0e0')};
  }
`;

const DoctorManagement = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get('doctorId');

  const [doctorDetails, setDoctorDetails] = useState({
    id: null,
    name: '',
    specialization: '',
    experience: '',
    workingHours: '',
    availability: [],
  });
  const [loading, setLoading] = useState(true);
  const [isNewDoctor, setIsNewDoctor] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTimeslot, setNewTimeslot] = useState('');
  const [currentDayAvailabilityStatus, setCurrentDayAvailabilityStatus] = useState('available'); // 'available' or 'on_leave'

  useEffect(() => {
    // Simulate fetching existing doctor data
    setTimeout(() => {
      if (doctorId) {
        let foundDoctor = null;
        for (const h of mockData) {
          const d = h.doctors.find((doc) => doc.id === parseInt(doctorId));
          if (d) {
            foundDoctor = d;
            break;
          }
        }
        if (foundDoctor) {
          setDoctorDetails(foundDoctor);
          setIsNewDoctor(false);
          // Set initial availability status for the current date
          const dateString = selectedDate.toISOString().split('T')[0];
          const availabilityForDate = foundDoctor.availability.find(item => item.date === dateString);
          if (availabilityForDate) {
            setCurrentDayAvailabilityStatus(availabilityForDate.status);
          } else {
            setCurrentDayAvailabilityStatus('available');
          }
        }
      }
      setLoading(false);
    }, 500);
  }, [doctorId, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Update availability status when date changes
    const dateString = date.toISOString().split('T')[0];
    const availabilityForDate = doctorDetails.availability.find(item => item.date === dateString);
    if (availabilityForDate) {
      setCurrentDayAvailabilityStatus(availabilityForDate.status);
    } else {
      setCurrentDayAvailabilityStatus('available');
    }
  };

  const handleAddTimeslot = () => {
    if (newTimeslot.trim() === '') {
      toast.error('Timeslot cannot be empty.');
      return;
    }
    const dateString = selectedDate.toISOString().split('T')[0];
    setDoctorDetails((prev) => {
      const existingAvailabilityIndex = prev.availability.findIndex(
        (item) => item.date === dateString
      );

      if (existingAvailabilityIndex > -1) {
        const updatedAvailability = [...prev.availability];
        const currentSlots = updatedAvailability[existingAvailabilityIndex].slots || [];
        if (!currentSlots.includes(newTimeslot)) {
          updatedAvailability[existingAvailabilityIndex] = {
            ...updatedAvailability[existingAvailabilityIndex],
            slots: [...currentSlots, newTimeslot].sort(),
            status: 'available' // Ensure status is available if slots are added
          };
        }
        return { ...prev, availability: updatedAvailability };
      } else {
        return {
          ...prev,
          availability: [
            ...prev.availability,
            { date: dateString, slots: [newTimeslot], status: 'available' },
          ],
        };
      }
    });
    setNewTimeslot('');
    toast.success('Timeslot added!');
  };

  const handleRemoveTimeslot = (timeToRemove) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    setDoctorDetails((prev) => {
      const existingAvailabilityIndex = prev.availability.findIndex(
        (item) => item.date === dateString
      );

      if (existingAvailabilityIndex > -1) {
        const updatedAvailability = [...prev.availability];
        updatedAvailability[existingAvailabilityIndex] = {
          ...updatedAvailability[existingAvailabilityIndex],
          slots: updatedAvailability[existingAvailabilityIndex].slots.filter(
            (slot) => slot !== timeToRemove
          ),
        };
        // If no slots left, consider setting status to unavailable or on_leave if explicitly set
        if (updatedAvailability[existingAvailabilityIndex].slots.length === 0 && updatedAvailability[existingAvailabilityIndex].status === 'available') {
            updatedAvailability[existingAvailabilityIndex].status = 'unavailable';
        }
        return { ...prev, availability: updatedAvailability };
      }
      return prev;
    });
    toast.info('Timeslot removed.');
  };

  const handleAvailabilityStatusChange = (status) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    setCurrentDayAvailabilityStatus(status);
    setDoctorDetails((prev) => {
      const existingAvailabilityIndex = prev.availability.findIndex(
        (item) => item.date === dateString
      );

      if (existingAvailabilityIndex > -1) {
        const updatedAvailability = [...prev.availability];
        updatedAvailability[existingAvailabilityIndex] = {
          ...updatedAvailability[existingAvailabilityIndex],
          status: status,
          slots: status === 'on_leave' ? [] : updatedAvailability[existingAvailabilityIndex].slots // Clear slots if on leave
        };
        return { ...prev, availability: updatedAvailability };
      } else {
        return {
          ...prev,
          availability: [
            ...prev.availability,
            { date: dateString, slots: status === 'on_leave' ? [] : [], status: status },
          ],
        };
      }
    });
    toast.info(`Availability for ${selectedDate.toDateString()} set to ${status.replace('_', ' ')}.`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log('Saving doctor details:', doctorDetails);
    toast.success(`Doctor ${isNewDoctor ? 'added' : 'updated'} successfully!`);
  };

  const currentDaySlots = doctorDetails.availability.find(
    (item) => item.date === selectedDate.toISOString().split('T')[0]
  )?.slots || [];

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <ManagementContainer>
        <Title>{isNewDoctor ? 'Add New Doctor' : 'Edit Doctor Profile'}</Title>
        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Doctor Name"
              type="text"
              id="name"
              name="name"
              value={doctorDetails.name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Specialization"
              type="text"
              id="specialization"
              name="specialization"
              value={doctorDetails.specialization}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Years of Experience"
              type="number"
              id="experience"
              name="experience"
              value={doctorDetails.experience}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Working Hours (e.g., 9:00 AM - 5:00 PM)"
              type="text"
              id="workingHours"
              name="workingHours"
              value={doctorDetails.workingHours}
              onChange={handleChange}
              required
            />

            <AvailabilitySection>
              <h3>Set Doctor Availability</h3>
              <CalendarContainer>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                />
              </CalendarContainer>

              <StatusToggle>
                <Label>Availability Status for {selectedDate.toDateString()}:</Label>
                <StatusButton
                  type="button"
                  active={currentDayAvailabilityStatus === 'available'}
                  onClick={() => handleAvailabilityStatusChange('available')}
                >
                  Available
                </StatusButton>
                <StatusButton
                  type="button"
                  active={currentDayAvailabilityStatus === 'on_leave'}
                  onClick={() => handleAvailabilityStatusChange('on_leave')}
                >
                  On Leave
                </StatusButton>
              </StatusToggle>

              {currentDayAvailabilityStatus === 'available' && (
                <>
                  <TimeslotInputGroup>
                    <FormInput
                      type="text"
                      id="newTimeslot"
                      placeholder="Add new timeslot (e.g., 10:00 AM)"
                      value={newTimeslot}
                      onChange={(e) => setNewTimeslot(e.target.value)}
                    />
                    <Button type="button" primary onClick={handleAddTimeslot}>
                      <FaPlusCircle /> Add
                    </Button>
                  </TimeslotInputGroup>
                  {currentDaySlots.length > 0 && (
                    <TimeslotList>
                      {currentDaySlots.map((slot, index) => (
                        <TimeslotItem key={index}>
                          {slot}
                          <RemoveTimeslotButton type="button" onClick={() => handleRemoveTimeslot(slot)}>
                            <FaTimesCircle />
                          </RemoveTimeslotButton>
                        </TimeslotItem>
                      ))}
                    </TimeslotList>
                  )}
                </>
              )}
            </AvailabilitySection>

            <Button primary type="submit" style={{ width: '100%', marginTop: '2rem' }}>
              {isNewDoctor ? 'Add Doctor' : 'Update Doctor'}
            </Button>
          </form>
        </FormCard>
      </ManagementContainer>
    </Layout>
  );
};

export default DoctorManagement;