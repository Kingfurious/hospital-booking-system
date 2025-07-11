import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockDoctors } from '../data/mockData';

const DoctorAvailabilityPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true); // Mock availability state
  const [selectedDates, setSelectedDates] = useState([]); // For date picker unavailability

  useEffect(() => {
    // Simulate fetching doctor data
    setTimeout(() => {
      const currentDoctor = mockDoctors[0]; // Assuming the first doctor in mock data is logged in
      setDoctor(currentDoctor);
      // Simulate fetching initial availability
      setIsAvailable(true); // Default to available
      setSelectedDates([]); // Default no specific unavailable dates
      setLoading(false);
    }, 1000);
  }, []);

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    // In a real app, you'd send this update to the backend
    alert(`Doctor is now ${!isAvailable ? 'Available' : 'Unavailable'}`);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleSaveUnavailableDates = () => {
    // In a real app, you'd send selectedDates to the backend
    alert(`Unavailable dates saved: ${selectedDates.join(', ')}`);
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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Availability</h1>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Overall Availability</h3>
          <div className="flex items-center space-x-4">
            <span className="text-lg text-gray-700">Current Status: </span>
            <span className={`text-lg font-bold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
            <Button
              onClick={handleToggleAvailability}
              className={`${isAvailable ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              Toggle to {isAvailable ? 'Unavailable' : 'Available'}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Mark Specific Dates as Unavailable</h3>
          <div className="mb-4">
            <label htmlFor="unavailableDate" className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <input
              type="date"
              id="unavailableDate"
              className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleDateChange}
            />
          </div>
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Selected Unavailable Dates:</p>
            {selectedDates.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600">
                {selectedDates.map((date) => (
                  <li key={date}>{new Date(date).toDateString()}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No specific dates marked as unavailable.</p>
            )}
          </div>
          <Button
            onClick={handleSaveUnavailableDates}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save Unavailable Dates
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default DoctorAvailabilityPage;