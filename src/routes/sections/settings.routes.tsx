import type { RouteObject } from 'react-router-dom';
import { ROUTES } from '@/routes/paths';
import NotImplementedPage from '@/pages/not-implemented';
import { relativePath } from '../helper';

const settingsRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <NotImplementedPage
        title='Settings'
        description='Select a section from the Settings menu.'
      />
    ),
  },

  // Organisation
  {
    path: relativePath(ROUTES.settings.manage),
    element: <NotImplementedPage title='Manage' />,
  },
  {
    path: relativePath(ROUTES.settings.users),
    element: <NotImplementedPage title='Users' />,
  },
  {
    path: relativePath(ROUTES.settings.tags),
    element: <NotImplementedPage title='Tags' />,
  },
  {
    path: relativePath(ROUTES.settings.integrations),
    element: <NotImplementedPage title='Integrations' />,
  },

  // Utilities
  {
    path: relativePath(ROUTES.settings.utilities.configuration),
    element: <NotImplementedPage title='Utilities Configuration' />,
  },
  {
    path: relativePath(ROUTES.settings.utilities.hierarchy),
    element: <NotImplementedPage title='Utilities Hierarchy' />,
  },
  {
    path: relativePath(ROUTES.settings.utilities.assets),
    element: <NotImplementedPage title='Utilities Assets' />,
  },

  // Carbon
  {
    path: relativePath(ROUTES.settings.carbon.configuration),
    element: <NotImplementedPage title='Carbon Configuration' />,
  },
  {
    path: relativePath(ROUTES.settings.carbon.hierarchy),
    element: <NotImplementedPage title='Carbon Hierarchy' />,
  },
  {
    path: relativePath(ROUTES.settings.carbon.inventoryItems),
    element: <NotImplementedPage title='Inventory Items' />,
  },
  {
    path: relativePath(ROUTES.settings.carbon.emissionFactors),
    element: <NotImplementedPage title='Emission Factors' />,
  },
  {
    path: relativePath(ROUTES.settings.carbon.snapshots),
    element: <NotImplementedPage title='Snapshots' />,
  },

  // Displays
  {
    path: relativePath(ROUTES.settings.displays.manage),
    element: <NotImplementedPage title='Displays Manage' />,
  },
];

export default settingsRoutes;
