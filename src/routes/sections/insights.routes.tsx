import NotImplementedPage from '@/pages/not-implemented';
import type { RouteObject } from "react-router-dom";
import { relativePath } from '../helper';
import { ROUTES } from '../paths';

const insightsRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <NotImplementedPage
        title='Insights'
      />
    ),
  },
  {
    path: relativePath(ROUTES.insights),
    element: <NotImplementedPage title="Insights" />,
  },
];

export default insightsRoutes;
