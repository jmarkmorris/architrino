import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { findComposerReactionBoundaryViolations } from "../scripts/check-composer-reaction-boundary.mjs";

function createFixtureRoot() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "composer-reaction-boundary-"));
}

function writeFile(rootDir, relativePath, contents) {
  const absolutePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, contents);
}

test("boundary checker allows app-local code and neutral contract imports", () => {
  const rootDir = createFixtureRoot();
  writeFile(rootDir, "src/apps/composer/main.js", 'import schema from "../../contracts/reaction-flow/v1/schema.json";\n');
  writeFile(rootDir, "src/apps/reaction/main.js", 'import { boot } from "./boot.js";\nexport { boot };\n');
  writeFile(rootDir, "src/apps/reaction/boot.js", "export function boot() {}\n");
  writeFile(rootDir, "src/contracts/reaction-flow/v1/schema.json", "{}\n");

  const result = findComposerReactionBoundaryViolations({ rootDir });

  assert.equal(result.violations.length, 0);
});

test("boundary checker rejects composer importing reaction runtime code", () => {
  const rootDir = createFixtureRoot();
  writeFile(rootDir, "src/apps/composer/main.js", 'import { solve } from "../reaction/solve.js";\n');
  writeFile(rootDir, "src/apps/reaction/solve.js", "export function solve() {}\n");

  const result = findComposerReactionBoundaryViolations({ rootDir });

  assert.equal(result.violations.length, 1);
  assert.equal(result.violations[0].sourceRole, "composer");
  assert.equal(result.violations[0].targetRole, "reaction");
});

test("boundary checker rejects reaction importing composer runtime code", () => {
  const rootDir = createFixtureRoot();
  writeFile(rootDir, "src/apps/reaction/main.js", 'export { buildScene } from "../composer/build-scene.js";\n');
  writeFile(rootDir, "src/apps/composer/build-scene.js", "export function buildScene() {}\n");

  const result = findComposerReactionBoundaryViolations({ rootDir });

  assert.equal(result.violations.length, 1);
  assert.equal(result.violations[0].sourceRole, "reaction");
  assert.equal(result.violations[0].targetRole, "composer");
});
