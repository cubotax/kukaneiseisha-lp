"use client";

import { useEffect } from "react";

export default function ResetHashOnReload() {
  useEffect(() => {
    if (window.location.pathname !== "/" || !window.location.hash) return;

    const navEntry = performance.getEntriesByType("navigation")[0];

    const isReload =
      navEntry?.type === "reload" ||
      performance.navigation?.type === 1;

    if (!isReload) return;

    history.replaceState(null, "", "/");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      });
    });
  }, []);

  return null;
}
