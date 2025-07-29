import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';

import RouteProteger from './routes/index.jsx';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <Router> {/* <== AJOUTÉ ICI */}
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Routes du dashboard */}
        <Route 
          path="/dashboard/*" 
          element={
            <RouteProteger rolesRequises={['admin']}>
              <DashboardRoutes />
            </RouteProteger>
          } 
        />

        {/* Routes publiques protégées */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />

        {/* Route 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
