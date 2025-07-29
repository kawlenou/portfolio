import React from 'react';
import { FaPlusCircle, FaList, FaTrash, FaChevronDown } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'flex items-center justify-between rounded-md text-white bg-red-600 cursor-pointer'
      : 'flex items-center justify-between rounded-md text-gray-600 hover:bg-red-600 hover:text-white cursor-pointer';
  };

  return (
    <div className="w-64 bg-white h-screen shadow-md flex flex-col">
      
      <div className="flex items-center justify-start h-20 border-b px-4">
        {/* <img src="/logo.svg" alt="Logo" className="w-6 h-6 mr-2" /> */}
        <span className="font-bold text-gray-700 text-lg">Dashboard</span>
      </div>

      {/* Contenu */}
      <div className="flex-1 p-4 space-y-6">        

        {/* Ajouter un service */}
        <Link to="/dashboard/ajouter-service" className={getLinkClass("/dashboard/ajouter-service")}>
            <div className="flex items-center space-x-2 px-3 py-2">
                <FaChevronDown className="w-3 h-3" />
                <span className="text-md font-semibold">Ajouter un service</span>
            </div>
            {/* <FaPlusCircle className="w-4 h-4 text-blue-500" /> */}
        </Link>

        {/* Projets */}
        <Link to="/dashboard/projects" className={getLinkClass("/dashboard")}>
            <div className="flex items-center space-x-2 px-3 py-2">
                <FaChevronDown className="w-3 h-3" />
                <span className="text-md font-semibold">Mes projets</span>
                <span className="text-xs bg-gray-300 text-gray-700 rounded-full px-2">12</span>
            </div>
            {/* <FaPlusCircle className="w-4 h-4 text-blue-500" /> */}
        </Link>

        {/* Projets */}
        <Link to="/dashboard/profile" className='flex items-center justify-between rounded-md text-gray-600 hover:bg-red-600 hover:text-white cursor-pointer'>
            <div className="flex items-center space-x-2 px-3 py-2">
                <FaChevronDown className="w-3 h-3" />
                <span className="text-md font-semibold">Mon profil</span>
            </div>
            {/* <FaPlusCircle className="w-4 h-4 text-blue-500" /> */}
        </Link>

        {/* Divider */}
        <hr className="border-t border-gray-200 mt-6" />
      </div>
    </div>
  );
};

export default Sidebar;