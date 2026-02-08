"use client";

import { useEffect } from "react";

const BLOCKED_KEYS = new Set(["c", "x", "s", "u", "p"]);
const EDITABLE_SELECTOR =
  "input, textarea, select, [contenteditable='true']";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  return Boolean(target.closest(EDITABLE_SELECTOR));
}

export default function CopyProtection() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }

      const key = event.key.toLowerCase();
      if (!BLOCKED_KEYS.has(key)) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }
      event.preventDefault();
    };

    const handleCopy = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      const selection = window.getSelection()?.toString();
      if (!selection) {
        return;
      }

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const attribution = siteUrl
        ? `\n\nFuente: ${siteUrl}`
        : "\n\nFuente: Prepárate ICFES";

      event.preventDefault();
      event.clipboardData?.setData("text/plain", `${selection}${attribution}`);
    };

    const handleCut = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }
      event.preventDefault();
    };

    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      if (target.tagName === "IMG" || target.closest("img")) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
