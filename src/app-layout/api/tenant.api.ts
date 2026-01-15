import { TENANTS } from "@/data/mock/tenants.data";
import type { Tenant } from '@/app-layout/header/tenant-switcher';

export class TenantApi {
    static async getAll(): Promise<Tenant[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(TENANTS);
            }, 300);
        });
    }
}