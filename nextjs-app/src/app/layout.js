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
  title: "空間衛生社",
  description: "清潔で快適な空間づくりをサポートする空間衛生社",
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
