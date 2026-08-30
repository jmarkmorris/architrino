import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import {
  BORG_BRAID_RECORD_CATALOG,
  BORG_BRAID_RECORD_CATALOG_ID,
  createBorgBraidRecordCatalog,
} from "../src/apps/borg/BorgBraidRecordCatalog.js";
import { createBorgBraidRecordNavigation } from "../src/apps/borg/BorgBootstrap.js";

test("Borg braid catalog is immutable record routing data with no geometry or physics", () => {
  assert.equal(BORG_BRAID_RECORD_CATALOG.id, BORG_BRAID_RECORD_CATALOG_ID);
  assert.equal(Object.isFrozen(BORG_BRAID_RECORD_CATALOG), true);
  assert.equal(Object.isFrozen(BORG_BRAID_RECORD_CATALOG.entries), true);
  assert.equal(BORG_BRAID_RECORD_CATALOG.entries.length, 24);
  assert.deepEqual(
    BORG_BRAID_RECORD_CATALOG.entries.map((entry) => entry.id),
    [
      "family-a-a1-general-v1",
      "family-a-a1-1-equal-frequency-v1",
      "family-a-a1-2-equal-frequency-equal-radius-v1",
      "family-a-a1-3-4-2-1-frequency-v1",
      "family-a-a1-4-3-2-1-frequency-v1",
      "family-a-a2-fully-symmetric-v1",
      "family-a-a3-general-v1",
      "family-a-a3-1-equal-frequency-v1",
      "family-a-a3-2-equal-frequency-equal-radius-v1",
      "family-a-a3-3-4-2-1-frequency-v1",
      "family-a-a3-4-3-2-1-frequency-v1",
      "illustrative-spindle-chart-hypothesis-v0",
      "illustrative-extreme-cap-tilt-spindle-variant-v0",
      "illustrative-planar-tri-binary-spindle-boundary-v0",
      "family-c-c1-co-rotating-general-v1",
      "family-c-c2-counter-rotating-general-v1",
      "family-c-c1-co-rotating-b1-pair-v1",
      "family-c-c2-counter-rotating-b1-pair-v1",
      "family-c-c1-1-co-rotating-b1-3-pair-v1",
      "family-c-c2-1-counter-rotating-b1-3-pair-v1",
      "sd3-centered-five-coordinate-v2",
      "f5-phase-varying-campaign-v2",
      "f6c-polarity-resolved-harmonic-v2",
      "f6b-scoped-negative-circular-v2",
    ],
  );
  assert.deepEqual(
    BORG_BRAID_RECORD_CATALOG.entries.map((entry) => entry.label),
    [
      "A1.0 — coincident endpoint orbits",
      "A1.1 — equal frequency",
      "A1.2 — equal frequency, equal radius",
      "A1.3 — 4:2:1 frequency",
      "A1.4 — 3:2:1 frequency",
      "A2.0 — fully symmetric",
      "A3.0 — general",
      "A3.1 — equal frequency",
      "A3.2 — equal frequency, equal radius",
      "A3.3 — 4:2:1 frequency",
      "A3.4 — 3:2:1 frequency",
      "B1.1 — interior reference",
      "B1.2 — high-axial interior",
      "B1.3 — all-equatorial boundary",
      "C1 — co-rotating",
      "C2 — counter-rotating",
      "C3 — co-rotating B1 pair",
      "C4 — counter-rotating B1 pair",
      "C5 — co-rotating B1.3 pair",
      "C6 — counter-rotating B1.3 pair",
      "SD3 — centered five-coordinate representative",
      "F5 — phase-varying prescribed display representative",
      "F6c — small asymmetric counter-breathing representative",
      "F6b — scoped-negative circular realization",
    ],
  );
  BORG_BRAID_RECORD_CATALOG.entries.forEach((entry) => {
    assert.equal(Object.isFrozen(entry), true);
    assert.deepEqual(Object.keys(entry), ["id", "label", "recordUrl"]);
    assert.match(entry.recordUrl, /\.assembly-view-record\.v0\.json$/);
  });
});

test("current example tables use the catalog names without changing mathematical class identifiers", () => {
  const audit = readFileSync(new URL("../reference/priorities/app-borg/selector-assignment-audit.md", import.meta.url), "utf8");
  const taxonomy = readFileSync(new URL("../content/markdown/aaa/noether-braid/braid-taxonomy.md", import.meta.url), "utf8");
  const readiness = readFileSync(new URL("../reference/priorities/braid-program/prescribed-worldline-readiness-matrix.md", import.meta.url), "utf8");
  const signoff = readFileSync(new URL("../reference/priorities/braid-program/borg-candidate-signoff.md", import.meta.url), "utf8");
  assert.ok(taxonomy.includes("| Example ID | Geometry record | Borg depiction | Description |"));
  assert.doesNotMatch(taxonomy, /\| Family name \||\| Member name \|/);
  for (const entry of BORG_BRAID_RECORD_CATALOG.entries) {
    assert.equal(audit.split("\n").filter((line) => line.startsWith(`| ${entry.label} |`)).length, 1, entry.label);
    if (/^[ABC]\d/.test(entry.label)) {
      const navigationRow = taxonomy.split("\n").find((line) => line.includes(`| \`${entry.id}\` |`));
      assert.ok(navigationRow?.includes(`| \`${entry.label}\` |`), entry.label);
    }
    if (/^A[123]\.0 —/.test(entry.label)) {
      assert.ok(readiness.includes(`| \`${entry.label.split(" —")[0]}\` | 1 |`));
      assert.ok(signoff.includes(`\`${entry.id}\` — ${entry.label} |`));
    }
  }
  const definitions = readFileSync(new URL("../content/markdown/aaa/noether-braid/braid-family-a.md", import.meta.url), "utf8");
  for (const member of ["A1", "A2", "A3"]) assert.ok(definitions.includes(`## ${member}\n`));
});

test("Borg braid catalog rejects duplicate identities, duplicate URLs, and embedded fields", () => {
  const entry = { id: "a", label: "A", recordUrl: "a.json" };
  assert.throws(
    () => createBorgBraidRecordCatalog([entry, { ...entry, recordUrl: "b.json" }]),
    /id a is duplicated/,
  );
  assert.throws(
    () => createBorgBraidRecordCatalog([
      entry,
      { id: "b", label: "B", recordUrl: "a.json" },
    ]),
    /URL a\.json is duplicated/,
  );
  assert.throws(
    () => createBorgBraidRecordCatalog([{ ...entry, radius: 1 }]),
    /may contain only id, label, recordUrl/,
  );
  for (const field of ["familyId", "familyLabel", "parentId"]) {
    assert.throws(() => createBorgBraidRecordCatalog([{ ...entry, [field]: "parent" }]),
      /may contain only id, label, recordUrl/);
  }
});

test("Borg braid catalog preserves declared source order", () => {
  const catalog = createBorgBraidRecordCatalog([
    { id: "z", label: "Z", recordUrl: "z.json" },
    { id: "a", label: "A", recordUrl: "a.json" },
  ]);
  assert.deepEqual(catalog.entries.map((entry) => entry.id), ["z", "a"]);
});

test("Borg braid selection routes through the existing eomRecord replay entry point", () => {
  BORG_BRAID_RECORD_CATALOG.entries.forEach((entry) => {
    const assigned = [];
    const navigation = createBorgBraidRecordNavigation({
      selectedRecordUrls: [entry.recordUrl],
      locationLike: { assign(url) { assigned.push(url); } },
    });
    assert.equal(navigation.selectedRecordId, entry.id);
    const expected = `borg.html?eomRecord=${encodeURIComponent(entry.recordUrl)}`;
    assert.equal(navigation.buildUrl(entry.id), expected);
    assert.equal(navigation.navigate(entry.id), expected);
    assert.deepEqual(assigned, [expected]);
    assert.throws(() => navigation.navigate("missing"), /has no entry missing/);
  });
});

test("Borg braid selection persists the exact replay URL when history replacement is available", () => {
  const replaced = [];
  const navigation = createBorgBraidRecordNavigation({
    historyLike: { replaceState(...args) { replaced.push(args); } },
  });
  const recordId = BORG_BRAID_RECORD_CATALOG.entries[14].id;
  const expected = navigation.buildUrl(recordId);
  assert.equal(navigation.persistSelection(recordId), true);
  assert.deepEqual(replaced, [[null, "", expected]]);
});
