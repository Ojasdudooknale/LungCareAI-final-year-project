import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return Date.now() >= (payload.exp * 1000 - 5000);
  } catch (error) {
    console.error('Token parsing error:', error);
    return true;
  }
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token') && !isTokenExpired(localStorage.getItem('token')),
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('Login API request initiated with:', { email, password });
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      if (isTokenExpired(token)) {
        throw new Error('Received expired token from server');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful');
      console.log('Login successful. Token and User stored:', { token, user });
      return { token, user };
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      console.error('Login failed with error:', error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { firstName, lastName, email, password, role }:
      { firstName: string; lastName: string; email: string; password: string; role: 'doctor' | 'patient' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Signup API request initiated with:', { firstName, lastName, email, password, role });
      const response = await api.post('/auth/signup', {
        firstName,
        lastName,
        email,
        password,
        role
      });
      const { token, user } = response.data;

      if (isTokenExpired(token)) {
        throw new Error('Received expired token from server');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Signup successful');
      console.log('Signup successful. Token and User stored:', { token, user });
      return { token, user };
    } catch (error: any) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const errorMessage = error.response?.data?.message || 'Signup failed';
      toast.error(errorMessage);
      console.error('Signup failed with error:', error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    console.log('Logout API request initiated.');
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    console.log('Logout successful. Token and User removed from localStorage.');
    return null;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Logout failed';
    toast.error(errorMessage);
    console.error('Logout failed with error:', error);
    return rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      console.log('Error state cleared.');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('Login pending...');
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log('Login fulfilled. State updated:', state);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        console.error('Login rejected. Error state updated:', state.error);
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('Signup pending...');
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log('Signup fulfilled. State updated:', state);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        console.error('Signup rejected. Error state updated:', state.error);
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        console.log('Logout pending...');
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        console.log('Logout fulfilled. State cleared.');
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error('Logout rejected. Error state updated:', state.error);
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
