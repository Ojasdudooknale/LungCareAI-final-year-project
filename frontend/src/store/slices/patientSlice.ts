import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface AnalysisResult {
  condition: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
}

interface PatientState {
  soundAnalysis: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  soundAnalysis: null,
  isLoading: false,
  error: null,
};

export const uploadSound = createAsyncThunk(
  'patient/uploadSound',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('sound', file);

      const response = await fetch('/api/patient/upload-sound', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to upload sound');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to upload sound');
    }
  }
);

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    clearAnalysis: (state) => {
      state.soundAnalysis = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadSound.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadSound.fulfilled, (state, action) => {
        state.isLoading = false;
        state.soundAnalysis = action.payload.analysis;
        toast.success('Sound analysis completed successfully');
      })
      .addCase(uploadSound.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error);
      });
  },
});

export const { clearAnalysis, clearError } = patientSlice.actions;
export default patientSlice.reducer;
