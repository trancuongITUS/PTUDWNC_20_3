import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStateContext } from '../context';
import { IUserResponse } from '../services/types';
import { api } from '../api';
import Loader from '../common/Loader';

const CheckLogin = () => {
  const location = useLocation();
  const stateContext = useStateContext();

  const getMeFn = async () => {
    const response = await api.get<IUserResponse>(`users/me`);
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
    return <Loader />;
  }

  return !data ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default CheckLogin;
