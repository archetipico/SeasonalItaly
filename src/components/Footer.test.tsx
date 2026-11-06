import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { copy } from "@/copy";
import { Footer } from "./Footer";

afterEach(cleanup);

describe("Footer", () => {
  it("names the site and links only to the top of the page and the home site", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo").textContent).toContain(copy.brand);
    expect(screen.getByRole("contentinfo").textContent).toContain(copy.footer.tagline);
    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual(["#top", "https://archetipico.github.io"]);
  });
});
