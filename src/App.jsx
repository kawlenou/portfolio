import { Route, Routes } from 'react-router-dom';
import LoginWithGoogle from './pages/auth/LoginWithGoogle';
import LoginWithMail from './pages/auth/LoginWithMail';
import OtpVerify from './pages/auth/OtpVerify';
import Home from './pages/Home';
import Booking from './pages/Booking';
import BookingCalendar from './pages/BookingCalendar';
import RouteProteger from './Routes/index';



function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login-with-google" element={<LoginWithGoogle />} />
      <Route path="/login-with-mail" element={<LoginWithMail />} />
      <Route path="/opt-verify" element={<OtpVerify />} />
      
      <Route
        path="/"
        element={
          <RouteProteger>
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
      
      {/* <Route
        path="/profil"
        element={
          <RouteProteger>
            <Profil />
          </RouteProteger>
        }
      />
       */}
      {/* Route admin avec vérification de rôle */}
      {/* <Route
        path="/admin"
        element={
          <RouteProteger rolesRequises={['admin']}>
            <EspaceAdmin />
          </RouteProteger>
        }
      /> */}
      
      {/* Route 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;