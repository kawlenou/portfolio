import { Route, Routes } from 'react-router-dom';
import Login from '../features/dashboard/pages/Login';
import LoginWithGoogle from '../features/auth/pages/LoginWithGoogle';
import LoginWithMail from '../features/auth/pages/LoginWithMail';
import OtpVerify from '../features/auth/pages/OtpVerify';
import Register from '../features/auth/pages/Register';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard/login" element={<Login />} />
      <Route path="login-with-google" element={<LoginWithGoogle />} />
      <Route path="login-with-mail" element={<LoginWithMail />} />
      <Route path="register" element={<Register />} />
      <Route path="otp-verify" element={<OtpVerify />} />
    </Routes>
  );
};

export default AuthRoutes;