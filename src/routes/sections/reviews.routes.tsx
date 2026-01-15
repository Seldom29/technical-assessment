import NotImplementedPage from '@/pages/not-implemented';
import type { RouteObject } from 'react-router-dom';
import { relativePath } from '../helper';
import { ROUTES } from '../paths';

const reviewsRoutes: RouteObject[] = [
  {
    path: relativePath(ROUTES.reviews),
    element: <NotImplementedPage title='Reviews' />,
  },
];

export default reviewsRoutes;
