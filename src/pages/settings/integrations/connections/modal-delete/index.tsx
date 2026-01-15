import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/components/modal';
import type { IntegrationConnection } from '@/data/data.types';

type Props = {
    open: boolean;
    row: IntegrationConnection | null;
    onClose: () => void;
    onConfirm: (id: string) => void;
};

export default function DeleteConnectionModal({
    open,
    row,
    onClose,
    onConfirm,
}: Props) {
    return (
        <Modal open={open} onClose={onClose} maxWidthClassName='max-w-sm'>
            <button
                type='button'
                onClick={onClose}
                className='absolute right-4 top-4 text-gray-600 hover:text-slate-600'
                aria-label='Close'
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className='flex flex-col gap-4'>
                <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-400'>
                    <FontAwesomeIcon icon={faXmark} className='text-white' />
                </div>

                <div className='flex-1'>
                    <h3 className='text-md font-semibold text-slate-900'>
                        Remove “{row?.name ?? 'Connection'}” Connection?
                    </h3>

                    <p className='mt-1 text-xs text-slate-600'>
                        Are you sure you want to remove{' '}
                        <span>
                            {row?.integrationService?.name}
                        </span>{' '}
                        “{row?.name ?? 'connection'}” connection?
                    </p>

                    <div className='mt-5 flex justify-center gap-3'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='cursor-pointer w-full rounded-md border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-gray-200 '
                        >
                            Undo
                        </button>

                        <button
                            type='button'
                            onClick={() => row && onConfirm(row.id)}
                            className='cursor-pointer w-full rounded-md bg-red-400 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500'
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
