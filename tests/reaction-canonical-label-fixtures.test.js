import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const forbiddenLabels = new Set([
  "Pro Neutrino",
  "Anti Neutrino",
  "Electron Antineutrino",
]);

function collectJsonFiles(rootRelativePath) {
  const rootPath = new URL(`../${rootRelativePath}`, import.meta.url);
  const entries = fs.readdirSync(rootPath, { withFileTypes: true });
  const files = [];
  entries.forEach((entry) => {
    const childRelativePath = path.posix.join(rootRelativePath, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectJsonFiles(childRelativePath));
      return;
    }
    if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(childRelativePath);
    }
  });
  return files;
}

function findForbiddenLabels(value, pathLabel = "$", hits = []) {
  if (typeof value === "string") {
    const normalizedValue = value.trim();
    if (forbiddenLabels.has(normalizedValue)) {
      hits.push({ path: pathLabel, label: normalizedValue });
    }
    return hits;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      findForbiddenLabels(item, `${pathLabel}[${index}]`, hits);
    });
    return hits;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, child]) => {
      findForbiddenLabels(child, `${pathLabel}.${key}`, hits);
    });
  }
  return hits;
}

test("reaction-owned example contracts reject legacy non-canonical known labels", () => {
  const exampleRoots = [
    "content/contracts/examples/reaction-flow",
    "content/contracts/examples/solver-request",
    "content/contracts/examples/solver-result",
  ];
  const offenders = exampleRoots.flatMap((root) =>
    collectJsonFiles(root).flatMap((relativePath) => {
      const document = JSON.parse(
        fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8")
      );
      return findForbiddenLabels(document).map((hit) => ({
        file: relativePath,
        ...hit,
      }));
    })
  );

  assert.deepEqual(offenders, []);
});
