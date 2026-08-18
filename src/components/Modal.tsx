"use client";
import { ReactNode } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
    title?: string;
    description?: string;
}

export default function Modal({
    open,
    onClose,
    children,
    title,
    description,
}: ModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                        {description && (
                            <span className="text-xs text-gray-500">
                                {description}
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-slate-400 hover:text-slate-700"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>

            </div>
        </div>
    );
}