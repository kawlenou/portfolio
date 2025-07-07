import axios from "axios";
import { getApiUrl } from '../utils/config';

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});

// Intercepteur pour injecter le token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); // À utiliser partout le même nom
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Intercepteur pour gérer les réponses
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem('authToken');
    window.dispatchEvent(new Event('unauthorized'));
  }
  return Promise.reject(error);
});

/**
 * Connexion utilisateur
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{user: object, token: string}>}
 */
export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    
    if (response.data.access_token) {
      localStorage.setItem('authToken', response.data.access_token);
    }
    
    return response.data;
  } catch (error) {
    console.error("Erreur de connexion:", {
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};

/**
 * Récupère le profil utilisateur
 * @returns {Promise<object>}
 */
export const getProfile = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Erreur profil:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Déconnexion
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await api.post('/logout');
  } finally {
    localStorage.removeItem('authToken');
  }
};


export const getServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data;
  
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    throw error;
  }
};

export const getServiceWithDetails = async (id) => {
  try {
    const response = await api.get(`/services/${id}`, {
      params: {
        include_packages: true,
        include_additional_services: true
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du service ${id}:`, error);
    throw error;
  }
};

export const getAvailableTimeSlots = async (date, duration) => {
  try {
    const response = await api.get('/time-slots', {
      params: { date, duration }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des créneaux :', error);
    throw error;
  }
};

export default api;