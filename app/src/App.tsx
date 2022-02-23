import React from 'react';
import { selectAuth, setCredentialsAsync } from './app/authSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { currentUser } from './app/auth';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Dashboard } from './routes/Dashboard';
import { Login } from './routes/auth/Login';


export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export function ProtectedRoute({ isAuthenticated, authenticationPath, outlet }: ProtectedRouteProps) {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} replace />;
  }
};

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  console.log(auth);

  React.useEffect(() => {
    (async () => {
      // check user and set state
      dispatch(setCredentialsAsync());

      // auto logout
    })();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute isAuthenticated={currentUser} authenticationPath='/login' outlet={<Dashboard />} />} />

          <Route path="/login" element={<Login />} />
          {/* <Route path="/new-password" element={<NewPassword />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
