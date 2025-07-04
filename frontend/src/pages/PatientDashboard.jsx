import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import mockData from '../data/mockData';
import { FaSearch, FaFilter } from 'react-icons/fa';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-blue);
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  max-width: 400px;
  background-color: var(--card-background);
  color: var(--text-color);
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  background-color: var(--card-background);
  color: var(--text-color);
`;

const HospitalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const HospitalCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const HospitalLogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  align-self: center;
`;

const HospitalName = styled.h3`
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

const HospitalInfo = styled.p`
  font-size: 0.95rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const ViewDoctorsButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

const PatientDashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setHospitals(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearchTerm =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.doctors.some((doctor) =>
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSpecialization =
      filterSpecialization === '' ||
      hospital.doctors.some((doctor) =>
        doctor.specialization.toLowerCase() === filterSpecialization.toLowerCase()
      );

    return matchesSearchTerm && matchesSpecialization;
  });

  const allSpecializations = [...new Set(mockData.flatMap(h => h.doctors.map(d => d.specialization)))];

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <DashboardContainer>
        <Title>Welcome, Patient! Find Your Hospital</Title>
        <SearchFilterContainer>
          <SearchInput
            type="text"
            placeholder="Search hospitals by name, location, or doctor specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
          >
            <option value="">All Specializations</option>
            {allSpecializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </FilterSelect>
        </SearchFilterContainer>

        {filteredHospitals.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-color)' }}>No hospitals found matching your criteria.</p>
        ) : (
          <HospitalGrid>
            {filteredHospitals.map((hospital) => (
              <HospitalCard key={hospital.id}>
                {hospital.logo && <HospitalLogo src={hospital.logo} alt={`${hospital.name} logo`} />}
                <HospitalName>{hospital.name}</HospitalName>
                <HospitalInfo>{hospital.address}</HospitalInfo>
                <HospitalInfo>Contact: {hospital.contact}</HospitalInfo>
                <ViewDoctorsButton primary as={Link} to={`/patient/hospitals/${hospital.id}`}>
                  View Doctors
                </ViewDoctorsButton>
              </HospitalCard>
            ))}
          </HospitalGrid>
        )}
      </DashboardContainer>
    </Layout>
  );
};

export default PatientDashboard;