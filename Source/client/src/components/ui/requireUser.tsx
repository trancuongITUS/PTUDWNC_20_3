import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStateContext } from '../../context';
import FullScreenLoader from './FullScreenLoader';
import { authApi } from '../../services/authApi';
import { IUserResponse } from 'services/types';

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();
  const stateContext = useStateContext();

  const getMeFn = async () => {
    const response = await authApi.get<IUserResponse>('users/me');
    stateContext.dispatch({ type: 'SET_USER', payload: response.data.data.user });
    return response.data;
  };

  const { isLoading, isFetching, data } = useQuery({
    queryFn: getMeFn,
    queryKey: ['authUser'],
    retry: 1,
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return <FullScreenLoader />;
  }

  return (cookies.logged_in || data?.data.user) &&
    allowedRoles.includes(data?.data.user?.role as string) ? (
    <Outlet />
  ) : cookies.logged_in && data?.data.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
