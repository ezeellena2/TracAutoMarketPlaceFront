import { lazy, Suspense } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/app/layouts';
import { PageLoader } from '@/shared/ui/PageLoader';

// Lazy-loaded features para mejor code-splitting
const CatalogoPage = lazy(() => import('@/features/catalogo/pages/CatalogoPage').then(m => ({ default: m.CatalogoPage })));
const DetallePage = lazy(() => import('@/features/detalle/pages/DetallePage').then(m => ({ default: m.DetallePage })));

// Error pages - se cargan eager porque son pequeñas y críticas
import { NotFoundPage } from '@/shared/pages';

// Wrapper con Suspense para componentes lazy
const withSuspense = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspense(CatalogoPage),
      },
      {
        path: 'vehiculo/:id',
        element: withSuspense(DetallePage),
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
