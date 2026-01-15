import NotImplementedPage from '@/pages/not-implemented';
import type { RouteObject } from 'react-router-dom';
import { relativePath } from '../helper';
import { ROUTES } from '../paths';

const actionsRoutes: RouteObject[] = [
  {
    path: relativePath(ROUTES.actions),
    element: <NotImplementedPage title='Actions' />,
  },
];

export default actionsRoutes;
