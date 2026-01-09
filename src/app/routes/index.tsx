import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/app/layouts';

// Features
import { CatalogoPage } from '@/features/catalogo';
import { DetallePage } from '@/features/detalle';

// Error pages
import { NotFoundPage } from '@/shared/pages';

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
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
