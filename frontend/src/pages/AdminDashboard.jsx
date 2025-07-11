import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockData } from '../data/mockData';
import { FaHospital, FaMapMarkerAlt, FaPhone, FaUserMd, FaBriefcaseMedical, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-blue);
  margin-bottom: 2rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--primary-blue);
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const HospitalSummaryCard = styled(Card)`
  text-align: center;
  margin-bottom: 2rem;
`;

const HospitalLogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const HospitalName = styled.h3`
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

const HospitalInfo = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DoctorListContainer = styled.div`
  margin-top: 2rem;
`;

const DoctorTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: var(--card-background);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color);
  }

  th {
    background-color: var(--secondary-gray);
    font-weight: bold;
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    thead, tbody, th, td, tr {
      display: block;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tr {
      margin-bottom: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }
    td {
      border: none;
      position: relative;
      padding-left: 50%;
      text-align: right;
    }
    td:before {
      position: absolute;
      top: 0;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      text-align: left;
      font-weight: bold;
      color: var(--primary-blue);
    }
    td:nth-of-type(1):before { content: "Name"; }
    td:nth-of-type(2):before { content: "Specialization"; }
    td:nth-of-type(3):before { content: "Experience"; }
    td:nth-of-type(4):before { content: "Working Hours"; }
    td:nth-of-type(5):before { content: "Actions"; }
  }
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 0.8rem;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  svg {
    margin-right: 0.3rem;
  }
`;

const AdminDashboard = () => {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching hospital data for the logged-in admin
    setTimeout(() => {
      // Assuming admin manages the first hospital in mockData for simplicity
      setHospital(mockData[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDeleteDoctor = (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      toast.success(`Doctor ${doctorId} deleted (UI only).`);
      setHospital(prevHospital => ({
        ...prevHospital,
        doctors: prevHospital.doctors.filter(doc => doc.id !== doctorId)
      }));
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  if (!hospital) {
    return (
      <Layout>
        <DashboardContainer>
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>No hospital data found. Please set up your hospital profile.</p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button primary as={Link} to="/admin/hospital-profile">Set Up Hospital Profile</Button>
          </div>
        </DashboardContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <DashboardContainer>
        <Title>Administrator Dashboard</Title>

        <SectionTitle>Hospital Summary</SectionTitle>
        <HospitalSummaryCard>
          {hospital.logo && <HospitalLogo src={hospital.logo} alt={`${hospital.name} logo`} />}
          <HospitalName>{hospital.name}</HospitalName>
          <HospitalInfo><FaMapMarkerAlt /> {hospital.address}</HospitalInfo>
          <HospitalInfo><FaPhone /> {hospital.contact}</HospitalInfo>
          {hospital.description && <p>{hospital.description}</p>}
          <Button primary as={Link} to="/admin/hospital-profile" style={{ marginTop: '1rem' }}>
            <FaEdit /> Edit Hospital Profile
          </Button>
        </HospitalSummaryCard>

        <SectionTitle>Registered Doctors</SectionTitle>
        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <Button primary as={Link} to="/admin/doctor-management">
            <FaUserMd /> Add New Doctor
          </Button>
        </div>
        {hospital.doctors.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>No doctors registered yet.</p>
        ) : (
          <DoctorListContainer>
            <DoctorTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Working Hours</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospital.doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.experience} years</td>
                    <td>{doctor.workingHours}</td>
                    <td>
                      <ActionButton as={Link} to={`/admin/doctor-management?doctorId=${doctor.id}`}>
                        <FaEdit /> Edit
                      </ActionButton>
                      <ActionButton onClick={() => handleDeleteDoctor(doctor.id)} style={{ backgroundColor: 'var(--red-error)', color: 'var(--white)' }}>
                        <FaTrash /> Delete
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DoctorTable>
          </DoctorListContainer>
        )}
      </DashboardContainer>
    </Layout>
  );
};

export default AdminDashboard;