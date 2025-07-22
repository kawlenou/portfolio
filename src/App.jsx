import { Route, Routes } from 'react-router-dom';
import RouteProteger from './routes/index.jsx';
import Home from './pages/Home';
import Booking from './features/booking/pages/Booking';
import BookingCalendar from './features/booking/pages/BookingCalendar';
import BookingRecap from './features/booking/pages/BookingRecap';
import AuthRoutes from './routes/AuthRoutes';
import DashboardRoutes from './routes/DashboardRoutes';
import NotFound from './pages/NotFound';

function App() {
  return (
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
      <Route
        path="/"
        element={
          <RouteProteger rolesRequises={['client']}>
            <Home />
          </RouteProteger>
        }
      />
      <Route
        path="/booking"
        element={
          <RouteProteger>
            <Booking />
          </RouteProteger>
        }
      />
      <Route
        path="/booking-calendar"
        element={
          <RouteProteger>
            <BookingCalendar />
          </RouteProteger>
        }
      />
      <Route
        path="/booking-recap"
        element={
          <RouteProteger>
            <BookingRecap />
          </RouteProteger>
        }
      />

      {/* Route 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;