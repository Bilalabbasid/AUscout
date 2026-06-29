import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Features from "@/components/sections/Features";
import WhoItsFor from "@/components/sections/WhoItsFor";
import WaitlistSection from "@/components/sections/WaitlistSection";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <WhoItsFor />
      <WaitlistSection />
      <FAQ />
      <Footer />
    </main>
  );
}
