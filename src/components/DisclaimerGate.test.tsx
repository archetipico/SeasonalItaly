import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { DisclaimerGate } from "./DisclaimerGate";

const KEY = "seasonalitaly-disclaimer";

/** Fake a disclaimer body taller than its box, so that the scroll requirement applies. */
function fakeOverflow() {
  vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(1000);
  vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
}

const body = () => screen.getByRole("dialog").querySelector<HTMLElement>(".gate__body")!;
const acceptButton = () => screen.getByRole("dialog").querySelector<HTMLButtonElement>(".gate__accept")!;
const scrollTo = (top: number) => {
  body().scrollTop = top;
  fireEvent.scroll(body());
};

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("DisclaimerGate", () => {
  it("stays away once accepted", () => {
    localStorage.setItem(KEY, "1");
    render(<DisclaimerGate />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens when storage throws and still lets the visitor through", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<DisclaimerGate />);
    fireEvent.click(acceptButton());
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("enables accept straight away when the text fits", () => {
    render(<DisclaimerGate />);
    expect(acceptButton().disabled).toBe(false);
  });

  it("keeps accept disabled until the end of the text is reached", () => {
    fakeOverflow();
    render(<DisclaimerGate />);
    expect(acceptButton().disabled).toBe(true);
    scrollTo(500);
    expect(acceptButton().disabled).toBe(true);
    scrollTo(900);
    expect(acceptButton().disabled).toBe(false);
  });

  it("keeps accept enabled after scrolling back up", () => {
    fakeOverflow();
    render(<DisclaimerGate />);
    scrollTo(900);
    scrollTo(0);
    expect(acceptButton().disabled).toBe(false);
  });

  it("stores the choice and restores page scrolling on accept", () => {
    render(<DisclaimerGate />);
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(acceptButton());
    expect(localStorage.getItem(KEY)).toBe("1");
    expect(document.body.style.overflow).toBe("");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("rechecks the text on resize", () => {
    const height = vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(1000);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(100);
    render(<DisclaimerGate />);
    expect(acceptButton().disabled).toBe(true);
    height.mockReturnValue(100);
    fireEvent(window, new Event("resize"));
    expect(acceptButton().disabled).toBe(false);
  });

  it("wraps Tab inside the dialog in both directions", () => {
    render(<DisclaimerGate />);
    const first = body();
    const last = acceptButton();
    last.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(first);
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(document, { key: "Enter" });
    expect(document.activeElement).toBe(last);
  });

  /** Run the scroll hint with the given reduced-motion answer and return the requested behaviour. */
  function hintBehaviour(reduced: boolean) {
    fakeOverflow();
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduced && query === "(prefers-reduced-motion: reduce)" }));
    const scrollBy = vi.fn();
    render(<DisclaimerGate />);
    body().scrollBy = scrollBy;
    fireEvent.click(screen.getByRole("dialog").querySelector(".gate__hint")!);
    vi.unstubAllGlobals();
    return scrollBy.mock.calls[0][0].behavior;
  }

  it("keeps focus on the text while accept is disabled, in both directions", () => {
    fakeOverflow();
    render(<DisclaimerGate />);
    body().focus();
    expect(fireEvent.keyDown(document, { key: "Tab" })).toBe(false);
    expect(document.activeElement).toBe(body());
    expect(fireEvent.keyDown(document, { key: "Tab", shiftKey: true })).toBe(false);
    expect(document.activeElement).toBe(body());
  });

  it("leaves Tab alone away from the ends of the focus cycle", () => {
    render(<DisclaimerGate />);
    (document.activeElement as HTMLElement | null)?.blur();
    for (const shiftKey of [false, true]) {
      expect(fireEvent.keyDown(document, { key: "Tab", shiftKey })).toBe(true);
    }
  });

  it("scrolls the text smoothly from the hint by default", () => {
    expect(hintBehaviour(false)).toBe("smooth");
  });

  it("jumps instead of animating under a reduced-motion preference", () => {
    expect(hintBehaviour(true)).toBe("auto");
  });
});
