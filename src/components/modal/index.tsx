import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
    open: boolean;
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
    footer?: React.ReactNode;
    maxWidthClassName?: string; // e.g. 'max-w-lg'
};

export default function Modal({
    open,
    title,
    children,
    onClose,
    footer,
    maxWidthClassName = 'max-w-lg',
}: ModalProps) {
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', onKeyDown);

        // lock body scroll
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className='fixed inset-0 z-100'>
            <button
                type='button'
                aria-label='Close modal'
                onClick={onClose}
                className='absolute inset-0 bg-black/40'
            />

            <div className='relative z-101 flex min-h-full items-center justify-center p-4'>
                <div
                    role='dialog'
                    aria-modal='true'
                    className={[
                        'w-full rounded-lg border border-border bg-white shadow-xl',
                        maxWidthClassName,
                    ].join(' ')}
                >
                    <div className='flex items-center justify-between border-b border-slate-100 px-5 py-2'>
                        <h3 className='text-sm font-semibold text-slate-900'>{title}</h3>

                        <button
                            type='button'
                            onClick={onClose}
                            className='cursor-pointer rounded-md px-2 text-sm text-slate-500 hover:bg-slate-50'
                        >
                            <FontAwesomeIcon className='text-gray-400 hover:text-gray-500' icon={faTimes} />
                        </button>
                    </div>

                    <div className='px-6 pb-6'>{children}</div>

                    {footer && (
                        <div className='flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4'>
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
