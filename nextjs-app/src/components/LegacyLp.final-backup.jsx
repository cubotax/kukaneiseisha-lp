"use client";

import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Works from "./Works";
import Strengths from "./Strengths";
import Faq from "./Faq";
import Contact from "./Contact";
import Footer from "./Footer";

const html = "\n<div style=\"width: 100%; height: auto; min-height: 0; overflow: visible; background: #ffffff; color: #0a2a4f\">\n\n\n\n\n\n\n\n\n\n<!-- ============ FAQ ============ -->\n\n\n<!-- ============ CONTACT ============ -->\n\n\n<!-- ============ FOOTER ============ -->\n\n\n</div>\n\n\n\n\n\n\n";
const scripts = [];

export default function LegacyLp() {
return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Works />
      <Strengths />
      <Faq />
      <Contact />
      <Footer />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
