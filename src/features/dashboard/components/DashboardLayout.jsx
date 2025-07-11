import { Outlet } from 'react-router-dom';
import DashboardSidebar from './Sidebar/index.jsx';
import DashboardTopbar from './Topbar/index.jsx';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardTopbar />
        <div className="flex-1 overflow-auto p-6 pt-2">
          <Outlet /> {/* Ici s'afficheront les pages du dashboard */}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;