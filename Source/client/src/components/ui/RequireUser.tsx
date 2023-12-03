import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { IUserResponse } from 'services/types';
import { useStateContext } from '../../context';
import { authApi } from '../../services/authApi';
import FullScreenLoader from './FullScreenLoader';
import Header from './Header';

const RequireUser = () => {
  const location = useLocation();
  const stateContext = useStateContext();

  const getMeFn = async () => {
    const response = await authApi.get<IUserResponse>(`users/me`);
    stateContext.dispatch({ type: 'SET_USER', payload: response.data.result });
    return response.data.result;
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

  return data ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
