import React from 'react';
import { Edit2, Trash2, Upload } from 'lucide-react';
import { Patient } from '../../types/patient';

interface PatientTableProps {
  patients: Patient[];
  isLoading: boolean;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
  onUpload: (id: string) => void; // Now passes the patient ID
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  isLoading,
  onEdit,
  onDelete,
  onUpload,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading patients...</div>;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Patient Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Gender
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date of Birth
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Current Medications
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Symptoms
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {patients.map((patient, index) => (
          <tr key={patient.id || `patient-${index}`} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {patient.firstName} {patient.lastName}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{patient.gender}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{patient.dateOfBirth}</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-500 max-w-xs truncate">
                {patient.currentMedications}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-500 max-w-xs truncate">
                {patient.symptoms}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-3">
                <button
                  onClick={() => onUpload(patient.id)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Upload Sound"
                >
                  <Upload className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onEdit(patient)}
                  className="text-green-600 hover:text-green-900"
                  title="Edit Patient"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(patient.id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete Patient"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;
