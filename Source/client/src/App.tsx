import { Suspense, lazy } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import ErrorPage from './layouts/ErrorPage';
import Navbar from './layouts/Navbar';
import RouteEnum from './constants/routeEnum';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Account = lazy(() => import('./pages/Account'));
const Setting = lazy(() => import('./pages/Setting'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<LinearProgress />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="/" element={<Navbar />}>
          <Route
            index
            element={
              <Suspense fallback={<LinearProgress />}>
                <Dashboard />
              </Suspense>
            }
          ></Route>
          <Route
            path={RouteEnum.DASHBOARD}
            element={
              <Suspense fallback={<LinearProgress />}>
                <Dashboard />
              </Suspense>
            }
          ></Route>
          <Route
            path={RouteEnum.ACCOUNT}
            element={
              <Suspense fallback={<LinearProgress />}>
                <Account />
              </Suspense>
            }
          ></Route>
          <Route
            path={RouteEnum.SETTING}
            element={
              <Suspense fallback={<LinearProgress />}>
                <Setting />
              </Suspense>
            }
          ></Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
