import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Register from './components/register/register';
import Login from './components/login/login';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
        path: '/register',
        element: <Register />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default Router;