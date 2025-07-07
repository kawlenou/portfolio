export const config = {
    imageBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL?.replace(/\/+$/, ''),
    apiUrl: import.meta.env.VITE_API_URL?.replace(/\/+$/, '')
  }

  export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    const cleanPath = path.replace(/^\/+/, '');
    return `${config.imageBaseUrl}/${cleanPath}`;
  }
  
  export const getApiUrl = (endpoint) => {
    if (!endpoint) return config.apiUrl;
    
    return `${config.apiUrl}/${cleanEndpoint}`;
  }

  
