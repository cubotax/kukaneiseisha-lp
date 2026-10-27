import "./globals.css";
import { Caveat, Montserrat, Zen_Kaku_Gothic_New } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-kaku",
});

export const metadata = {
  metadataBase: new URL("https://kukaneiseisha.com"),
  title: "空間衛生社｜青森県の総合清掃サービス",
  description: "空間衛生社は青森県を中心に、法人・個人向けの清掃に幅広く対応する総合清掃サービスです。エアコン洗浄、店舗・施設清掃、退去後清掃、新築美装、ハウスクリーニング、草刈り・除雪まで、現場に合わせて丁寧に対応します。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${caveat.variable} ${montserrat.variable} ${zenKaku.variable}`}>
        {children}
      </body>
    </html>
  );
}
