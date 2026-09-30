import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      company,
      email,
      tel,
      inquiryType,
      message,
    } = body;

    if (!name || !email || !inquiryType) {
      return Response.json(
        { error: "必須項目が入力されていません。" },
        { status: 400 }
      );
    }

    const adminText = `
空間衛生社のお問い合わせフォームから送信がありました。

■ お名前
${name}

■ 会社名・店舗名
${company || "未入力"}

■ メールアドレス
${email}

■ 電話番号
${tel || "未入力"}

■ ご希望の連絡方法
${inquiryType}

■ お問い合わせ内容
${message || "未入力"}
    `.trim();

    const customerText = `
${name}様

このたびは空間衛生社へお問い合わせいただき、ありがとうございます。
以下の内容でお問い合わせを受け付けました。

内容を確認のうえ、担当者よりご連絡いたします。
しばらくお待ちください。

------------------------------
■ お名前
${name}様

■ 会社名
${company || "未入力"}

■ メールアドレス
${email}

■ 電話番号
${tel || "未入力"}

■ ご希望の連絡方法
${inquiryType}

■ お問い合わせ内容
${message || "未入力"}
------------------------------

※このメールは、お問い合わせフォームから送信いただいた方へ自動送信しています。

空間衛生社
〒036-8075
青森県弘前市撫牛子3-6-7
MAIL：info@kukaneiseisha.com
    `.trim();

    const adminResult = await resend.emails.send({
      from: "空間衛生社 <info@kukaneiseisha.com>",
      to: ["info@kukaneiseisha.com"],
      replyTo: email,
      subject: `【空間衛生社】お問い合わせ：${name}様`,
      text: adminText,
    });

    if (adminResult.error) {
      console.error("Admin mail error:", adminResult.error);

      return Response.json(
        { error: "管理者通知メールの送信に失敗しました。" },
        { status: 500 }
      );
    }

    const customerResult = await resend.emails.send({
      from: "空間衛生社 <info@kukaneiseisha.com>",
      to: [email],
      replyTo: "info@kukaneiseisha.com",
      subject: "【空間衛生社】お問い合わせありがとうございます",
      text: customerText,
    });

    if (customerResult.error) {
      console.error("Customer mail error:", customerResult.error);

      return Response.json(
        { error: "自動返信メールの送信に失敗しました。" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      adminId: adminResult.data?.id,
      customerId: customerResult.data?.id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "送信処理でエラーが発生しました。" },
      { status: 500 }
    );
  }
}
