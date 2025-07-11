import React from 'react';

const NavItem = ({ children, count, isActive, isRed }) => {
  const baseClasses = "flex justify-between items-center cursor-pointer";
  const textClasses = isRed 
    ? "text-red-500 hover:text-red-600" 
    : isActive 
      ? "text-blue-600 hover:text-blue-700" 
      : "text-gray-500 hover:text-gray-700";

  return (
    <div className={`${baseClasses} ${textClasses}`}>
      <span>{children}</span>
      {count && <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">{count}</span>}
    </div>
  );
};

export default NavItem;