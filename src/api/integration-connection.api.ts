import { generateConnections } from '@/data/integration-connection.mock.data';
import type { PaginationConfig } from '.';
import type { IntegrationConnection } from '@/data/data.types';

export class IntegrationConnectionApi {
    static async getMany({ keyword, start, pageSize, sortKey, sortDir }: PaginationConfig): Promise<{
        list: IntegrationConnection[],
        totalCount: number
    }> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let connections: IntegrationConnection[] = generateConnections(2000)
                connections = sortConnections(connections, sortKey, sortDir)
                connections = filterConnections(keyword, connections)

                const totalPages = Math.max(1, Math.ceil(connections.length / pageSize));

                connections = connections.slice(start, start + pageSize)

                resolve({ list: connections, totalCount: totalPages });
            }, 0);
        });
    }
}


const sortConnections = (connections: IntegrationConnection[], sortKey: string, sortDir: string) => {
    const getSortableValue = (row: any, key: string) => {
        const v = row?.[key];

        if (typeof v === 'object' && v !== null) {
            return v.name ?? v.label ?? '';
        }
        return v ?? '';
    };

    return [...connections].sort((a: any, b: any) => {
        const av = getSortableValue(a, sortKey);
        const bv = getSortableValue(b, sortKey);

        const cmp = String(av).localeCompare(String(bv), undefined, {
            sensitivity: 'base',
        });

        return sortDir === 'asc' ? cmp : -cmp;
    });
}

const filterConnections = (keyword: string, connections: IntegrationConnection[]) => {

    if (!keyword) return connections;

    return connections.filter((r) =>
        `${r.integrationService?.name} ${r.name} ${r.source} ${r.entityGroup} ${r.interval}`
            .toLowerCase()
            .includes(keyword)
    );

}