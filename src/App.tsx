import { useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import { Cover } from "@/components/Cover";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { DisclaimerCurtain } from "@/components/DisclaimerCurtain";
import { DisclaimerGate } from "@/components/DisclaimerGate";
import { Footer } from "@/components/Footer";
import { MonthIssue } from "@/components/MonthIssue";
import { MonthTiles } from "@/components/MonthTiles";
import { useDisclosure } from "@/components/useDisclosure";
import { monthStyle } from "@/data/palette";

/**
 * Lay out the page, opening on the current calendar month.
 * @returns Whole page.
 */
export function App() {
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const disclaimer = useDisclosure();
  const curtainTitleRef = useRef<HTMLHeadingElement>(null);
  const coverTitleRef = useRef<HTMLHeadingElement>(null);

  /** Go back to the top of the page and open the full disclaimer there. */
  const readDisclaimer = () => {
    flushSync(disclaimer.open);
    window.scrollTo({ top: 0 });
    curtainTitleRef.current!.focus({ preventScroll: true });
  };

  /** Go back to the cover of a month picked further down the page. */
  const browse = (picked: number) => {
    setMonth(picked);
    window.scrollTo({ top: 0 });
    coverTitleRef.current!.focus({ preventScroll: true });
  };

  return (
    <div id="top" className="page" style={monthStyle(month) as CSSProperties}>
      <DisclaimerGate />
      <DisclaimerCurtain disclaimer={disclaimer} titleRef={curtainTitleRef} />
      <Cover month={month} onTurn={setMonth} disclaimer={disclaimer} titleRef={coverTitleRef} />
      <MonthIssue key={month} month={month} />
      <MonthTiles month={month} onPick={browse} />
      <Footer />
      <DisclaimerBanner onRead={readDisclaimer} />
    </div>
  );
}
