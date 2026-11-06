import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { copy, fill } from "@/copy";
import { monthIssue } from "@/data/issue";
import { MonthIssue } from "./MonthIssue";

vi.mock("@/data/issue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/data/issue")>();
  return { ...actual, monthIssue: vi.fn(actual.monthIssue) };
});

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
});
afterEach(cleanup);

const search = () => screen.getByRole("searchbox", { name: copy.issue.search });
const type = (text: string) => fireEvent.change(search(), { target: { value: text } });

describe("MonthIssue", () => {
  it("lists the month's fruit and vegetables with their counts", () => {
    const { fruit, veg } = monthIssue(1);
    render(<MonthIssue month={1} />);
    expect(screen.getByRole("heading", { name: `${copy.issue.fruit} ${fruit.length}` })).toBeTruthy();
    expect(screen.getByRole("heading", { name: `${copy.issue.veg} ${veg.length}` })).toBeTruthy();
    expect(screen.getByRole("button", { name: fruit[0].name })).toBeTruthy();
  });

  it("leaves out a minor list when the month has nothing for it", () => {
    vi.mocked(monthIssue).mockReturnValueOnce({ ...monthIssue(5), soon: [] });
    render(<MonthIssue month={5} />);
    expect(screen.queryAllByRole("heading", { name: copy.issue.soon })).toHaveLength(0);
    expect(screen.queryAllByRole("heading", { name: copy.issue.ending })).toHaveLength(1);
  });

  it("searches the whole year, naming the peak months of each match", () => {
    render(<MonthIssue month={1} />);
    type("  ANGURIA ");
    expect(screen.getByRole("status").textContent).toBe("1 voce");
    const row = screen.getByRole("button", { name: "anguria" }).closest("li")!;
    expect(row.textContent).toMatch(/luglio/);
    expect(screen.queryByRole("heading", { name: new RegExp(copy.issue.fruit) })).toBeNull();
  });

  it("offers the way back when nothing matches, and refocuses the search", () => {
    render(<MonthIssue month={1} />);
    type("zzz");
    expect(screen.getByRole("status").textContent).toBe(fill(copy.search.noResult, { q: "zzz" }));
    fireEvent.click(screen.getByRole("button", { name: fill(copy.search.back, { month: "gennaio" }) }));
    expect((search() as HTMLInputElement).value).toBe("");
    expect(document.activeElement).toBe(search());
    expect(screen.getByRole("heading", { name: new RegExp(copy.issue.fruit) })).toBeTruthy();
  });

  it("treats spaces alone as no search", () => {
    render(<MonthIssue month={1} />);
    type("   ");
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("opens the sheet of an entry from a list and from a search, and drops it on close", () => {
    const { container } = render(<MonthIssue month={1} />);
    const name = monthIssue(1).veg[0].name;
    fireEvent.click(screen.getByRole("button", { name }));
    const sheet = within(screen.getByRole("dialog"));
    expect(sheet.getByRole("heading", { name })).toBeTruthy();
    fireEvent.click(sheet.getByRole("button", { name: copy.sheet.close }));
    expect(screen.queryByRole("dialog", { hidden: true })).toBeNull();
    type("anguria");
    fireEvent.click(container.querySelector<HTMLButtonElement>(".result .name")!);
    expect(within(screen.getByRole("dialog")).getByRole("heading", { name: "anguria" })).toBeTruthy();
  });
});
