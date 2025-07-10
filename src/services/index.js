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


export const registerUser = async (formData) => {
  try {
    const response = await api.post('/register', {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirm_password,
    });

    return response.data;
  } catch (error) {
    
    if (error.response && error.response.data) {
      throw error.response.data; 
    }
    throw error;
  }
};

export const confirmRegistration = async (email, verificationCode) => {
  const response = await api.post(`/register/confirm/${email}`, {
    verification_code: verificationCode
  });

  return response.data;
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
    const response = await api.get('/user/services');
    return response.data;
  
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    throw error;
  }
};

export const getServiceWithDetails = async (id) => {
  try {
    const response = await api.get(`/user/services/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du service ${id}:`, error);
    throw error;
  }
};

export const getAvailableTimeSlots = async (date, heure_id) => {
  try {
    const response = await api.post('/reservation/disponibilite', {
      date,
      heure_id,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des créneaux :', error);
    throw error;
  }
};


export const createBooking = async ({
  service_id,
  heure_id,
  date_reservation,
  sous_services = [],
}) => {
  try {
    const response = await api.post('/reservation', {
      service_id,
      heure_id,
      date_reservation,
      sous_services,
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la réservation :", error.response?.data || error);
    throw error;
  }
};

export const redirectToCinetPay = async (reservationId) => {
  try {
    const response = await api.post(`/reservation/${reservationId}/payment`);
    return response.data; 
  } catch (error) {
    console.error('Erreur de redirection vers CinetPay :', error);
    throw error;
  }
};

export default api;