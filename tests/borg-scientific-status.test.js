import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { BORG_ASSEMBLY_RECORD_CATALOG } from "../src/apps/borg/BorgAssemblyRecordCatalog.js";
import {
  aggregateBorgScientificStatus,
  describeBorgScientificStatus,
  validateBorgScientificStatusProjection,
} from "../src/apps/borg/BorgScientificStatus.mjs";

const projection = validateBorgScientificStatusProjection(JSON.parse(await readFile(
  new URL("../reference/priorities/braid-program/contracts/braid-candidate-adjudication-projection.v1.json", import.meta.url),
)));
const clone = (value) => structuredClone(value);
const exact = (candidate) => projection.relations.find((relation) => relation.kind === "adjudication" && relation.scope === "exact-configuration" && relation.candidate.includes(candidate));
const integrity = { sourceSha256: projection.sourceSha256, sourceText: await readFile(new URL(`../${projection.source}`, import.meta.url), "utf8"), brokenEvidenceLinks: [] };

test("projection reproduces the current three-H4-pass and zero-H5-pass census", () => {
  const adjudications = projection.relations.filter((relation) => relation.kind === "adjudication" && relation.lifecycle === "active");
  assert.equal(adjudications.filter((relation) => relation.requirements.H4 === "P[M]").length, 3);
  assert.equal(adjudications.filter((relation) => relation.requirements.H5.startsWith("P[")).length, 0);
  assert.equal(adjudications.filter((relation) => relation.scope === "slice-only").length, 2);
});

test("H5 unknown stays unknown and an H4 pass is not promoted to retention", () => {
  const relation = exact("centered five-coordinate representative");
  const status = describeBorgScientificStatus({}, relation.match, projection, integrity);
  assert.equal(status.verdict, "No retained branch established yet");
  assert.equal(status.requirements.find((row) => row.id === "H4").state, "pass");
  assert.equal(status.requirements.find((row) => row.id === "H5").state, "unknown");
  assert.doesNotMatch(status.verdict, /falsif/i);
});

test("exact H4 and H5 failures use scoped wording", () => {
  const h4 = exact("scoped-negative circular control");
  assert.equal(describeBorgScientificStatus({}, h4.match, projection, integrity).verdict, "This exact realization failed bounded release");
  const synthetic = clone(projection);
  synthetic.relations = [clone(h4)];
  synthetic.relations[0].requirements.H4 = "P[M]";
  synthetic.relations[0].requirements.H5 = "F[M]";
  assert.equal(describeBorgScientificStatus({}, h4.match, synthetic).verdict, "Retained-branch claim falsified within the tested scope");
});

test("bounded no-success wording names the searched domain", () => {
  const relation = clone(exact("coincident-axis three-binary configuration"));
  relation.searchOutcome = "no-success";
  const synthetic = { ...clone(projection), relations: [relation] };
  const status = describeBorgScientificStatus({}, relation.match, synthetic);
  assert.match(status.verdict, /^No solution found in the searched domain:/);
  assert.match(status.verdict, new RegExp(relation.parameterDomain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("certified prescribed-balance obstruction is scoped, exact, and fail closed", () => {
  const relation = exact("octahedron antipodal-alternating sum-edge rigid history");
  const status = describeBorgScientificStatus({}, relation.match, projection, integrity);
  assert.equal(status.verdict, "Excluded prescribed history in the tested scope");
  assert.equal(status.aggregateCategory, "scoped-fail");
  assert.equal(status.current.disposition, "excluded-prescribed-balance");
  assert.equal(status.requirements.find((row) => row.id === "H5").state, "not-applicable");
  assert.match(status.current.doesNotEstablish, /other polarity words, rotation axes, nonrigid histories/);
});

test("static stella-octangula catalog endpoint exposes only its exact balance exclusion", () => {
  const relation = exact("static stella-octangula catalog history");
  const status = describeBorgScientificStatus({}, relation.match, projection, integrity);
  assert.equal(status.verdict, "Excluded prescribed history in the tested scope");
  assert.equal(status.aggregateCategory, "scoped-fail");
  assert.equal(status.current.disposition, "excluded-prescribed-balance");
  assert.equal(status.requirements.find((row) => row.id === "H4").token, "F[D/M]");
  assert.equal(status.requirements.find((row) => row.id === "H5").state, "not-applicable");
  assert.match(status.current.doesNotEstablish, /moving stella-octangula history/);
});

test("presentation rename preserves binding while model revision change invalidates it", () => {
  const relation = exact("centered five-coordinate representative");
  assert.equal(describeBorgScientificStatus({}, { ...relation.match, label: "Renamed for readers" }, projection, integrity).coverage, "current");
  const changed = { ...relation.match, modelRevisionSha256: "0".repeat(64) };
  const status = describeBorgScientificStatus({}, changed, projection, integrity);
  assert.equal(status.coverage, "invalid");
  assert.match(status.causes.join(" "), /model revision changed/);
});

test("slice-only context never becomes an exact leaf verdict", () => {
  const entry = BORG_ASSEMBLY_RECORD_CATALOG.entries.find((row) => row.label === "Three-axis circular chart — axially separated endpoint circles");
  const status = describeBorgScientificStatus({}, entry, projection, integrity);
  assert.equal(status.coverage, "unlinked");
  assert.equal(status.verdict, "No adjudication linked");
  assert.ok(status.context.some((relation) => relation.scope === "slice-only" && relation.requirements.H4 === "P[M]"));
});

test("unsupported tokens, missing anchors, stale owners, and broken evidence links fail closed", () => {
  const relation = exact("centered five-coordinate representative");
  const unsupported = clone(projection); unsupported.relations.find((row) => row.relationId === relation.relationId).requirements.H5 = "PASS";
  assert.throws(() => validateBorgScientificStatusProjection(unsupported), /Unsupported/);
  const missingAnchor = clone(projection); missingAnchor.relations[0].sourceAnchor = "owner";
  assert.throws(() => validateBorgScientificStatusProjection(missingAnchor), /Markdown anchor/);
  assert.equal(describeBorgScientificStatus({}, relation.match, projection, { ...integrity, sourceSha256: "0".repeat(64) }).coverage, "invalid");
  assert.equal(describeBorgScientificStatus({}, relation.match, projection, { ...integrity, brokenEvidenceLinks: [relation.evidenceLinks[0].url] }).coverage, "invalid");
});

test("superseded and withdrawn exact relations do not contribute a current verdict", () => {
  for (const lifecycle of ["superseded", "withdrawn"]) {
    const relation = clone(exact("coincident-axis three-binary configuration")); relation.lifecycle = lifecycle;
    const synthetic = { ...clone(projection), relations: [relation] };
    assert.equal(describeBorgScientificStatus({}, relation.match, synthetic).coverage, "unlinked");
  }
});

test("group aggregation counts exact members and never inherits its representative", () => {
  const pass = describeBorgScientificStatus({}, exact("centered five-coordinate representative").match, projection, integrity);
  const failure = describeBorgScientificStatus({}, exact("scoped-negative circular control").match, projection, integrity);
  const unindexedEntry = BORG_ASSEMBLY_RECORD_CATALOG.entries.find((row) => row.label === "Rotating cube vertex-set display");
  const unindexed = describeBorgScientificStatus({}, unindexedEntry, projection, integrity);
  const aggregate = aggregateBorgScientificStatus([{ scientificStatus: pass }, { scientificStatus: failure }, { scientificStatus: unindexed }]);
  assert.deepEqual(aggregate.counts, { pass: 1, "scoped-fail": 1, unknown: 0, unindexed: 1, stale: 0 });
  assert.equal(aggregate.memberCount, 3);
});

test("both exact-inspection surfaces consume the shared renderer and expose stable hooks", async () => {
  const [library, workbench, libraryHtml, workbenchHtml] = await Promise.all([
    readFile(new URL("../src/apps/borg/library/main.js", import.meta.url), "utf8"),
    readFile(new URL("../src/apps/borg/BorgAssemblyViewControls.js", import.meta.url), "utf8"),
    readFile(new URL("../borg-library.html", import.meta.url), "utf8"),
    readFile(new URL("../borg.html", import.meta.url), "utf8"),
  ]);
  assert.match(library, /renderBorgScientificStatus/);
  assert.match(workbench, /renderBorgScientificStatus/);
  assert.match(libraryHtml, /id="scientific-status"/);
  assert.match(workbenchHtml, /id="borg-scientific-status"/);
});
