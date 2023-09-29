import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Login from './features/user/Login';
import MainScreen from './ui/MainScreen';
import { loader as tableLoader } from './features/maintable/CertTable';
import RouteError from './features/error/RouteError';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: 'certs',
        element: <MainScreen />,
        loader: tableLoader,
        errorElement: <RouteError />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
