import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaCalendarCheck, FaHospital, FaUserMd, FaClock, FaTimesCircle, FaRedoAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AppointmentsContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-blue);
  margin-bottom: 2rem;
  text-align: center;
`;

const AppointmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const AppointmentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const AppointmentDetail = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusBadge = styled.span`
  background-color: ${(props) =>
    props.status === 'Confirmed' ? 'var(--green-success)' :
    props.status === 'Cancelled' ? 'var(--red-error)' :
    'var(--primary-blue)'};
  color: var(--white);
  padding: 0.3rem 0.7rem;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: bold;
  margin-top: 1rem;
  align-self: flex-start;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PatientAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching appointments
    setTimeout(() => {
      const mockAppointments = [
        {
          id: 1,
          doctorName: 'Dr. John Smith',
          hospitalName: 'City General Hospital',
          date: '2025-07-10',
          time: '10:00 AM',
          status: 'Confirmed',
        },
        {
          id: 2,
          doctorName: 'Dr. Emily White',
          hospitalName: 'City General Hospital',
          date: '2025-07-08',
          time: '02:00 PM',
          status: 'Confirmed',
        },
        {
          id: 3,
          doctorName: 'Dr. Robert Green',
          hospitalName: 'Community Health Center',
          date: '2025-07-01',
          time: '09:00 AM',
          status: 'Completed',
        },
        {
          id: 4,
          doctorName: 'Dr. John Smith',
          hospitalName: 'City General Hospital',
          date: '2025-06-25',
          time: '11:00 AM',
          status: 'Cancelled',
        },
      ];
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancel = (id) => {
    // Simulate cancellation
    toast.info(`Appointment ${id} cancelled (UI only).`);
    setAppointments(appointments.map(app =>
      app.id === id ? { ...app, status: 'Cancelled' } : app
    ));
  };

  const handleReschedule = (id) => {
    // Simulate reschedule - in a real app, this would navigate to booking page with pre-filled data
    toast.info(`Appointment ${id} reschedule initiated (UI only).`);
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <AppointmentsContainer>
        <Title>My Appointments</Title>
        {appointments.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>You have no appointments yet.</p>
        ) : (
          <AppointmentGrid>
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id}>
                <AppointmentDetail><FaUserMd /> <strong>Dr. {appointment.doctorName}</strong></AppointmentDetail>
                <AppointmentDetail><FaHospital /> {appointment.hospitalName}</AppointmentDetail>
                <AppointmentDetail><FaCalendarCheck /> Date: {appointment.date}</AppointmentDetail>
                <AppointmentDetail><FaClock /> Time: {appointment.time}</AppointmentDetail>
                <StatusBadge status={appointment.status}>{appointment.status}</StatusBadge>
                {appointment.status === 'Confirmed' && (
                  <ButtonGroup>
                    <Button onClick={() => handleCancel(appointment.id)}><FaTimesCircle /> Cancel</Button>
                    <Button primary onClick={() => handleReschedule(appointment.id)}><FaRedoAlt /> Reschedule</Button>
                  </ButtonGroup>
                )}
              </AppointmentCard>
            ))}
          </AppointmentGrid>
        )}
      </AppointmentsContainer>
    </Layout>
  );
};

export default PatientAppointmentsPage;