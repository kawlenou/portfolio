import { Link, Outlet } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-gray-900">Connexion</h2>
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="/login-with-google" 
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Continuer avec Google
          </Link>
          
          <Link 
            to="/login-with-mail" 
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Continuer avec Email
          </Link>
        </div>

        <div className="text-center text-sm text-gray-600">
          Pas encore de compte?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            S'inscrire
          </Link>
        </div>

        {/* Pour les sous-routes (LoginWithMail, etc.) */}
        <Outlet />
      </div>
    </div>
  );
};

export default Login;