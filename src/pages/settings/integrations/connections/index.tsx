import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faPencil,
    faTrash,
    faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Pagination from './pagination';
import { Tag } from './tag';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getManyIntegrationConnectionsAsync, integrationConnectionState } from '@/store/slices/integration-connection.slice';

export default function IntegrationConnection() {

    const dispatch = useAppDispatch()
    const { connections } = useAppSelector(integrationConnectionState)

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 8;
  
    useEffect(() => {
        const start = (page - 1) * pageSize;
        const keyword = query.trim().toLowerCase();
        dispatch(getManyIntegrationConnectionsAsync({ start, pageSize, keyword }))
            .then((res: any) => {
                setTotalPages(res.payload.totalCount)
            });
    }, [page, pageSize, query])

    function onSearch(v: string) {
        setQuery(v);
        setPage(1);
    }

    function onEditRow(id: string) {
        console.log('Edit row', id);
    }
    function onDeleteRow(id: string) {
        console.log('Delete row', id);
    }

    return (<div className='mt-8'>
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
        <div className='mt-4 overflow-hidden rounded-lg border border-border bg-white'>
            <table className='w-full text-sm'>
                <thead className='bg-slate-50 text-slate-600'>
                    <tr>
                        <th className='w-8 px-3 py-3 text-left font-semibold' />
                        <th className='px-3 py-3 text-left font-semibold'>
                            Integration <span className='text-slate-400'>↓</span>
                        </th>
                        <th className='px-3 py-3 text-left font-semibold'>Name</th>
                        <th className='px-3 py-3 text-left font-semibold'>Source</th>
                        <th className='px-3 py-3 text-left font-semibold'>Entity/Group</th>
                        <th className='px-3 py-3 text-left font-semibold'>Interval</th>
                        <th className='px-3 py-3 text-left font-semibold'>Connector URL</th>
                        <th className='px-3 py-3 text-left font-semibold'>Instructions</th>
                        <th className='w-24 px-3 py-3 text-right font-semibold' />
                    </tr>
                </thead>

                <tbody className='divide-y divide-slate-100'>
                    {connections.map((r) => {
                        const integration = r.integrationService
                        const integrationName = integration?.name;
                        return (
                            <tr key={r.id} className='hover:bg-slate-50'>
                                <td className='px-3 py-3'>
                                    <div className='h-6 w-6 rounded bg-sky-50 text-center text-xs font-bold leading-6 text-sky-600'>
                                        <img
                                            src={integration?.logo}
                                            alt={integrationName}
                                        />
                                    </div>
                                </td>

                                <td className='px-3 py-3 text-slate-700'>{integrationName}</td>

                                <td className='px-3 py-3'>
                                    <button type='button' className='font-semibold text-sky-600 hover:underline'>
                                        {r.name}
                                    </button>
                                </td>

                                <td className='px-3 py-3'>
                                    <Tag value={r.source} />
                                </td>

                                <td className='px-3 py-3 text-slate-700'>{r.entityGroup}</td>

                                <td className='px-3 py-3 text-slate-700'>{r.interval}</td>

                                <td className='px-3 py-3'>
                                    <button type='button' className='font-semibold text-sky-600 hover:underline'>
                                        Copy to Clipboard
                                    </button>
                                </td>

                                <td className='px-3 py-3'>
                                    <button type='button' className='inline-flex items-center gap-1 font-semibold text-sky-600 hover:underline'>
                                        View
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className='text-xs' />
                                    </button>
                                </td>

                                <td className='px-3 py-3'>
                                    <div className='flex justify-end gap-2'>
                                        <button
                                            type='button'
                                            onClick={() => onEditRow(r.id)}
                                            className='grid h-8 w-8 place-items-center rounded border border-border text-slate-600 hover:bg-slate-50'
                                            aria-label='Edit'
                                            title='Edit'
                                        >
                                            <FontAwesomeIcon icon={faPencil} className='text-sm' />
                                        </button>

                                        <button
                                            type='button'
                                            onClick={() => onDeleteRow(r.id)}
                                            className='grid h-8 w-8 place-items-center rounded bg-red-500 text-white hover:brightness-95'
                                            aria-label='Delete'
                                            title='Delete'
                                        >
                                            <FontAwesomeIcon icon={faTrash} className='text-sm' />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
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

            <div className='border-t border-slate-100 bg-white px-4 py-3'>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
        </div>
    </div>)
}

