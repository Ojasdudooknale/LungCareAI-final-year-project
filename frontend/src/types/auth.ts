export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'doctor' | 'patient';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}