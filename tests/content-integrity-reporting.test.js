import test from "node:test";
import assert from "node:assert/strict";
import { runChecks } from "../scripts/check-content-integrity.mjs";

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
