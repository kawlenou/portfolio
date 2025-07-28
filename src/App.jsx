import { Route, Routes } from 'react-router-dom';
import RouteProteger from './routes/index.jsx';
import Home from './pages/Home';
import Booking from './features/booking/pages/Booking';
import BookingCalendar from './features/booking/pages/BookingCalendar';
import BookingRecap from './features/booking/pages/BookingRecap';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import NotFound from './pages/NotFound';
import PublicLayout from './components/layouts/PublicLayout';

function App() {
  return (
    <Routes>
      {/* Routes d'authentification (pas de header/footer) */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Routes du dashboard (protéger avec layout admin plus tard si besoin) */}
      <Route 
        path="/dashboard/*" 
        element={
          <RouteProteger rolesRequises={['admin']}>
            <DashboardRoutes />
          </RouteProteger>
        } 
      />

      {/* Routes publiques avec Header/Footer */}
      <Route
        path="/"
        element={
          <RouteProteger rolesRequises={['client']}>
            <PublicLayout>
              <Home />
            </PublicLayout>
          </RouteProteger>
        }
      />
      <Route
        path="/booking"
        element={
          <RouteProteger rolesRequises={['client']}>
            <PublicLayout>
              <Booking />
            </PublicLayout>
          </RouteProteger>
        }
      />
      <Route
        path="/booking-calendar"
        element={
          <RouteProteger rolesRequises={['client']}>
            <PublicLayout>
              <BookingCalendar />
            </PublicLayout>
          </RouteProteger>
        }
      />
      <Route
        path="/booking-recap"
        element={
          <RouteProteger rolesRequises={['client']}>
            <PublicLayout>
              <BookingRecap />
            </PublicLayout>
          </RouteProteger>
        }
      />

      {/* Page 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
