// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import BannerSection from "../components/BannerSection";
import Services from "../components/Services";
import About from "../components/About";
import News from "../components/News";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* Banner (Swiper) */}
      <BannerSection />

      {/* Main Sections */}
      <Services />
      <About />
      <News />
      <Pricing />
      <CTA />
      <ContactForm />

      <Footer />
    </>
  );
}
