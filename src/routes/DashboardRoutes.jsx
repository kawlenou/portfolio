import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../features/dashboard/components/DashboardLayout';
import Calendar from '../features/dashboard/pages/Calendar';
import Service from '../features/dashboard/pages/Service';
import ListeServices from '../features/dashboard/pages/ListeServices';
//import DashboardReservations from '../pages/dashboard/Reservations';
//import DashboardSettings from '../pages/dashboard/Settings';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Calendar />} />
        <Route path="ajouter-service" element={<Service />} />
        <Route path="liste-service" element={<ListeServices />} />
        {/* <Route path="reservations" element={<DashboardReservations />} />
        <Route path="settings" element={<DashboardSettings />} /> */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;