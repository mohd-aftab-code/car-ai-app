import axios from 'axios';
import { CarRecommendation, RecommendationRequest } from '../types/car';

// Use relative URL for Next.js API routes
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRecommendations = async (data: RecommendationRequest): Promise<CarRecommendation[]> => {
  const response = await api.post<CarRecommendation[]>('/cars/recommend', data);
  return response.data;
};

export default api;
