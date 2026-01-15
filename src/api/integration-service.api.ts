import type { IntegrationService } from '@/data/data.types';
import { INTEGRATION_SERVICES } from '@/data/integration-services.mock.data';

export class IntegrationServiceApi {
    static async getAll(): Promise<IntegrationService[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(INTEGRATION_SERVICES);
            }, 0);
        });
    }
}