import NotImplementedPage from '@/pages/not-implemented';
import type { RouteObject } from 'react-router-dom';
import { relativePath } from '../helper';
import { ROUTES } from '../paths';

const collectRoutes: RouteObject[] = [
  {
    path: relativePath(ROUTES.collect),
    element: <NotImplementedPage title='Collect' />,
  },
];

export default collectRoutes;
