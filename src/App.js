import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Login from './features/user/Login';
import MainScreen from './ui/MainScreen';
import { loader as tableLoader } from './features/maintable/CertTable';
import ErrorBanner from './features/error/ErrorBanner';

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
        errorElement: <ErrorBanner />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
