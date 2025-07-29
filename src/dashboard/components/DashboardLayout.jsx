import { Outlet } from 'react-router-dom';
import DashboardSidebar from './Sidebar/Sidebar.jsx';
import DashboardTopbar from './Topbar/Topbar.jsx';
import dayjs from 'dayjs';
import { useState } from 'react';

const DashboardLayout = () => {
  const [startDate, setStartDate] = useState(() => dayjs('2025-07-10'));

  const goToPreviousWeek = () => setStartDate(startDate.subtract(7, 'day'));
  const goToNextWeek = () => setStartDate(startDate.add(7, 'day'));

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <DashboardSidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopbar
          startDate={startDate}
          goToPreviousWeek={goToPreviousWeek}
          goToNextWeek={goToNextWeek}
        />
        <div className="flex-1 overflow-auto p-6 pt-2">
          <Outlet context={{ startDate }} /> {/* Ici s'afficheront les pages du dashboard */}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;