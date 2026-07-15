import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import QuizDemo from "@/components/QuizDemo";
import Schools from "@/components/Schools";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <QuizDemo />
        <Schools />
        <CtaBand />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
