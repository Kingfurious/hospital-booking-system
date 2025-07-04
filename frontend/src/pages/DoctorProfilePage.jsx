import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import mockData from '../data/mockData';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaUserMd, FaBriefcaseMedical, FaClock, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfileContainer = styled.div`
  padding: 2rem;
`;

const DoctorHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
  background-color: var(--card-background);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
  }
`;

const DoctorAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--primary-blue);
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  @media (min-width: 768px) {
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const DoctorInfo = styled.div`
  flex-grow: 1;
`;

const DoctorName = styled.h1`
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

const DoctorDetail = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BookingSection = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CalendarContainer = styled(Card)`
  flex: 1;
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
`;

const TimeslotContainer = styled(Card)`
  flex: 1;
`;

const TimeslotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
`;

const TimeslotButton = styled(Button)`
  background-color: ${(props) =>
    props.available ? 'var(--green-success)' : 'var(--red-error)'};
  color: var(--white);
  padding: 0.75rem 0.5rem;
  font-size: 0.9rem;
  opacity: ${(props) => (props.available ? 1 : 0.7)};
  cursor: ${(props) => (props.available ? 'pointer' : 'not-allowed')};

  &:hover {
    background-color: ${(props) => (props.available ? '#218838' : 'var(--red-error)')};
  }
`;

const Message = styled.p`
  text-align: center;
  color: var(--text-color);
  margin-top: 1rem;
`;

const ConfirmationContent = styled.div`
  text-align: center;
  h3 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 0.75rem;
    color: var(--text-color);
  }
  strong {
    color: var(--primary-blue);
  }
`;

const DoctorProfilePage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      let foundDoctor = null;
      let foundHospital = null;
      for (const h of mockData) {
        const d = h.doctors.find((doc) => doc.id === parseInt(doctorId));
        if (d) {
          foundDoctor = d;
          foundHospital = h;
          break;
        }
      }
      setDoctor(foundDoctor);
      setHospital(foundHospital);
      setLoading(false);
    }, 500);
  }, [doctorId]);

  const getAvailableSlots = (date) => {
    if (!doctor) return [];

    const dateString = date.toISOString().split('T')[0];
    const availabilityForDate = doctor.availability.find(
      (item) => item.date === dateString
    );

    if (availabilityForDate && availabilityForDate.status === 'on_leave') {
      return { status: 'on_leave', slots: [] };
    }

    const workingHours = doctor.workingHours.match(/(\d{1,2}:\d{2} (?:AM|PM)) - (\d{1,2}:\d{2} (?:AM|PM))/);
    if (!workingHours) return { status: 'unavailable', slots: [] };

    const [_, startTimeStr, endTimeStr] = workingHours;
    const startHour = new Date(`2000/01/01 ${startTimeStr}`).getHours();
    const endHour = new Date(`2000/01/01 ${endTimeStr}`).getHours();

    const allPossibleSlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
        const formattedSlot = slotTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        allPossibleSlots.push(formattedSlot);
      }
    }

    const bookedSlots = availabilityForDate ? availabilityForDate.slots : [];
    const availableSlots = allPossibleSlots.map(slot => ({
      time: slot,
      available: !bookedSlots.includes(slot)
    }));

    return { status: 'available', slots: availableSlots };
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsModalOpen(true);
      // In a real app, you'd send this to backend
      console.log(`Booking for ${doctor.name} on ${selectedDate.toDateString()} at ${selectedTime}`);
    } else {
      toast.error('Please select a date and time slot.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    toast.success('Appointment booked successfully!');
    // Optionally navigate to appointments page
    // navigate('/patient/appointments');
  };

  const doctorAvailability = getAvailableSlots(selectedDate);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!doctor || !hospital) {
    return (
      <Layout>
        <ProfileContainer>
          <p style={{ textAlign: 'center', color: 'var(--red-error)' }}>Doctor not found.</p>
        </ProfileContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProfileContainer>
        <DoctorHeader>
          <DoctorAvatar><FaUserMd /></DoctorAvatar>
          <DoctorInfo>
            <DoctorName>Dr. {doctor.name}</DoctorName>
            <DoctorDetail><FaBriefcaseMedical /> {doctor.specialization}</DoctorDetail>
            <DoctorDetail>{doctor.experience} Years Experience</DoctorDetail>
            <DoctorDetail><FaClock /> Working Hours: {doctor.workingHours}</DoctorDetail>
            <DoctorDetail><FaCalendarAlt /> Hospital: {hospital.name}</DoctorDetail>
          </DoctorInfo>
        </DoctorHeader>

        <BookingSection>
          <CalendarContainer>
            <h3>Select Date</h3>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()} // Cannot select past dates
            />
          </CalendarContainer>

          <TimeslotContainer>
            <h3>Select Timeslot</h3>
            {doctorAvailability.status === 'on_leave' ? (
              <Message>Dr. {doctor.name} is on leave on {selectedDate.toDateString()}. Please select another day.</Message>
            ) : doctorAvailability.slots.length === 0 ? (
              <Message>No timeslots available for this date. Please select another day.</Message>
            ) : (
              <TimeslotGrid>
                {doctorAvailability.slots.map((slot, index) => (
                  <TimeslotButton
                    key={index}
                    available={slot.available}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    primary={selectedTime === slot.time}
                  >
                    {slot.time} {slot.available ? <FaCheckCircle /> : <FaTimesCircle />}
                  </TimeslotButton>
                ))}
              </TimeslotGrid>
            )}
            {selectedTime && (
              <Message>You selected: <strong>{selectedTime}</strong> on <strong>{selectedDate.toDateString()}</strong></Message>
            )}
            <Button primary onClick={handleBooking} disabled={!selectedTime} style={{ marginTop: '1.5rem', width: '100%' }}>
              Confirm Booking
            </Button>
          </TimeslotContainer>
        </BookingSection>
      </ProfileContainer>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ConfirmationContent>
          <h3>Appointment Confirmed!</h3>
          <p>Your appointment with <strong>Dr. {doctor.name}</strong> at <strong>{hospital.name}</strong> has been successfully booked.</p>
          <p>Date: <strong>{selectedDate.toDateString()}</strong></p>
          <p>Time: <strong>{selectedTime}</strong></p>
          <Button primary onClick={closeModal}>Got It!</Button>
        </ConfirmationContent>
      </Modal>
    </Layout>
  );
};

export default DoctorProfilePage;