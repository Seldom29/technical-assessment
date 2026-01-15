import { useEffect, useRef, useState } from 'react';

type UserProfileDropdownProps = {
    initials?: string;
    onAccountSettings?: () => void;
    onSignOut?: () => void;
};

export default function UserProfileDropdown({
    initials = 'FM',
    onAccountSettings,
    onSignOut,
}: UserProfileDropdownProps) {
    const [open, setOpen] = useState(false);
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

    return (
        <div ref={rootRef} className='relative'>
            <button
                type='button'
                onClick={() => setOpen((v) => !v)}
                className={[
                    'grid h-8 w-8 place-items-center rounded-md text-xs font-semibold',
                    'border border-border shadow-sm transition-colors',
                    open ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600',
                    'focus:outline-none focus:ring-2 focus:ring-brand/30',
                ].join(' ')}
                aria-haspopup='menu'
                aria-expanded={open}
                aria-label='Open user menu'
            >
                {initials}
            </button>

            {open && (
                <div
                    role='menu'
                    aria-label='User menu'
                    className='bg-gray-50 absolute z-0 right-0 mt-2 overflow-hidden rounded-md border border-border shadow-lg'
                >
                    <button
                        type='button'
                        role='menuitem'
                        onClick={() => {
                            setOpen(false);
                            onAccountSettings?.();
                        }}
                        className='w-full p-3 whitespace-nowrap text-left text-xs text-slate-700 font-semibold hover:bg-gray-100'
                    >
                        Account Settings
                    </button>

                    <div className='h-px  bg-slate-200' />

                    <button
                        type='button'
                        role='menuitem'
                        onClick={() => {
                            setOpen(false);
                            onSignOut?.();
                        }}
                        className='w-full p-3 whitespace-nowrap text-left text-xs text-slate-700 font-semibold hover:bg-gray-100'
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}
