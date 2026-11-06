import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { copy } from "@/copy";
import type { Item } from "@/data/seasonal";
import { ItemSheet } from "./ItemSheet";

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.open = true;
  });
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
});
afterEach(cleanup);

const pear: Item = { name: "pera", peak: [8, 9], shoulder: [7] };
const banana: Item = { name: "banana", peak: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], isImported: true };
const dialog = () => screen.getByRole("dialog", { hidden: true }) as HTMLDialogElement;

describe("ItemSheet", () => {
  it("opens as a modal, naming the entry and its peak and shoulder months", () => {
    render(<ItemSheet item={pear} month={7} onClose={() => {}} />);
    expect(dialog().open).toBe(true);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
    expect(dialog().textContent).toContain("agosto e settembre.");
    expect(dialog().textContent).toContain(copy.sheet.shoulder);
    expect(dialog().textContent).not.toContain(copy.sheet.imported);
  });

  it("does not open twice when effects run twice under StrictMode", () => {
    render(<StrictMode><ItemSheet item={pear} month={7} onClose={() => {}} /></StrictMode>);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledOnce();
  });

  it("marks an imported all-year entry and leaves out the shoulder line", () => {
    render(<ItemSheet item={banana} month={1} onClose={() => {}} />);
    expect(dialog().textContent).toContain(copy.sheet.imported);
    expect(dialog().textContent).toContain(copy.sheet.allYear);
    expect(dialog().textContent).not.toContain(copy.sheet.shoulder);
  });

  it("marks each month of the year by season and underlines the month being browsed", () => {
    const { container } = render(<ItemSheet item={pear} month={7} onClose={() => {}} />);
    const cells = [...container.querySelectorAll<HTMLElement>(".sheet__year li")];
    expect(cells).toHaveLength(12);
    expect(cells.map((cell) => cell.dataset.state).filter((state) => state === "peak")).toHaveLength(2);
    expect(cells[6].dataset.state).toBe("shoulder");
    expect(cells[6].dataset.now).toBe("true");
    expect(cells[7].dataset.now).toBe("false");
  });

  it("draws the entry when a drawing exists and leaves the space out when not", () => {
    const { container, unmount } = render(<ItemSheet item={pear} month={7} onClose={() => {}} />);
    expect(container.querySelector(".sheet__art svg")).not.toBeNull();
    unmount();
    const other = render(<ItemSheet item={{ name: "non esiste", peak: [1] }} month={1} onClose={() => {}} />);
    expect(other.container.querySelector(".sheet__art")).toBeNull();
  });

  it("closes from its button and from a press on the backdrop, not from a press inside", () => {
    const onClose = vi.fn();
    render(<ItemSheet item={pear} month={7} onClose={onClose} />);
    fireEvent.click(screen.getByRole("heading", { hidden: true }));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(dialog());
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: copy.sheet.close, hidden: true }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
