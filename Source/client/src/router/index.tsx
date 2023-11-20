import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import FullScreenLoader from '../components/ui/FullScreenLoader';
import RequireUser from '../components/ui/RequireUser';

const Loadable = (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<FullScreenLoader />}>
      <Component {...props} />
    </Suspense>
  );

const LoginPage = Loadable(lazy(() => import('../pages/Login.page')));
const RegisterPage = Loadable(lazy(() => import('../pages/Register.page')));
const HomePage = Loadable(lazy(() => import('../pages/Home.page')));
const ProfilePage = Loadable(lazy(() => import('../pages/Profile.page')));
const UnauthorizePage = Loadable(lazy(() => import('../pages/NotFound.page')));
const EmailVerificationPage = Loadable(lazy(() => import('../pages/VerifyEmail.page')));

const authRoutes: RouteObject = {
  path: '*',
  children: [
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: 'verifyemail',
      element: <EmailVerificationPage />,
      children: [
        {
          path: ':verificationCode',
          element: <EmailVerificationPage />,
        },
      ],
    },
  ],
};

const normalRoutes: RouteObject = {
  path: '*',
  element: <RequireUser />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: 'profile',
      element: <ProfilePage />,
    },
    {
      path: '*',
      element: <UnauthorizePage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
