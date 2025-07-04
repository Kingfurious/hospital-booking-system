import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import mockData from '../data/mockData';
import { toast } from 'react-toastify';
import { FaUpload } from 'react-icons/fa';

const ManagementContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-blue);
  margin-bottom: 2rem;
  text-align: center;
`;

const FormCard = styled.div`
  background-color: var(--card-background);
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: bold;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  background-color: var(--card-background);
  color: var(--text-color);
  min-height: 100px;
  resize: vertical;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  background-color: var(--primary-blue);
  color: var(--white);
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  margin-top: 0.5rem;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const HospitalProfileManagement = () => {
  const [hospitalDetails, setHospitalDetails] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    contactNumber: '',
    email: '',
    description: '',
    logo: '',
  });
  const [loading, setLoading] = useState(true);
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);

  useEffect(() => {
    // Simulate fetching existing hospital data for the admin
    setTimeout(() => {
      // Assuming admin manages the first hospital in mockData for simplicity
      const existingHospital = mockData[0];
      if (existingHospital) {
        setHospitalDetails({
          name: existingHospital.name || '',
          address: {
            street: existingHospital.address.split(', ')[0] || '',
            city: existingHospital.address.split(', ')[1] || '',
            state: existingHospital.address.split(', ')[2] || '',
            zipCode: existingHospital.address.split(', ')[3] || '',
          },
          contactNumber: existingHospital.contact || '',
          email: existingHospital.email || '',
          description: existingHospital.description || '',
          logo: existingHospital.logo || '',
        });
      }
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setHospitalDetails((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setHospitalDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedLogoFile(file);
      // For UI only, we can use a placeholder or base64 encode for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setHospitalDetails((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedLogoFile(null);
      setHospitalDetails((prev) => ({ ...prev, logo: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log('Saving hospital details:', hospitalDetails);
    toast.success('Hospital profile updated successfully!');
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <ManagementContainer>
        <Title>Manage Hospital Profile</Title>
        <FormCard>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Hospital Name"
              type="text"
              id="name"
              name="name"
              value={hospitalDetails.name}
              onChange={handleChange}
              required
            />
            <FormGroup>
              <Label>Address</Label>
              <FormInput
                type="text"
                id="street"
                name="address.street"
                placeholder="Street Address"
                value={hospitalDetails.address.street}
                onChange={handleChange}
                required
              />
              <FormInput
                type="text"
                id="city"
                name="address.city"
                placeholder="City"
                value={hospitalDetails.address.city}
                onChange={handleChange}
                required
              />
              <FormInput
                type="text"
                id="state"
                name="address.state"
                placeholder="State"
                value={hospitalDetails.address.state}
                onChange={handleChange}
                required
              />
              <FormInput
                type="text"
                id="zipCode"
                name="address.zipCode"
                placeholder="ZIP Code"
                value={hospitalDetails.address.zipCode}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormInput
              label="Contact Number"
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="e.g., 555-123-4567"
              value={hospitalDetails.contactNumber}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="e.g., info@hospital.com"
              value={hospitalDetails.email}
              onChange={handleChange}
            />
            <FormGroup>
              <Label htmlFor="description">Hospital Description</Label>
              <TextArea
                id="description"
                name="description"
                placeholder="Provide a brief description of your hospital..."
                value={hospitalDetails.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FileUploadContainer>
              {hospitalDetails.logo && (
                <img src={hospitalDetails.logo} alt="Hospital Logo Preview" style={{ maxWidth: '150px', maxHeight: '150px', marginBottom: '1rem', borderRadius: '8px' }} />
              )}
              <FileInputLabel htmlFor="logo-upload">
                <FaUpload /> Upload Hospital Logo
              </FileInputLabel>
              <FileInput
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleFileChange}
              />
              {selectedLogoFile && <FileName>{selectedLogoFile.name}</FileName>}
            </FileUploadContainer>
            <Button primary type="submit" style={{ width: '100%' }}>
              Save Profile
            </Button>
          </form>
        </FormCard>
      </ManagementContainer>
    </Layout>
  );
};

export default HospitalProfileManagement;