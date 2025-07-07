import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getProfile } from '../services';
//import { verifyToken } from '../utils/auth';

export default function RouteProteger({ children, rolesRequises = [] }) {
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    authorized: false,
    tokenValid: false
  });

  // Mémoïsation de la fonction de vérification
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Aucun token trouvé');

      // const isTokenValid = await verifyToken(token);
      // if (!isTokenValid) throw new Error('Token invalide');

      const response = await getProfile();
      const hasRole = rolesRequises.length === 0 || 
                     rolesRequises.includes(response.data.role);

      return {
        loading: false,
        authorized: hasRole,
        tokenValid: true
      };
    } catch (error) {
      localStorage.removeItem('authToken');
      return {
        loading: false,
        authorized: false,
        tokenValid: false
      };
    }
  }, [rolesRequises]);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const newAuthStatus = await checkAuth();
      if (isMounted) {
        setAuthStatus(newAuthStatus);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [checkAuth]); // Seulement checkAuth comme dépendance

  if (authStatus.loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/90 z-50">
        <svg
          className="w-16 h-16 text-blue-500 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <p className="mt-4 text-sm text-gray-600">
          Vérification en cours...
        </p>
      </div>
    );
  }

  if (!authStatus.tokenValid || !authStatus.authorized) {
    return <Navigate to="/login-with-mail" replace state={{ from: location }} />;
  }

  return children;
}