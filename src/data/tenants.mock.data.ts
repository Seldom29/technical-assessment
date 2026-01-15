import { faker } from "@faker-js/faker";
import type { Tenant } from './data.types';

faker.seed(2026);

export function generateTenants(count = 20): Tenant[] {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
    }));
}

export const TENANTS = generateTenants(50)