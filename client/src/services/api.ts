import axios from 'axios';
import { CarRecommendation, RecommendationRequest } from '../types/car';

const API_BASE_URL = 'http://localhost:5000/api';

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
