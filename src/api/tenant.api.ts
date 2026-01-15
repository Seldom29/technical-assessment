import { TENANTS, type Tenant } from '@/data/tenants.mock.data';

export class TenantApi {
    static async getAll(): Promise<Tenant[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(TENANTS);
            }, 300);
        });
    }
}