import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // À adapter selon ta logique de déconnexion
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="w-full bg-white shadow-sm flex justify-between items-center md:px-20 px-10 py-6">
     
      <div className="text-[#0b1743] font-bold text-xl">
        Bahiniba Studio
      </div>

     
      <div className="flex items-center space-x-4">
        <button
          //onClick={handleProfile}
          className="flex items-center gap-2 text-[#0b1743] hover:text-[#0053f0] transition-colors"
        >
          <FiUser />
          <span className="text-sm font-medium">Profil</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
        >
          <FiLogOut />
          <span className="text-sm font-medium">Déconnecter</span>
        </button>
      </div>
    </header>
  );
}
