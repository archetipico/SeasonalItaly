import { act } from "react";
import { describe, expect, it } from "vitest";

describe("main entry", () => {
  it("mounts the page into the root element", async () => {
    document.body.innerHTML = '<div id="root"></div>';
    await act(async () => {
      await import("./main");
    });
    expect(document.querySelector("#root main")).not.toBeNull();
  });
});
