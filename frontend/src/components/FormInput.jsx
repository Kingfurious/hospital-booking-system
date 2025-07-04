import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 1rem;
  background-color: var(--card-background);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const ErrorText = styled.p`
  color: var(--red-error);
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const FormInput = ({ label, type, id, value, onChange, required, error, ...props }) => {
  return (
    <FormGroup>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </FormGroup>
  );
};

export default FormInput;