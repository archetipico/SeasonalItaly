import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MonthTiles } from "./MonthTiles";

afterEach(cleanup);

describe("MonthTiles", () => {
  it("offers twelve drawn tiles and marks only the month shown", () => {
    const { container } = render(<MonthTiles month={3} onPick={() => {}} />);
    const tiles = screen.getAllByRole("button");
    expect(tiles).toHaveLength(12);
    expect(container.querySelectorAll(".tile svg")).toHaveLength(12);
    expect(tiles.filter((tile) => tile.getAttribute("aria-current") === "true").map((tile) => tile.textContent)).toEqual(["marzo"]);
  });

  it("colours each tile with its own month and reports the pick", () => {
    const onPick = vi.fn();
    render(<MonthTiles month={3} onPick={onPick} />);
    const december = screen.getByRole("button", { name: "dicembre" });
    expect(december.style.getPropertyValue("--bg")).toBe("#d7e5db");
    fireEvent.click(december);
    expect(onPick).toHaveBeenCalledWith(12);
  });
});
