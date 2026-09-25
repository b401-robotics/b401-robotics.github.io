import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
}

interface ToastContextType {
  showToast: (type: ToastMessage["type"], title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (type: ToastMessage["type"], title: string, description?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setToasts((prev) => [...prev, { id, type, title, description }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, type === "error" ? 8000 : 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
        {toasts.map((toast) => {
          const bgClass =
            toast.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100"
              : toast.type === "error"
              ? "bg-rose-50 dark:bg-rose-950 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100"
              : toast.type === "warning"
              ? "bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100"
              : "bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-100";

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 transition-all animate-in slide-in-from-bottom-2 ${bgClass}`}
            >
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
              {toast.type === "error" && <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
              {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold">{toast.title}</h4>
                {toast.description && (
                  <p className="text-xs opacity-90 mt-1 whitespace-pre-wrap font-mono break-all max-h-48 overflow-y-auto">
                    {toast.description}
                  </p>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-70 hover:opacity-100 p-0.5 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};
