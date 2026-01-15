import { faker } from "@faker-js/faker";

export type Tenant = {
    id: string;
    name: string;
};

faker.seed(2026);

export function generateTenants(count = 20): Tenant[] {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
    }));
}

export const TENANTS = generateTenants(50)