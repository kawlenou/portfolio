import React from 'react';
import { FaPlusCircle, FaList, FaTrash, FaChevronDown } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'flex items-center justify-between rounded-md text-white bg-blue-600 cursor-pointer'
      : 'flex items-center justify-between rounded-md text-gray-600 hover:bg-blue-600 hover:text-white cursor-pointer';
  };

  return (
    <div className="w-64 bg-white h-screen shadow-md flex flex-col">
      
      <div className="flex items-center justify-start h-20 border-b px-4">
        {/* <img src="/logo.svg" alt="Logo" className="w-6 h-6 mr-2" /> */}
        <span className="font-bold text-gray-700 text-lg">Dashboard</span>
      </div>

      {/* Contenu */}
      <div className="flex-1 p-4 space-y-6">
        {/* Section Header avec badge */}
        <Link to="/dashboard" className={getLinkClass("/dashboard")}>
            <div className="flex items-center space-x-2 px-3 py-2 ">
                <FaChevronDown className="w-3 h-3" />
            <span className="text-md font-semibold">Reservation</span>
            <span className="text-xs bg-gray-300 text-gray-700 rounded-full px-2">12</span>
            </div>

        </Link>
        

        {/* Ajouter un service */}
        <Link to="/dashboard/ajouter-service" className={getLinkClass("/dashboard/ajouter-service")}>
            <div className="flex items-center space-x-2 px-3 py-2">
                <FaChevronDown className="w-3 h-3" />
                <span className="text-md font-semibold">Ajouter un service</span>
            </div>
            {/* <FaPlusCircle className="w-4 h-4 text-blue-500" /> */}
        </Link>

        {/* Liste de service */}
       <Link to="/dashboard/liste-service" className={getLinkClass("/dashboard/liste-service")}>
            <div className="flex items-center space-x-2 px-3 py-2">
                <FaChevronDown className="w-3 h-3" />
                <span className="text-md font-semibold">Liste des services</span>
            </div>
            {/* <FaPlusCircle className="w-4 h-4 text-blue-500" /> */}
        </Link>

        {/* Deleted */}
        {/* <div 
       
        className="rounded-md flex items-center space-x-2 px-3 py-2 text-red-500 cursor-pointer hover:text-white hover:bg-red-500">
          <FaTrash className="w-4 h-4" />
          <span className="text-sm font-semibold">Supprimer</span>
        </div> */}

        {/* Divider */}
        <hr className="border-t border-gray-200 mt-6" />
      </div>
    </div>
  );
};

export default Sidebar;