import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import test from "node:test";
import {
  canonicalStringify, parseBorgCertifiedBudgetIdentities,
  selectBorgCertifiedBudgetIdentity, validateBorgCertifiedBudgetIdentities,
} from "../src/apps/borg/BorgCertifiedBudgetIdentityContract.js";
import {
  BUDGET_IDENTITIES_SOURCE_PATH, BUDGET_IDENTITIES_PROJECTION_PATH,
  renderBorgCertifiedBudgetIdentities, buildBorgCertifiedBudgetIdentities,
} from "../scripts/borg/build-certified-budget-identities.mjs";

const root = path.resolve(import.meta.dirname, "..");
const ids = ["interactive-certified-v1", "research-certified-v1"];
function known() {
  return { schema: "borg-certified-budget-identities/v1", presets: Object.fromEntries(ids.map(id => [id, {
    allocationCanonicalJson: `{"presetId":"${id}","schema":"borg_certified_budget/v1"}`,
    allocationHash: "1".repeat(64),
  }])) };
}
const readData = () => JSON.parse(fs.readFileSync(path.join(root, BUDGET_IDENTITIES_SOURCE_PATH), "utf8"));

test("known controls preserve canonical literals, select exact applicability and reject an incorrect digest", () => {
  assert.equal(canonicalStringify({ z: [3, { b: false, a: "literal" }], a: 1 }), '{"a":1,"z":[3,{"a":"literal","b":false}]}');
  const data = known();
  assert.deepEqual(parseBorgCertifiedBudgetIdentities(JSON.stringify(data)), data);
  const row = selectBorgCertifiedBudgetIdentity(data, ids[0], data.presets[ids[0]].allocationCanonicalJson);
  assert.equal(row.allocationHash, "1".repeat(64));
  assert.ok(Object.isFrozen(row));
  assert.throws(() => selectBorgCertifiedBudgetIdentity(data, ids[0], "changed"), /applicability differs/);
  assert.throws(() => selectBorgCertifiedBudgetIdentity(data, "missing", row.allocationCanonicalJson), /Missing/);
  assert.throws(() => renderBorgCertifiedBudgetIdentities(JSON.stringify(data)), /Recorded budget hash does not match/);
});

test("strict keyed data rejects missing, extra, malformed, mismatched and duplicate fields", () => {
  for (const change of [
    d => { d.schema = "unknown"; }, d => { d.extra = true; },
    d => { delete d.presets[ids[0]]; }, d => { d.presets.unknown = d.presets[ids[0]]; },
    d => { d.presets[ids[0]].extra = true; }, d => { d.presets[ids[0]].allocationHash = "invalid"; },
    d => { d.presets[ids[0]].allocationHash = ["1".repeat(64)]; },
    d => { d.presets[ids[0]].allocationHash = 1; },
    d => { d.presets[ids[0]].allocationHash = null; },
    d => { d.presets[ids[0]].allocationHash = "1".repeat(64) + "\n"; },
    d => { d.presets[ids[0]].allocationCanonicalJson = {}; },
    d => { d.presets[ids[0]].allocationCanonicalJson += " "; },
    d => { d.presets[ids[0]].allocationCanonicalJson = d.presets[ids[1]].allocationCanonicalJson; },
  ]) {
    const data = known(); change(data);
    assert.throws(() => validateBorgCertifiedBudgetIdentities(data), TypeError);
  }
  const raw = JSON.stringify(known());
  assert.throws(() => parseBorgCertifiedBudgetIdentities(raw.replace('"schema":', '"schema":"hidden","schema":')), /Duplicate/);
  assert.throws(() => parseBorgCertifiedBudgetIdentities(raw.replace('"allocationHash":', '"allocationHash":"hidden","allocationHa\\u0073h":')), /Duplicate/);
  const nested = known(); nested.presets[ids[0]].allocationCanonicalJson = '{"presetId":"hidden",' + nested.presets[ids[0]].allocationCanonicalJson.slice(1);
  assert.throws(() => validateBorgCertifiedBudgetIdentities(nested), /Duplicate/);
  assert.throws(() => parseBorgCertifiedBudgetIdentities(raw + "tail"), SyntaxError);
});

function fixture(t, data = readData()) {
  const scratch = path.join(root, ".tmp/option-b-borg-budget");
  fs.mkdirSync(scratch, { recursive: true });
  const dir = fs.mkdtempSync(path.join(scratch, "test-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const source = path.join(dir, BUDGET_IDENTITIES_SOURCE_PATH);
  const output = path.join(dir, BUDGET_IDENTITIES_PROJECTION_PATH);
  fs.mkdirSync(path.dirname(source), { recursive: true });
  fs.writeFileSync(source, JSON.stringify(data));
  return { dir, source, output };
}

test("retained ledger identities and applicability produce only deterministic plain ESM data", async () => {
  const data = readData();
  const ledger = fs.readFileSync(path.join(root, "reference/priorities/app-solver/contracts/certified-error-budget-ledger.md"), "utf8");
  for (const id of ids) {
    const row = data.presets[id];
    assert.ok(ledger.includes(`\`${row.allocationHash}\``));
    assert.equal(createHash("sha256").update(row.allocationCanonicalJson).digest("hex"), row.allocationHash);
  }
  const rendered = renderBorgCertifiedBudgetIdentities(JSON.stringify(data));
  assert.equal(rendered, renderBorgCertifiedBudgetIdentities(JSON.stringify(data, null, 2)));
  assert.deepEqual(JSON.parse(rendered.slice(rendered.indexOf("export default ") + 15, -2)), data);
  assert.deepEqual((await import(`data:text/javascript,${encodeURIComponent(rendered)}`)).default, data);
});

test("generation bootstraps without projection and fails closed on stale source, stale output and invalid bytes", t => {
  const f = fixture(t);
  assert.throws(() => buildBorgCertifiedBudgetIdentities({ rootDir: f.dir }), /missing or stale/);
  assert.equal(fs.existsSync(f.output), false);
  buildBorgCertifiedBudgetIdentities({ rootDir: f.dir, mode: "write" });
  const original = fs.readFileSync(f.output);
  const stamp = fs.statSync(f.output, { bigint: true }).mtimeNs;
  assert.equal(buildBorgCertifiedBudgetIdentities({ rootDir: f.dir }).status, "current");
  assert.equal(buildBorgCertifiedBudgetIdentities({ rootDir: f.dir, mode: "write" }).status, "current");
  assert.equal(fs.statSync(f.output, { bigint: true }).mtimeNs, stamp);
  fs.appendFileSync(f.output, "// stale\n");
  assert.throws(() => buildBorgCertifiedBudgetIdentities({ rootDir: f.dir }), /missing or stale/);
  buildBorgCertifiedBudgetIdentities({ rootDir: f.dir, mode: "write" });
  assert.deepEqual(fs.readFileSync(f.output), original);
  const changed = readData(); changed.presets[ids[0]].allocationHash = "1".repeat(64);
  fs.writeFileSync(f.source, JSON.stringify(changed));
  assert.throws(() => buildBorgCertifiedBudgetIdentities({ rootDir: f.dir, mode: "write" }), /Recorded budget hash/);
  assert.deepEqual(fs.readFileSync(f.output), original);
  fs.writeFileSync(f.source, Buffer.from([0xff]));
  assert.throws(() => buildBorgCertifiedBudgetIdentities({ rootDir: f.dir }), /encoded data/);
});

test("same-byte source pathname replacement is rejected after known-good generation", t => {
  const f = fixture(t);
  buildBorgCertifiedBudgetIdentities({ rootDir: f.dir, mode: "write" });
  const read = fs.readFileSync;
  let replaced = false;
  t.mock.method(fs, "readFileSync", function(target, ...args) {
    const bytes = read.call(fs, target, ...args);
    if (!replaced && typeof target === "number") {
      replaced = true;
      fs.renameSync(path.dirname(f.source), path.dirname(f.source) + ".saved");
      fs.mkdirSync(path.dirname(f.source));
      fs.copyFileSync(path.join(path.dirname(f.source) + ".saved", path.basename(f.source)), f.source);
    }
    return bytes;
  });
  assert.throws(() => buildBorgCertifiedBudgetIdentities({ rootDir: f.dir, mode: "write" }), /source changed/);
  assert.equal(replaced, true);
});

test("public built-in presets preserve frozen sync API and leave custom-preset validation available", async () => {
  const m = await import("../src/apps/borg/BorgCertifiedBudgets.js");
  const data = readData();
  assert.deepEqual(Object.keys(m).sort(), ["BORG_CERTIFIED_BUDGET_SCHEMA", "BORG_INTERACTIVE_CERTIFIED_BUDGET_ID", "BORG_RESEARCH_CERTIFIED_BUDGET_ID", "BORG_DEFAULT_CERTIFIED_BUDGET_ID", "BORG_CERTIFIED_BUDGET_PRESETS", "getBorgCertifiedBudgetPreset", "validateBorgCertifiedBudgetPreset", "canonicalStringify"].sort());
  assert.equal(m.BORG_DEFAULT_CERTIFIED_BUDGET_ID, ids[1]);
  const frozen = value => { if (value && typeof value === "object") { assert.ok(Object.isFrozen(value)); Object.values(value).forEach(frozen); } };
  frozen(m.BORG_CERTIFIED_BUDGET_PRESETS);
  for (const preset of m.BORG_CERTIFIED_BUDGET_PRESETS) {
    assert.equal(m.getBorgCertifiedBudgetPreset(preset.id), preset);
    assert.equal(m.validateBorgCertifiedBudgetPreset(preset), preset);
    assert.equal(preset.allocationCanonicalJson, data.presets[preset.id].allocationCanonicalJson);
    assert.equal(preset.allocationHash, data.presets[preset.id].allocationHash);
    assert.throws(() => { preset.allocations.controller.maximumStep = "1"; }, TypeError);
  }
  const custom = structuredClone(m.getBorgCertifiedBudgetPreset());
  custom.id = "custom-id"; custom.allocations.presetId = "custom-id";
  custom.allocationCanonicalJson = m.canonicalStringify(custom.allocations);
  custom.allocationHash = "1".repeat(64);
  assert.equal(m.validateBorgCertifiedBudgetPreset(custom), custom);
  assert.throws(() => m.getBorgCertifiedBudgetPreset("missing"), RangeError);
});

test("plain-ESM Budget import needs no fetch and rejects missing projection or shifted allocations", t => {
  const f = fixture(t);
  for (const file of ["BorgCertifiedBudgets.js", "BorgCertifiedBudgetIdentityContract.js"]) {
    fs.copyFileSync(path.join(root, "src/apps/borg", file), path.join(f.dir, "src/apps/borg", file));
  }
  const url = pathToFileURL(path.join(f.dir, "src/apps/borg/BorgCertifiedBudgets.js")).href;
  const code = `globalThis.fetch=()=>{throw Error('unexpected fetch')}; const m=await import(${JSON.stringify(url)}); if(m.getBorgCertifiedBudgetPreset().then) throw Error('async API');`;
  const run = () => spawnSync(process.execPath, ["--input-type=module", "-e", code], { encoding: "utf8", timeout: 10_000 });
  assert.match(run().stderr, /ERR_MODULE_NOT_FOUND/);
  buildBorgCertifiedBudgetIdentities({ rootDir: f.dir, mode: "write" });
  assert.equal(run().status, 0);
  const file = path.join(f.dir, "src/apps/borg/BorgCertifiedBudgets.js");
  fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace('maximumStep: "0.05"', 'maximumStep: "0.04"'));
  const shifted = run(); assert.notEqual(shifted.status, 0); assert.match(shifted.stderr, /applicability differs/);
});

test("repository generated budget projection is current", () => {
  assert.equal(buildBorgCertifiedBudgetIdentities().status, "current");
  execFileSync(process.execPath, ["--check", path.join(root, BUDGET_IDENTITIES_PROJECTION_PATH)], { timeout: 10_000 });
});
