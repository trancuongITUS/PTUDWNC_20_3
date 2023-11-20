import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { useStateContext } from '../context';
import FullScreenLoader from '../components/ui/FullScreenLoader';
import React from 'react';
import { authApi } from '../services/authApi';
import { IUserResponse } from '../services/types';

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);
  const stateContext = useStateContext();

  const getMeFn = async () => {
    const response = await authApi.get<IUserResponse>('users/me');
    stateContext.dispatch({ type: 'SET_USER', payload: response.data.data.user });
    return response.data;
  };

  const query = useQuery({
    queryFn: getMeFn,
    queryKey: ['authUser'],
    enabled: !!cookies.logged_in,
  });
  if (query.isLoading && cookies.logged_in) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
