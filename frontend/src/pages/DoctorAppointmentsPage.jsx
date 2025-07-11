import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockAppointments, mockDoctors } from '../data/mockData';
import DoctorAppointmentsTable from '../components/doctor/DoctorAppointmentsTable';
import RescheduleAppointmentModal from '../components/doctor/RescheduleAppointmentModal';
import { FaCalendarCheck, FaCalendarAlt, FaCalendarTimes, FaFilter } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #718096;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.active ? '#4299e1' : 'white'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border: 1px solid ${props => props.active ? '#4299e1' : '#e2e8f0'};
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#3182ce' : '#f7fafc'};
    border-color: ${props => props.active ? '#3182ce' : '#cbd5e0'};
  }
`;

const AppointmentsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledCard = styled(Card)`
  padding: 1.5rem;
  height: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.bgColor || '#ebf8ff'};
  color: ${props => props.iconColor || '#3182ce'};
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: #cbd5e0;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: #718096;
  max-width: 300px;
  margin: 0 auto;
`;

const DoctorAppointmentsPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'upcoming', 'past'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Simulate fetching doctor data and appointments
    setTimeout(() => {
      const currentDoctor = mockDoctors[0]; // Assuming the first doctor in mock data is logged in
      setDoctor(currentDoctor);

      const doctorAppointments = mockAppointments.filter(
        (appt) => appt.doctorId === currentDoctor.id
      );
      setAppointments(doctorAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  const getFilteredAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch(filter) {
      case 'today':
        return appointments.filter((appt) => {
          const apptDate = new Date(appt.date);
          apptDate.setHours(0, 0, 0, 0);
          return apptDate.getTime() === today.getTime();
        });
      case 'upcoming':
        return appointments.filter((appt) => {
          const apptDate = new Date(appt.date);
          return apptDate.getTime() > today.getTime();
        }).sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'past':
        return appointments.filter((appt) => {
          const apptDate = new Date(appt.date);
          return apptDate.getTime() < today.getTime();
        }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first
      default: // 'all'
        return [...appointments].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  };

  const handleRescheduleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleRescheduleSubmit = (newDateTime) => {
    console.log(`Rescheduling appointment ${selectedAppointment.id} to ${newDateTime}`);
    // In a real app, you'd update the backend and then refresh state
    setIsModalOpen(false);
    setSelectedAppointment(null);
    // For mock, just show a success message
    alert(`Appointment for ${selectedAppointment.patientName} rescheduled to ${new Date(newDateTime).toLocaleString()}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  const filteredAppointments = getFilteredAppointments();

  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <Title>Appointments</Title>
          <Subtitle>Manage and view all your patient appointments</Subtitle>
        </PageHeader>
        
        <FilterContainer>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            <FaCalendarAlt /> All Appointments
          </FilterButton>
          <FilterButton 
            active={filter === 'today'} 
            onClick={() => setFilter('today')}
          >
            <FaCalendarCheck /> Today
          </FilterButton>
          <FilterButton 
            active={filter === 'upcoming'} 
            onClick={() => setFilter('upcoming')}
          >
            <FaCalendarAlt /> Upcoming
          </FilterButton>
          <FilterButton 
            active={filter === 'past'} 
            onClick={() => setFilter('past')}
          >
            <FaCalendarTimes /> Past
          </FilterButton>
        </FilterContainer>
        
        {filteredAppointments.length > 0 ? (
          <StyledCard>
            <CardHeader>
              <CardIcon bgColor="#ebf8ff" iconColor="#3182ce">
                <FaCalendarAlt />
              </CardIcon>
              <CardTitle>
                {filter === 'all' ? 'All Appointments' : 
                 filter === 'today' ? 'Today\'s Appointments' : 
                 filter === 'upcoming' ? 'Upcoming Appointments' : 
                 'Past Appointments'}
              </CardTitle>
            </CardHeader>
            <DoctorAppointmentsTable 
              appointments={filteredAppointments} 
              showReschedule={filter !== 'past'}
              onRescheduleClick={handleRescheduleClick}
            />
          </StyledCard>
        ) : (
          <StyledCard>
            <EmptyState>
              <EmptyStateIcon>
                <FaCalendarAlt />
              </EmptyStateIcon>
              <EmptyStateText>
                {filter === 'all' ? 'You have no appointments yet.' : 
                 filter === 'today' ? 'You have no appointments scheduled for today.' : 
                 filter === 'upcoming' ? 'You have no upcoming appointments.' : 
                 'You have no past appointments.'}
              </EmptyStateText>
            </EmptyState>
          </StyledCard>
        )}
        
        {isModalOpen && (
          <RescheduleAppointmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            appointment={selectedAppointment}
            onReschedule={handleRescheduleSubmit}
          />
        )}
      </PageContainer>
    </Layout>
  );
};

export default DoctorAppointmentsPage;