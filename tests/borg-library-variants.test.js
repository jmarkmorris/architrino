import assert from "node:assert/strict";
import { test } from "node:test";

import { queryLibraryRows, validateLibraryBrowseParams } from "../src/apps/borg/library/BorgLibraryQuery.mjs";
import {
  describeLibraryVariantSet,
  isLibraryVariantSetId,
  libraryVariantSetLabel,
} from "../src/apps/borg/library/BorgLibraryVariants.mjs";

const SOURCE_SHA = "a".repeat(64);
const variant = (betaDecimal, radiusDecimal) => describeLibraryVariantSet({ geometry: { balanceParameters: {
  schema: "equal-radius-planar-three-binary-balance-row.v1",
  betaDecimal,
  radiusDecimal,
  sourceSha256: SOURCE_SHA,
} } });
const row = (id, betaDecimal, count = "6", activeFindingConfiguration = false) => ({
  id, assemblyId: id, modelRevisionSha256: id.at(-1).repeat(64), recordSha256: id.at(-1).repeat(64),
  label: `Balance β_f=${betaDecimal}`, description: "Exact balance row", facets: { count, shape: ["circles"], braidDimension: "2d" },
  variantSet: variant(betaDecimal, betaDecimal === "2" ? "0.5" : "0.25"),
  activeFindingConfiguration,
});

test("variant sets are source-derived from the balance-row schema and exact source ledger", () => {
  const described = variant("2.974307176117293", "0.561731700071290");
  assert.equal(described.label, "Equal-radius planar three-binary circular balance");
  assert.deepEqual(described.parameterLabels, ["β_f", "R/R_*"]);
  assert.deepEqual(described.parameters, { betaF: "2.974307176117293", radiusRatio: "0.561731700071290" });
  assert.ok(isLibraryVariantSetId(described.id));
  assert.equal(libraryVariantSetLabel(described.id), described.label);
  assert.equal(describeLibraryVariantSet({ geometry: {} }), null);
  assert.throws(() => describeLibraryVariantSet({ geometry: { balanceParameters: {
    schema: "equal-radius-planar-three-binary-balance-row.v1", betaDecimal: "2", radiusDecimal: "0.5", sourceSha256: "bad",
  } } }), /Invalid/);
});

test("default browse collapses matching variants after exact-row filtering and drill-down restores leaves", () => {
  const rows = [row("asm-a", "2", "6", true), row("asm-b", "4"), {
    id: "asm-c", assemblyId: "asm-c", modelRevisionSha256: "c".repeat(64), recordSha256: "c".repeat(64),
    label: "Independent assembly", description: "Independent", facets: { count: "8" }, variantSet: null,
  }];
  const broad = queryLibraryRows(rows, new URLSearchParams());
  assert.equal(broad.total, 3);
  assert.equal(broad.results.length, 2);
  assert.deepEqual(broad.results.map((result) => result.kind), ["variant-group", "leaf"]);
  assert.equal(broad.results[0].memberCount, 2);
  assert.equal(broad.activeFindingConfigurationCount, 1);
  assert.equal(broad.results[0].activeFindingConfigurationCount, 1);
  assert.equal(broad.results[0].representative.variantSet.parameters.betaF, "2");
  assert.deepEqual(broad.counts.count, { "6": 1, "8": 1 });
  assert.deepEqual(broad.counts.shape, { circles: 1, unavailable: 1 });
  assert.deepEqual(broad.counts.braidDimension, { "2d": 1, unavailable: 1 });

  const narrowed = queryLibraryRows(rows, new URLSearchParams("count=8"));
  assert.deepEqual(narrowed.results.map((result) => result.kind), ["leaf"]);
  const oneVariant = queryLibraryRows(rows, new URLSearchParams("q=β_f%3D2"));
  assert.deepEqual(oneVariant.results.map((result) => result.kind), ["leaf"]);

  const variantSetId = broad.results[0].variantSetId;
  const drilled = queryLibraryRows(rows, new URLSearchParams({ variantSet: variantSetId }));
  assert.equal(drilled.total, 2);
  assert.deepEqual(drilled.results.map((result) => result.kind), ["leaf", "leaf"]);
  assert.deepEqual(drilled.counts.count, { "6": 2 });
  assert.deepEqual(drilled.counts.shape, { circles: 2 });
  assert.equal(validateLibraryBrowseParams(new URLSearchParams({ variantSet: variantSetId })).get("variantSet"), variantSetId);
  assert.throws(() => validateLibraryBrowseParams(new URLSearchParams("variantSet=variant-set%3Abad")), /Unsupported/);
});
