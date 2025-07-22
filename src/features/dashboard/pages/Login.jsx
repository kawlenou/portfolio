import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { adminLogin, getProfile } from '../../../services';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await adminLogin(email, password);
      const profile = await getProfile();

      const role = profile?.data?.role || profile?.role;

      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        setError("Accès refusé : vous n'êtes pas administrateur.");
        localStorage.removeItem('authToken'); // pour éviter que le token reste actif
      }

    } catch (err) {
      setError(err.response?.data?.message || "Échec de la connexion");
      console.error("Erreur de connexion:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white hidden md:block"></div>

      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Se connecter</h2>
          <p className="text-gray-600 mb-6 text-sm">connectez-vous avec votre mail ou votre compte Google</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-400 text-sm">ou</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="space-y-3">
            <button className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center hover:bg-gray-100 transition">
              <FaGoogle className="mr-2 text-red-500" />
              <span>Poursuivre avec Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
