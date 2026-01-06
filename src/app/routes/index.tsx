import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from '@/app/layouts';

// Features
import { CatalogoPage } from '@/features/catalogo';
import { DetallePage } from '@/features/detalle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <CatalogoPage />,
      },
      {
        path: 'vehiculo/:id',
        element: <DetallePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
