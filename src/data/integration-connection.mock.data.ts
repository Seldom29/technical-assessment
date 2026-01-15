import { faker } from "@faker-js/faker";
import { TENANTS, type Tenant } from './tenants.mock.data';
import { INTEGRATION_SERVICES, type IntegrationService } from './integration-services.mock.data';

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

faker.seed(2026);

const intervals: IntegrationConnection["interval"][] = ["-", "Monthly", "Yearly", "ToU"];

function makeEntityGroup(tenantName: string, source: IntegrationConnection["source"]) {
    if (source === "Carbon") {
        const carbonAreas = ["Energy", "Logistics", "Operations", "Facilities", "Manufacturing"];
        return `${tenantName} - ${faker.helpers.arrayElement(carbonAreas)}`;
    }

    const utilities = ["Electricity", "Gas", "Water"];
    const site = `${faker.number.int({ min: 10, max: 250 })} ${faker.location.street()}`
    return `${site} - ${faker.helpers.arrayElement(utilities)}`;
}

function makeConnectorUrl(integration: string, id: string) {
    const slug = integration.toLowerCase().replace(/\s+/g, "-");
    return `https://api.bravegen.io/connect/${slug}/${id}`;
}

export function generateConnections(count = 60): IntegrationConnection[] {
    return Array.from({ length: count }).map(() => {
        const tenant = faker.helpers.arrayElement(TENANTS);
        const source: IntegrationConnection["source"] = faker.helpers.arrayElement(["Carbon", "Utility"]);
        const integration = faker.helpers.arrayElement(INTEGRATION_SERVICES);
        const id = faker.string.uuid();
        return {
            id: faker.string.uuid(),
            integrationServiceId: integration.id,
            name: faker.commerce.productName(),
            source,
            tenantId: tenant.id,
            interval: faker.helpers.arrayElement(intervals),
            connectorUrl: makeConnectorUrl(integration.name, id),
            entityGroup: makeEntityGroup(tenant.name, source),
            integrationService: integration,
            tenant: tenant,
        };
    });
}
