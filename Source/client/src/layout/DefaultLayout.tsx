import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { api } from '../api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useStateContext } from '../context';
import { IUserResponse } from '../services/types';

const DefaultLayout = () => {
  const location = useLocation();
  const stateContext = useStateContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMeFn = async () => {
    const response = await api.get<IUserResponse>(`users/me`);
    stateContext.dispatch({ type: 'SET_USER', payload: response.data.result });
    return response.data.result;
  };

  const { data } = useQuery({
    queryFn: getMeFn,
    queryKey: ['authUser'],
    retry: 1,
  });

  if (!data) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
