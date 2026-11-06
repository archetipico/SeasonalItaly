// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8");
const buildJob = workflow.slice(workflow.indexOf("\n  build:"), workflow.indexOf("\n  deploy:"));
const deployJob = workflow.slice(workflow.indexOf("\n  deploy:"));
const topLevel = workflow.slice(0, workflow.indexOf("\njobs:"));

describe("deploy workflow privileges", () => {
  it("grants write scopes to the deploy job alone", () => {
    expect(topLevel).not.toMatch(/write/);
    expect(buildJob).not.toMatch(/: write/);
    expect(deployJob).toMatch(/pages: write/);
    expect(deployJob).toMatch(/id-token: write/);
  });

  it("installs without running package install hooks", () => {
    expect(buildJob).toMatch(/npm ci --ignore-scripts/);
  });

  it("does not leave the checkout token on disk for the build steps", () => {
    expect(buildJob).toMatch(/persist-credentials: false/);
  });

  it("pins every action to a full commit SHA", () => {
    const actions = [...workflow.matchAll(/uses:\s*(\S+)/g)].map((match) => match[1]);
    expect(actions).toHaveLength(5);
    for (const action of actions) expect(action).toMatch(/^[\w./-]+@[0-9a-f]{40}$/);
  });

  it("fails the build when coverage drops", () => {
    expect(buildJob).toMatch(/run: npm run coverage/);
  });

  it("never cancels a Pages deployment already running", () => {
    expect(topLevel).toMatch(/cancel-in-progress: false/);
  });
});
