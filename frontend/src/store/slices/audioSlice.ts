import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import toast from 'react-hot-toast';

interface ClassificationResult {
  condition: string;
  confidence: number;
  recommendations: string[];
}

interface AudioState {
  selectedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  classificationResult: ClassificationResult | null;
  error: string | null;
}

const initialState: AudioState = {
  selectedFile: null,
  isUploading: false,
  uploadProgress: 0,
  classificationResult: null,
  error: null,
};

export const uploadAndClassifyAudio = createAsyncThunk(
  'audio/uploadAndClassify',
  async ({ patientId, file }: { patientId: string; file: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await api.post(`/api/v1/patients/${patientId}/upload-audio`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / (progressEvent.total || 0)) * 100;
          // You can dispatch an action here to update upload progress if needed
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Upload failed');
      }

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload audio';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
      state.error = null;
    },
    clearAudioState: (state) => {
      state.selectedFile = null;
      state.isUploading = false;
      state.uploadProgress = 0;
      state.classificationResult = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadAndClassifyAudio.pending, (state) => {
        state.isUploading = true;
        state.error = null;
      })
      .addCase(uploadAndClassifyAudio.fulfilled, (state, action) => {
        state.isUploading = false;
        state.classificationResult = action.payload.classificationResults;
        toast.success('Audio processed successfully');
      })
      .addCase(uploadAndClassifyAudio.rejected, (state, action) => {
        state.isUploading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedFile, clearAudioState } = audioSlice.actions;
export default audioSlice.reducer;
