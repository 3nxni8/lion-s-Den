"use client"
import React, { useEffect } from "react";

export type ModalProps = {
  open: boolean;
  onCloseAction: () => void;
  title?: string;
  children?: React.ReactNode;
  /** Extra classes for the content container */
  className?: string;
};

export default function Modal({ open, onCloseAction, title, children, className }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseAction();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCloseAction]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCloseAction();
      }}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className={`relative z-10 w-full max-w-md rounded-xl border border-border bg-background p-5 shadow-lg modal-pop ${className ?? ""}`}>
        <div className="flex items-start justify-between gap-4">
          {title ? (
            <h2 id="modal-title" className="text-lg font-semibold text-foreground">{title}</h2>
          ) : <span className="sr-only">Modal</span>}
          <button
            type="button"
            className="rounded-md border border-transparent px-2 py-1 text-sm text-foreground/80 hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={onCloseAction}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-3 text-sm text-foreground/90">{children}</div>
      </div>
    </div>
  );
}
