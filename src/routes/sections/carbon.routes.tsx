import NotImplementedPage from '@/pages/not-implemented';
import type { RouteObject } from 'react-router-dom';
import { relativePath } from '../helper';
import { ROUTES } from '../paths';

const carbonRoutes: RouteObject[] = [
  {
    path: relativePath(ROUTES.carbon),
    element: <NotImplementedPage title='Carbon' />,
  },
];

export default carbonRoutes;
