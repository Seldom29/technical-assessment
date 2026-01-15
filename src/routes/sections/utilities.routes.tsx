import NotImplementedPage from '@/pages/not-implemented';
import type { RouteObject } from 'react-router-dom';
import { relativePath } from '../helper';
import { ROUTES } from '../paths';

const utilitiesRoutes: RouteObject[] = [
  {
    path: relativePath(ROUTES.utilities),
    element: <NotImplementedPage title='Utilities' />,
  },
];

export default utilitiesRoutes;
