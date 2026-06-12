import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MonthFocus } from "@/components/MonthFocus";
import { Calendario } from "@/components/Calendario";
import { Footer } from "@/components/Footer";
import { DisclaimerGate } from "@/components/DisclaimerGate";

export function App() {
  return (
    <div id="top" className="min-h-screen bg-bg text-ink">
      <DisclaimerGate />
      <Header />
      <main>
        <Hero />
        <MonthFocus />
        <Calendario />
      </main>
      <Footer />
    </div>
  );
}
