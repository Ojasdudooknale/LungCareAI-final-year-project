export interface Patient {
  id: string;
  _id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  currentMedications: string;
  symptoms: string;
  lastVisit?: string;
  email?: string;
  password?: string;
}

export interface Doctor {
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  patients: number;
  createdAt: string;
}