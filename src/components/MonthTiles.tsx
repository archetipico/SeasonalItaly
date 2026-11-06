import type { CSSProperties } from "react";
import { copy, monthName } from "@/copy";
import { Cutout } from "@/components/Cutout";
import { monthStyle } from "@/data/palette";
import { monthShapes } from "@/data/shapes";

/** Every month of the year, 1-indexed. */
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

/**
 * Offer every month as a coloured tile.
 * @param props.month Month shown, 1-indexed.
 * @param props.onPick Show the picked month.
 * @returns Section of tiles.
 */
export function MonthTiles({ month, onPick }: { month: number; onPick: (month: number) => void }) {
  return (
    <section className="issues" aria-labelledby="issues-title">
      <h2 id="issues-title" className="issues__title">{copy.tiles.title}</h2>
      <div className="issues__tiles">
        {MONTHS.map((tile) => (
          <button
            key={tile}
            type="button"
            className="tile"
            style={monthStyle(tile) as CSSProperties}
            aria-current={tile === month}
            onClick={() => onPick(tile)}
          >
            {monthName(tile)}
            <Cutout shape={monthShapes(tile)[0]} />
          </button>
        ))}
      </div>
    </section>
  );
}
