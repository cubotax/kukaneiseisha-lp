import Header from "../../components/Header";
import AirconDiagnosis from "../../components/AirconDiagnosis";
import Footer from "../../components/Footer";

export const metadata = {
  title: "エアコン洗浄ってホントに必要？｜4問セルフ診断｜空間衛生社",
  description:
    "エアコン洗浄が必要か、ニオイ・吹出口・送風ファン・アルミフィンの状態から4問で簡単にセルフ診断できます。",
  alternates: {
    canonical: "/aircon-diagnosis",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AirconDiagnosisPage() {
  return (
    <>
      <Header />
      <main>
        <AirconDiagnosis />
      </main>
      <Footer />
    </>
  );
}
