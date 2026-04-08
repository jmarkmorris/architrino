import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { normalizeXyzzyTileCatalog } from "../src/apps/xyzzy/XyzzyTileCatalogRuntime.js";
import { normalizeXyzzyReviewGroupCatalog } from "../src/apps/xyzzy/XyzzyReviewGroupCatalogRuntime.js";

const repoRootPath = fileURLToPath(new URL("../", import.meta.url));
const glyphOutputDirPath = fileURLToPath(new URL("../scripts/glyphs/", import.meta.url));

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function getExpectedReferenceSvgFilenames() {
  const tileCatalog = normalizeXyzzyTileCatalog(readJson("src/apps/xyzzy/xyzzy-tiles.json"));
  const reviewGroups = normalizeXyzzyReviewGroupCatalog(readJson("src/apps/xyzzy/xyzzy-review-groups.json"));
  const groups = [
    ...reviewGroups.specialGroups,
    ...reviewGroups.singleRowGroups,
    ...reviewGroups.quarkColorGroups,
    ...reviewGroups.compositeGroups,
  ];
  return [
    ...tileCatalog.tiles.map((tile) => `xyzzy-tile-${tile.key}.svg`),
    ...groups.map((group) => `xyzzy-group-${group.key}.svg`),
  ].sort();
}

function listReferenceSvgFilenames(directoryPath) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /^xyzzy-.*\.svg$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

test("committed xyzzy reference svg filenames match the shared catalogs exactly", () => {
  const expectedFilenames = getExpectedReferenceSvgFilenames();
  const actualFilenames = listReferenceSvgFilenames(glyphOutputDirPath);

  assert.deepEqual(actualFilenames, expectedFilenames);
});

test("glyph.py regenerates the committed xyzzy reference svg set and canonical artifacts without drift", () => {
  const expectedFilenames = getExpectedReferenceSvgFilenames();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "xyzzy-glyph-drift-"));

  execFileSync("python3", ["scripts/glyphs/glyph.py", "--output-dir", tempDir], {
    cwd: repoRootPath,
    encoding: "utf8",
  });

  assert.deepEqual(listReferenceSvgFilenames(tempDir), expectedFilenames);

  const canonicalSampleFilenames = [
    "xyzzy-tile-pro-up-quark.svg",
    "xyzzy-tile-unbound-electrinos.svg",
    "xyzzy-tile-binary-full-br-rr.svg",
    "xyzzy-group-pro-up-quark.svg",
    "xyzzy-group-pro-proton.svg",
    "xyzzy-group-photon.svg",
    "xyzzy-group-up-quark-color-variations.svg",
  ];

  canonicalSampleFilenames.forEach((filename) => {
    const regeneratedSvg = fs.readFileSync(path.join(tempDir, filename), "utf8");
    const committedSvg = fs.readFileSync(path.join(glyphOutputDirPath, filename), "utf8");
    assert.equal(regeneratedSvg, committedSvg, filename);
  });
});
