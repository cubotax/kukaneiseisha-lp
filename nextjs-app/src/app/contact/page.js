import Header from "../../components/Header";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

export const metadata = {
  title: "お問い合わせ | 空間衛生社",
  description:
    "空間衛生社への清掃のご相談・お見積もりはこちらからお問い合わせください。",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="contact-page-only">
        <Contact />
      </div>
      <Footer />
    </>
  );
}
