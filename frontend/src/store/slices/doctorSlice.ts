import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Patient, Doctor } from '../../types/patient';
import toast from 'react-hot-toast';
import api from '../../api/axios'; // Assuming Axios instance is configured

interface DoctorState {
  doctor: Doctor | null;
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  doctor: null,
  patients: [],
  isLoading: false,
  error: null,
};

// Fetch Doctor Details
export const fetchDoctorDetails = createAsyncThunk(
  'doctor/fetchDetails',
  async (_, { rejectWithValue }) => {
    try {
      console.log('[fetchDoctorDetails] API Call Started');
      const response = await api.get('/doctor/me');
      console.log('[fetchDoctorDetails] API Response:', response.data);
      return response.data.doctor; // Extracting doctor object correctly
    } catch (error: any) {
      console.error('[fetchDoctorDetails] API Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch doctor details');
    }
  }
);

// Fetch Patients
export const fetchPatients = createAsyncThunk(
  'doctor/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      console.log('[fetchPatients] API Call Started');
      const response = await api.get('/doctor/patients');
      console.log('[fetchPatients] API Response:', response.data);
      return response.data.patients.map((patient: any) => ({
        ...patient,
        id: patient._id, // Ensure 'id' is properly mapped
      }));
    } catch (error: any) {
      console.error('[fetchPatients] API Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch patients');
    }
  }
);

// Add Patient
export const addPatient = createAsyncThunk(
  'doctor/addPatient',
  async (patientData: Omit<Patient, 'id'>, { rejectWithValue }) => {
    try {
      console.log('[addPatient] Data Before Formatting:', patientData);
      const formattedData = {
        ...patientData,
        dateOfBirth: patientData.dateOfBirth ? patientData.dateOfBirth.split('T')[0] : undefined,
      };
      console.log('[addPatient] Formatted Data:', formattedData);

      const response = await api.post('/doctor/patients', formattedData);
      console.log('[addPatient] API Response:', response.data);
      return { ...response.data.patient, id: response.data.patient._id };
    } catch (error: any) {
      console.error('[addPatient] API Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to add patient');
    }
  }
);

// Update Patient
export const updatePatient = createAsyncThunk(
  'doctor/updatePatient',
  async ({ id, data }: { id: string; data: Partial<Patient> }, { rejectWithValue }) => {
    console.log('[updatePatient] Raw Data:', { id, data });

    if (!id) {
      console.error('[updatePatient] ERROR: Patient ID is missing');
      return rejectWithValue('Patient ID is required for updating.');
    }

    try {
      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : undefined,
      };
      console.log('[updatePatient] Formatted Data:', formattedData);

      const response = await api.put(`/doctor/patients/${id}`, formattedData);
      console.log('[updatePatient] API Response:', response.data);
      return { ...response.data.patient, id: response.data.patient._id };
    } catch (error: any) {
      console.error('[updatePatient] API Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update patient');
    }
  }
);

// Delete Patient
export const deletePatient = createAsyncThunk(
  'doctor/deletePatient',
  async (id: string, { rejectWithValue }) => {
    console.log('[deletePatient] Raw ID:', id);

    if (!id) {
      console.error('[deletePatient] ERROR: Patient ID is missing');
      return rejectWithValue('Patient ID is required for deletion.');
    }

    try {
      await api.delete(`/doctor/patients/${id}`);
      console.log('[deletePatient] Patient deleted successfully:', id);
      return id;
    } catch (error: any) {
      console.error('[deletePatient] API Error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to delete patient');
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    clearError: (state) => {
      console.log('[clearError] Clearing error state');
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorDetails.pending, (state) => {
        console.log('[fetchDoctorDetails] Pending...');
        state.isLoading = true;
      })
      .addCase(fetchDoctorDetails.fulfilled, (state, action) => {
        console.log('[fetchDoctorDetails] Fulfilled:', action.payload);
        state.isLoading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctorDetails.rejected, (state, action) => {
        console.error('[fetchDoctorDetails] Rejected:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(fetchPatients.pending, (state) => {
        console.log('[fetchPatients] Pending...');
        state.isLoading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        console.log('[fetchPatients] Fulfilled:', action.payload);
        state.isLoading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        console.error('[fetchPatients] Rejected:', action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(action.payload as string);
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        console.log('[updatePatient] Updating state instantly:', action.payload);
        state.patients = state.patients.map(patient => patient.id === action.payload.id ? action.payload : patient);
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        console.log('[addPatient] Adding patient instantly:', action.payload);
        state.patients.push(action.payload);
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        console.log('[deletePatient] Removing patient instantly:', action.payload);
        state.patients = state.patients.filter(patient => patient.id !== action.payload);
      });
  },
});

export const { clearError } = doctorSlice.actions;
export default doctorSlice.reducer;
