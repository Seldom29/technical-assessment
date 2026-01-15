import Modal from "@/components/modal";
import type { IntegrationConnection } from '@/data/data.types';

type Props = {
    open: boolean;
    row: IntegrationConnection | null;
    onClose: () => void;
    onConfirm: (id: string) => void;
};

export default function DeleteConnectionModal({ open, row, onClose, onConfirm }: Props) {
    return (
        <Modal
            open={open}
            title="Remove connection"
            onClose={onClose}
            maxWidthClassName="max-w-md"
            footer={
                <>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-border bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => row && onConfirm(row.id)}
                        className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:brightness-95"
                    >
                        Remove
                    </button>
                </>
            }
        >
            <p className="text-sm text-slate-600">
                Are you sure you want to remove{" "}
                <span className="font-semibold text-slate-900">
                    {row?.name ?? "this connection"}
                </span>
                ?
            </p>
        </Modal>
    );
}
