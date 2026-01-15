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
    faTv,
    faLink,
    type IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import {
    faHouse,
    faThumbsUp,
    faHardDrive,
    faFilePowerpoint,
    faCloud,
    faCamera,
} from '@fortawesome/free-regular-svg-icons';

import { ROUTES } from '@/routes/paths';

export type NavItemConfig = {
    label: string;
    icon?: IconDefinition;
    active?: boolean;
    route?: string;
    position?: 'main' | 'footer';
    children?: NavItemConfig[],
    disabled?: boolean
};

export const navItems: NavItemConfig[] = [
    { label: 'Insights', icon: faGaugeHigh, children: [], route: ROUTES.insights },
    { label: 'Collect', icon: faHardDrive, children: [], route: ROUTES.collect },
    { label: 'Reviews', icon: faThumbsUp, children: [], route: ROUTES.reviews },
    { label: 'Carbon', icon: faTree, children: [], route: ROUTES.carbon },
    { label: 'Utilities', icon: faShower, children: [], route: ROUTES.utilities },
    { label: 'Reports', icon: faFilePowerpoint, children: [], route: ROUTES.reports },
    { label: 'Actions', icon: faClipboardCheck, children: [], route: ROUTES.actions },
    {
        label: 'Settings',
        icon: faGear,
        position: 'footer',
        children: [
            {
                label: 'Organisation',
                children: [
                    { label: 'Manage', icon: faHouse, route: ROUTES.settings.manage },
                    { label: 'Users', icon: faUsers, route: ROUTES.settings.users },
                    { label: 'Tags', icon: faTags, route: ROUTES.settings.tags },
                    { label: 'Integrations', icon: faLink, route: ROUTES.settings.integrations },
                ],
            },
            {
                label: 'Utilities',
                children: [
                    { label: 'Configuration', icon: faGear, route: ROUTES.settings.utilities.configuration },
                    { label: 'Hierarchy', icon: faSitemap, route: ROUTES.settings.utilities.hierarchy },
                    { label: 'Assets', icon: faCity, route: ROUTES.settings.utilities.assets },
                ],
            },
            {
                label: 'Carbon',
                children: [
                    { label: 'Configuration', icon: faGear, route: ROUTES.settings.carbon.configuration },
                    { label: 'Hierarchy', icon: faSitemap, route: ROUTES.settings.carbon.hierarchy },
                    { label: 'Inventory Items', icon: faTable, route: ROUTES.settings.carbon.inventoryItems },
                    { label: 'Emission Factors', icon: faCloud, route: ROUTES.settings.carbon.emissionFactors },
                    { label: 'Snapshots', icon: faCamera, route: ROUTES.settings.carbon.snapshots, disabled: true },
                ],
            },
            {
                label: 'Displays',
                children: [{ label: 'Manage', icon: faTv, route: ROUTES.settings.displays.manage }],
            },
        ],
    },
];
