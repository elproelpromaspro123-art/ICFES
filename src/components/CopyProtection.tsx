"use client";

import { useEffect, useState } from "react";

const EDITABLE_SELECTOR =
  "input, textarea, select, [contenteditable='true']";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest(EDITABLE_SELECTOR));
}

export default function CopyProtection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.href;
    const attribution = `\n\nFuente: ${siteUrl}`;

    const handleCopy = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const selection = window.getSelection()?.toString();
      if (!selection) return;

      event.preventDefault();
      event.clipboardData?.setData("text/plain", `${selection}${attribution}`);
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
  }, [isClient]);

  return null;
}
