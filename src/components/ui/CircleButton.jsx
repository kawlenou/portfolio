import React from 'react';

const CircleButton = ({ icon: Icon, onClick, size = 'w-8 h-8', bgColor = 'bg-primary', iconColor = 'text-white' }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full flex items-center justify-center ${size} ${bgColor} ${iconColor} hover:scale-105 transition duration-200`}
    >
      <Icon className={`w-1/2 h-1/2`} />
    </button>
  );
};

export default CircleButton;
