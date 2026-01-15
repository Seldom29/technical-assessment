import { createHashRouter } from 'react-router-dom';
import insightsRoutes from './sections/insights.routes';
import collectRoutes from './sections/collect.routes';
import reviewsRoutes from './sections/reviews.routes';
import carbonRoutes from './sections/carbon.routes';
import reportsRoutes from './sections/reports.routes';
import utilitiesRoutes from './sections/utilities.routes';
import actionsRoutes from './sections/actions.routes';
import settingsRoutes from './sections/settings.routes';
import AppLayout from '@/app-layout';

export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      ...insightsRoutes,
      ...collectRoutes,
      ...reviewsRoutes,
      ...carbonRoutes,
      ...utilitiesRoutes,
      ...reportsRoutes,
      ...actionsRoutes,
      ...settingsRoutes,
    ],
  },
]);
