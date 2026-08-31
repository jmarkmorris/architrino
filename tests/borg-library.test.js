import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { createBorgLibraryService } from "../scripts/dev/BorgLibraryService.mjs";
import { BORG_BRAID_RECORD_CATALOG } from "../src/apps/borg/BorgBraidRecordCatalog.js";
import { describeBounds, recordControlPoints, describeLibraryRecord, createLibraryPreview } from "../src/apps/borg/library/BorgLibraryDescriptors.mjs";
import { queryLibraryRows, isLibrarySelectorValue, normalizeLibraryBrowseParams } from "../src/apps/borg/library/BorgLibraryQuery.mjs";
import { bootBorgApp } from "../src/apps/borg/BorgBootstrap.js";
import { createBorgAssemblyViewSession, createBorgAssemblyViewPresentation } from "../src/apps/borg/BorgAssemblyViewSession.js";
import { describeBraidComposition, validateLibraryClassifications, recordClassification } from "../src/apps/borg/library/BorgLibraryComposition.mjs";
import { LIBRARY_FACETS } from "../src/apps/borg/library/BorgLibraryQuery.mjs";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const entry = { id: "fixture", label: "Example — straight line", recordUrl: "fixture.json" };
// Independent analytic control: x=2t, y=z=0, c_f=1. These expected
// values are authored directly, not copied from the descriptor or sampler.
function linearRecord() {
  return {
    schema: "assembly-view-record.v0",
    provenance: { engineId: "prescribed-geometry", engineVersion: "test-v1", runId: "line-test", claimGrade: "chart-hypothesis", evidenceStatus: "display-only", generatingSpec: "tests/borg-library.test.js", date: "2026-08-30", fieldSpeed: 1,
      prescribedGeometry: { emitterId: "analytic-test", sourceSchema: "analytic-line.v1", interpolation: "exact-inertial-polynomial/v1", errorMethod: "exact-polynomial", physicsInvoked: false, responseCenter: { x: 1, y: 0, z: 0 }, sphericalEnvelopeRadius: 1, displayTrailDuration: 1, coordinates: {} } },
    window: { start: 0, end: 1, delayHorizon: 1, sampleInterval: .25 },
    worldlines: [{ id: "line", polarity: 1, coverageStart: 0, coverageEnd: 1, interpolation: "exact-inertial-polynomial/v1", segments: [{ startTime: 0, endTime: 1, coefficients: [[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], positionError: 0, velocityError: 0 }] }],
    binaries: [], ansatz: [], events: [],
  };
}

test("retained cubic bounds agree with hand-derived Bernstein controls and affine ranks", () => {
  const controls = recordControlPoints({ worldlines: [{ segments: [{ startTime: 2, endTime: 5, coefficients: [[1, 2, 3, 4], [0, 0, 0, 0], [0, 0, 0, 0]] }] }] });
  assert.deepEqual(controls, [[1, 0, 0], [3, 0, 0], [14, 0, 0], [142, 0, 0]]);
  assert.equal(describeBounds(controls).dimension, "boundary");
  assert.equal(describeBounds([[0, 0, 2], [1, 0, 2], [0, 1, 2]]).dimension, "2d");
  assert.equal(describeBounds([[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]).dimension, "3d");
  assert.throws(() => describeBounds([]), /complete finite/);
  assert.throws(() => describeBounds([[NaN, 0, 0]]), /complete finite/);
});

test("linear preview follows the analytic history; observed speed does not declare a speed policy", () => {
  const record = linearRecord();
  const described = describeLibraryRecord(record, entry, "hash");
  assert.deepEqual(described.summary.bounds.center, [1, 0, 0]);
  assert.equal(described.summary.bounds.radius, 1);
  assert.equal(described.summary.facets.speedPolicy, "unavailable");
  assert.equal(described.summary.facets.radii, "unavailable");
  assert.equal(described.summary.facets.orbitSharing, "unavailable");
  assert.equal(described.summary.facets.breathing, "unavailable");
  assert.deepEqual(createLibraryPreview(described, 5).paths[0].points, [[0, 0, 0], [.5, 0, 0], [1, 0, 0], [1.5, 0, 0], [2, 0, 0]]);
  record.provenance.prescribedGeometry.coordinates = { speedPolicy: { mode: "capped-cf" } };
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.speedPolicy, "unavailable");
  record.provenance.prescribedGeometry.coordinates.speedPolicy = { mode: "capped-cf", owner: "test-policy", version: "v1", quantity: "constituent-speed", frame: "absolute-void", unitConvention: "wake-speed-normalized", fieldSpeed: 1 };
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.speedPolicy, "capped-cf");
  // A declared policy is not proof that the record obeys it, nor a playback clamp.
  assert.equal(createLibraryPreview(describeLibraryRecord(record, entry, "hash"), 5).paths[0].points.at(-1)[0], 2);
});

test("harmonic breathing needs complete metadata; retired nesting cannot assign assembly radii", () => {
  const record = linearRecord();
  const coordinates = { worldlines: [{ id: "line", operator: { kind: "f6c-harmonic-member.v1" } }], relationships: { componentBraids: [{ id: "a" }, { id: "b" }] } };
  record.provenance.prescribedGeometry.coordinates = coordinates;
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.breathing, "unavailable");
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.radii, "unavailable");
  Object.assign(coordinates.worldlines[0].operator, { radial: { amplitude: 1, angularFrequency: 2 }, axial: { amplitude: 0, angularFrequency: 0 } });
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.breathing, "yes");
  coordinates.relationships.nesting = { owner: "test", nested: false };
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.radii, "unavailable");
});

const rows = [
  { id: "one", label: "Two circles", facets: { count: "4", breathing: "no", radii: "iso", dimension: "2d", shape: ["circles", "spindle"], speedPolicy: "uncapped" } },
  { id: "two", label: "Spatial circle", facets: { count: "6", breathing: "yes", radii: "hetero", dimension: "3d", shape: ["circles"], speedPolicy: "capped-cf" } },
  { id: "three", label: "Unknown form", facets: { count: "6", breathing: "unavailable", radii: "unavailable", dimension: "3d", shape: ["unavailable"], speedPolicy: "unavailable" } },
];
test("filters intersect across facets, union within a facet, and preserve unknown versus false", () => {
  assert.equal(queryLibraryRows(rows, new URLSearchParams("count=6&breathing=yes")).total, 1);
  assert.equal(queryLibraryRows(rows, new URLSearchParams("shape=circles&shape=unavailable")).total, 3);
  assert.deepEqual(queryLibraryRows(rows, new URLSearchParams("radii=iso")).results.map((r) => r.id), ["one"]);
  assert.deepEqual(queryLibraryRows(rows, new URLSearchParams("speedPolicy=unavailable")).results.map((r) => r.id), ["three"]);
  assert.equal(queryLibraryRows(rows, new URLSearchParams("q=TWO CIRCLES")).total, 1);
  assert.equal(queryLibraryRows(rows, new URLSearchParams()).total, 3);
  const hashRow = { ...rows[0], recordSha256: "f5000000" + "0".repeat(56) };
  assert.equal(queryLibraryRows([hashRow], new URLSearchParams("q=F5")).total, 0, "short aliases must not match incidental digest bytes");
  assert.equal(queryLibraryRows([hashRow], new URLSearchParams("q=f5000000")).total, 1);
  const filtered = queryLibraryRows(rows, new URLSearchParams("count=6&breathing=yes"));
  assert.deepEqual(filtered.counts.breathing, { yes: 1, unavailable: 1 });
});

test("record facets are filtered before grouping; group identity is not representative identity", () => {
  const groups = queryLibraryRows(rows, new URLSearchParams("count=6&breathing=yes&groupBy=count"));
  assert.equal(groups.total, 1);
  assert.equal(groups.results[0].memberCount, 1);
  assert.equal(groups.results[0].id, "group:count:6");
  assert.equal(groups.results[0].representative.id, "two");
  assert.throws(() => queryLibraryRows(rows, new URLSearchParams("groupBy=bogus")), /Unsupported/);
});

test("orbit-sharing queries preserve mixed, missing, counts, grouping and saved record pins", () => {
  const fixture = ["shared", "dedicated", "mixed", "unavailable"].map((orbitSharing, i) => ({
    id: String(i), facets: { orbitSharing, radii: "iso", count: "6" },
  }));
  assert.deepEqual(queryLibraryRows(fixture, new URLSearchParams("orbitSharing=mixed")).results.map((r) => r.id), ["2"]);
  const query = new URLSearchParams("orbitSharing=shared&orbitSharing=mixed&radii=iso");
  assert.deepEqual(queryLibraryRows(fixture, query).results.map((r) => r.id), ["0", "2"]);
  assert.deepEqual(queryLibraryRows(fixture, query).counts.orbitSharing, { shared: 1, dedicated: 1, mixed: 1, unavailable: 1 });
  query.set("groupBy", "count");
  assert.equal(queryLibraryRows(fixture, query).results[0].memberCount, 2);
  query.set("selected", "exact-record"); query.set("sha256", "exact-pin"); query.set("cursor", "current");
  assert.equal(normalizeLibraryBrowseParams(query).toString(), query.toString());
  query.set("orbitSharing", "unavailable");
  const normalized = normalizeLibraryBrowseParams(query);
  assert.equal(normalized.has("orbitSharing"), false);
  assert.equal(normalized.has("cursor"), false);
  assert.equal(normalized.get("selected"), "exact-record");
  assert.equal(normalized.get("sha256"), "exact-pin");
});

async function request(service, path, method = "GET") {
  let status, body;
  const handled = await service({ url: path, method }, { writeHead(value) { status = value; }, end(value) { body = JSON.parse(value); } });
  return { handled, status, body };
}

test("seed provider covers all 43 records, paginates deterministically, and verifies exact bytes", async () => {
  const service = createBorgLibraryService({ repoRoot });
  const first = await request(service, "/api/borg/library");
  assert.equal(first.status, 200);
  assert.equal(first.body.total, 43);
  assert.deepEqual(first.body.failures, []);
  assert.equal(first.body.results.length, 12);
  assert.equal(first.body.counts.speedPolicy.unavailable, 43);
  assert.deepEqual(first.body.counts.radii, { hetero: 20, iso: 23 });
  assert.deepEqual(first.body.counts.orbitSharing, { shared: 22, dedicated: 20, unavailable: 1 });
  assert.equal(first.body.counts.nested, undefined);
  assert.deepEqual(first.body.counts.braidCount, { 1: 19, 2: 8, unavailable: 16 });
  const second = await request(service, `/api/borg/library?cursor=${first.body.nextCursor}`);
  assert.equal(second.body.offset, 12);
  const all = [...first.body.results, ...second.body.results];
  let cursor = second.body.nextCursor;
  while (cursor) {
    const page = await request(service, `/api/borg/library?cursor=${cursor}`);
    assert.equal(page.status, 200);
    all.push(...page.body.results);
    cursor = page.body.nextCursor;
  }
  assert.deepEqual(all.map((r) => r.id), BORG_BRAID_RECORD_CATALOG.entries.map((e) => e.id));
  const previous = await request(service, `/api/borg/library?cursor=${second.body.previousCursor}`);
  assert.deepEqual(previous.body.results, first.body.results);
  for (const row of all) {
    const bytes = await readFile(new URL(`../${row.recordUrl}`, import.meta.url));
    assert.equal(row.recordSha256, createHash("sha256").update(bytes).digest("hex"));
    const { body, status } = await request(service, `/api/borg/library/preview?id=${row.id}&sha256=${row.recordSha256}`);
    assert.equal(status, 200);
    const { preview } = body;
    assert.equal(preview.paths.length, Number(row.facets.count));
    for (const path of preview.paths) {
      assert.equal(path.points.length, 321);
      for (const p of path.points) {
        assert.ok(p.every(Number.isFinite));
        assert.ok(Math.hypot(...p.map((v, i) => v - preview.bounds.center[i])) <= preview.bounds.radius * (1 + 1e-12));
      }
    }
  }
  assert.equal((await request(service, "/api/borg/library?speedPolicy=capped-cf")).body.total, 0);
  assert.equal((await request(service, "/api/borg/library?dimension=2d")).body.total, 13);
  assert.equal((await request(service, "/api/borg/library?breathing=yes")).body.total, 1);
  assert.equal((await request(service, "/api/borg/library/preview?id=missing")).status, 404);
  assert.equal((await request(service, `/api/borg/library/preview?id=${all[0].id}&sha256=wrong`)).status, 409);
  assert.equal((await request(service, "/api/borg/library?cursor=bad")).status, 400);
  assert.equal((await request(service, `/api/borg/library?count=8&cursor=${first.body.nextCursor}`)).status, 400);
  assert.equal((await request(service, "/api/borg/library", "POST")).status, 405);
  assert.equal((await request(service, "/not-the-library")).handled, false);
});

test("dot-zero aliases preserve sealed records, source classes, old-label search, and exact selection", async () => {
  const service = createBorgLibraryService({ repoRoot });
  const expected = [
    ["family-a-a1-general-v1", "A1.0 — coincident endpoint orbits", "A1 — coincident endpoint orbits", "A1"],
    ["family-a-a2-fully-symmetric-v1", "A2.0 — fully symmetric", "A2 — fully symmetric", "A2"],
    ["family-a-a3-general-v1", "A3.0 — general", "A3 — general", "A3"],
  ];
  for (const [id, label, oldLabel, geometryClass] of expected) {
    const catalogEntry = BORG_BRAID_RECORD_CATALOG.entries.find((row) => row.id === id);
    const bytes = await readFile(new URL(`../${catalogEntry.recordUrl}`, import.meta.url));
    const digest = createHash("sha256").update(bytes).digest("hex");
    const raw = JSON.parse(bytes);
    const original = JSON.stringify(raw);
    const session = createBorgAssemblyViewSession([raw]);
    const presentation = createBorgAssemblyViewPresentation(session.selected);
    assert.equal(presentation.catalogLabel, label);
    assert.equal(presentation.rawRecord, raw);
    assert.equal(presentation.provenance.prescribedGeometry.taxonomy.memberId, geometryClass);
    assert.equal(presentation.provenance.prescribedGeometry.taxonomy.displayLabel, oldLabel);
    for (const query of [label, oldLabel, label.split(" —")[0]]) {
      const result = await request(service, `/api/borg/library?q=${encodeURIComponent(query)}`);
      assert.equal(result.status, 200);
      assert.equal(result.body.total, 1);
      assert.equal(result.body.results[0].id, id);
      assert.equal(result.body.results[0].alias, label);
      assert.equal(result.body.results[0].recordSha256, digest);
      assert.ok(result.body.results[0].aliases.includes(oldLabel));
    }
    const preview = await request(service, `/api/borg/library/preview?id=${id}&sha256=${digest}`);
    assert.equal(preview.status, 200);
    assert.equal(preview.body.summary.alias, label);
    assert.equal(preview.body.summary.recordUrl, catalogEntry.recordUrl);
    assert.equal(preview.body.preview.recordSha256, digest);
    assert.equal(JSON.stringify(raw), original);
  }
  const unrelated = createBorgAssemblyViewSession([linearRecord()]);
  assert.equal(createBorgAssemblyViewPresentation(unrelated.selected).catalogLabel, null);
});

test("source-derived assembly radii and operator spindle sets cover the exact catalog", async () => {
  const service = createBorgLibraryService({ repoRoot });
  const aliases = async (query) => {
    const all = [];
    let cursor;
    do {
      const response = await request(service, "/api/borg/library?" + query + (cursor ? "&cursor=" + cursor : ""));
      assert.equal(response.status, 200);
      all.push(...response.body.results.map((r) => r.alias.split(" —")[0]));
      cursor = response.body.nextCursor;
    } while (cursor);
    return all;
  };
  // Expectations follow the independently derived centered norms in the audit:
  // orthogonal circle offsets give h²+rho², F5 has two such radii, and F6c
  // has unequal positive/negative breathing sectors away from T=0.
  assert.deepEqual(await aliases("radii=iso"), ["A1.2","A2.0","A3.2","F6b","SC-01","SC-02","SC-03","SC-04","SC-05","SC-06","SC-07","SC-08","SC-09","SC-10","SC-11","SC-12","SS-C5","SS-C6","PV-04","PV-06","PV-08","PV-12","PV-20"]);
  assert.deepEqual(await aliases("orbitSharing=shared"), ["A1.0","A1.1","A1.2","A1.3","A1.4","B1.3","C5","C6","SC-01","SC-02","SC-03","SC-04","SC-05","SC-06","SC-07","SC-08","SC-09","SC-10","SC-11","SC-12","SS-C5","SS-C6"]);
  assert.deepEqual(await aliases("orbitSharing=dedicated"), ["A2.0","A3.0","A3.1","A3.2","A3.3","A3.4","B1.1","B1.2","C1","C2","C3","C4","F5","F6c","F6b","PV-04","PV-06","PV-08","PV-12","PV-20"]);
  assert.deepEqual(await aliases("orbitSharing=mixed"), []);
  assert.deepEqual(await aliases("orbitSharing=unavailable"), ["SD3"]);
  assert.deepEqual(await aliases("radii=iso&orbitSharing=shared"), ["A1.2","SC-01","SC-02","SC-03","SC-04","SC-05","SC-06","SC-07","SC-08","SC-09","SC-10","SC-11","SC-12","SS-C5","SS-C6"]);
  assert.deepEqual(await aliases("radii=iso&orbitSharing=dedicated"), ["A2.0","A3.2","F6b","PV-04","PV-06","PV-08","PV-12","PV-20"]);
  assert.deepEqual(await aliases("braidCount=2&orbitSharing=shared"), ["C5","C6","SS-C5","SS-C6"]);
  assert.deepEqual(await aliases("radii=hetero"), ["A1.0", "A1.1", "A1.3", "A1.4", "A3.0", "A3.1", "A3.3", "A3.4", "B1.1", "B1.2", "B1.3", "C1", "C2", "C3", "C4", "C5", "C6", "SD3", "F5", "F6c"]);
  assert.deepEqual(await aliases("braidCount=2&radii=hetero"), ["C1", "C2", "C3", "C4", "C5", "C6"]);
  assert.deepEqual(await aliases("braidCount=2&radii=iso"), ["SS-C5","SS-C6"]);
  assert.deepEqual(await aliases("shape=spindle"), ["B1.1", "B1.2", "C1", "C2", "C3", "C4"]);
  assert.deepEqual(await aliases("braidCount=2"), ["C1","C2","C3","C4","C5","C6","SS-C5","SS-C6"]);
  assert.deepEqual(await aliases("braidCount=2&shape=spindle"), ["C1", "C2", "C3", "C4"]);
  assert.deepEqual(await aliases("braidCount=3"), []);
  const groups = (await request(service, "/api/borg/library?groupBy=braidCount")).body.results;
  assert.deepEqual(groups.map((g) => [g.id, g.memberCount]), [["group:braidCount:1", 19], ["group:braidCount:2", 8], ["group:braidCount:unavailable", 16]]);
  const spindle = (await request(service, "/api/borg/library?shape=spindle")).body.results[0];
  assert.deepEqual(spindle.facets.shape, ["circles", "spindle"]);
  assert.equal(spindle.facets.radii, "hetero");
  assert.match(spindle.reasons.radii, /declared assembly center/);
  assert.equal(spindle.classificationRevision, "2026-08-30.operator-spindle-1");
  assert.match(spindle.classificationSha256, /^[a-f0-9]{64}$/);
  assert.equal((await request(service, "/api/borg/library?nested=no")).status, 400);
  assert.equal((await request(service, "/api/borg/library?nested=yes")).status, 400);
});


test("braid count follows complete source memberships, including three braids, not particle arithmetic", () => {
  assert.deepEqual(LIBRARY_FACETS.braidCount.options.map(([value]) => value), ["1", "2", "3"]);
  for (const n of [1, 2, 3]) {
    const coordinates = { constituentInventory: Array.from({ length: n * 2 }, (_, i) => ({ id: `p${i}` })),
      relationships: { componentBraids: Array.from({ length: n }, (_, i) => ({ id: `braid-${i}`, members: [`p${2 * i}`, `p${2 * i + 1}`] })) } };
    assert.equal(describeBraidComposition(coordinates).braidCount, String(n));
    coordinates.relationships.componentBraids[0].members.pop();
    assert.equal(describeBraidComposition(coordinates).braidCount, "unavailable");
    coordinates.relationships.componentBraids[0].members.push("p0");
    assert.equal(describeBraidComposition(coordinates).braidCount, "unavailable");
  }
  assert.equal(describeBraidComposition({}).braidCount, "unavailable");
  assert.equal(describeBraidComposition({ constituentInventory: [null], relationships: { componentBraids: [null] } }).braidCount, "unavailable");
  assert.equal(describeBraidComposition({ constituentInventory: [{ id: "p" }], relationships: { componentBraids: [null] } }).braidCount, "unavailable");
});

test("selector menus hide unavailable values, keep unclassified shape, and label the low-dimensional bucket 1D", () => {
  assert.deepEqual(LIBRARY_FACETS.orbitSharing.options, [["shared", "Shared"], ["dedicated", "Dedicated"], ["mixed", "Mixed"]]);
  for (const [key, definition] of Object.entries(LIBRARY_FACETS)) {
    assert.equal(definition.options.some(([value]) => value === "unavailable"), key === "shape");
  }
  assert.deepEqual(LIBRARY_FACETS.dimension.options, [["boundary", "1D"], ["2d", "2D · planar"], ["3d", "3D · spatial"]]);
  assert.ok(LIBRARY_FACETS.shape.options.some(([value, label]) => value === "unavailable" && label === "Unclassified"));
  assert.equal(isLibrarySelectorValue("breathing", "unavailable"), false);
  assert.equal(isLibrarySelectorValue("shape", "unavailable"), true);
  assert.equal(isLibrarySelectorValue("count", "1000000"), true);
  assert.equal(isLibrarySelectorValue("count", "unavailable"), false);
  const saved = new URLSearchParams("braidCount=2&nested=unavailable&speedPolicy=unavailable&shape=unavailable&selected=exact-record&sha256=exact-pin&cursor=old");
  const normalized = normalizeLibraryBrowseParams(saved);
  assert.equal(normalized.toString(), "braidCount=2&shape=unavailable&selected=exact-record&sha256=exact-pin");
  assert.equal(saved.get("nested"), "unavailable");
  for (const retired of ["yes", "no"]) {
    const oldLink = new URLSearchParams(`nested=${retired}&radii=iso&selected=exact-record&sha256=exact-pin&cursor=old`);
    assert.equal(normalizeLibraryBrowseParams(oldLink).toString(), "radii=iso&selected=exact-record&sha256=exact-pin");
  }
  const supported = new URLSearchParams("dimension=boundary&count=99&radii=iso&cursor=current");
  assert.equal(normalizeLibraryBrowseParams(supported).toString(), supported.toString());
});

test("spindle pins survive renaming but never transfer to changed bytes or override radii", () => {
  const pin = "a".repeat(64);
  const policy = { schema: "borg-library-classifications.v3", authority: "operator", revision: "test", source: "test", spindle: [{ alias: "renamable", value: true, recordSha256: pin }] };
  validateLibraryClassifications(policy);
  assert.equal(recordClassification(policy, pin, "spindle"), true);
  policy.spindle[0].alias = "a new name";
  assert.equal(recordClassification(policy, pin, "spindle"), true);
  assert.equal(recordClassification(policy, "b".repeat(64), "spindle"), null);
  for (const forbidden of ["nested", "radii"]) {
    assert.throws(() => validateLibraryClassifications({ ...policy, [forbidden]: [] }), /source-derived/);
  }
  assert.throws(() => validateLibraryClassifications({ ...policy, schema: "borg-library-classifications.v2" }), /authority or revision/);
  policy.spindle[0].value = false;
  validateLibraryClassifications(policy);
  assert.equal(recordClassification(policy, pin, "spindle"), false);
  policy.spindle[0].value = "false";
  assert.throws(() => validateLibraryClassifications(policy), /boolean/);
  delete policy.spindle[0].value;
  assert.throws(() => validateLibraryClassifications(policy), /boolean/);
  policy.spindle[0].value = false;
  policy.spindle.push({ recordSha256: pin, value: true });
  assert.throws(() => validateLibraryClassifications(policy), /duplicate/);
});

test("editing classification data refreshes cached facets and invalidates old page cursors without changing records", async () => {
  const directory = await mkdtemp(join(tmpdir(), "borg-classifications-test-"));
  try {
    const classificationFile = join(directory, "classifications.json");
    const source = await readFile(new URL("../reference/priorities/app-borg/library-classifications.v3.json", import.meta.url), "utf8");
    await writeFile(classificationFile, source);
    const service = createBorgLibraryService({ repoRoot, classificationFile });
    const first = (await request(service, "/api/borg/library")).body;
    const policy = JSON.parse(source);
    policy.revision = "independent-test-reclassification";
    policy.spindle = [];
    await writeFile(classificationFile, JSON.stringify(policy));
    assert.equal((await request(service, `/api/borg/library?cursor=${first.nextCursor}`)).status, 400);
    const refreshed = (await request(service, "/api/borg/library")).body;
    assert.equal(refreshed.counts.shape.spindle, undefined);
    assert.deepEqual(refreshed.counts.radii, first.counts.radii);
    assert.equal((await request(service, "/api/borg/library?shape=spindle")).body.total, 0);
    assert.deepEqual(refreshed.results.map((r) => r.recordSha256), first.results.map((r) => r.recordSha256));
    assert.notEqual(refreshed.results[0].classificationSha256, first.results[0].classificationSha256);
    assert.equal(refreshed.results[0].classificationRevision, policy.revision);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("missing registered records remain explicit failures", async () => {
  const service = createBorgLibraryService({ repoRoot, catalog: [entry] });
  const { body } = await request(service, "/api/borg/library");
  assert.equal(body.registeredCount, 1);
  assert.equal(body.total, 0);
  assert.equal(body.failures[0].id, "fixture");
});

test("Borg pinned-record navigation rejects changed bytes before mounting", async () => {
  const bytes = JSON.stringify(linearRecord());
  const hash = createHash("sha256").update(bytes).digest("hex");
  let mounts = 0;
  const config = { fetchLike: async () => new Response(bytes), mountApp(options) { mounts++; return options; } };
  const result = await bootBorgApp({ ...config, search: `?eomRecord=fixture.json&recordSha256=${hash}` });
  assert.equal(result.eomRecordReplay.record.worldlines.length, 1);
  assert.equal(mounts, 1);
  await assert.rejects(bootBorgApp({ ...config, search: `?eomRecord=fixture.json&recordSha256=${"0".repeat(64)}` }), /record changed/);
  await assert.rejects(bootBorgApp({ ...config, search: `?eomRecord=a&eomRecord=b&recordSha256=${hash}` }), /exactly one/);
  await assert.rejects(bootBorgApp({ ...config, search: "?eomRecord=a&recordSha256=invalid" }), /lowercase SHA-256/);
  assert.equal(mounts, 1);
});
