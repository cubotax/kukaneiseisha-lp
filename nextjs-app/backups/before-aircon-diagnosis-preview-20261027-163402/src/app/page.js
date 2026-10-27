import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Works from "../components/Works";
import Strengths from "../components/Strengths";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ResetHashOnReload from "../components/ResetHashOnReload";

export default function Home() {
  return (
    <>
      <ResetHashOnReload />
      <Header />
      <Hero />
      <Services />
      <Works />
      <About />
      <Strengths />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
