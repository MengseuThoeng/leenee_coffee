"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-60">
      <div className="bg-card border border-border rounded-xl shadow-xl max-w-md w-full animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950 mb-4">
            <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />}
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
