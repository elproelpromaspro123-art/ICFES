"use client";

import { useEffect } from "react";

const EDITABLE_SELECTOR =
  "input, textarea, select, [contenteditable='true']";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest(EDITABLE_SELECTOR));
}

export default function CopyProtection() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.href;
    const attribution = `\n\nFuente: ${siteUrl}`;

    const handleCopy = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const selection = window.getSelection()?.toString();
      if (!selection) return;

      const text = `${selection}${attribution}`;
      if (event.clipboardData) {
        event.preventDefault();
        event.clipboardData.setData("text/plain", text);
        return;
      }

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    };

    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.tagName === "IMG" || target.closest("img")) {
        event.preventDefault();
      }
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
