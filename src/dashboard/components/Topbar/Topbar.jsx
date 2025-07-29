import { Calendar, LogOut } from 'lucide-react';
import React from 'react';
import { FaArrowLeft, FaArrowRight, FaSearch, FaBell, FaUser } from 'react-icons/fa';

const Topbar = ({ startDate, goToPreviousWeek, goToNextWeek }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white h-20 ">
      {/* Navigation date à gauche */}
      <div className="flex items-center space-x-2">
        {/* <button onClick={goToPreviousWeek} >
          <FaArrowLeft />
        </button> */}
        <Calendar className='text-gray-500'/>
        <h1 className="text-lg font-semibold text-gray-500">
          {startDate ? capitalize(startDate.format('MMMM YYYY')) : 'Date non définie'}
        </h1>
        {/* <button onClick={goToNextWeek}>
          <FaArrowRight />
        </button> */}
      </div>

      {/* Actions au centre */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-12 h-6 bg-gray-200 rounded-md"></div>
      </div>

      {/* Profil à droite */}
      <div className="flex items-center space-x-6">
        <div className="group relative w-10 h-10 hover:w-56 transition-all duration-300 hover:bg-gray-200 rounded-full flex items-center overflow-hidden pl-3 pr-3">
          
          <input
            type="text"
            placeholder="Rechercher..."
            className="ml-2 w-0 text-gray-600 group-hover:w-56 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-transparent outline-none text-sm"
          />
          <FaSearch className="text-gray-600 shrink-0" />
        </div>

        <FaBell className="text-gray-500 hover:text-gray-700 cursor-pointer w-5 h-5" />

        <div className="flex items-center space-x-2 rounded-full px-3 py-1 cursor-pointer">
          {/* <span className="text-sm text-gray-700">Se déconnecter</span> */}
          <LogOut className="text-red-600 w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
