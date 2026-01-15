export type PaginationConfig = {
    start: number;
    pageSize: number
    keyword: string;
    sortKey: string;
    sortDir: 'asc' | 'desc'
}