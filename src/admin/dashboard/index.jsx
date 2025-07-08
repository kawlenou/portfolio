import React from 'react';

const Dashboard = () => {
  const schedule = [
    {
      title: 'Podcast',
      start: '08:00',
      end: '09:00',
      day: '2025-07-10',
      color: 'bg-yellow-300',
      user: 'David Hidoo',
    },
    {
      title: 'Podcast',
      start: '09:00',
      end: '12:00',
      day: '2025-07-10',
      color: 'bg-orange-300',
      user: 'David Hidoo',
    },
    {
      title: 'Podcast',
      start: '12:00',
      end: '13:00',
      day: '2025-07-10',
      color: 'bg-purple-200',
      user: 'David Hidoo',
    },
    {
      title: 'Podcast',
      start: '08:00',
      end: '09:00',
      day: '2025-07-12',
      color: 'bg-green-200',
      user: 'David Hidoo',
    },
  ];

  const days = [
    { date: '2025-07-10', label: '10', day: 'lundi' },
    { date: '2025-07-11', label: '11', day: 'Mardi' },
    { date: '2025-07-12', label: '12', day: 'Mercredi' },
    { date: '2025-07-13', label: '13', day: 'jeudi' },
    { date: '2025-07-14', label: '14', day: 'vendredi' },
    { date: '2025-07-15', label: '15', day: 'Samedi' },
    { date: '2025-07-16', label: '16', day: 'Dimanche' },
  ];

  const hours = Array.from({ length: 12 }, (_, i) => `${(8 + i).toString().padStart(2, '0')}:00`);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#fefbf7] p-4 border-r">
        <div className="text-lg font-semibold mb-6">Dashboard</div>
        <nav className="space-y-4">
          <div className="font-medium">Reservation <span className="bg-gray-200 px-2 py-1 rounded text-sm">12</span></div>
          <div className="text-blue-600 cursor-pointer">+ Ajouter un service</div>
          <div className="text-sm text-gray-700">Liste de service</div>
          <div className="text-red-500 text-sm mt-10">Deleted</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Juillet 2025</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Gtm+7</span>
            <div className="w-8 h-8 bg-gray-200 rounded" />
            <div className="w-8 h-8 bg-gray-200 rounded" />
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 text-center border-b text-gray-600 text-sm">
          <div></div>
          {days.map((d, idx) => (
            <div key={idx} className={`py-2 ${d.label === '12' ? 'text-blue-500 font-bold' : ''}`}>
              <div>{d.label}</div>
              <div className="text-xs">{d.day}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8 text-sm divide-x divide-gray-100">
          {/* Hours */}
          <div className="flex flex-col text-gray-500">
            {hours.map((hour, idx) => (
              <div key={idx} className="h-16 flex items-start justify-end pr-2 pt-1">
                {hour}
              </div>
            ))}
          </div>

          {/* Days */}
          {days.map((day, idx) => (
            <div key={idx} className="border-l relative">
              {schedule
                .filter(s => s.day === day.date)
                .map((s, i) => {
                  const top = (parseInt(s.start.split(':')[0]) - 8) * 4; // 1 hour = 4rem (h-16)
                  const height = (parseInt(s.end.split(':')[0]) - parseInt(s.start.split(':')[0])) * 4;
                  return (
                    <div
                      key={i}
                      className={`absolute left-2 right-2 top-[${top}rem] h-[${height}rem] ${s.color} rounded-lg p-2 shadow-md text-sm text-black`}
                      style={{ top: `${top}rem`, height: `${height}rem` }}
                    >
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-xs flex items-center gap-1 mt-1">
                        <img src="https://i.pravatar.cc/24" alt="avatar" className="w-5 h-5 rounded-full" />
                        {s.user}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
