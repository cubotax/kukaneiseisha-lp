import "./globals.css";
// Font families are loaded by the existing Google Fonts CSS import in globals.css.
// Avoid next/font build-time downloads while preserving the same CSS variables.
const fontVariables = {
  "--font-caveat": "'Caveat', cursive",
  "--font-montserrat": "'Montserrat', sans-serif",
  "--font-zen-kaku": "'Zen Kaku Gothic New', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
};

export const metadata = {
  metadataBase: new URL("https://kukaneiseisha.com"),
  title: "空間衛生社｜青森県の総合清掃サービス",
  description: "空間衛生社は青森県を中心に、法人・個人向けの清掃に幅広く対応する総合清掃サービスです。エアコン洗浄、店舗・施設清掃、退去後清掃、新築美装、ハウスクリーニング、草刈り・除雪まで、現場に合わせて丁寧に対応します。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={fontVariables}>
        {children}
      </body>
    </html>
  );
}
