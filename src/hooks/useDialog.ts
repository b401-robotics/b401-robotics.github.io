import { useEffect, useRef } from "react";

/**
 * Shared native modal behavior:
 * - Opens the HTMLDialogElement using showModal() on mount
 * - Closes on unmount
 * - Handles the native "cancel" event (Escape key) to notify onClose
 * - Implements Modern Web Guidance light-dismiss fallback for browsers without native closedby support
 */
export function useDialog<T extends HTMLDialogElement = HTMLDialogElement>(onClose: () => void) {
  const ref = useRef<T | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    // Open via native showModal if not already open
    if (!dialog.open) {
      try {
        dialog.showModal();
      } catch {
        // Fallback or ignore if already open
      }
    }

    // Native cancel event fires on Escape or mobile back gesture
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onCloseRef.current();
    };

    dialog.addEventListener("cancel", handleCancel);

    // Modern Web Guidance light-dismiss fallback for browsers without closedby="any" support
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isWithinDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isWithinDialog) {
        onCloseRef.current();
      }
    };

    if (!("closedBy" in HTMLDialogElement.prototype)) {
      dialog.addEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleBackdropClick);
      if (dialog.open) {
        try {
          dialog.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return ref;
}
