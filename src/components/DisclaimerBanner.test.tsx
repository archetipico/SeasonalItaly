import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { DisclaimerBanner } from "./DisclaimerBanner";

afterEach(cleanup);

describe("DisclaimerBanner", () => {
  it("says on its own what the site does not tell and who to ask", () => {
    render(<DisclaimerBanner onRead={() => {}} />);
    const text = screen.getByRole("region").textContent;
    expect(text).toMatch(/stagioni/);
    expect(text).toMatch(/sicuro/);
    expect(text).toMatch(/medico.*esperto/);
  });

  it("asks to bring the reader to the disclaimer when its button is pressed", () => {
    const onRead = vi.fn();
    render(<DisclaimerBanner onRead={onRead} />);
    fireEvent.click(screen.getByRole("button", { name: "Leggi il disclaimer" }));
    expect(onRead).toHaveBeenCalledOnce();
  });
});
