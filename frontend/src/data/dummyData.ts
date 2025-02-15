import { Patient, Doctor } from '../types/patient';

export const dummyDoctor: Doctor = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@example.com',
  specialization: 'Pulmonologist',
  patients: 3,
  createdAt: '2024-01-15'
};

export const dummyPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1980-05-15',
    gender: 'male',
    medicalHistory: 'History of asthma since childhood',
    currentMedications: 'Albuterol inhaler, Fluticasone',
    symptoms: 'Occasional wheezing, shortness of breath during exercise',
    lastVisit: '2024-03-15'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1992-08-23',
    gender: 'female',
    medicalHistory: 'Diagnosed with chronic bronchitis in 2020',
    currentMedications: 'Symbicort, Montelukast',
    symptoms: 'Persistent cough, mucus production',
    lastVisit: '2024-03-10'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    dateOfBirth: '1975-12-03',
    gender: 'male',
    medicalHistory: 'COPD diagnosed in 2018',
    currentMedications: 'Spiriva, Advair',
    symptoms: 'Chronic cough, difficulty breathing during physical activity',
    lastVisit: '2024-03-01'
  }
];