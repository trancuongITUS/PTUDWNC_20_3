import { Toaster } from 'react-hot-toast';

import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';

function App() {
  const content = useRoutes(routes);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} containerClassName="overflow-auto" />
      <ToastContainer />
      {content}
    </>
  );
}

export default App;
