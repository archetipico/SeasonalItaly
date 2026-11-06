import { useLayoutEffect, useRef } from "react";
import { copy, sayMonths } from "@/copy";
import { Cutout } from "@/components/Cutout";
import { isInSeason, type Item } from "@/data/seasonal";
import { shapeOf } from "@/data/shapes";

/**
 * Show one entry's months in a modal dialog. The browser handles Escape and gives focus back to the opener.
 * @param props.item Entry to show.
 * @param props.month Month being browsed, 1-indexed, underlined in the year.
 * @param props.onClose Called once the dialog has closed.
 * @returns Dialog, open from its first paint.
 */
export function ItemSheet({ item, month, onClose }: { item: Item; month: number; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shape = shapeOf(item.name);

  useLayoutEffect(() => {
    const dialog = dialogRef.current!;
    if (!dialog.open) dialog.showModal();
  }, []);

  /** Close on a press on the backdrop, which is the only place a click lands on the dialog itself. */
  const closeFromBackdrop = (target: EventTarget) => {
    if (target === dialogRef.current) dialogRef.current.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="sheet"
      aria-labelledby="sheet-name"
      onClose={onClose}
      onClick={(event) => closeFromBackdrop(event.target)}
    >
      <div className="sheet__body">
        <button type="button" className="link sheet__close" onClick={() => dialogRef.current!.close()}>
          {copy.sheet.close}
        </button>
        <h2 id="sheet-name" className="sheet__name">{item.name}</h2>
        {shape && (
          <div className="sheet__art" aria-hidden>
            <Cutout shape={shape} />
          </div>
        )}
        <p><strong>{copy.sheet.peak}</strong> {sayMonths(item.peak)}.</p>
        {item.shoulder && <p><strong>{copy.sheet.shoulder}</strong> {sayMonths(item.shoulder)}.</p>}
        {item.isImported && <p>{copy.sheet.imported}</p>}
        <ul className="sheet__year" aria-hidden>
          {copy.months.short.map((name, i) => (
            <li key={name} data-state={isInSeason(item, i + 1)} data-now={i + 1 === month}>{name}</li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
