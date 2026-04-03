import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

test("pdg closure sweep writes a /tmp-style run report and summary for fixture cases", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdg-closure-sweep-test-"));
  const stdout = execFileSync(process.execPath, ["scripts/pdg-closure-sweep.mjs", "--source", "fixtures", "--out-dir", outDir], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  const summary = JSON.parse(fs.readFileSync(path.join(outDir, "summary.json"), "utf8"));
  const report = fs.readFileSync(path.join(outDir, "report.txt"), "utf8");

  assert.match(stdout, /PDG closure sweep/);
  assert.match(stdout, /reactionsTested: 3/);
  assert.match(stdout, /analyzableReactions: 2/);
  assert.match(stdout, /reactionsNotYetAnalyzed: 1/);
  assert.match(stdout, /exactClosurePercent: 0%/);
  assert.equal(summary.source, "fixtures");
  assert.equal(summary.reactionsTested, 3);
  assert.equal(summary.analyzableReactionCount, 2);
  assert.equal(summary.reactionsNotYetAnalyzed, 1);
  assert.equal(summary.exactClosureCount, 0);
  assert.equal(summary.exactClosurePercent, 0);
  assert.equal(summary.outcomeCounts.partial, 1);
  assert.equal(summary.outcomeCounts["no-solution"], 1);
  assert.equal(summary.outcomeCounts["unsupported-input"], 1);
  assert.deepEqual(summary.topUnsupportedParticles, [{ particle: "pi+", count: 1 }]);
  assert.equal(summary.cases.length, 3);
  assert.match(report, /Top unsupported particles:\npi\+\t1/);
  assert.match(report, /charged_pion_to_muon_neutrino\s+unsupported-input/);
  assert.equal(fs.existsSync(path.join(outDir, "run.log")), true);
  assert.equal(
    fs.existsSync(
      path.join(outDir, "free_neutron_beta_decay", "free_neutron_beta_decay.solver-result.v1.json")
    ),
    true
  );
  assert.equal(
    fs.existsSync(path.join(outDir, "charged_pion_to_muon_neutrino", "charged_pion_to_muon_neutrino.proposal.v1.json")),
    true
  );
});
