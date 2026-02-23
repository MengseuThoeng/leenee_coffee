"use client";

import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from "react";
import { CheckCircle2, XCircle, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-100 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icon = {
    success: <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />,
    error: <XCircle className="h-5 w-5 text-red-500 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />,
  }[toast.type];

  const borderColor = {
    success: "border-l-green-500",
    error: "border-l-red-500",
    warning: "border-l-yellow-500",
  }[toast.type];

  return (
    <div
      className={`pointer-events-auto bg-card border border-border ${borderColor} border-l-4 rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-right-full duration-300`}
    >
      {icon}
      <p className="text-sm text-foreground flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
