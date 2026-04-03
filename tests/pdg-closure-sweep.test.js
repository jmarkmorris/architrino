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
  assert.match(stdout, /exactClosures: 2/);
  assert.match(stdout, /exactClosurePercent: 100%/);
  assert.equal(summary.source, "fixtures");
  assert.equal(summary.reactionsTested, 3);
  assert.equal(summary.analyzableReactionCount, 2);
  assert.equal(summary.reactionsNotYetAnalyzed, 1);
  assert.equal(summary.exactClosureCount, 2);
  assert.equal(summary.exactClosurePercent, 100);
  assert.equal(summary.outcomeCounts.exact, 2);
  assert.equal(summary.outcomeCounts.partial, 0);
  assert.equal(summary.outcomeCounts["no-solution"], 0);
  assert.equal(summary.outcomeCounts["unsupported-input"], 1);
  assert.deepEqual(summary.topUnsupportedParticles, [{ particle: "pi+", count: 1 }]);
  assert.equal(summary.cases.length, 3);
  assert.equal(summary.cases[0].reactantsCompact, "N");
  assert.equal(summary.cases[0].productsCompact, "P.e.av");
  assert.equal(summary.cases[1].reactantsCompact, "e2");
  assert.equal(summary.cases[1].productsCompact, "e.av.v2");
  assert.equal(summary.cases[2].reactantsCompact, "pi+");
  assert.equal(summary.cases[2].productsCompact, "ae2.v2");
  assert.match(report, /Top unsupported particles:\npi\+\t1/);
  assert.match(report, /batchId\tcaseId\tstatus\texact\tunresolved\treactants\tproducts\tunsupported\tpdgIdentifier/);
  assert.match(report, /\tfree_neutron_beta_decay\texact\texact=true\tunresolved=0\tN\tP\.e\.av\t\t/);
  assert.match(report, /\tmuon_decay\texact\texact=true\tunresolved=0\te2\te\.av\.v2\t\t/);
  assert.match(report, /\tcharged_pion_to_muon_neutrino\tunsupported-input\texact=false\tunresolved=null\tpi\+\tae2\.v2\tpi\+\t/);
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

test("pdg closure sweep can process a frozen manifest in numbered batches and advance a cursor", () => {
  const workspaceDir = new URL("..", import.meta.url);
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdg-closure-manifest-test-"));
  const manifestPath = path.join(tempDir, "manifest.json");
  const cursorPath = path.join(tempDir, "cursor.json");
  const outDirOne = path.join(tempDir, "run-1");
  const outDirTwo = path.join(tempDir, "run-2");
  const manifest = {
    schema: "pdg-live-manifest/v1",
    edition: "test",
    exportableCount: 2,
    unsupportedDiscoveryCount: 0,
    topUnsupportedParticles: [],
    entries: [
      {
        batchId: 1,
        caseId: "free_neutron_beta_decay",
        proposalId: "free_neutron_beta_decay",
        title: "Free neutron beta decay",
        lookupParticleName: "n",
        pdgIdentifier: "S017.1/2025",
        channelDescription: "n -> p e- anti-nu_e",
        branchingDisplay: "(100)",
        unsupportedParticles: [],
        proposal: JSON.parse(
          fs.readFileSync(
            new URL("../content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.proposal.v1.json", import.meta.url),
            "utf8"
          )
        ),
        solverRequest: JSON.parse(
          fs.readFileSync(
            new URL("../content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.solver-request.v1.json", import.meta.url),
            "utf8"
          )
        ),
      },
      {
        batchId: 2,
        caseId: "muon_decay",
        proposalId: "muon_decay",
        title: "Muon decay",
        lookupParticleName: "mu-",
        pdgIdentifier: "S004.1/2025",
        channelDescription: "mu- -> e- anti-nu_e nu_mu",
        branchingDisplay: "(100)",
        unsupportedParticles: [],
        proposal: JSON.parse(
          fs.readFileSync(
            new URL("../content/contracts/examples/pdg/v1/generated/muon_decay.proposal.v1.json", import.meta.url),
            "utf8"
          )
        ),
        solverRequest: JSON.parse(
          fs.readFileSync(
            new URL("../content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json", import.meta.url),
            "utf8"
          )
        ),
      },
    ],
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const stdoutOne = execFileSync(
    process.execPath,
    [
      "scripts/pdg-closure-sweep.mjs",
      "--manifest",
      manifestPath,
      "--cursor",
      cursorPath,
      "--limit",
      "1",
      "--out-dir",
      outDirOne,
    ],
    { cwd: workspaceDir, encoding: "utf8" }
  );
  const cursorAfterOne = JSON.parse(fs.readFileSync(cursorPath, "utf8"));
  const summaryOne = JSON.parse(fs.readFileSync(path.join(outDirOne, "summary.json"), "utf8"));

  assert.match(stdoutOne, /startBatchId: 1/);
  assert.match(stdoutOne, /endBatchId: 1/);
  assert.match(stdoutOne, /batchId\tcaseId\tstatus\texact\tunresolved\treactants\tproducts\tunsupported\tpdgIdentifier/);
  assert.match(stdoutOne, /1\tfree_neutron_beta_decay\texact\texact=true\tunresolved=0\tN\tP\.e\.av\t\tS017\.1\/2025/);
  assert.equal(summaryOne.reactionsTested, 1);
  assert.equal(summaryOne.exactClosureCount, 1);
  assert.equal(summaryOne.cases[0].reactantsCompact, "N");
  assert.equal(summaryOne.cases[0].productsCompact, "P.e.av");
  assert.equal(cursorAfterOne.nextBatchId, 2);
  assert.equal(cursorAfterOne.lastProcessedBatchId, 1);

  const stdoutTwo = execFileSync(
    process.execPath,
    [
      "scripts/pdg-closure-sweep.mjs",
      "--manifest",
      manifestPath,
      "--cursor",
      cursorPath,
      "--limit",
      "1",
      "--out-dir",
      outDirTwo,
    ],
    { cwd: workspaceDir, encoding: "utf8" }
  );
  const cursorAfterTwo = JSON.parse(fs.readFileSync(cursorPath, "utf8"));
  const summaryTwo = JSON.parse(fs.readFileSync(path.join(outDirTwo, "summary.json"), "utf8"));

  assert.match(stdoutTwo, /startBatchId: 2/);
  assert.match(stdoutTwo, /endBatchId: 2/);
  assert.match(stdoutTwo, /2\tmuon_decay\texact\texact=true\tunresolved=0\te2\te\.av\.v2\t\tS004\.1\/2025/);
  assert.equal(summaryTwo.reactionsTested, 1);
  assert.equal(summaryTwo.exactClosureCount, 1);
  assert.equal(summaryTwo.cases[0].batchId, 2);
  assert.equal(summaryTwo.cases[0].reactantsCompact, "e2");
  assert.equal(summaryTwo.cases[0].productsCompact, "e.av.v2");
  assert.equal(cursorAfterTwo.nextBatchId, 3);
  assert.equal(cursorAfterTwo.lastProcessedBatchId, 2);
});
