"use client";

import { useEffect } from "react";

export default function ResetHashOnReload() {
  useEffect(() => {
    let hasLeftTop = window.scrollY > 80;

    const handleScroll = () => {
      const y = window.scrollY;

      // 一度ページ下部へ移動したことを記録
      if (y > 80) {
        hasLeftTop = true;
        return;
      }

      // トップまで戻ったら、画面位置を変えずにハッシュだけ削除
      if (
        hasLeftTop &&
        y <= 2 &&
        window.location.pathname === "/" &&
        window.location.hash
      ) {
        window.history.replaceState(
          window.history.state,
          "",
          "/"
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
