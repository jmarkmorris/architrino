import test from "node:test";
import assert from "node:assert/strict";
import { runChecks, selectedChecks, MAC_DEPENDENT_TESTS } from "../scripts/check-content-integrity.mjs";
import optionBSelection from "../reference/priorities/development-process-review/contracts/option-b-five-profile-selection.json" with { type: "json" };

test("GitHub assigns exactly two Python tests locally without weakening the local gate", () => {
  const pattern = new RegExp(MAC_DEPENDENT_TESTS);
  assert.ok(pattern.test("current Python handoff retains real runtime inventory with external admission and no scientific data"));
  assert.ok(pattern.test("Python admission rejects wrong Node capability, omitted census and same-byte Node replacement"));
  assert.equal(pattern.test("captured file worker admits known build metadata, then rejects omitted map and substituted gates"), false);
  const local = selectedChecks({ GITHUB_ACTIONS: "true" });
  const github = selectedChecks({}, "github");
  assert.equal(local.length, github.length);
  assert.equal(local.filter(c => c.args.some(a => a.startsWith("--test-skip-pattern"))).length, 0);
  assert.equal(github.filter(c => c.args.some(a => a.startsWith("--test-skip-pattern"))).length, 1);
  for (const [i, check] of local.entries()) {
    assert.deepEqual(github[i].args.filter(a => !a.startsWith("--test-skip-pattern")), check.args);
  }
  assert.throws(() => selectedChecks({}, "unknown"), /Unknown validation profile/);
});

test("default gate excludes opt-in maintenance checks", () => {
  const required = selectedChecks({});
  const maintenance = selectedChecks({ AAA_CONTENT_MAINTENANCE: "run" });
  assert.ok(required.length < maintenance.length);
  assert.ok(required.every(({ name }) => !name.includes("Borg registry")));
  assert.ok(maintenance.some(({ name }) => name.includes("Borg registry")));
});

test("all remaining Option B admission and finite-disposition controls are required", () => {
  const checks = selectedChecks({});
  const admission = checks.find(row => row.name === "Test Option B current-source admission and dependency controls");
  assert.ok(admission && !admission.reporting && !admission.skipWhen);
  assert.ok(admission.args.includes("tests/option-b-root-cover-admission.test.mjs"));
  assert.ok(admission.args.includes("tests/option-b-next-test-identities.test.mjs"));
  assert.equal(selectedChecks({ AAA_CONTENT_MAINTENANCE: "run" }).some(row=>row.args.includes("tests/current-launch-bindings.test.js")),false);
  for (const file of ["tests/option-b-f5-admission.test.mjs", "tests/option-b-f5-evolution-admission.test.mjs", "tests/option-b-f5-budget-transition.test.mjs", "tests/option-b-circular-admission.test.mjs", "tests/option-b-current-source-transition.test.mjs", "tests/option-b-disposition-coverage.test.mjs"]) assert.ok(admission.args.includes(file), file);
  assert.equal(admission.args.includes("tests/option-b-operational-successor.test.mjs"), false);
  const selectedB = checks.find(row => row.args[0] === "scripts/equation-mapping/check-current-source-maps.mjs");
  assert.ok(selectedB && !selectedB.reporting && !selectedB.skipWhen);
  assert.deepEqual(selectedB.args.slice(1), ["--accepted-baseline", optionBSelection.acceptedBaseline, "--accepted-baseline-sha256", optionBSelection.acceptedBaselineSha256, "--transition", optionBSelection.transition, "--transition-sha256", optionBSelection.transitionSha256]);
  const census = checks.find(row => row.args[0] === "scripts/equation-mapping/check-current-source-dispositions.mjs");
  assert.ok(census && !census.reporting && !census.skipWhen);
  const runtime = checks.find(row => row.name === "Test generated runtime storage and deployment contracts");
  assert.ok(runtime && !runtime.reporting && !runtime.skipWhen);
  for (const file of ["tests/borg-assembly-record-catalog-generator.test.js", "tests/borg-assembly-record-catalog.test.js", "tests/borg-certified-budget-identities.test.js", "tests/borg-eom-migration.test.js", "tests/analytical-campaign-pipeline-benchmark.test.js", "tests/braid-taxonomy-terminology.test.js"]) assert.ok(runtime.args.includes(file), file);
});

function scenario(checks, results) {
  const output = [], invoked = [];
  const report = runChecks({ checks, log: line => output.push(line), error: line => output.push(line),
    execute: (_command, args, options) => {
      invoked.push(args);
      assert.equal(options.env.GIT_INDEX_FILE, undefined);
      assert.ok(results.length, "unexpected check execution");
      return results.shift();
    } });
  assert.equal(results.length, 0, "expected check was not executed");
  return { report, output: output.join("\n"), invoked };
}
const check = (name, extra = {}) => ({ name, args: [name], ...extra });

test("passing required checks do not imply that skipped coverage ran", () => {
  const { report, output, invoked } = scenario([check("required"), check("sweep", { reporting: true, skipWhen: () => true, skipReason: "not requested" })], [{ status: 0 }]);
  assert.equal(report.exitCode, 0);
  assert.deepEqual(invoked, [["required"]]);
  assert.match(output, /1 required passed, 0 required failed, 0 reporting-only failed, 1 skipped, 0 not reached/);
  assert.doesNotMatch(output, /all checks passed/);
});

test("reporting failure remains visible with successful required checks", () => {
  const { report, output } = scenario([check("required"), check("diagnostic", { reporting: true })], [{ status: 0 }, { status: 3 }]);
  assert.equal(report.exitCode, 0);
  assert.equal(report.reportingFailures.length, 1);
  assert.match(output, /required checks passed; .*1 reporting-only failed/);
});

test("independent failures accumulate without guessing a root cause", () => {
  const { report, output } = scenario([check("a"), check("b"), check("c")], [{ status: 2 }, { status: 0 }, { status: 4 }]);
  assert.equal(report.exitCode, 1);
  assert.equal(report.failures.length, 2);
  assert.equal(report.passed.length, 1);
  assert.doesNotMatch(output, /likeliest root/);
});

test("failed prerequisite preserves its exit code and names unexecuted dependents", () => {
  const { report, output, invoked } = scenario([check("prepare", { halts: true }), check("dependent")], [{ status: 7 }]);
  assert.equal(report.exitCode, 7);
  assert.deepEqual(report.unexecuted, ["dependent"]);
  assert.deepEqual(invoked, [["prepare"]]);
  assert.match(output, /1 not reached/);
});

test("startup failure is gating even for a reporting-only command", () => {
  const { report } = scenario([check("unstartable", { reporting: true }), check("later")], [{ error: new Error("ENOENT") }]);
  assert.equal(report.exitCode, 1);
  assert.equal(report.failures.length, 1);
  assert.deepEqual(report.unexecuted, ["later"]);
});

test("signal termination is a failure with its signal preserved", () => {
  const { report } = scenario([check("signal")], [{ status: null, signal: "SIGTERM" }]);
  assert.equal(report.exitCode, 1);
  assert.equal(report.failures[0].detail, "signal SIGTERM");
});
