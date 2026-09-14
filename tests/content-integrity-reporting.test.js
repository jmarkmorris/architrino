import test from "node:test";
import assert from "node:assert/strict";
import { runChecks, selectedChecks } from "../scripts/check-content-integrity.mjs";

test("local publication adds the Pages build performed separately on GitHub", () => {
  const github = selectedChecks({}, "github");
  const local = selectedChecks({});
  assert.deepEqual(local.slice(0, -1), github);
  assert.deepEqual(local.at(-1).args, ["scripts/check-pages-build.mjs"]);
  assert.throws(() => selectedChecks({}, "unknown"), /Unknown validation profile/);
});

test("old environment switches cannot enroll diagnostics in publication", () => {
  assert.deepEqual(selectedChecks({ AAA_CONTENT_MAINTENANCE: "run", AAA_TEST_SWEEP: "run" }), selectedChecks({}));
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

test("startup failure stops subsequent checks", () => {
  const { report } = scenario([check("unstartable"), check("later")], [{ error: new Error("ENOENT") }]);
  assert.equal(report.exitCode, 1);
  assert.equal(report.failures.length, 1);
  assert.deepEqual(report.unexecuted, ["later"]);
});

test("signal termination is a failure with its signal preserved", () => {
  const { report } = scenario([check("signal")], [{ status: null, signal: "SIGTERM" }]);
  assert.equal(report.exitCode, 1);
  assert.equal(report.failures[0].detail, "signal SIGTERM");
});
