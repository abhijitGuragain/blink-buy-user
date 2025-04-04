// src/services/authService.ts
import axios, { AxiosError } from "axios";
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

// Configure axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Types for API responses and requests
interface User {
  id: string;
  email: string;
  username?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  username?: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
}

interface VerifyOtpRequest {
  otp: string;
}

interface ApiError {
  message: string;
  status?: number;
}

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper function to set auth tokens
const setAuthTokens = (data: AuthResponse) => {
  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
  }
  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }
};

// Custom hooks for auth operations
export const useLogin = (
  options?: UseMutationOptions<
    AuthResponse,
    AxiosError<ApiError>,
    LoginCredentials
  >
) => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<AuthResponse>(
        "/login/",
        credentials
      );
      setAuthTokens(response.data);
      return response.data;
    },
    ...options,
  });
};

export const useRegister = (
  options?: UseMutationOptions<
    AuthResponse,
    AxiosError<ApiError>,
    RegisterCredentials
  >
) => {
  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await apiClient.post<AuthResponse>(
        "/register/",
        credentials
      );
      setAuthTokens(response.data);
      return response.data;
    },
    ...options,
  });
};

export const useVerifyOtp = (
  options?: UseMutationOptions<
    AuthResponse,
    AxiosError<ApiError>,
    VerifyOtpRequest
  >
) => {
  return useMutation({
    mutationFn: async (otpData: VerifyOtpRequest) => {
      const response = await apiClient.post<AuthResponse>(
        "/verify-otp/",
        otpData
      );
      setAuthTokens(response.data);
      return response.data;
    },
    ...options,
  });
};

export const useCurrentUser = (
  options?: UseQueryOptions<User, AxiosError<ApiError>>
) => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await apiClient.get<User>("/me/");
      return response.data;
    },
    enabled: !!localStorage.getItem("access_token"),
    ...options,
  });
};

// Logout function
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Check authentication status
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

// Export as an object for convenience
export const authService = {
  useLogin,
  useRegister,
  useVerifyOtp,
  useCurrentUser,
  logout,
  isAuthenticated,
};
