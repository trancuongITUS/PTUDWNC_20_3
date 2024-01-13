import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import CheckLogin from '../middleware/CheckLogin';
import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import Loader from '../common/Loader';
import ForgotPassword from '../pages/Authentication/ForgotPassword';

const Loadable = (Component: React.ComponentType<any>) => (props: JSX.IntrinsicAttributes) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

const DefaultLayout = lazy(() => import('../layout/DefaultLayout'));
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));
const JoinedClasses = Loadable(lazy(() => import('../pages/Dashboard/JoinedClasses')));
const CreateClass = Loadable(lazy(() => import('../pages/Dashboard/CreateClass')));
const ClassDetail = Loadable(lazy(() => import('../pages/Dashboard/ClassDetail')));
const Calendar = Loadable(lazy(() => import('../pages/Calendar')));
const Chart = Loadable(lazy(() => import('../pages/Chart')));
const FormElements = Loadable(lazy(() => import('../pages/Form/FormElements')));
const FormLayout = Loadable(lazy(() => import('../pages/Form/FormLayout')));
const ProfileX = Loadable(lazy(() => import('../pages/ProfileX')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
const ChangePassword = Loadable(lazy(() => import('../pages/ChangePassword')));
const Tables = Loadable(lazy(() => import('../pages/Tables')));
const Alerts = Loadable(lazy(() => import('../pages/UiElements/Alerts')));
const Buttons = Loadable(lazy(() => import('../pages/UiElements/Buttons')));
const Users = Loadable(lazy(() => import('../pages/Admin/Users')));
const Classes = Loadable(lazy(() => import('../pages/Admin/Classes')));
const Students = Loadable(lazy(() => import('../pages/Admin/Students')));
const GradeStructureChart = Loadable(lazy(() => import('../pages/Dashboard/GradeStructureChart')));
const MemberTable = Loadable(lazy(() => import('../pages/Dashboard/MemberTable')));
const ClassDashboard = Loadable(lazy(() => import('../pages/Dashboard/ClassDashboard')));
const JoinClassByLinkCallback = Loadable(lazy(() => import('../pages/Dashboard/JoinClassByLinkCallback')));
const GradeBoard = Loadable(lazy(() => import('../pages/Dashboard/GradeBoard')));
const GradeReview = Loadable(lazy(() => import('../pages/Dashboard/GradeReview')));

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
    {
      path: 'forgot-password',
      element: <ForgotPassword />,
    },
  ],
};

const coreRoutes: RouteObject = {
  path: '*',
  element: <DefaultLayout />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: 'joined-classes',
      element: <JoinedClasses />,
    },
    {
      path: 'create-class',
      element: <CreateClass />,
    },
    {
      path: 'class/:id',
      element: <ClassDetail />,
    },
    {
      path: 'calendar',
      element: <Calendar />,
    },
    {
      path: 'profile-x',
      element: <ProfileX />,
    },
    {
      path: 'forms/form-elements',
      element: <FormElements />,
    },
    {
      path: 'forms/form-layout',
      element: <FormLayout />,
    },
    {
      path: 'tables',
      element: <Tables />,
    },
    {
      path: 'profile',
      element: <Profile />,
    },
    {
      path: 'change-password',
      element: <ChangePassword />,
    },
    {
      path: 'chart',
      element: <Chart />,
    },
    {
      path: 'ui/alerts',
      element: <Alerts />,
    },
    {
      path: 'ui/buttons',
      element: <Buttons />,
    },
    {
      path: 'admin/users',
      element: <Users />,
    },
    {
      path: 'admin/classes',
      element: <Classes />,
    },
    {
      path: 'admin/students',
      element: <Students />,
    },
    {
      path: 'class/:id/grade-stucture',
      element: <GradeStructureChart />,
    },
    {
      path: 'class/:id/members',
      element: <MemberTable />,
    },
    {
      path: 'class/:id/dashboard',
      element: <ClassDashboard />,
    },
    {
      path: 'join-class-callback/:invitationLinkCode',
      element: <JoinClassByLinkCallback />,
    },
    {
      path: 'class/:id/grade-board',
      element: <GradeBoard />,
    },
    {
      path: 'class/grade-review/:idClass/:idClassStudent',
      element: <GradeReview />,
    }
  ],
};

const routes: RouteObject[] = [authRoutes, coreRoutes];
export default routes;
