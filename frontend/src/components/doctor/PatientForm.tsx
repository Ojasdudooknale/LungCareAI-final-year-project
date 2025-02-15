import React from 'react';
import { Patient } from '../../types/patient';
import { toast } from 'react-hot-toast';

interface PatientFormProps {
  patient: Patient;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string | string[]) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  isEditing,
  onSubmit,
  onChange,
  onCancel,
  isLoading
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patient.firstName.trim()) {
      toast.error("First name is required.");
      return;
    }
    if (!patient.lastName.trim()) {
      toast.error("Last name is required.");
      return;
    }

    if (!patient.gender) {
      toast.error("Please select a gender.");
      return;
    }
    if (isEditing && !patient._id) {
      toast.error("Patient ID is missing.");
      return;
    }

    onSubmit(e);
  };

  return (
    <form className="space-y-4" onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            required
            value={patient.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            required
            value={patient.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      {!isEditing && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={patient.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={patient.password}
              onChange={(e) => onChange('password', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={patient.dateOfBirth || ''}
            onChange={(e) => onChange('dateOfBirth', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            value={patient.gender || ""}
            onChange={(e) => onChange('gender', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Medical History</label>
        <textarea
          rows={3}
          value={patient.medicalHistory}
          onChange={(e) => onChange('medicalHistory', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Medications</label>
        <textarea
          rows={2}
          value={Array.isArray(patient.currentMedications) ? patient.currentMedications.join(', ') : patient.currentMedications}
          onChange={(e) => onChange('currentMedications', e.target.value.split(', '))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Symptoms</label>
        <textarea
          rows={2}
          value={patient.symptoms}
          onChange={(e) => onChange('symptoms', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditing ? 'Updating...' : 'Adding...'}
            </span>
          ) : (
            <span>{isEditing ? 'Update' : 'Add'} Patient</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
