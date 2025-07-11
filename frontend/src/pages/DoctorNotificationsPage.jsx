import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaBell, FaCalendarAlt, FaUserPlus, FaExclamationTriangle, FaCheck, FaTrash } from 'react-icons/fa';

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

const NotificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationCard = styled.div`
  background-color: ${props => props.read ? '#ffffff' : '#f7fafc'};
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'appointment': return '#4299e1';
      case 'patient': return '#48bb78';
      case 'alert': return '#ed8936';
      default: return '#a0aec0';
    }
  }};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => {
    switch(props.type) {
      case 'appointment': return '#ebf8ff';
      case 'patient': return '#f0fff4';
      case 'alert': return '#fffaf0';
      default: return '#f7fafc';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'appointment': return '#3182ce';
      case 'patient': return '#38a169';
      case 'alert': return '#dd6b20';
      default: return '#718096';
    }
  }};
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

const NotificationMessage = styled.p`
  font-size: 0.95rem;
  color: #4a5568;
  margin: 0 0 0.75rem 0;
  line-height: 1.5;
`;

const NotificationMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationTime = styled.span`
  font-size: 0.85rem;
  color: #718096;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || '#718096'};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #f7fafc;
    color: ${props => {
      switch(props.action) {
        case 'mark': return '#3182ce';
        case 'delete': return '#e53e3e';
        default: return '#4a5568';
      }
    }};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: #cbd5e0;
  margin-bottom: 1.5rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #718096;
  max-width: 400px;
  margin: 0 auto 1rem auto;
`;

const EmptyStateSubtext = styled.p`
  font-size: 1rem;
  color: #a0aec0;
  max-width: 400px;
  margin: 0 auto;
`;

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'appointment',
    title: 'New Appointment Scheduled',
    message: 'John Smith has booked an appointment with you for tomorrow at 10:00 AM.',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    type: 'patient',
    title: 'New Patient Registration',
    message: 'Sarah Johnson has registered as your new patient. You can view their medical history now.',
    time: '1 day ago',
    read: false
  },
  {
    id: 3,
    type: 'appointment',
    title: 'Appointment Rescheduled',
    message: 'Michael Brown has rescheduled their appointment from May 15th to May 18th at 2:30 PM.',
    time: '2 days ago',
    read: true
  },
  {
    id: 4,
    type: 'alert',
    title: 'Appointment Cancellation',
    message: 'Emily Davis has cancelled their appointment scheduled for May 20th at 11:15 AM.',
    time: '3 days ago',
    read: true
  },
  {
    id: 5,
    type: 'appointment',
    title: 'Upcoming Appointment Reminder',
    message: 'You have 3 appointments scheduled for tomorrow. Click to view details.',
    time: '4 days ago',
    read: true
  }
];

const DoctorNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching notifications
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'appointment': return <FaCalendarAlt />;
      case 'patient': return <FaUserPlus />;
      case 'alert': return <FaExclamationTriangle />;
      default: return <FaBell />;
    }
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

  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <Title>Notifications</Title>
          <Subtitle>Stay updated with your appointments and patient activities</Subtitle>
        </PageHeader>
        
        <Card className="p-6">
          {notifications.length > 0 ? (
            <NotificationsContainer>
              {notifications.map(notification => (
                <NotificationCard 
                  key={notification.id} 
                  read={notification.read}
                  type={notification.type}
                >
                  <NotificationIcon type={notification.type}>
                    {getNotificationIcon(notification.type)}
                  </NotificationIcon>
                  
                  <NotificationContent>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationMessage>{notification.message}</NotificationMessage>
                    
                    <NotificationMeta>
                      <NotificationTime>{notification.time}</NotificationTime>
                      
                      <NotificationActions>
                        {!notification.read && (
                          <ActionButton 
                            action="mark" 
                            color="#4299e1"
                            onClick={() => handleMarkAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <FaCheck />
                          </ActionButton>
                        )}
                        <ActionButton 
                          action="delete" 
                          color="#e53e3e"
                          onClick={() => handleDeleteNotification(notification.id)}
                          title="Delete notification"
                        >
                          <FaTrash />
                        </ActionButton>
                      </NotificationActions>
                    </NotificationMeta>
                  </NotificationContent>
                </NotificationCard>
              ))}
            </NotificationsContainer>
          ) : (
            <EmptyState>
              <EmptyStateIcon>
                <FaBell />
              </EmptyStateIcon>
              <EmptyStateText>
                You don't have any notifications at the moment
              </EmptyStateText>
              <EmptyStateSubtext>
                When you receive new appointments or updates, they'll appear here
              </EmptyStateSubtext>
            </EmptyState>
          )}
        </Card>
      </PageContainer>
    </Layout>
  );
};

export default DoctorNotificationsPage;