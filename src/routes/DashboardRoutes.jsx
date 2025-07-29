import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../dashboard/components/DashboardLayout';
import Service from '../dashboard/pages/Service';
import Projects from '../dashboard/pages/Projects';


const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="ajouter-service" element={<Service />} />
        <Route path="projects" element={<Projects />} />
      
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;