export const Header = ({ startDate, goToPreviousWeek, goToNextWeek }) => (
  <div className="p-6 pb-4 border-b border-gray-200">
    <div className="flex items-center justify-between">
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
      <div className="flex items-center space-x-4">
        <span className="text-gray-500 text-sm">GMT+7</span>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
          <img src="https://i.pravatar.cc/32" alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="text-sm pr-2">Profile</span>
        </div>
      </div>
    </div>
  </div>
);