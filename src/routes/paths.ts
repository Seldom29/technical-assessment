export const ROUTES = {
    insights: '/insigts/',
    carbon: '/carbon/',
    collect: '/collect/',
    utilities: '/utilities/',
    reports: '/reports/',
    reviews: '/reviews/',
    actions: '/actions/',
    settings: {
        manage: '/settings/manage',
        users: '/settings/users',
        tags: '/settings/tags',
        integrations: '/settings/integrations',

        utilities: {
            configuration: '/settings/utilities/configuration',
            hierarchy: '/settings/utilities/hierarchy',
            assets: '/settings/utilities/assets',
        },

        carbon: {
            configuration: '/settings/carbon/configuration',
            hierarchy: '/settings/carbon/hierarchy',
            inventoryItems: '/settings/carbon/inventory-items',
            emissionFactors: '/settings/carbon/emission-factors',
            snapshots: '/settings/carbon/snapshots',
        },

        displays: {
            manage: '/settings/displays/manage',
        },
    },
};
