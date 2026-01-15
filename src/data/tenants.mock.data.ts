import { faker } from '@faker-js/faker';
import type { Tenant } from './data.types';

faker.seed(2026);

const LEGAL_SUFFIXES = ['LLC', 'Inc', 'Ltd', 'Corp', 'PLC'];

export function generateTenants(count = 20): Tenant[] {
  return Array.from({ length: count }).map(() => {
    const name = faker.company.name();

    if (LEGAL_SUFFIXES.some(s => name.toUpperCase().endsWith(s.toUpperCase()))) {
      return {
        id: faker.string.uuid(),
        name,
      };
    }

    return {
      id: faker.string.uuid(),
      name: `${name} ${faker.helpers.arrayElement(LEGAL_SUFFIXES)}`,
    };
  });
}

export const TENANTS = generateTenants(50);
