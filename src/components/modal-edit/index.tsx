import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import type { IntegrationConnection } from '@/data/data.types';

type Props = {
    open: boolean;
    row: IntegrationConnection | null;
    onClose: () => void;
    onSave: (payload: { id: string; name: string; interval: string }) => void;
};

export default function EditConnectionModal({ open, row, onClose, onSave }: Props) {
    const [name, setName] = useState("");
    const [interval, setInterval] = useState("-");

    useEffect(() => {
        if (!open || !row) return;
        setName(row.name);
        setInterval(row.interval);
    }, [open, row]);

    return (
        <Modal
            open={open}
            title="Edit connection"
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
                        onClick={() => row && onSave({ id: row.id, name, interval })}
                        className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:brightness-110"
                    >
                        Save
                    </button>
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                        Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-border px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        placeholder="Connection name"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                        Interval
                    </label>
                    <select
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    >
                        <option value="-">-</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                        <option value="ToU">ToU</option>
                    </select>
                </div>
            </div>
        </Modal>
    );
}
