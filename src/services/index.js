import axios from "axios";
import { getApiUrl } from './config';

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Récupérer la liste des projets
export const fetchProject = async () => {
  try {
    const response = await api.get("/projects");
    return response.data.formattedProjects;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
    throw error;
  }
};

// Ajouter un nouveau projet
export const addProject = async (formData) => {
  try {
    const response = await api.post("/projects", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du projet :", error);
    throw error;
  }
};

// Mettre à jour un projet
export const updateItem = async (id, itemData) => {
  try {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'item :", error);
    throw error;
  }
};

// Supprimer un projet
export const deleteProject = async (id) => {
  try {
    await api.delete(`/projects/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression du projet :", error);
    throw error;
  }
};


// Récupérer la liste des categories
export const fetchCategory = async () => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des categories :", error);
      throw error;
    }
  };

// Récupérer la liste des categories
export const fetchCategoryOptions = async () => {
    try {
      const response = await api.get("/categories/options");
      return response.data;

    } catch (error) {
      console.error("Erreur lors de la récupération des categories :", error);
      throw error;
    }
  };

export default api;


// Ajouter un intercepteur pour attacher le token
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // Intercepteur pour gérer les erreurs globales
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error("Non autorisé, veuillez vous reconnecter.");
        // Rediriger vers la page de connexion si nécessaire
      }
      return Promise.reject(error);
    }
  );
  
