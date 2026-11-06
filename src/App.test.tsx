import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { App } from "./App";
import { copy } from "./copy";

let scrollTo: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  localStorage.setItem("seasonalitaly-disclaimer", "1");
  scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const cover = () => screen.getByRole("heading", { level: 1 });
const banner = () => within(screen.getByRole("region", { name: copy.disclaimer.label }));
const curtain = (container: HTMLElement) => container.querySelector<HTMLElement>("#disclaimer")!;
const toggle = () => within(screen.getByRole("banner")).getByRole("button", { name: copy.disclaimer.open });

describe("App", () => {
  it("opens on the month read from the clock, coloured by it", () => {
    vi.useFakeTimers({ toFake: ["Date"], now: new Date(2026, 1, 15) });
    const { container } = render(<App />);
    expect(cover().textContent).toBe("febbraio");
    expect(container.querySelector<HTMLElement>("#top")!.style.getPropertyValue("--bg")).toBe("#f0dfe2");
  });

  it("turns the month from the cover without moving the page", () => {
    vi.useFakeTimers({ toFake: ["Date"], now: new Date(2026, 11, 15) });
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /^Avanti/ }));
    expect(cover().textContent).toBe("gennaio");
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("goes back to the cover of a month picked from the tiles and focuses its title", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "luglio" }));
    expect(cover().textContent).toBe("luglio");
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
    expect(document.activeElement).toBe(cover());
  });

  it("clears the search when the month changes", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "zzz" } });
    fireEvent.click(screen.getByRole("button", { name: "luglio" }));
    expect((screen.getByRole("searchbox") as HTMLInputElement).value).toBe("");
  });

  it("keeps the disclaimer curtain closed until asked, with its sections in the page", () => {
    const { container } = render(<App />);
    expect(curtain(container).className).not.toContain("is-open");
    for (const section of copy.disclaimer.sections) expect(curtain(container).textContent).toContain(section.text);
  });

  it("goes to the top and opens the disclaimer from the fixed banner, also when pressed twice", () => {
    const { container } = render(<App />);
    const read = banner().getByRole("button", { name: copy.disclaimer.open });
    fireEvent.click(read);
    fireEvent.click(read);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0 });
    expect(curtain(container).className).toContain("is-open");
    expect(toggle().getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(screen.getByRole("heading", { name: copy.disclaimer.title }));
  });

  it("toggles the disclaimer from the cover notice and closes it from its button, giving focus back", () => {
    const { container } = render(<App />);
    fireEvent.click(toggle());
    expect(curtain(container).className).toContain("is-open");
    fireEvent.click(within(curtain(container)).getByRole("button", { name: copy.disclaimer.close }));
    expect(curtain(container).className).not.toContain("is-open");
    expect(document.activeElement).toBe(toggle());
  });

  it("closes the disclaimer on Escape only, and ignores Escape once closed", () => {
    const { container } = render(<App />);
    fireEvent.click(toggle());
    fireEvent.keyDown(document, { key: "a" });
    expect(curtain(container).className).toContain("is-open");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(curtain(container).className).not.toContain("is-open");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(curtain(container).className).not.toContain("is-open");
  });
});
