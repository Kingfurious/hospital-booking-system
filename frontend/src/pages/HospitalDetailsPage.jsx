import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import mockData from '../data/mockData';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaUserMd, FaBriefcaseMedical } from 'react-icons/fa';

const DetailsContainer = styled.div`
  padding: 2rem;
`;

const HospitalHeader = styled.div`
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

const HospitalLogo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  @media (min-width: 768px) {
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const HospitalInfo = styled.div`
  flex-grow: 1;
`;

const HospitalName = styled.h1`
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

const HospitalContactInfo = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HospitalDescription = styled.p`
  margin-top: 1rem;
  color: var(--text-color);
  line-height: 1.8;
`;

const DoctorsSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DoctorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const DoctorCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const DoctorName = styled.h4`
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

const DoctorInfo = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BookAppointmentButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

const HospitalDetailsPage = () => {
  const { hospitalId } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundHospital = mockData.find((h) => h.id === parseInt(hospitalId));
      setHospital(foundHospital);
      setLoading(false);
    }, 500);
  }, [hospitalId]);

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
        <DetailsContainer>
          <p style={{ textAlign: 'center', color: 'var(--red-error)' }}>Hospital not found.</p>
        </DetailsContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <DetailsContainer>
        <HospitalHeader>
          {hospital.logo && <HospitalLogo src={hospital.logo} alt={`${hospital.name} logo`} />}
          <HospitalInfo>
            <HospitalName>{hospital.name}</HospitalName>
            <HospitalContactInfo><FaMapMarkerAlt /> {hospital.address}</HospitalContactInfo>
            <HospitalContactInfo><FaPhone /> {hospital.contact}</HospitalContactInfo>
            {hospital.email && <HospitalContactInfo><FaEnvelope /> {hospital.email}</HospitalContactInfo>}
            {hospital.description && <HospitalDescription>{hospital.description}</HospitalDescription>}
          </HospitalInfo>
        </HospitalHeader>

        <DoctorsSection>
          <SectionTitle>Our Doctors</SectionTitle>
          {hospital.doctors.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>No doctors listed for this hospital yet.</p>
          ) : (
            <DoctorGrid>
              {hospital.doctors.map((doctor) => (
                <DoctorCard key={doctor.id}>
                  <DoctorName><FaUserMd /> {doctor.name}</DoctorName>
                  <DoctorInfo><FaBriefcaseMedical /> {doctor.specialization}</DoctorInfo>
                  <DoctorInfo>{doctor.experience} Years Experience</DoctorInfo>
                  <DoctorInfo>Working Hours: {doctor.workingHours}</DoctorInfo>
                  <BookAppointmentButton primary as={Link} to={`/patient/doctors/${doctor.id}`}>
                    Book Appointment
                  </BookAppointmentButton>
                </DoctorCard>
              ))}
            </DoctorGrid>
          )}
        </DoctorsSection>
      </DetailsContainer>
    </Layout>
  );
};

export default HospitalDetailsPage;