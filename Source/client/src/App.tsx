import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Loader from './common/Loader';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const content = useRoutes(routes);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <ToastContainer />
      {content}
    </>
  );
}

export default App;
