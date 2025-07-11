import React from 'react';

const ProfileMenu = () => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-500 text-sm">GMT+7</span>
      <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
        <img src="https://i.pravatar.cc/32" alt="Profile" className="w-8 h-8 rounded-full" />
        <span className="text-sm pr-2">Profile</span>
      </div>
    </div>
  );
};

export default ProfileMenu;