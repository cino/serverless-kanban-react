import { Dashboard, Projects, Calendar, Reports, Team, Login, Register } from './routes';
import { ProtectedRoute, PublicRoute } from './routes/helpers';
import { ForgotPassword } from './routes/auth/ForgotPassword';
import { Verify } from './routes/auth/Verify';
import { NewPassword } from './routes/auth/NewPassword';
import { ConfirmPassword } from './routes/auth/ConfirmPassword';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Account } from './routes/user/Account';
import { Password } from './routes/user/Password';
import { Notifications } from './routes/user/Notifications';

// Routes as an object to re-use paths.
export const routes = {
  index: '/',
  team: '/team',
  projects: '/projects',
  calendar: '/calendar',
  reports: '/reports',

  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    confirmPassword: '/auth/confirm-password',
    verify: '/auth/verify',
    newPassword: '/auth/new-password',
  },

  user: {
    account: '/account',
    notifications: '/account/notifications',
    password: '/account/password',
  },
}

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<ProtectedRoute outlet={<Dashboard />} />} />
          <Route path={routes.user.account} element={<ProtectedRoute outlet={<Account />} />} />
          <Route path={routes.user.notifications} element={<ProtectedRoute outlet={<Notifications />} />} />
          <Route path={routes.user.password} element={<ProtectedRoute outlet={<Password />} />} />

          <Route path={routes.team} element={<ProtectedRoute outlet={<Team />} />} />
          <Route path={routes.projects} element={<ProtectedRoute outlet={<Projects />} />} />
          <Route path={routes.calendar} element={<ProtectedRoute outlet={<Calendar />} />} />
          <Route path={routes.reports} element={<ProtectedRoute outlet={<Reports />} />} />

          <Route path={routes.auth.login} element={<PublicRoute outlet={<Login />} />} />
          <Route path={routes.auth.register} element={<PublicRoute outlet={<Register />} />} />
          <Route path={routes.auth.forgotPassword} element={<PublicRoute outlet={<ForgotPassword />} />} />
          <Route path={routes.auth.confirmPassword} element={<PublicRoute outlet={<ConfirmPassword />} />} />
          <Route path={routes.auth.verify} element={<PublicRoute outlet={<Verify />} />} />
          <Route path={routes.auth.newPassword} element={<PublicRoute outlet={<NewPassword />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
