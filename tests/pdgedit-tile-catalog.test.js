import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import {
  normalizePdgeditTileCatalog,
  resolvePdgeditTileReviewLines,
} from "../src/apps/pdgedit/PdgeditTileCatalogRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("pdgedit tile review lines tolerate missing sample counts for ordinary assembly tiles", () => {
  const catalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const proUpQuarkTile = catalog.tiles.find((tile) => tile.key === "pro-up-quark");

  assert.ok(proUpQuarkTile, "missing pro-up-quark tile");
  assert.doesNotThrow(() => resolvePdgeditTileReviewLines(proUpQuarkTile, null));
  assert.equal(resolvePdgeditTileReviewLines(proUpQuarkTile, null).length, 3);
  assert.equal(
    resolvePdgeditTileReviewLines(proUpQuarkTile, null).every((line) => typeof line.kind === "string"),
    true
  );
});
