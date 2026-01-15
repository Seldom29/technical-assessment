import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faArrowLeft,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';

type Props = {
    page: number;
    totalPages: number;
    onPageChange: (p: number) => void;
};

const WINDOW = 5;

export default function Pagination({ page, totalPages, onPageChange }: Props) {
    const pages = useMemo(() => {
        const out: (number | '…')[] = [];

        if (totalPages <= WINDOW + 2) {
            for (let i = 1; i <= totalPages; i++) out.push(i);
            return out;
        }

        const half = Math.floor(WINDOW / 2);
        let start = Math.max(2, page - half);
        let end = Math.min(totalPages - 1, page + half);

        // shift window if near the start
        if (page <= half + 1) {
            start = 2;
            end = WINDOW + 1;
        }

        // shift window if near the end
        if (page >= totalPages - half) {
            start = totalPages - WINDOW;
            end = totalPages - 1;
        }

        // first page
        out.push(1);

        if (start > 2) out.push('…');

        for (let i = start; i <= end; i++) out.push(i);

        if (end < totalPages - 1) out.push('…');

        // last page
        out.push(totalPages);

        return out;
    }, [page, totalPages]);


    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <nav className='flex items-center justify-center gap-2' aria-label='Pagination'>
            {/* Prev */}
            <button
                type='button'
                disabled={!canPrev}
                onClick={() => onPageChange(page - 1)}
                className={[
                    'cursor-pointer inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs font-semibold transition',
                    canPrev
                        ? 'bg-white text-slate-700 hover:bg-slate-100'
                        : 'cursor-not-allowed bg-slate-50 text-slate-400',
                ].join(' ')}
                aria-label='Previous page'
            >
                <FontAwesomeIcon icon={faArrowLeft} className='text-xs' />
                <span className='hidden sm:inline'>Previous</span>
            </button>

            {/* Pages */}
            <div className='flex items-center gap-1'>
                {pages.map((p, idx) =>
                    p === '…' ? (
                        <span
                            key={`dots-${idx}`}
                            className='grid h-8 w-8 place-items-center text-slate-400'
                            aria-hidden='true'
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </span>
                    ) : (
                        <button
                            key={p}
                            type='button'
                            onClick={() => onPageChange(p)}
                            aria-label={`Page ${p}`}
                            aria-current={p === page ? 'page' : undefined}
                            className={[
                                'cursor-pointer grid h-8 w-8 place-items-center rounded-md text-xs transition',
                                p === page
                                    ? 'bg-slate-200 '
                                    : 'text-slate-700 hover:bg-slate-50',
                            ].join(' ')}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>

            {/* Next */}
            <button
                type='button'
                disabled={!canNext}
                onClick={() => onPageChange(page + 1)}
                className={[
                    'cursor-pointer inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-semibold transition',
                    canNext
                        ? 'bg-white text-slate-700 hover:bg-slate-100'
                        : 'cursor-not-allowed bg-slate-50 text-slate-400',
                ].join(' ')}
                aria-label='Next page'
            >
                <span className='hidden sm:inline text-xs'>Next</span>
                <FontAwesomeIcon icon={faArrowRight} className='text-xs' />
            </button>
        </nav>
    );
}
