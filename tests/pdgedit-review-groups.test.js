import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { normalizePdgeditTileCatalog } from "../src/apps/pdgedit/PdgeditTileCatalogRuntime.js";
import { normalizePdgeditReviewGroupCatalog } from "../src/apps/pdgedit/PdgeditReviewGroupCatalogRuntime.js";

function readJson(relativePath) {
  return JSON.parse(readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function convertFullTileToPolarTile(tileKey) {
  const match = /^binary-full-(?:br|rb)-([a-z]+)$/.exec(tileKey);
  return match ? `binary-polar-none-${match[1]}` : tileKey;
}

function getSingleRowFamilyBaseTiles(groupKey) {
  if (groupKey.includes("quark")) {
    if (groupKey.includes("bottom") || groupKey.includes("strange") || groupKey.includes("down")) {
      return groupKey.startsWith("anti-")
        ? ["binary-full-rb-rb", "binary-full-rb-rr", "binary-full-rb-rb"]
        : ["binary-full-br-br", "binary-full-br-bb", "binary-full-br-br"];
    }
    return groupKey.startsWith("anti-")
      ? ["binary-full-rb-bb", "binary-full-rb-rb", "binary-full-rb-bb"]
      : ["binary-full-br-rr", "binary-full-br-br", "binary-full-br-rr"];
  }
  if (groupKey.includes("neutrino")) {
    return groupKey.startsWith("anti-")
      ? ["binary-full-rb-rb", "binary-full-rb-rb", "binary-full-rb-rb"]
      : ["binary-full-br-br", "binary-full-br-br", "binary-full-br-br"];
  }
  return groupKey.startsWith("anti-")
    ? ["binary-full-rb-rr", "binary-full-rb-rr", "binary-full-rb-rr"]
    : ["binary-full-br-bb", "binary-full-br-bb", "binary-full-br-bb"];
}

function getExpectedGenerationTiles(groupKey) {
  const baseTiles = getSingleRowFamilyBaseTiles(groupKey);
  const generation =
    groupKey.includes("tau") || groupKey.includes("bottom") || groupKey.includes("top")
      ? 3
      : groupKey.includes("muon") || groupKey.includes("strange") || groupKey.includes("charm")
        ? 2
        : 1;
  if (generation === 1) {
    return baseTiles;
  }
  if (generation === 2) {
    return [baseTiles[0], baseTiles[1], convertFullTileToPolarTile(baseTiles[2])];
  }
  return [
    baseTiles[0],
    convertFullTileToPolarTile(baseTiles[1]),
    convertFullTileToPolarTile(baseTiles[2]),
  ];
}

test("pdgedit review groups reference only tiles present in the shared catalog", () => {
  const tileCatalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));
  const tileKeys = new Set(tileCatalog.tiles.map((tile) => tile.key));
  const missingKeys = [
    ...reviewGroups.specialGroups,
    ...reviewGroups.singleRowGroups,
    ...reviewGroups.quarkColorGroups,
    ...reviewGroups.compositeGroups,
  ].flatMap((group) =>
    group.rows.flatMap((row) =>
      row
        .filter((tileKey) => !tileKeys.has(tileKey))
        .map((tileKey) => `${group.key}:${tileKey}`)
    )
  );

  assert.deepEqual(missingKeys, []);
});

test("Pdgedit binary generator includes bare core-row glyph variants for composite review groups", () => {
  const tileCatalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const tileKeys = new Set(tileCatalog.tiles.map((tile) => tile.key));

  assert.equal(tileKeys.has("binary-bare-br-none"), true);
  assert.equal(tileKeys.has("binary-bare-rb-none"), true);
});

test("pdgedit review group catalog covers the requested single-row and composite families", () => {
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));

  assert.equal(reviewGroups.specialGroups.length, 1);
  assert.equal(reviewGroups.singleRowGroups.length, 27);
  assert.equal(reviewGroups.quarkColorGroups.length, 3);
  assert.equal(reviewGroups.compositeGroups.length, 19);
});

test("standard fermion review rows use generation-trimmed polar tiles", () => {
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));

  reviewGroups.singleRowGroups
    .filter((group) => !group.key.startsWith("unbound-architrino-residue-"))
    .forEach((group) => {
    assert.deepEqual(group.rows[0].slice(1), getExpectedGenerationTiles(group.key), group.key);
  });
});

test("quark color example groups use the standard quark title tiles and expected axis permutations", () => {
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));
  const groupByKey = new Map(reviewGroups.quarkColorGroups.map((group) => [group.key, group]));

  assert.deepEqual(
    groupByKey.get("up-quark-color-variations")?.rows,
    [
      ["pro-up-quark", "binary-full-br-br", "binary-full-br-rr", "binary-full-br-rr"],
      ["pro-up-quark", "binary-full-br-rr", "binary-full-br-br", "binary-full-br-rr"],
      ["pro-up-quark", "binary-full-br-rr", "binary-full-br-rr", "binary-full-br-br"],
    ]
  );
  assert.deepEqual(
    groupByKey.get("down-quark-color-variations-family-i")?.rows,
    [
      ["pro-down-quark", "binary-full-br-rr", "binary-full-br-bb", "binary-full-br-bb"],
      ["pro-down-quark", "binary-full-br-bb", "binary-full-br-rr", "binary-full-br-bb"],
      ["pro-down-quark", "binary-full-br-bb", "binary-full-br-bb", "binary-full-br-rr"],
    ]
  );
  assert.deepEqual(
    groupByKey.get("down-quark-color-variations-family-ii")?.rows,
    [
      ["pro-down-quark", "binary-full-br-bb", "binary-full-br-br", "binary-full-br-br"],
      ["pro-down-quark", "binary-full-br-br", "binary-full-br-bb", "binary-full-br-br"],
      ["pro-down-quark", "binary-full-br-br", "binary-full-br-br", "binary-full-br-bb"],
    ]
  );
});

test("photon composite group starts with a pro Noether core row", () => {
  const tileCatalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));
  const groupByKey = new Map(reviewGroups.compositeGroups.map((group) => [group.key, group]));
  const tileByKey = new Map(tileCatalog.tiles.map((tile) => [tile.key, tile]));

  assert.equal(groupByKey.get("photon")?.rows[0]?.[0], "pro-noether-core");
  assert.equal(groupByKey.get("photon")?.rows[1]?.[0], "anti-noether-core");
  assert.equal(groupByKey.get("photon")?.rows.flat().includes("photon"), false);
  assert.equal(tileByKey.get("photon")?.type, "composite-label");
});
