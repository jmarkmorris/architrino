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
  assert.equal(BORG_BRAID_RECORD_CATALOG.entries.length, 3);
  assert.deepEqual(
    BORG_BRAID_RECORD_CATALOG.entries.map((entry) => entry.id),
    [
      "illustrative-spindle-chart-hypothesis-v0",
      "illustrative-extreme-cap-tilt-spindle-variant-v0",
      "illustrative-planar-tri-binary-spindle-boundary-v0",
    ],
  );
  assert.deepEqual(
    BORG_BRAID_RECORD_CATALOG.entries.map((entry) => entry.label),
    [
      "Illustrative spindle prescribed geometry",
      "Spindle variant — extreme cap tilt",
      "Spindle boundary — planar tri-binary",
    ],
  );
  BORG_BRAID_RECORD_CATALOG.entries.forEach((entry) => {
    assert.equal(Object.isFrozen(entry), true);
    assert.deepEqual(Object.keys(entry), ["id", "label", "recordUrl"]);
    assert.match(entry.recordUrl, /\.assembly-view-record\.v0\.json$/);
  });
  assert.equal(
    BORG_BRAID_RECORD_CATALOG.entries.some((entry) => entry.id.includes("full-cap-axial")),
    false,
  );
});

test("Borg braid catalog rejects duplicate identities, duplicate URLs, and embedded fields", () => {
  const entry = { id: "a", label: "A", recordUrl: "a.json" };
  assert.throws(
    () => createBorgBraidRecordCatalog([entry, { ...entry, recordUrl: "b.json" }]),
    /id a is duplicated/,
  );
  assert.throws(
    () => createBorgBraidRecordCatalog([entry, { id: "b", label: "B", recordUrl: "a.json" }]),
    /URL a\.json is duplicated/,
  );
  assert.throws(
    () => createBorgBraidRecordCatalog([{ ...entry, radius: 1 }]),
    /may contain only id, label, recordUrl/,
  );
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
