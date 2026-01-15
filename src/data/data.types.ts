export type IntegrationConnection = {
    id: string;
    name: string;
    source: 'Carbon' | 'Utility';
    interval: '-' | 'Monthly' | 'Yearly' | 'ToU';
    connectorUrl: string;
    instructions?: string;
    entityGroup: string;
    tenantId: string;
    integrationServiceId: string;

    tenant?: Tenant;
    integrationService?: IntegrationService
};

export type Tenant = {
    id: string;
    name: string;
};

export type IntegrationService = {
    id: string;
    name: string;
    description: string;
    logo?: string;
};


