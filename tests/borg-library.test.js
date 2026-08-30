import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { createBorgLibraryService } from "../scripts/dev/BorgLibraryService.mjs";
import { BORG_BRAID_RECORD_CATALOG } from "../src/apps/borg/BorgBraidRecordCatalog.js";
import { describeBounds, recordControlPoints, describeLibraryRecord, createLibraryPreview } from "../src/apps/borg/library/BorgLibraryDescriptors.mjs";
import { queryLibraryRows } from "../src/apps/borg/library/BorgLibraryQuery.mjs";
import { bootBorgApp } from "../src/apps/borg/BorgBootstrap.js";

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
  assert.equal(described.summary.facets.nested, "unavailable");
  assert.equal(described.summary.facets.breathing, "unavailable");
  assert.deepEqual(createLibraryPreview(described, 5).paths[0].points, [[0, 0, 0], [.5, 0, 0], [1, 0, 0], [1.5, 0, 0], [2, 0, 0]]);
  record.provenance.prescribedGeometry.coordinates = { speedPolicy: { mode: "capped-cf" } };
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.speedPolicy, "unavailable");
  record.provenance.prescribedGeometry.coordinates.speedPolicy = { mode: "capped-cf", owner: "test-policy", version: "v1", quantity: "constituent-speed", frame: "absolute-void", unitConvention: "wake-speed-normalized", fieldSpeed: 1 };
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.speedPolicy, "capped-cf");
  // A declared policy is not proof that the record obeys it, nor a playback clamp.
  assert.equal(createLibraryPreview(describeLibraryRecord(record, entry, "hash"), 5).paths[0].points.at(-1)[0], 2);
});

test("harmonic breathing requires complete source metadata and nesting is never inferred from inventory", () => {
  const record = linearRecord();
  const coordinates = { worldlines: [{ id: "line", operator: { kind: "f6c-harmonic-member.v1" } }], relationships: { componentBraids: [{ id: "a" }, { id: "b" }] } };
  record.provenance.prescribedGeometry.coordinates = coordinates;
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.breathing, "unavailable");
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.nested, "unavailable");
  Object.assign(coordinates.worldlines[0].operator, { radial: { amplitude: 1, angularFrequency: 2 }, axial: { amplitude: 0, angularFrequency: 0 } });
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.breathing, "yes");
  coordinates.relationships.nesting = { owner: "test", nested: false };
  assert.equal(describeLibraryRecord(record, entry, "hash").summary.facets.nested, "no");
});

const rows = [
  { id: "one", label: "Two circles", facets: { count: "4", breathing: "no", nested: "no", dimension: "2d", shape: ["circles", "spindle"], speedPolicy: "uncapped" } },
  { id: "two", label: "Spatial circle", facets: { count: "6", breathing: "yes", nested: "yes", dimension: "3d", shape: ["circles"], speedPolicy: "capped-cf" } },
  { id: "three", label: "Unknown form", facets: { count: "6", breathing: "unavailable", nested: "unavailable", dimension: "3d", shape: ["unavailable"], speedPolicy: "unavailable" } },
];
test("filters intersect across facets, union within a facet, and preserve unknown versus false", () => {
  assert.equal(queryLibraryRows(rows, new URLSearchParams("count=6&breathing=yes")).total, 1);
  assert.equal(queryLibraryRows(rows, new URLSearchParams("shape=circles&shape=unavailable")).total, 3);
  assert.deepEqual(queryLibraryRows(rows, new URLSearchParams("nested=no")).results.map((r) => r.id), ["one"]);
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

async function request(service, path, method = "GET") {
  let status, body;
  const handled = await service({ url: path, method }, { writeHead(value) { status = value; }, end(value) { body = JSON.parse(value); } });
  return { handled, status, body };
}

test("seed provider covers all 24 records, paginates deterministically, and verifies exact bytes", async () => {
  const service = createBorgLibraryService({ repoRoot });
  const first = await request(service, "/api/borg/library");
  assert.equal(first.status, 200);
  assert.equal(first.body.total, 24);
  assert.deepEqual(first.body.failures, []);
  assert.equal(first.body.results.length, 12);
  assert.equal(first.body.counts.speedPolicy.unavailable, 24);
  assert.equal(first.body.counts.nested.unavailable, 24);
  const second = await request(service, `/api/borg/library?cursor=${first.body.nextCursor}`);
  assert.equal(second.body.offset, 12);
  const all = [...first.body.results, ...second.body.results];
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
  assert.equal((await request(service, "/api/borg/library?dimension=2d")).body.total, 1);
  assert.equal((await request(service, "/api/borg/library?breathing=yes")).body.total, 1);
  assert.equal((await request(service, "/api/borg/library/preview?id=missing")).status, 404);
  assert.equal((await request(service, `/api/borg/library/preview?id=${all[0].id}&sha256=wrong`)).status, 409);
  assert.equal((await request(service, "/api/borg/library?cursor=bad")).status, 400);
  assert.equal((await request(service, `/api/borg/library?count=8&cursor=${first.body.nextCursor}`)).status, 400);
  assert.equal((await request(service, "/api/borg/library", "POST")).status, 405);
  assert.equal((await request(service, "/not-the-library")).handled, false);
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
