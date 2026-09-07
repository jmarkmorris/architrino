import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import {
  describeBorgPlatonicRelationships,
  validateBorgPlatonicRelationshipAssignments,
} from "../src/apps/borg/BorgPlatonicRelationships.mjs";
import { describeLibraryRecord, LIBRARY_DESCRIPTOR_VERSION } from "../src/apps/borg/library/BorgLibraryDescriptors.mjs";
import { queryLibraryRows } from "../src/apps/borg/library/BorgLibraryQuery.mjs";

const assignments = validateBorgPlatonicRelationshipAssignments(JSON.parse(await readFile(
  new URL("../reference/priorities/braid-program/configurations/borg-platonic-relationship-assignments.v1.json", import.meta.url),
)));
const sourceBytes = await readFile(new URL(`../${assignments.source}`, import.meta.url));
const sourceSha256 = (await import("node:crypto")).createHash("sha256").update(sourceBytes).digest("hex");
const integrity = { sourceSha256 };

test("BP-015 plus the exact obstruction display assign six exact Platonic vertex-set sources", () => {
  assert.equal(assignments.sourceOwner, "Braid Program");
  assert.equal(assignments.assignments.length, 6);
  assert.deepEqual(assignments.assignments.map((row) => row.solids[0]).sort(), ["cube", "dodecahedron", "icosahedron", "octahedron", "octahedron", "tetrahedron"]);
  assert.ok(assignments.assignments.every((row) => row.relationships.length === 1 && row.relationships[0] === "exact-vertex-set" && row.braidQualified === false));
});

test("exact identity assignments do not leak to the stella octangula or a changed revision", () => {
  const cube = assignments.assignments.find((row) => row.solids.includes("cube"));
  const assigned = describeBorgPlatonicRelationships(cube, assignments, integrity);
  assert.equal(assigned.state, "assigned");
  assert.deepEqual(assigned.values, ["exact-vertex-set"]);
  assert.deepEqual(assigned.assignments[0].solids, ["cube"]);

  const stella = BORG_ASSEMBLY_RECORD_CATALOG.entries.find((row) => row.recordUrl.includes("stella-octangula"));
  const unassigned = describeBorgPlatonicRelationships(stella, assignments, integrity);
  assert.equal(unassigned.state, "unassigned");
  assert.deepEqual(unassigned.values, ["unavailable"]);
  assert.match(unassigned.reason, /visual resemblance are insufficient/);

  const changed = describeBorgPlatonicRelationships({ assemblyId: cube.assemblyId, modelRevisionSha256: "0".repeat(64) }, assignments, integrity);
  assert.equal(changed.state, "unavailable");
  assert.match(changed.reason, /different model revision/);
});

test("the classification contract preserves controlled multi-value assignments", () => {
  const synthetic = structuredClone(assignments);
  synthetic.assignments[0].relationships = ["exact-vertex-set", "platonic-component", "platonic-compound", "platonic-cell-complex"];
  synthetic.assignments[0].solids = ["cube", "tetrahedron"];
  const validated = validateBorgPlatonicRelationshipAssignments(synthetic);
  const described = describeBorgPlatonicRelationships(validated.assignments[0], validated, integrity);
  assert.deepEqual(described.values, synthetic.assignments[0].relationships);
  assert.deepEqual(described.assignments[0].solids, synthetic.assignments[0].solids);
});

test("Library filtering stays exact-revision scoped and exposes assignment detail", async () => {
  const rows = [];
  const assignedIdentities = new Set(assignments.assignments.map((row) => `${row.assemblyId}:${row.modelRevisionSha256}`));
  for (const entry of BORG_ASSEMBLY_RECORD_CATALOG.entries.filter((row) => assignedIdentities.has(`${row.assemblyId}:${row.modelRevisionSha256}`) || row.recordUrl.includes("stella-octangula"))) {
    const bytes = await readFile(new URL(`../${entry.recordUrl}`, import.meta.url));
    rows.push(describeLibraryRecord(JSON.parse(bytes), entry, "a".repeat(64), null, null, {}, assignments, integrity).summary);
  }
  assert.equal(LIBRARY_DESCRIPTOR_VERSION, "borg-record-facets.v13");
  const exact = queryLibraryRows(rows, new URLSearchParams("platonicRelationship=exact-vertex-set"));
  assert.equal(exact.total, 6);
  assert.ok(exact.results.every((row) => row.platonicRelationships.assignments.length === 1));
  assert.ok(exact.results.every((row) => row.platonicRelationships.assignments[0].braidQualified === false));
  const all = queryLibraryRows(rows, new URLSearchParams());
  const stella = all.results.find((row) => row.label.includes("stella octangula"));
  assert.deepEqual(stella.facets.platonicRelationship, ["unavailable"]);
});

test("both exact inspection surfaces expose stable Platonic relationship hooks", async () => {
  const [library, workbench, libraryHtml, workbenchHtml] = await Promise.all([
    readFile(new URL("../src/apps/borg/library/main.js", import.meta.url), "utf8"),
    readFile(new URL("../src/apps/borg/BorgAssemblyViewControls.js", import.meta.url), "utf8"),
    readFile(new URL("../borg-library.html", import.meta.url), "utf8"),
    readFile(new URL("../borg.html", import.meta.url), "utf8"),
  ]);
  assert.match(library, /renderBorgPlatonicRelationships/);
  assert.match(workbench, /renderBorgPlatonicRelationships/);
  assert.match(libraryHtml, /id="platonic-relationships"/);
  assert.match(workbenchHtml, /id="borg-platonic-relationships"/);
});
