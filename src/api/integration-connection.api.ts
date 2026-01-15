import { generateConnections } from '@/data/integration-connection.mock.data';
import type { PaginationConfig } from '.';
import type { IntegrationConnection } from '@/data/data.types';

export class IntegrationConnectionApi {
    static async getMany({ keyword, start, pageSize }: PaginationConfig): Promise<{
        list: IntegrationConnection[],
        totalCount: number
    }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let connections: IntegrationConnection[] = generateConnections(2000)
                const totalPages = Math.max(1, Math.ceil(connections.length / pageSize));

                connections = filterConnections(keyword, connections)
                connections = connections.slice(start, start + pageSize)

                resolve({ list: connections, totalCount: totalPages });
            }, 0);
        });
    }
}

const filterConnections = (keyword: string, connections: IntegrationConnection[]) => {

    if (!keyword) return connections;

    return connections.filter((r) =>
        `${r.integrationService?.name} ${r.name} ${r.source} ${r.entityGroup} ${r.interval}`
            .toLowerCase()
            .includes(keyword)
    );

}