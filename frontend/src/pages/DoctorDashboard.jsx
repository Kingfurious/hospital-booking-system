import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockAppointments, mockDoctors } from '../data/mockData';
import DoctorAppointmentsTable from '../components/doctor/DoctorAppointmentsTable';
import DoctorStatsCards from '../components/doctor/DoctorStatsCards';
import RescheduleAppointmentModal from '../components/doctor/RescheduleAppointmentModal';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const getTodaysAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      apptDate.setHours(0, 0, 0, 0);
      return apptDate.getTime() === today.getTime();
    });
  };

  const getUpcomingAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);
    next7Days.setHours(23, 59, 59, 999);

    return appointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      return apptDate.getTime() > today.getTime() && apptDate.getTime() <= next7Days.getTime();
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
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

  const todaysAppointments = getTodaysAppointments();
  const upcomingAppointments = getUpcomingAppointments();

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {doctor && (
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">
              Good Morning, Dr. {doctor.fullName.split(' ')[1]} 👋
            </h1>
            <p className="text-gray-600 mt-1">Welcome to your dashboard.</p>
          </div>
        )}

        <DoctorStatsCards appointments={appointments} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Today's Appointments</h3>
            {todaysAppointments.length > 0 ? (
              <DoctorAppointmentsTable appointments={todaysAppointments} showReschedule={false} />
            ) : (
              <div className="text-center py-10">
                <img src="/path/to/placeholder-illustration.svg" alt="No appointments" className="mx-auto mb-4 w-32 h-32" />
                <p className="text-gray-600">No appointments scheduled for today.</p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Appointments (Next 7 Days)</h3>
            {upcomingAppointments.length > 0 ? (
              <DoctorAppointmentsTable
                appointments={upcomingAppointments}
                showReschedule={true}
                onRescheduleClick={handleRescheduleClick}
              />
            ) : (
              <div className="text-center py-10">
                <img src="/path/to/placeholder-illustration.svg" alt="No upcoming appointments" className="mx-auto mb-4 w-32 h-32" />
                <p className="text-gray-600">No upcoming appointments in the next 7 days.</p>
              </div>
            )}
          </Card>
        </div>

        {isModalOpen && (
          <RescheduleAppointmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            appointment={selectedAppointment}
            onReschedule={handleRescheduleSubmit}
          />
        )}
      </div>
    </Layout>
  );
};

export default DoctorDashboard;