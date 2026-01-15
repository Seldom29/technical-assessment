import { useMemo } from 'react';

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: {
    page: number;
    totalPages: number;
    onPageChange: (p: number) => void;
}) {
    const pages = useMemo(() => {
        const out: (number | '…')[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) out.push(i);
            return out;
        }

        out.push(1);
        if (page > 4) out.push('…');

        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) out.push(i);

        if (page < totalPages - 3) out.push('…');
        out.push(totalPages);

        return out;
    }, [page, totalPages]);

    return (
        <div className='mt-4 flex items-center justify-center gap-2'>
            <button
                type='button'
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className={[
                    'rounded-md border border-border px-3 py-1.5 text-sm',
                    page <= 1 ? 'text-slate-400' : 'text-slate-700 hover:bg-slate-50',
                ].join(' ')}
            >
                ← Previous
            </button>

            <div className='flex items-center gap-1'>
                {pages.map((p, idx) =>
                    p === '…' ? (
                        <span key={`dots-${idx}`} className='px-2 text-slate-400'>
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            type='button'
                            onClick={() => onPageChange(p)}
                            className={[
                                'h-8 w-8 rounded-md border text-sm',
                                p === page
                                    ? 'border-border bg-slate-100 text-slate-900'
                                    : 'border-transparent text-slate-700 hover:bg-slate-50',
                            ].join(' ')}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>

            <button
                type='button'
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className={[
                    'rounded-md border border-border px-3 py-1.5 text-sm',
                    page >= totalPages ? 'text-slate-400' : 'text-slate-700 hover:bg-slate-50',
                ].join(' ')}
            >
                Next →
            </button>
        </div>
    );
}
