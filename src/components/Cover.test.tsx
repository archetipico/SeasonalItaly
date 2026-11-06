import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { copy, fill } from "@/copy";
import { monthIssue } from "@/data/issue";
import { COVER_SIZE } from "@/data/shapes";
import { Cover } from "./Cover";
import type { Disclosure } from "./useDisclosure";

afterEach(cleanup);

const disclaimer = (isOpen: boolean) =>
  ({ isOpen, open: vi.fn(), close: vi.fn(), toggle: vi.fn(), toggleRef: createRef() }) as unknown as Disclosure;

describe("Cover", () => {
  it("names the month, its issue number and how much is in season, and no single entry", () => {
    const { fruit, veg } = monthIssue(11);
    const { container } = render(<Cover month={11} onTurn={() => {}} disclaimer={disclaimer(false)} titleRef={createRef()} />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("novembre");
    expect(container.textContent).toContain(fill(copy.cover.issue, { n: 11 }));
    expect(container.querySelector(".cover__lead")!.textContent).toBe(fill(copy.cover.lead, { n: fruit.length + veg.length }));
    expect(container.querySelectorAll(".cover__art svg")).toHaveLength(COVER_SIZE);
  });

  it("turns to the neighbouring months, wrapping across the new year", () => {
    const onTurn = vi.fn();
    render(<Cover month={12} onTurn={onTurn} disclaimer={disclaimer(false)} titleRef={createRef()} />);
    fireEvent.click(screen.getByRole("button", { name: fill(copy.cover.next, { month: "gennaio" }) }));
    expect(onTurn).toHaveBeenLastCalledWith(1);
    fireEvent.click(screen.getByRole("button", { name: fill(copy.cover.previous, { month: "novembre" }) }));
    expect(onTurn).toHaveBeenLastCalledWith(11);
  });

  it("carries the notice and a button reflecting the state of the disclaimer", () => {
    const shut = disclaimer(false);
    const { container, unmount } = render(<Cover month={1} onTurn={() => {}} disclaimer={shut} titleRef={createRef()} />);
    expect(container.querySelector(".cover__notice")!.textContent).toContain(copy.cover.notice);
    const toggle = screen.getByRole("button", { name: copy.disclaimer.open });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(toggle);
    expect(shut.toggle).toHaveBeenCalledOnce();
    unmount();
    render(<Cover month={1} onTurn={() => {}} disclaimer={disclaimer(true)} titleRef={createRef()} />);
    expect(screen.getByRole("button", { name: copy.disclaimer.open }).getAttribute("aria-expanded")).toBe("true");
  });
});
