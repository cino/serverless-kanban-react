import React from 'react';
import { selectAuth, setCredentialsAsync } from './app/authSlice';
import { useAppDispatch } from './app/hooks';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from './routes/Dashboard';
import { Login } from './routes/auth/Login';
import { Register } from './routes/auth/Register';
import { ProtectedRoute, PublicRoute } from './routes/helpers';
import { ForgotPassword } from './routes/auth/ForgotPassword';
import { Verify } from './routes/auth/Verify';
import { NewPassword } from './routes/auth/NewPassword';
import { useSelector } from 'react-redux';

export const App = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectAuth);

  React.useEffect(() => {
    (async () => {
      // check user and set state
      dispatch(setCredentialsAsync());

      console.log('okeey');
      // auto logout
    })();
  }, []);

  const protectedProps = {
    isAuthenticated: user.signedIn,
    authenticationPath: '/auth/login',
  }

  const publicProps = {
    isAuthenticated: user.signedIn
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute {...protectedProps} outlet={<Dashboard />} />} />
          <Route path='/dashboard' element={<ProtectedRoute {...protectedProps} outlet={<Dashboard />} />} />

          <Route path='/auth/login' element={<PublicRoute {...publicProps} outlet={<Login />} />} />
          <Route path='/auth/register' element={<PublicRoute {...publicProps} outlet={<Register />} />} />
          <Route path='/auth/forgot-password' element={<PublicRoute {...publicProps} outlet={<ForgotPassword />} />} />
          <Route path='/auth/verify' element={<PublicRoute {...publicProps} outlet={<Verify />} />} />
          <Route path='/auth/new-password' element={<PublicRoute {...publicProps} outlet={<NewPassword />} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
