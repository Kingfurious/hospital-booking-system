import React from 'react';
import StyledRescheduleButton from './StyledRescheduleButton';
import { FaCalendarAlt } from 'react-icons/fa';

const DoctorAppointmentsTable = ({ appointments, showReschedule, onRescheduleClick }) => {
  if (!appointments || appointments.length === 0) {
    return <p className="text-gray-600 text-center">No appointments to display.</p>;
  }

  const isRescheduleEnabled = (appointmentDate) => {
    const today = new Date();
    const apptDate = new Date(appointmentDate);
    const diffTime = Math.abs(apptDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 2;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">Patient Name</th>
            <th className="py-3 px-6">Date & Time</th>
            <th className="py-3 px-6">Booking Timestamp</th>
            {showReschedule && <th className="py-3 px-6">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 whitespace-nowrap">{appointment.patientName}</td>
              <td className="py-3 px-6 whitespace-nowrap">
                {new Date(appointment.date).toLocaleString()}
              </td>
              <td className="py-3 px-6 whitespace-nowrap">
                {new Date(appointment.bookingTimestamp).toLocaleString()}
              </td>
              {showReschedule && (
                <td className="py-3 px-6 whitespace-nowrap">
                  <StyledRescheduleButton
                    onClick={() => onRescheduleClick(appointment)}
                    disabled={!isRescheduleEnabled(appointment.date)}
                  >
                    <FaCalendarAlt /> Reschedule
                  </StyledRescheduleButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointmentsTable;