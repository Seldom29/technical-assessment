import type { Tenant } from '@/data/data.types';
import { TENANTS } from '@/data/tenants.mock.data';

export class TenantApi {
    static async getAll(): Promise<Tenant[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(TENANTS);
            }, 0);
        });
    }
}