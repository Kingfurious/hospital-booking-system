import React from 'react';
import Card from '../Card';

const DoctorStatsCards = ({ appointments }) => {
  const getAppointmentsCount = (daysOffset) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysOffset);
    targetDate.setHours(0, 0, 0, 0);

    return appointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      apptDate.setHours(0, 0, 0, 0);
      return apptDate.getTime() === targetDate.getTime();
    }).length;
  };

  const getTotalAppointmentsThisWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
    endOfWeek.setHours(23, 59, 59, 999);

    return appointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      return apptDate.getTime() >= startOfWeek.getTime() && apptDate.getTime() <= endOfWeek.getTime();
    }).length;
  };

  const appointmentsToday = getAppointmentsCount(0);
  const appointmentsTomorrow = getAppointmentsCount(1);
  const totalThisWeek = getTotalAppointmentsThisWeek();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-600">Appointments Today</h4>
        <p className="text-4xl font-bold text-blue-600 mt-2">{appointmentsToday}</p>
      </Card>
      <Card className="p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-600">Appointments Tomorrow</h4>
        <p className="text-4xl font-bold text-green-600 mt-2">{appointmentsTomorrow}</p>
      </Card>
      <Card className="p-6 text-center">
        <h4 className="text-lg font-semibold text-gray-600">Total This Week</h4>
        <p className="text-4xl font-bold text-purple-600 mt-2">{totalThisWeek}</p>
      </Card>
    </div>
  );
};

export default DoctorStatsCards;