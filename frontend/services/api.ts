import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Define a URL base dinâmica
// Prioriza variável de ambiente (Expo: EXPO_PUBLIC_API_URL)
// Fallbacks:
//  - Android emulador: 10.0.2.2 mapeia para localhost da máquina
//  - iOS/web/desktop: localhost
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000');

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Anexa o token Bearer automaticamente em todas as requisições
api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

// Types
export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departure_date: string;
  round_trip?: boolean;
  return_date?: string;
}

export interface Flight {
  id: string;
  airline: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  price: number;
  stops: number;
}

export interface FlightSearchResponse {
  flights: Flight[];
  search_id: string;
}

export interface Alert {
  id: number;
  user_id: number;
  origin: string;
  destination: string;
  target_price: number;
  is_active: boolean;
  created_at: string;
  last_notified?: string;
}

export interface AlertCreate {
  origin: string;
  destination: string;
  target_price: number;
}

export interface SearchHistory {
  id: number;
  user_id: number;
  origin: string;
  destination: string;
  departure_date: string;
  search_date: string;
  results_count: number;
}

export interface PricePredictionRequest {
  origin: string;
  destination: string;
  days_ahead: number;
}

export interface PricePredictionResponse {
  predicted_price: number;
  trend: string;
}

// API functions
export const flightAPI = {
  search: async (searchData: FlightSearchRequest): Promise<FlightSearchResponse> => {
    const response = await api.post<FlightSearchResponse>('/flights/search', searchData);
    return response.data;
  },

  predictPrice: async (predictionData: PricePredictionRequest): Promise<PricePredictionResponse> => {
    const response = await api.post<PricePredictionResponse>('/flights/predict', predictionData);
    return response.data;
  },
};

export const alertAPI = {
  getAlerts: async (): Promise<Alert[]> => {
    const response = await api.get<Alert[]>('/users/me/alerts');
    return response.data;
  },

  createAlert: async (alertData: AlertCreate): Promise<Alert> => {
    const response = await api.post<Alert>('/users/me/alerts', alertData);
    return response.data;
  },

  updateAlert: async (alertId: number, alertData: Partial<AlertCreate>): Promise<Alert> => {
    const response = await api.put<Alert>(`/users/me/alerts/${alertId}`, alertData);
    return response.data;
  },

  deleteAlert: async (alertId: number): Promise<void> => {
    await api.delete(`/users/me/alerts/${alertId}`);
  },

  testNotification: async (alertId: number): Promise<{ message: string; alert: Alert }> => {
    const response = await api.post<{ message: string; alert: Alert }>(`/users/me/alerts/${alertId}/notify_test`);
    return response.data;
  },
};

export const historyAPI = {
  getHistory: async (): Promise<SearchHistory[]> => {
    const response = await api.get<SearchHistory[]>('/users/me/history');
    return response.data;
  },
};

export default api;
