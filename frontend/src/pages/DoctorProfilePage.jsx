import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockDoctors } from '../data/mockData';

const DoctorProfilePage = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching doctor data
    setTimeout(() => {
      const currentDoctor = mockDoctors[0]; // Assuming the first doctor in mock data is logged in
      setDoctor(currentDoctor);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!doctor) {
    return (
      <Layout>
        <div className="container mx-auto p-4 text-center text-red-600">
          Doctor profile not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctor Profile</h1>
        <Card className="p-6 space-y-4">
          <div>
            <p className="text-gray-600 text-sm">Full Name:</p>
            <p className="text-gray-800 text-lg font-semibold">{doctor.fullName}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Email:</p>
            <p className="text-gray-800 text-lg font-semibold">{doctor.email}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Specialization:</p>
            <p className="text-gray-800 text-lg font-semibold">{doctor.specialization}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Years of Experience:</p>
            <p className="text-gray-800 text-lg font-semibold">{doctor.yearsOfExperience} years</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Hospital Name:</p>
            <p className="text-gray-800 text-lg font-semibold">{doctor.hospitalName}</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DoctorProfilePage;