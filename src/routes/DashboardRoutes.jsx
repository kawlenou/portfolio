import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import DashboardCalendar from '../features/dashboard/components/Calendar';
//import DashboardReservations from '../pages/dashboard/Reservations';
//import DashboardSettings from '../pages/dashboard/Settings';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardCalendar />} />
        {/* <Route path="reservations" element={<DashboardReservations />} />
        <Route path="settings" element={<DashboardSettings />} /> */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;