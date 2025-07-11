import React from 'react';

const DateNavigation = ({ startDate, goToPreviousWeek, goToNextWeek }) => {
  return (
    <div className="flex items-center space-x-4">
      <button onClick={goToPreviousWeek} className="p-2 rounded-lg hover:bg-gray-100">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 className="text-2xl font-bold text-gray-800">
        {startDate.format('MMMM YYYY')}
      </h1>
      <button onClick={goToNextWeek} className="p-2 rounded-lg hover:bg-gray-100">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default DateNavigation;