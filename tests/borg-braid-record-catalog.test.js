import assert from "node:assert/strict";
import test from "node:test";

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
  assert.equal(BORG_BRAID_RECORD_CATALOG.entries.length, 17);
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
      "illustrative-full-cap-axial-spindle-boundary-v0",
      "family-c-c1-co-rotating-b1-pair-v1",
      "family-c-c2-counter-rotating-b1-pair-v1",
    ],
  );
  assert.deepEqual(
    BORG_BRAID_RECORD_CATALOG.entries.map((entry) => entry.label),
    [
      "A1 — coincident endpoint orbits",
      "A1.1 — equal frequency",
      "A1.2 — equal frequency, equal radius",
      "A1.3 — 4:2:1 frequency",
      "A1.4 — 3:2:1 frequency",
      "A2 — fully symmetric",
      "A3 — general",
      "A3.1 — equal frequency",
      "A3.2 — equal frequency, equal radius",
      "A3.3 — 4:2:1 frequency",
      "A3.4 — 3:2:1 frequency",
      "B1 — interior reference",
      "B1 — high-axial interior",
      "B1 — all-equatorial boundary",
      "B1 — all-axial boundary",
      "C1 — co-rotating B1 pair",
      "C2 — counter-rotating B1 pair",
    ],
  );
  BORG_BRAID_RECORD_CATALOG.entries.forEach((entry) => {
    assert.equal(Object.isFrozen(entry), true);
    assert.deepEqual(Object.keys(entry), ["id", "label", "recordUrl", "familyId", "familyLabel"]);
    assert.match(entry.recordUrl, /\.assembly-view-record\.v0\.json$/);
  });
  assert.deepEqual(
    BORG_BRAID_RECORD_CATALOG.entries.map((entry) => entry.familyId),
    ["A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "B", "B", "C", "C"],
  );
});

test("Borg braid catalog rejects duplicate identities, duplicate URLs, and embedded fields", () => {
  const entry = { id: "a", label: "A", recordUrl: "a.json", familyId: "A", familyLabel: "Family A" };
  assert.throws(
    () => createBorgBraidRecordCatalog([entry, { ...entry, recordUrl: "b.json" }]),
    /id a is duplicated/,
  );
  assert.throws(
    () => createBorgBraidRecordCatalog([
      entry,
      { id: "b", label: "B", recordUrl: "a.json", familyId: "B", familyLabel: "Family B" },
    ]),
    /URL a\.json is duplicated/,
  );
  assert.throws(
    () => createBorgBraidRecordCatalog([{ ...entry, radius: 1 }]),
    /may contain only id, label, recordUrl, familyId, familyLabel/,
  );
});

test("Borg braid catalog preserves declared source order", () => {
  const catalog = createBorgBraidRecordCatalog([
    { id: "z", label: "Z", recordUrl: "z.json", familyId: "C", familyLabel: "Family C" },
    { id: "a", label: "A", recordUrl: "a.json", familyId: "A", familyLabel: "Family A" },
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
  const recordId = BORG_BRAID_RECORD_CATALOG.entries[15].id;
  const expected = navigation.buildUrl(recordId);
  assert.equal(navigation.persistSelection(recordId), true);
  assert.deepEqual(replaced, [[null, "", expected]]);
});
