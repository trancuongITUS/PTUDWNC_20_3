import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import CheckLogin from '../middleware/CheckLogin';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Loader from '../common/Loader';

const Loadable =
  (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const DefaultLayout = lazy(() => import('../layout/DefaultLayout'));
const ECommerce = Loadable(lazy(() => import('../pages/Dashboard/ECommerce')));
const Calendar = Loadable(lazy(() => import('../pages/Calendar')));
const Chart = Loadable(lazy(() => import('../pages/Chart')));
const FormElements = Loadable(lazy(() => import('../pages/Form/FormElements')));
const FormLayout = Loadable(lazy(() => import('../pages/Form/FormLayout')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
const Settings = Loadable(lazy(() => import('../pages/Settings')));
const Tables = Loadable(lazy(() => import('../pages/Tables')));
const Alerts = Loadable(lazy(() => import('../pages/UiElements/Alerts')));
const Buttons = Loadable(lazy(() => import('../pages/UiElements/Buttons')));

const authRoutes: RouteObject = {
  path: '*',
  element: <CheckLogin />,
  children: [
    {
      path: 'login',
      element: <SignIn />,
    },
    {
      path: 'register',
      element: <SignUp />,
    },
    // {
    //   path: 'verifyemail',
    //   element: <EmailVerificationPage />,
    //   children: [
    //     {
    //       path: ':verificationCode',
    //       element: <EmailVerificationPage />,
    //     },
    //   ],
    // },
  ],
};

const coreRoutes: RouteObject = {
  path: '*',
  element: <DefaultLayout />,
  children: [
    {
      index: true,
      // title: 'Calender',
      element: <ECommerce />,
    },
    {
      path: 'calendar',
      // title: 'Calender',
      element: <Calendar />,
    },
    {
      path: 'profile',
      // title: 'Profile',
      element: <Profile />,
    },
    {
      path: 'forms/form-elements',
      // title: 'Forms Elements',
      element: <FormElements />,
    },
    {
      path: 'forms/form-layout',
      // title: 'Form Layouts',
      element: <FormLayout />,
    },
    {
      path: 'tables',
      // title: 'Tables',
      element: <Tables />,
    },
    {
      path: 'settings',
      // title: 'Settings',
      element: <Settings />,
    },
    {
      path: 'chart',
      // title: 'Chart',
      element: <Chart />,
    },
    {
      path: 'ui/alerts',
      // title: 'Alerts',
      element: <Alerts />,
    },
    {
      path: 'ui/buttons',
      // title: 'Buttons',
      element: <Buttons />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, coreRoutes];
export default routes;
