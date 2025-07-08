import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const Dashboard = () => {
  const [startDate, setStartDate] = useState(dayjs('2025-07-10'));

  const schedule = [
    { title: 'Podcast', start: '08:00', end: '09:00', day: '2025-07-10', color: 'bg-yellow-200', user: 'David Hidoo' },
    { title: 'Podcast', start: '09:00', end: '12:00', day: '2025-07-10', color: 'bg-orange-200', user: 'David Hidoo' },
    { title: 'Podcast', start: '12:00', end: '13:00', day: '2025-07-10', color: 'bg-purple-200', user: 'David Hidoo' },
    { title: 'Podcast', start: '08:00', end: '09:00', day: '2025-07-12', color: 'bg-green-200', user: 'David Hidoo' },
  ];

  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = startDate.add(i, 'day');
      return {
        date: date.format('YYYY-MM-DD'),
        label: date.format('D'),
        day: date.format('dddd'),
      };
    });
  };

  const days = getWeekDays();
  const hours = Array.from({ length: 13 }, (_, i) => `${(8 + i).toString().padStart(2, '0')}:00`);

  const goToPreviousWeek = () => setStartDate(startDate.subtract(7, 'day'));
  const goToNextWeek = () => setStartDate(startDate.add(7, 'day'));

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#fdf9f3] p-6 border-r border-gray-200 flex flex-col">
        <h2 className="font-bold mb-8 text-gray-800">Dashboard</h2>
        <nav className="space-y-5 flex-1">
          <div className="flex justify-between items-center text-gray-700 hover:text-red cursor-pointer">
            <span>Reservation</span>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">12</span>
          </div>
          <div className="text-blue-600 cursor-pointer hover:text-blue-700">
            + Ajouter un service
          </div>
          <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
            Liste de service
          </div>
          <div className="text-red-500 mt-12 hover:text-red-600 cursor-pointer">
            Deleted
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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

        {/* Calendar */}
        <div className="flex-1 overflow-auto p-6 pt-2">
          {/* Days Header */}
          <div className="grid grid-cols-8 gap-px mb-2">
            <div className="h-16"></div>
            {days.map((d, idx) => (
              <div key={idx} className={`h-16 flex flex-col items-center justify-center ${d.label === startDate.format('D') ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'} rounded-lg`}>
                <div className="text-lg font-bold">{d.label}</div>
                <div className="text-xs capitalize">{d.day}</div>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="relative grid grid-cols-8 gap-px">
            {/* Hours */}
            <div className="flex flex-col">
              {hours.map((hour, idx) => (
                <div key={idx} className="h-24 pr-2 text-right font-bold  flex items-start justify-end border-t border-gray-200">
                  {hour}
                </div>
              ))}
            </div>

            {/* Columns */}
            {days.map((day, idx) => (
              <div key={idx} className="relative bg-white border-l border-gray-100">
                {hours.map((_, i) => (
                  <div key={i} className="h-24 border-b border-gray-100 hover:bg-gray-50" />
                ))}

                {/* Events */}
                {schedule
                  .filter(s => s.day === day.date)
                  .map((s, i) => {
                    const [sh, sm] = s.start.split(':').map(Number);
                    const [eh, em] = s.end.split(':').map(Number);
                    const top = ((sh - 8) * 60 + sm) * 1.6;
                    const height = ((eh - sh) * 60 + (em - sm)) * 1.6;

                    return (
                      <div
                        key={i}
                        className={`absolute left-1 right-1 rounded-lg p-3 text-black text-sm shadow border ${s.color}`}
                        style={{ top: `${top}px`, height: `${height}px`, zIndex: 10 }}
                      >
                        <div className="font-medium truncate">{s.title}</div>
                        <div className="text-xs flex items-center gap-2 mt-1">
                          <img src="https://i.pravatar.cc/20" alt="avatar" className="w-7 h-7 rounded-full" />
                          <span className="truncate">{s.user}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
