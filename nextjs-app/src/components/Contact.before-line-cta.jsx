"use client";

import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    const form = document.querySelector("#contact form");
    if (!form) return;

    const handleSubmit = async (event) => {
      event.preventDefault();

      const button = form.querySelector('button[type="submit"]');
      const originalHtml = button?.innerHTML;

      const company = document.getElementById("f-company")?.value.trim() || "";
      const name = document.getElementById("f-name")?.value.trim() || "";
      const email = document.getElementById("f-mail")?.value.trim() || "";
      const tel = document.getElementById("f-tel")?.value.trim() || "";
      const message = document.getElementById("f-body")?.value.trim() || "";
      const contactMethod =
        form.querySelector('input[name="f-contact-method"]:checked')?.value || "";

      if (!name || !email || !contactMethod) {
        alert("必須項目を入力してください。");
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = "送信中...";
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company,
            name,
            email,
            tel,
            inquiryType:
              contactMethod === "mail"
                ? "メール"
                : contactMethod === "tel"
                  ? "電話"
                  : "どちらでも",
            message,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "送信に失敗しました。");
        }

        form.reset();

        const formWrap = form.parentElement;
        if (formWrap) {
          form.style.display = "none";

          const success = document.createElement("div");
          success.className = "contact-success";
          success.innerHTML = `
            <div class="contact-success-icon">✓</div>
            <h3>お問い合わせを送信しました</h3>
            <p>
              お問い合わせありがとうございます。<br>
              内容を確認のうえ、担当者よりご連絡いたします。
            </p>
            <p class="contact-success-sub">
              ご入力いただいたメールアドレスへ<br>
              自動返信メールをお送りしました。
            </p>
          `;

          formWrap.appendChild(success);

          setTimeout(() => {
            success.remove();
            form.style.display = "flex";
          }, 10000);
        }
      } catch (error) {
        console.error(error);

        let errorBox = form.querySelector(".contact-submit-error");

        if (!errorBox) {
          errorBox = document.createElement("div");
          errorBox.className = "contact-submit-error";
          form.appendChild(errorBox);
        }

        errorBox.textContent =
          "送信に失敗しました。時間をおいてもう一度お試しください。";
      } finally {
        if (button) {
          button.disabled = false;
          button.innerHTML = originalHtml;
        }
      }
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  const html = "<section id=\"contact\" class=\"contact-section\" style=\"position: relative; height: 1343px; overflow: hidden; background: linear-gradient(180deg, #eaf6fd 0%, #f8fcff 38%, #eef8fe 100%)\">\n<svg width=\"100%\" height=\"90\" viewBox=\"0 0 1440 90\" preserveAspectRatio=\"none\" fill=\"none\" aria-hidden=\"true\" style=\"position: absolute; top: -1px; left: 0; display: block;\"><path d=\"M0 0H1440V44C1340 44 1240 72 1140 72C1013.3 72 886.7 16 760 16C633.3 16 506.7 60 380 60C253.3 60 126.7 32 0 32Z\" fill=\"#ffffff\"></path></svg>\n<img src=\"/assets/deco-shape-01.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; left: -130px; top: 330px; width: 280px; height: 173px; opacity: 0.4;\">\n<img src=\"/assets/deco-shape-03.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; right: -140px; top: 180px; width: 280px; height: 249px; opacity: 0.4;\">\n<img src=\"/assets/deco-shape-04.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; left: -110px; bottom: 210px; width: 230px; height: 212px; opacity: 0.4;\">\n<img src=\"/assets/deco-shape-06.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; right: -120px; bottom: 150px; width: 215px; height: 220px; opacity: 0.4;\">\n\n<div class=\"contact-inner\" style=\"position: relative; z-index: 3; width: 1180px; max-width: 1180px; margin: 0 auto; height: 1343px; padding: 96px 0 0; display: flex; flex-direction: column; align-items: center;\">\n<img class=\"contact-bottom-star\" src=\"/assets/deco-accent-01.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; left: 70px; bottom: 80px; width: 84px; height: 78px; opacity: 0.5;\">\n<img src=\"/assets/deco-accent-01.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; left: 64px; top: 236px; width: 104px; height: 96px; opacity: 0.5;\">\n<img src=\"/assets/deco-accent-01.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; right: 100px; bottom: 283.5px; width: 72px; height: 66px; opacity: 0.5;\">\n<img src=\"/assets/deco-accent-02.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; left: -70px; bottom: 458px; width: 88px; height: 88px; opacity: 0.5;\">\n<img src=\"/assets/deco-accent-02.webp\" alt=\"\" aria-hidden=\"true\" style=\"position: absolute; right: 76px; top: 456px; width: 96px; height: 96px; opacity: 0.5;\">\n<div class=\"contact-badge\" style=\"position: absolute; right: 128px; top: 149px; width: 190px; height: 190px; border-radius: 50%; background: linear-gradient(150deg, #cfe9fc, #a9d8f8); display: flex; align-items: center; justify-content: center; transform: rotate(10deg)\"><span style=\"font-family: 'Yomogi', cursive; font-size: 26px; font-weight: 700; line-height: 1.25; text-align: center; color: rgb(14, 95, 209)\">キレイな<br>空間づくりを<br>サポート</span></div>\n<svg class=\"contact-badge-lines\" width=\"72\" height=\"64\" viewBox=\"0 0 52 46\" fill=\"none\" aria-hidden=\"true\" style=\"position: absolute; right: 102px; top: 129px; transform: rotate(35deg)\"><path d=\"M6 24L2 8M20 18L22 2M33 22L42 10\" stroke=\"#1a79f2\" stroke-width=\"2.4\" stroke-linecap=\"round\"></path></svg>\n<div class=\"contact-en\" style=\"font-family: Caveat, cursive; font-size: 68px; font-weight: 700; line-height: 1; color: #1a79f2;\">Contact</div>\n<div class=\"contact-jp\" style=\"margin-top: 14px; font-size: 26px; font-weight: 900; letter-spacing: 0.04em; color: #0a2a4f;\">お問い合わせ</div>\n<p class=\"contact-lead\" style=\"margin: 22px 0 0; font-size: 17px; font-weight: 900; color: #0a2a4f;\">清掃のご相談・お見積もりはお気軽にお問い合わせください。</p>\n<p class=\"contact-copy\" style=\"margin: 14px 0 0; font-size: 14px; line-height: 1.95; font-weight: 500; text-align: center; color: #4c6079;\">法人・店舗・住宅を問わず、清掃内容やご予算、ご希望の日時などを<br>確認のうえご案内いたします。</p>\n\n<form class=\"contact-form\" style=\"margin-top: 44px; width: 820px; background: #ffffff; border-radius: 26px; padding: 48px 50px; box-shadow: 0 18px 44px rgba(20,80,150,0.07); display: flex; flex-direction: column; gap: 26px;\">\n\n<div style=\"display: flex; flex-direction: column; gap: 9px;\">\n<div style=\"display: flex; align-items: center; gap: 14px;\">\n<span style=\"font-family: Montserrat, sans-serif; font-style: italic; font-weight: 800; font-size: 15px; color: #1a79f2;\">01</span>\n<label for=\"f-company\" style=\"font-size: 15px; font-weight: 900; color: #0a2a4f;\">会社名</label>\n<span style=\"padding: 4px 12px; border-radius: 999px; background: #e5eef7; font-size: 11px; font-weight: 700; color: #4f6b86;\">任意</span>\n</div>\n<div style=\"margin-left: 36px; font-size: 12px; font-weight: 500; color: #5f7590;\">個人の方は未入力でも構いません</div>\n<input id=\"f-company\" type=\"text\" placeholder=\"例）株式会社○○\" style=\"height: 52px; border: 1px solid #cfe4f5; border-radius: 10px; background: #ffffff; padding: 0 18px; font-size: 14px; color: #0a2a4f;\">\n</div>\n\n<div style=\"display: flex; flex-direction: column; gap: 9px;\">\n<div style=\"display: flex; align-items: center; gap: 14px;\">\n<span style=\"font-family: Montserrat, sans-serif; font-style: italic; font-weight: 800; font-size: 15px; color: #1a79f2;\">02</span>\n<label for=\"f-name\" style=\"font-size: 15px; font-weight: 900; color: #0a2a4f;\">お名前</label>\n<span style=\"padding: 4px 12px; border-radius: 999px; background: #1a79f2; font-size: 11px; font-weight: 700; color: #ffffff;\">必須</span>\n</div>\n<input id=\"f-name\" type=\"text\" placeholder=\"例）山田 太郎\" style=\"height: 52px; border: 1px solid #cfe4f5; border-radius: 10px; background: #ffffff; padding: 0 18px; font-size: 14px; color: #0a2a4f;\">\n</div>\n\n<div style=\"display: flex; flex-direction: column; gap: 9px;\">\n<div style=\"display: flex; align-items: center; gap: 14px;\">\n<span style=\"font-family: Montserrat, sans-serif; font-style: italic; font-weight: 800; font-size: 15px; color: #1a79f2;\">03</span>\n<label for=\"f-mail\" style=\"font-size: 15px; font-weight: 900; color: #0a2a4f;\">メールアドレス</label>\n<span style=\"padding: 4px 12px; border-radius: 999px; background: #1a79f2; font-size: 11px; font-weight: 700; color: #ffffff;\">必須</span>\n</div>\n<input id=\"f-mail\" type=\"email\" placeholder=\"例）example@example.com\" style=\"height: 52px; border: 1px solid #cfe4f5; border-radius: 10px; background: #ffffff; padding: 0 18px; font-size: 14px; color: #0a2a4f;\">\n</div>\n\n<div style=\"display: flex; flex-direction: column; gap: 9px;\">\n<div style=\"display: flex; align-items: center; gap: 14px;\">\n<span style=\"font-family: Montserrat, sans-serif; font-style: italic; font-weight: 800; font-size: 15px; color: #1a79f2;\">04</span>\n<label for=\"f-tel\" style=\"font-size: 15px; font-weight: 900; color: #0a2a4f;\">電話番号</label>\n<span style=\"padding: 4px 12px; border-radius: 999px; background: #e5eef7; font-size: 11px; font-weight: 700; color: #4f6b86;\">任意</span>\n</div>\n<input id=\"f-tel\" type=\"tel\" inputmode=\"numeric\" autocomplete=\"tel\" placeholder=\"例）09012345678\" style=\"height: 52px; border: 1px solid #cfe4f5; border-radius: 10px; background: #ffffff; padding: 0 18px; font-size: 14px; color: #0a2a4f;\">\n</div>\n\n<div style=\"display: flex; flex-direction: column; gap: 9px;\">\n<div style=\"display: flex; align-items: center; gap: 14px;\">\n<span style=\"font-family: Montserrat, sans-serif; font-style: italic; font-weight: 800; font-size: 15px; color: #1a79f2;\">05</span>\n<label style=\"font-size: 15px; font-weight: 900; color: #0a2a4f;\">ご希望の連絡方法</label>\n<span style=\"padding: 4px 12px; border-radius: 999px; background: #1a79f2; font-size: 11px; font-weight: 700; color: #ffffff;\">必須</span>\n</div>\n<div style=\"display: flex; align-items: center; gap: 32px; margin-left: 36px;\">\n<label for=\"f-contact-mail\" style=\"display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: #33485f; cursor: pointer;\">\n<input id=\"f-contact-mail\" type=\"radio\" name=\"f-contact-method\" value=\"mail\" style=\"width: 20px; height: 20px; accent-color: #1a79f2;\">\nメール\n</label>\n<label for=\"f-contact-tel\" style=\"display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: #33485f; cursor: pointer;\">\n<input id=\"f-contact-tel\" type=\"radio\" name=\"f-contact-method\" value=\"tel\" style=\"width: 20px; height: 20px; accent-color: #1a79f2;\">\n電話\n</label>\n<label for=\"f-contact-either\" style=\"display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: #33485f; cursor: pointer;\">\n<input id=\"f-contact-either\" type=\"radio\" name=\"f-contact-method\" value=\"either\" style=\"width: 20px; height: 20px; accent-color: #1a79f2;\">\nどちらでも\n</label>\n</div>\n</div>\n\n<div style=\"display: flex; flex-direction: column; gap: 9px;\">\n<div style=\"display: flex; align-items: center; gap: 14px;\">\n<span style=\"font-family: Montserrat, sans-serif; font-style: italic; font-weight: 800; font-size: 15px; color: #1a79f2;\">06</span>\n<label for=\"f-body\" style=\"font-size: 15px; font-weight: 900; color: #0a2a4f;\">お問い合わせ内容</label>\n<span style=\"padding: 4px 12px; border-radius: 999px; background: #e5eef7; font-size: 11px; font-weight: 700; color: #4f6b86;\">任意</span>\n</div>\n<textarea id=\"f-body\" placeholder=\"例）エアコンの洗浄について見積もりをお願いしたいです。\n　　作業可能な時期や費用の目安も教えてください。\" style=\"height: 120px; border: 1px solid #cfe4f5; border-radius: 10px; background: #ffffff; padding: 16px 18px; font-size: 14px; line-height: 1.9; color: #0a2a4f; resize: vertical;\"></textarea>\n</div>\n\n<button type=\"submit\" style=\"align-self: center; margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 14px; width: 420px; height: 64px; border: none; border-radius: 32px; background: #1a79f2; color: #ffffff; font-size: 16px; font-weight: 700; cursor: pointer; box-shadow: 0 14px 26px rgba(26,121,242,0.3);\">\n<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2.5\" stroke=\"#ffffff\" stroke-width=\"1.7\"></rect><path d=\"M3.5 7l8.5 6 8.5-6\" stroke=\"#ffffff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\nこの内容で送信する\n<svg width=\"22\" height=\"12\" viewBox=\"0 0 22 12\" fill=\"none\" aria-hidden=\"true\" style=\"margin-left: 8px;\"><path d=\"M1 6h18M14.5 1l5 5-5 5\" stroke=\"#ffffff\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n</button>\n\n</form>\n</div>\n</section>";


  useEffect(() => {
    const form = document.querySelector("#contact form");
    const emailInput = document.getElementById("f-mail");
    const telInput = document.getElementById("f-tel");

    if (!form) return;

    const toHalfWidth = (value) => {
      return value.normalize("NFKC");
    };

    const normalizeTel = () => {
      if (!telInput) return;

      telInput.value = toHalfWidth(telInput.value)
        .replace(/[ー−―‐]/g, "-")
        .replace(/\s/g, "");
    };

    telInput?.addEventListener("input", normalizeTel);

    const clearErrors = () => {
      form.querySelectorAll(".contact-error").forEach((el) => el.remove());

      form.querySelectorAll("input").forEach((el) => {
        el.style.borderColor = "";
      });
    };

    const showError = (element, message) => {
      if (!element) return;

      element.style.borderColor = "#e5484d";

      const error = document.createElement("div");
      error.className = "contact-error";
      error.textContent = message;
      error.style.cssText =
        "margin-top:6px;font-size:12px;font-weight:500;color:#e5484d;line-height:1.5;";

      element.insertAdjacentElement("afterend", error);
    };

    const validateBeforeSubmit = (event) => {
      clearErrors();

      normalizeTel();

      const name = document.getElementById("f-name");
      const email = document.getElementById("f-mail");
      const tel = document.getElementById("f-tel");

      const contactMethod =
        form.querySelector('input[name="f-contact-method"]:checked');

      let firstError = null;

      if (!name?.value.trim()) {
        showError(name, "お名前を入力してください。");
        firstError ||= name;
      }

      if (!email?.value.trim()) {
        showError(email, "メールアドレスを入力してください。");
        firstError ||= email;
      } else {
        const emailPattern =
          /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

        if (!emailPattern.test(email.value.trim())) {
          showError(
            email,
            "メールアドレスを正しい形式で入力してください。"
          );
          firstError ||= email;
        }
      }

      if (!contactMethod) {
        const options =
          form.querySelector('input[name="f-contact-method"]')
            ?.closest("div");

        if (options && !options.querySelector(".contact-error")) {
          const error = document.createElement("div");
          error.className = "contact-error";
          error.textContent = "ご希望の連絡方法を選択してください。";
          error.style.cssText =
            "margin:6px 0 0 36px;font-size:12px;font-weight:500;color:#e5484d;line-height:1.5;";
          options.insertAdjacentElement("afterend", error);
        }

        firstError ||= form.querySelector(
          'input[name="f-contact-method"]'
        );
      }

      if (
        contactMethod?.value === "tel" &&
        !tel?.value.trim()
      ) {
        showError(
          tel,
          "電話での連絡をご希望の場合は電話番号を入力してください。"
        );
        firstError ||= tel;
      }

      if (firstError) {
        event.preventDefault();
        event.stopImmediatePropagation();

        firstError.focus?.();

        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    form.addEventListener("submit", validateBeforeSubmit, true);

    return () => {
      telInput?.removeEventListener("input", normalizeTel);
      form.removeEventListener("submit", validateBeforeSubmit, true);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
