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

    const { data, error } = await resend.emails.send({
      from: "空間衛生社 <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      replyTo: email,
      subject: `【空間衛生社】お問い合わせ：${name}様`,
      text: `
空間衛生社のお問い合わせフォームから送信がありました。

■ お名前
${name}

■ 会社名・店舗名
${company || "未入力"}

■ メールアドレス
${email}

■ 電話番号
${tel || "未入力"}

■ お問い合わせ種別
${inquiryType || "未選択"}

■ お問い合わせ内容
${message}
      `.trim(),
    });

    if (error) {
      console.error(error);

      return Response.json(
        { error: "メールの送信に失敗しました。" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "送信処理でエラーが発生しました。" },
      { status: 500 }
    );
  }
}
