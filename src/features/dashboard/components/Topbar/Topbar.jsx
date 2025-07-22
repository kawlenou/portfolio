import React from 'react';
import { FaArrowLeft, FaArrowRight, FaSearch, FaBell, FaUser } from 'react-icons/fa';

const Topbar = ({ startDate, goToPreviousWeek, goToNextWeek }) => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white h-20 ">
      {/* Navigation date à gauche */}
      <div className="flex items-center space-x-2">
        <button onClick={goToPreviousWeek} >
          <FaArrowLeft />
        </button>
        <h1 className="text-lg font-bold text-gray-900">
            {startDate ? capitalize(startDate.format('MMMM YYYY')) : 'Date non définie'}
        </h1>
        <button onClick={goToNextWeek}>
          <FaArrowRight />
        </button>
      </div>

      {/* Actions au centre */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-6 bg-gray-200 rounded-md"></div>
        <div className="w-12 h-6 bg-gray-200 rounded-md"></div>
      </div>

      {/* Profil à droite */}
      <div className="flex items-center space-x-6">
        <FaSearch className="text-gray-500 hover:text-gray-700 cursor-pointer" />
        <FaBell className="text-gray-500 hover:text-gray-700 cursor-pointer" />

        <div className="flex items-center space-x-2 rounded-full px-3 py-1">
          <span className="text-sm text-gray-700">Profile</span>
          <FaUser className="text-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
