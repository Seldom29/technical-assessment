export type SourceTag = 'Carbon' | 'Utility';

export function Tag({ value }: { value: SourceTag }) {
    const styles =
        value === 'Carbon'
            ? 'border-orange-200 bg-orange-50 text-orange-700'
            : 'border-emerald-200 bg-emerald-50 text-emerald-700';

    return (
        <span
            className={[
                'inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold',
                styles,
            ].join(' ')}
        >
            {value}
        </span>
    );
}