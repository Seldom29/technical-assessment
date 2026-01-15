import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faPencil,
    faArrowUpRightFromSquare,
    faArrowDown,
    faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Pagination from './pagination';
import { Tag } from './tag';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    getManyIntegrationConnectionsAsync,
    integrationConnectionState,
} from '@/store/slices/integration-connection.slice';
import type { IntegrationConnection } from '@/data/data.types';
import EditConnectionModal from './modal-edit';
import DeleteConnectionModal from './modal-delete';

const pageSize = 8;

type SortKey = 'integrationService' | 'name';
type SortDir = 'asc' | 'desc';

export default function IntegrationConnection() {
    const dispatch = useAppDispatch();
    const { connections } = useAppSelector(integrationConnectionState);

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IntegrationConnection | null>(null);

    const [sortKey, setSortKey] = useState<SortKey>('integrationService');
    const [sortDir, setSortDir] = useState<SortDir>('asc');

    function onSearch(v: string) {
        setQuery(v);
        setPage(1);
    }

    function onEditRow(row: IntegrationConnection) {
        setSelectedRow(row);
        setEditOpen(true);
    }

    function onDeleteRow(row: IntegrationConnection) {
        setSelectedRow(row);
        setDeleteOpen(true);
    }

    const toggleSort = useCallback((key: SortKey) => {
        setPage(1);

        if (key !== sortKey) {
            setSortKey(key);
            setSortDir('asc');
        } else {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        }
    }, [sortKey])



    useEffect(() => {
        const handler = setTimeout(() => {
            const start = (page - 1) * pageSize;
            const keyword = query.trim().toLowerCase();

            dispatch(getManyIntegrationConnectionsAsync({ start, pageSize, keyword, sortDir, sortKey }))
                .then((res: any) => {
                    setTotalPages(res.payload.totalCount);
                });
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [dispatch, page, query, sortDir, sortKey]);


    const sortIcon = useMemo(() => {
        return sortDir === 'asc' ? faArrowUp : faArrowDown
    }, [sortDir]);

    return (
        <>
            <div className='mt-8'>
                <h2 className='text-base font-semibold text-slate-900'>Existing Connections</h2>

                {/* Search */}
                <div className='mt-3 w-full max-w-sm'>
                    <div className='relative'>
                        <input
                            value={query}
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder='Integration or Name'
                            className='w-full rounded-md border border-border bg-white py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
                        />
                    </div>
                </div>

                {/* Table */}
                <div className='h-full mt-4 overflow-hidden rounded-lg border border-border bg-white'>
                    <div className='overflow-x-auto'> 
                        <table className='w-full text-sm'>
                            <thead className='bg-slate-50 text-slate-600 '>
                                <tr className='border-b border-gray-200/70 text-xs'>
                                    <th className='w-8 px-3 py-3 text-left font-semibold' />

                                    <th className='px-3 py-3 text-left font-semibold'>
                                        <button
                                            type='button'
                                            onClick={() => toggleSort('integrationService')}
                                            className='cursor-pointer inline-flex items-center gap-.5'
                                        >
                                            Integration
                                            {sortKey === 'integrationService' && <FontAwesomeIcon icon={sortIcon} size='xs' className='text-slate-500' />}
                                        </button>
                                    </th>

                                    <th className='px-3 py-3 text-left font-semibold'>
                                        <button
                                            type='button'
                                            onClick={() => toggleSort('name')}
                                            className='cursor-pointer inline-flex items-center gap-.5'
                                        >
                                            Name
                                            {sortKey === 'name' && <FontAwesomeIcon icon={sortIcon} size='xs' className='text-slate-500' />}
                                        </button>
                                    </th>

                                    <th className='px-3 py-3 text-left font-semibold'>Source</th>
                                    <th className='px-3 py-3 text-left font-semibold'>Entity/Group</th>
                                    <th className='px-3 py-3 text-left font-semibold'>Interval</th>
                                    <th className='px-3 py-3 text-left font-semibold'>Connector URL</th>
                                    <th className='px-3 py-3 text-left font-semibold'>Instructions</th>
                                    <th className='px-3 py-3 w-24 text-right font-semibold' />
                                </tr>
                            </thead>

                            <tbody className='divide-y divide-slate-100'>
                                {connections.map((c) => {
                                    const integration = c.integrationService as any;
                                    const integrationName = integration?.name ?? '';

                                    return (
                                        <tr key={c.id} className='border-b border-gray-200/70 hover:bg-slate-50'>
                                            <td className='px-3 py-3'>
                                                <div className='h-6 w-6 rounded bg-sky-50 text-center text-xs font-bold leading-6 text-cyan-600 overflow-hidden'>
                                                    {integration?.logo ? (
                                                        <img src={integration.logo} alt={integrationName} />
                                                    ) : null}
                                                </div>
                                            </td>

                                            <td className='px-3 py-3 max-w-48 truncate text-slate-700'>
                                                {integrationName}
                                            </td>

                                            <td className='px-3 py-3'>
                                                <button type='button' className='max-w-48 truncate text-cyan-600'>
                                                    {c.name}
                                                </button>
                                            </td>

                                            <td className='px-3 py-3'>
                                                <Tag value={c.source} />
                                            </td>

                                            <td className='px-3 py-3 max-w-48 truncate text-slate-700'>{c.entityGroup}</td>

                                            <td className='px-3 py-3 text-slate-700'>{c.interval}</td>

                                            <td className='px-3 py-3'>
                                                <button
                                                    type='button'
                                                    className='truncate cursor-pointer text-x text-cyan-600 hover:text-cyan-400'
                                                >
                                                    Copy to Clipboard
                                                </button>
                                            </td>

                                            <td className='px-3 py-3'>
                                                <button
                                                    type='button'
                                                    className='cursor-pointer inline-flex items-center gap-1 text-cyan-600 hover:underline hover:text-cyan-400'
                                                >
                                                    View
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-xs' />
                                                </button>
                                            </td>

                                            <td className='px-3 py-3'>
                                                <div className='flex justify-end gap-2'>
                                                    <button
                                                        type='button'
                                                        onClick={() => onEditRow(c)}
                                                        className='cursor-pointer grid h-8 w-8 place-items-center rounded border border-border text-slate-600 hover:bg-gray-200'
                                                        aria-label='Edit'
                                                        title='Edit'
                                                    >
                                                        <FontAwesomeIcon icon={faPencil} className='text-sm' />
                                                    </button>

                                                    <button
                                                        type='button'
                                                        onClick={() => onDeleteRow(c)}
                                                        className='cursor-pointer grid h-8 w-8 place-items-center rounded bg-red-400 text-white hover:bg-red-500'
                                                        aria-label='Delete'
                                                        title='Delete'
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} className='text-sm' />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {connections.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className='px-4 py-10 text-center text-slate-500'>
                                            No connections found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                    <div className='border-t border-slate-100 bg-white px-4 py-3'>
                        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                    </div>
                </div>
            </div>

            <EditConnectionModal
                open={editOpen}
                row={selectedRow}
                onClose={() => setEditOpen(false)}
                onConfirm={(id) => {
                    console.log('edit', id);
                    setEditOpen(false);
                }}
            />

            <DeleteConnectionModal
                open={deleteOpen}
                row={selectedRow}
                onClose={() => setDeleteOpen(false)}
                onConfirm={(id) => {
                    console.log('delete', id);
                    setDeleteOpen(false);
                }}
            />
        </>
    );
}
