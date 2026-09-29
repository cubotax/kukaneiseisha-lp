"use client";

import { useEffect, useState } from "react";

const navStyle = {
  fontSize: 15,
  fontWeight: 700,
  color: "#0a2a4f",
  textDecoration: "none",
};

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);

    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  useEffect(() => {
    const escape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    const resize = () => {
      if (window.innerWidth > 767) setOpen(false);
    };

    document.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);

    return () => {
      document.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className="site-header"
      style={{
        position: "relative",
        zIndex: 20,
        height: 88,
        background: "#ffffff",
        borderBottom: "1px solid #e5eaf1",
      }}
    >
      <div
        className="header-inner"
        style={{
          position: "relative",
          width: 1440,
          maxWidth: 1440,
          margin: "0 auto",
          height: "100%",
          padding: "0 72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          className="site-logo"
          src="/assets/logo-header.png"
          alt="空間衛生社"
          style={{
            width: 172.3,
            height: 40,
            display: "block",
          }}
        />

        <nav
          className="pc-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 34,
          }}
        >
          <a href="#services" style={navStyle}>サービス紹介</a>
          <a href="#works" style={navStyle}>対応実績</a>
          <a href="#strengths" style={navStyle}>私たちの強み</a>
          <a href="#faq" style={navStyle}>よくある質問</a>

          <a
            href="#contact"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              height: 56,
              padding: "0 30px",
              marginLeft: 8,
              borderRadius: 28,
              background: "#1a79f2",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 10px 20px rgba(26,121,242,0.26)",
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="2.5"
                y="5"
                width="19"
                height="14"
                rx="2.5"
                stroke="#fff"
                strokeWidth="1.7"
              />
              <path
                d="M3.5 7l8.5 6 8.5-6"
                stroke="#fff"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            無料で相談する
          </a>
        </nav>

        <button
          className={`mobile-menu-button${open ? " is-open" : ""}`}
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          id="mobile-menu"
          className={`mobile-menu${open ? " is-open" : ""}`}
          aria-hidden={!open}
        >
          <nav
            className="mobile-menu-nav"
            aria-label="スマートフォンメニュー"
          >
            <a href="#about" onClick={close}>私たちについて</a>
            <a href="#services" onClick={close}>サービス紹介</a>
            <a href="#works" onClick={close}>対応実績</a>
            <a href="#strengths" onClick={close}>私たちの強み</a>
            <a href="#faq" onClick={close}>よくある質問</a>
            <a href="#contact" onClick={close}>お問い合わせ</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
