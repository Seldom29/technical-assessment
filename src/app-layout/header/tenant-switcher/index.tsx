import { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faArrowAltCircleDown,
} from '@fortawesome/free-regular-svg-icons';

import {
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import type { Tenant } from '@/data/data.types';


type TenantSwitcherProps = {
    tenants: Tenant[];
    tenant: Tenant | null;
    onChange: (tenant: Tenant) => void;
};

function initials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0] ?? '';
    const b = parts[1]?.[0] ?? parts[0]?.[1] ?? '';
    return (a + b).toUpperCase();
}

export default function TenantSwitcher({ tenants, tenant, onChange }: TenantSwitcherProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');

    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDocMouseDown(e: MouseEvent) {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpen(false);
        }

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }

        document.addEventListener('mousedown', onDocMouseDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onDocMouseDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return tenants;
        return tenants.filter((t) => t.name.toLowerCase().includes(q));
    }, [query, tenants]);

    return (
        <div ref={rootRef} className='relative w-full'>
            <button
                type='button'
                onClick={() => setOpen((v) => !v)}
                className={[
                    'cursor-pointer flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                    open
                        ? 'bg-brand text-white hover:brightness-95'
                        : 'bg-white text-slate-700 border border-border hover:bg-slate-50',
                ].join(' ')}
                aria-haspopup='menu'
                aria-expanded={open}
            >
                <span className='min-w-0 flex-1 truncate text-left'>
                    {tenant?.name}
                </span>

                <FontAwesomeIcon
                    icon={faArrowAltCircleDown}
                    className={[
                        'ml-2 shrink-0 transition-all duration-200',
                        open ? 'text-white/90 rotate-180' : 'text-slate-600',
                    ].join(' ')}
                />
            </button>


            {open && (
                <div className='absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-md border shadow-sm border-black/10 bg-white'>
                    <div className='py-2'>
                        <button
                            type='button'
                            className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50'
                            onClick={() => setOpen(false)}
                        >
                            Help &amp; Guides
                        </button>
                        <button
                            type='button'
                            className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50'
                            onClick={() => setOpen(false)}
                        >
                            Terms of Use
                        </button>
                        <button
                            type='button'
                            className='flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50'
                            onClick={() => setOpen(false)}
                        >
                            Privacy Policy
                        </button>
                    </div>

                    <div className='h-px bg-slate-200' />

                    <div className='p-3'>
                        <div className='relative'>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='Type to filter...'
                                className='w-full rounded-md border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'
                            />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400'
                            />
                        </div>
                    </div>

                    <div className='max-h-56 overflow-auto py-1'>
                        {filtered.map((t) => {
                            const isSelected = t.id === tenant?.id;
                            return (
                                <button
                                    key={t.id}
                                    type='button'
                                    onClick={() => {
                                        onChange(t);
                                        setOpen(false);
                                        setQuery('');
                                    }}
                                    className={[
                                        'cursor-pointer grid w-full grid-cols-[32px_1fr] items-center px-2 py-2 text-left text-xs ',
                                        isSelected ? 'bg-slate-50 text-cyan-600' : 'text-gray-700 hover:bg-slate-50',
                                    ].join(' ')}
                                >
                                    <span className='
                                                  flex h-6 w-6 items-center justify-center
                                                  rounded-md bg-blue-500
                                                  text-xs font-bold text-white/90
                                                  font-mono 
                                                '>
                                        {initials(t.name).padEnd(2, ' ')}
                                    </span>

                                    <span className='truncate hover:text-cyan-600'>
                                        {t.name}
                                    </span>
                                </button>

                            );
                        })}

                        {filtered.length === 0 && (
                            <div className='px-3 py-3 text-sm text-slate-500'>No tenants found.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
