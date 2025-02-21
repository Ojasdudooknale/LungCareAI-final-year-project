import React, { useEffect, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPatients, fetchDoctorDetails, addPatient, updatePatient, deletePatient } from '../../store/slices/doctorSlice';
import PatientTable from '../../components/doctor/PatientTable';
import PatientForm from '../../components/doctor/PatientForm';
import { Patient } from '../../types/patient';

const DoctorDashboard = () => {
  const dispatch = useAppDispatch();
  const { doctor, patients, isLoading, error } = useAppSelector(state => state.doctor);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!doctor) {
      dispatch(fetchDoctorDetails());
    }
    dispatch(fetchPatients());
  }, [dispatch, doctor]);

  const emptyPatient: Patient = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Male',
    medicalHistory: '',
    currentMedications: '',
    symptoms: '',
    email: '',
    password: '',
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    selectedPatient.gender = selectedPatient.gender.charAt(0).toUpperCase() + selectedPatient.gender.slice(1).toLowerCase();

    if (isEditing) {
      dispatch(updatePatient({ id: selectedPatient.id, data: selectedPatient }))
        .unwrap()
        .then(() => {
          toast.success('Patient updated successfully');
          setIsModalOpen(false);
          setSelectedPatient(null);
          setIsEditing(false);
        })
        .catch((error) => toast.error(error));
    } else {
      dispatch(addPatient(selectedPatient))
        .unwrap()
        .then(() => {
          toast.success('Patient added successfully');
          setIsModalOpen(false);
          setSelectedPatient(null);
        })
        .catch((error) => toast.error(error));
    }
  };

  const handleDeletePatient = () => {
    if (!patientToDelete) {
      console.error('No patient selected for deletion');
      return;
    }

    dispatch(deletePatient(patientToDelete))
      .unwrap()
      .then(() => {
        toast.success('Patient deleted successfully');
        setIsDeleteModalOpen(false);
        setPatientToDelete(null);
      })
      .catch((error) => {
        console.error('Delete error:', error);
        toast.error(error);
      });
  };

  const handleUpload = () => {
    window.open("http://127.0.0.1:5000/", "_blank");
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, Dr. {doctor ? `${doctor.firstName} ${doctor.lastName}` : 'Loading...'}
          </h1>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Patient Management</h2>
          <button
            onClick={() => {
              setSelectedPatient({ ...emptyPatient });
              setIsModalOpen(true);
              setIsEditing(false);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Patient
          </button>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <PatientTable
            patients={filteredPatients}
            isLoading={isLoading}
            onEdit={(patient) => {
              setSelectedPatient(patient);
              setIsEditing(true);
              setIsModalOpen(true);
            }}
            onDelete={(id) => {
              setPatientToDelete(id);
              setIsDeleteModalOpen(true);
            }}
            onUpload={handleUpload}
          />
        </div>

        {/* Scrollable Add/Edit Patient Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{isEditing ? 'Edit Patient' : 'Add New Patient'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <PatientForm
                patient={selectedPatient || emptyPatient}
                isEditing={isEditing}
                onSubmit={handleFormSubmit}
                onChange={(field, value) => {
                  setSelectedPatient(prev => prev ? { ...prev, [field]: value } : { ...emptyPatient, [field]: value });
                }}
                onCancel={() => {
                  setIsModalOpen(false);
                  setSelectedPatient(null);
                  setIsEditing(false);
                }}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {/* Confirm Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this patient?</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">
                  Cancel
                </button>
                <button onClick={handleDeletePatient} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
