import NotImplementedPage from '@/pages/not-implemented';
import type { RouteObject } from 'react-router-dom';
import { relativePath } from '../helper';
import { ROUTES } from '../paths';

const reportsRoutes: RouteObject[] = [
  {
    path: relativePath(ROUTES.reports),
    element: <NotImplementedPage title='Reports' />,
  },
];

export default reportsRoutes;
