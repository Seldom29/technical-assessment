import {
    faGaugeHigh,
    faTree,
    faShower,
    faClipboardCheck,
    faGear,
    faUsers,
    faTags,
    faSitemap,
    faCity,
    faTable,
    faTv
} from '@fortawesome/free-solid-svg-icons';

import {
    faHouse,
    faThumbsUp,
    faHardDrive,
    faFilePowerpoint,
    faCloud,
    faCamera,
} from '@fortawesome/free-regular-svg-icons';

import type { SidebarNavItemConfig } from '../app-layout/sidebar/sidebar-nav';

import { ROUTES } from '@/routes/paths';

export const navItems: SidebarNavItemConfig[] = [
    { section: 'Insights', icon: faGaugeHigh, sections: [], route: ROUTES.insights },
    { section: 'Collect', icon: faHardDrive, sections: [], route: ROUTES.collect },
    { section: 'Reviews', icon: faThumbsUp, sections: [], route: ROUTES.reviews },
    { section: 'Carbon', icon: faTree, sections: [], route: ROUTES.carbon },
    { section: 'Utilities', icon: faShower, sections: [], route: ROUTES.utilities },
    { section: 'Reports', icon: faFilePowerpoint, sections: [], route: ROUTES.reports },
    { section: 'Actions', icon: faClipboardCheck, sections: [], route: ROUTES.actions },
    {
        section: 'Settings',
        icon: faGear,
        position: 'footer',
        sections: [
            {
                section: 'Organisation',
                children: [
                    { label: 'Manage', icon: faHouse, route: ROUTES.settings.manage },
                    { label: 'Users', icon: faUsers, route: ROUTES.settings.users },
                    { label: 'Tags', icon: faTags, route: ROUTES.settings.tags },
                    { label: 'Integrations', route: ROUTES.settings.integrations },
                ],
            },
            {
                section: 'Utilities',
                children: [
                    { label: 'Configuration', icon: faGear, route: ROUTES.settings.utilities.configuration },
                    { label: 'Hierarchy', icon: faSitemap, route: ROUTES.settings.utilities.hierarchy },
                    { label: 'Assets', icon: faCity, route: ROUTES.settings.utilities.assets },
                ],
            },
            {
                section: 'Carbon',
                children: [
                    { label: 'Configuration', icon: faGear, route: ROUTES.settings.carbon.configuration },
                    { label: 'Hierarchy', icon: faSitemap, route: ROUTES.settings.carbon.hierarchy },
                    { label: 'Inventory Items', icon: faTable, route: ROUTES.settings.carbon.inventoryItems },
                    { label: 'Emission Factors', icon: faCloud, route: ROUTES.settings.carbon.emissionFactors },
                    { label: 'Snapshots', icon: faCamera, route: ROUTES.settings.carbon.snapshots, disabled: true },
                ],
            },
            {
                section: 'Displays',
                children: [{ label: 'Manage', icon: faTv, route: ROUTES.settings.displays.manage }],
            },
        ],
    },
];
