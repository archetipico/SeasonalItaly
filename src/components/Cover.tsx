import type { RefObject } from "react";
import { copy, fill, monthName } from "@/copy";
import { Cutout } from "@/components/Cutout";
import type { Disclosure } from "@/components/useDisclosure";
import { monthIssue, nextMonth, previousMonth } from "@/data/issue";
import { monthShapes } from "@/data/shapes";

/**
 * Open the page on a month: its name, how much is in season, the disclaimer notice, the way to the next month.
 * @param props.month Month shown, 1-indexed.
 * @param props.onTurn Show another month, leaving focus where it is.
 * @param props.disclaimer Curtain holding the full disclaimer, shared with the fixed banner.
 * @param props.titleRef Ref for the month heading.
 * @returns Page header.
 */
export function Cover({
  month,
  onTurn,
  disclaimer,
  titleRef,
}: {
  month: number;
  onTurn: (month: number) => void;
  disclaimer: Disclosure;
  titleRef: RefObject<HTMLHeadingElement>;
}) {
  const { fruit, veg } = monthIssue(month);
  const previous = previousMonth(month);
  const next = nextMonth(month);

  return (
    <header className="cover">
      <p className="cover__masthead">
        <span>
          <span className="fleuron" aria-hidden>❦</span> {copy.brand}
        </span>
        <span>{fill(copy.cover.issue, { n: month })}</span>
      </p>
      <div>
        <h1 ref={titleRef} className="cover__title" tabIndex={-1}>{monthName(month)}</h1>
        <p className="cover__lead">{fill(copy.cover.lead, { n: fruit.length + veg.length })}</p>
        <p className="cover__notice">
          {copy.cover.notice}{" "}
          <button
            ref={disclaimer.toggleRef}
            type="button"
            className="link"
            aria-expanded={disclaimer.isOpen}
            aria-controls="disclaimer"
            onClick={disclaimer.toggle}
          >
            {copy.disclaimer.open}
          </button>
        </p>
        <div className="cover__turn">
          <button type="button" className="pill" onClick={() => onTurn(previous)}>
            {fill(copy.cover.previous, { month: monthName(previous) })}
          </button>
          <button type="button" className="pill" onClick={() => onTurn(next)}>
            {fill(copy.cover.next, { month: monthName(next) })}
          </button>
        </div>
      </div>
      <div className="cover__art" aria-hidden>
        {monthShapes(month).map((shape) => (
          <Cutout key={shape} shape={shape} />
        ))}
      </div>
    </header>
  );
}
