"use client";

import { useEffect } from "react";

export default function Faq() {
  const html = "<section id=\"faq\" class=\"faq-section\" style=\"position: relative; height: 840px; overflow: hidden; background: #ffffff\">\n<svg width=\"100%\" height=\"90\" viewBox=\"0 0 1440 90\" preserveAspectRatio=\"none\" fill=\"none\" aria-hidden=\"true\" style=\"position: absolute; top: -1px; left: 0; display: block;\"><path d=\"M0 0H1440V34C1340 34 1240 66 1140 66C1013.3 66 886.7 18 760 18C633.3 18 506.7 64 380 64C253.3 64 126.7 28 0 28Z\" fill=\"#edf7fe\"></path></svg>\n\n<div style=\"position: absolute; left: -120px; top: 250px; width: 280px; height: 240px; border-radius: 58% 42% 46% 54% / 44% 58% 42% 56%; background: linear-gradient(140deg, #cbe8fc, #e9f6fe); opacity: 0.4;\"></div>\n\n<div class=\"faq-inner\" style=\"position: relative; z-index: 3; width: 1440px; max-width: 1440px; margin: 0 auto; height: 780px; padding: 104px 130px 0; display: flex; gap: 72px;\">\n<div style=\"position: absolute; left: 120px; bottom: 20px; width: 220px; height: 180px; border-radius: 56% 44% 52% 48% / 52% 48% 52% 48%; background: linear-gradient(140deg, #d6edfd, #f1f9ff); opacity: 0.4;\"></div>\n<svg width=\"80\" height=\"80\" viewBox=\"0 0 100 100\" fill=\"none\" aria-hidden=\"true\" style=\"position: absolute; left: 70px; top: 460px; opacity: 0.5;\"><path d=\"M50 0C53 30 70 47 100 50C70 53 53 70 50 100C47 70 30 53 0 50C30 47 47 30 50 0Z\" fill=\"#3fa9f5\"></path></svg>\n<svg width=\"26\" height=\"26\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" style=\"position: absolute; left: 404px; top: 330px;\"><path d=\"M12 21C12 21 2.5 14.8 2.5 8.8C2.5 5.8 4.8 3.5 7.6 3.5C9.4 3.5 11 4.4 12 5.9C13 4.4 14.6 3.5 16.4 3.5C19.2 3.5 21.5 5.8 21.5 8.8C21.5 14.8 12 21 12 21Z\" stroke=\"#2f9df2\" stroke-width=\"1.7\" stroke-linejoin=\"round\"></path></svg>\n<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\" style=\"position: absolute; left: 440px; top: 344px;\"><path d=\"M12 21C12 21 2.5 14.8 2.5 8.8C2.5 5.8 4.8 3.5 7.6 3.5C9.4 3.5 11 4.4 12 5.9C13 4.4 14.6 3.5 16.4 3.5C19.2 3.5 21.5 5.8 21.5 8.8C21.5 14.8 12 21 12 21Z\" stroke=\"#1a79f2\" stroke-width=\"1.8\" stroke-linejoin=\"round\"></path></svg>\n\n<div class=\"faq-intro\" style=\"width: 372px;\">\n<div class=\"faq-en\" style=\"font-family: Caveat, cursive; font-size: 66px; font-weight: 700; line-height: 1; color: #1a79f2;\">FAQ</div>\n<div class=\"faq-jp\" style=\"margin-top: 12px; font-size: 15px; font-weight: 900; letter-spacing: 0.04em; color: #0a2a4f; padding-left: 10px\">\u3088\u304f\u3042\u308b\u8cea\u554f</div>\n<p class=\"faq-lead\" style=\"margin: 20px 0 0; font-size: 14px; font-weight: 500; color: #4c6079;\">\u3054\u4f9d\u983c\u524d\u306b\u3088\u304f\u3044\u305f\u3060\u304f\u3054\u8cea\u554f\u3092\u307e\u3068\u3081\u307e\u3057\u305f\u3002</p>\n<div class=\"faq-photo-wrap\" style=\"position: relative; margin-top: 44px; width: 340px; height: 380px;\">\n<img src=\"/assets/faq-staff.jpg\" alt=\"\u304a\u5ba2\u69d8\u306b\u6e05\u6383\u5185\u5bb9\u3092\u30d2\u30a2\u30ea\u30f3\u30b0\u3059\u308b\u30b9\u30bf\u30c3\u30d5\" style=\"width: 300px; height: 380px; object-fit: cover; display: block; border-radius: 46% 54% 40% 60% / 44% 48% 52% 56%;\">\n<div style=\"position: absolute; left: -46px; top: -26px; width: 128px; height: 128px; border-radius: 50%; background: linear-gradient(150deg, #cfe9fc, #a9d8f8); display: flex; align-items: center; justify-content: center;\">\n<span style=\"font-family: Caveat, cursive; font-size: 23px; font-weight: 700; line-height: 1.2; text-align: center; color: #0e5fd1; transform: rotate(-8deg);\">For a<br>Cleaner<br>Everyday.</span>\n</div>\n</div>\n</div>\n\n<div id=\"faq-list\" style=\"flex-grow: 1;\">\n\n</div>\n\n</div>\n</section>";

  useEffect(() => {
    const container = document.getElementById("faq-list");
    if (!container) return;

    const faqData = [
      {
        q: "どのような清掃に対応していますか？",
        a: "エアコン洗浄、ハウスクリーニング、退去後清掃、店舗・施設清掃、屋外清掃、家事代行など、幅広い清掃サービスに対応しています。"
      },
      {
        q: "法人や店舗からの依頼も可能ですか？",
        a: "はい。オフィス、店舗、施設など法人のお客様からのご依頼にも対応しています。"
      },
      {
        q: "見積もりは無料ですか？",
        a: "はい。清掃内容を確認したうえで無料でお見積もりいたします。"
      },
      {
        q: "急ぎの依頼にも対応できますか？",
        a: "スケジュールによりますが、可能な限り柔軟に対応いたします。まずはお気軽にご相談ください。"
      },
      {
        q: "対応エリアについて教えてください。",
        a: "対応エリアについては、ご依頼内容とあわせてお問い合わせ時にご相談ください。"
      }
    ];

    let openIndex = 0;

    function render() {
      container.innerHTML = "";

      faqData.forEach((f, i) => {
        const isOpen = i === openIndex;
        const num = `Q0${i + 1}`;

        const item = document.createElement("div");
        item.style.cssText = isOpen
          ? "background:#fff;border-radius:20px;padding:26px 0 28px;box-shadow:0 10px 26px rgba(24,86,152,.07);"
          : "background:transparent;border-radius:0;padding:0;box-shadow:none;";

        const row = document.createElement("div");
        row.style.cssText = isOpen
          ? "display:flex;align-items:center;gap:22px;height:76px;padding:0 30px;cursor:pointer;"
          : "display:flex;align-items:center;gap:22px;height:76px;padding:0 30px;border-bottom:1px solid #d5e7f6;cursor:pointer;";

        const numSpan = document.createElement("span");
        numSpan.textContent = num;
        numSpan.style.cssText =
          "font-family:Montserrat,sans-serif;font-style:italic;font-weight:700;font-size:19px;color:#1a79f2;";

        const sep = document.createElement("span");
        sep.style.cssText =
          "width:1px;height:22px;background:#cfe2f2;flex-shrink:0;";

        const qSpan = document.createElement("span");
        qSpan.textContent = f.q;
        qSpan.style.cssText =
          "flex-grow:1;font-size:16px;font-weight:700;color:#0a2a4f;";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.style.cssText =
          "width:36px;height:36px;border:none;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;";
        btn.style.background = isOpen ? "#1a79f2" : "#dbeefb";
        btn.innerHTML = isOpen
          ? '<svg width="15" height="3" viewBox="0 0 15 3" fill="none"><path d="M1 1.5h13" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>'
          : '<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1v13M1 7.5h13" stroke="#1a79f2" stroke-width="2.2" stroke-linecap="round"/></svg>';

        row.addEventListener("click", () => {
          openIndex = isOpen ? -1 : i;
          render();
        });

        item.appendChild(row);
        row.appendChild(numSpan);
        row.appendChild(sep);
        row.appendChild(qSpan);
        row.appendChild(btn);

        if (isOpen) {
          const answer = document.createElement("div");
          answer.style.cssText =
            "margin-top:22px;display:flex;gap:22px;background:#edf6fe;border-radius:14px;padding:20px 24px;";

          const label = document.createElement("span");
          label.textContent = "A.";
          label.style.cssText =
            "font-family:Montserrat,sans-serif;font-style:italic;font-weight:700;font-size:19px;color:#1a79f2;";

          const p = document.createElement("p");
          p.textContent = f.a;
          p.style.cssText =
            "margin:0;font-size:13.5px;line-height:2;font-weight:500;color:#3f566f;";

          answer.appendChild(label);
          answer.appendChild(p);
          item.appendChild(answer);
        }

        container.appendChild(item);
      });
    }

    render();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
