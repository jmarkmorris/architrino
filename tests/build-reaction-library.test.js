import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

test("build-reaction-library CLI writes accepted reaction-flow docs and a summary manifest", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "reaction-library-build-test-"));
  const stdout = execFileSync(
    process.execPath,
    [
      "scripts/build-reaction-library.mjs",
      "--out-dir",
      outDir,
      "--accepted-at",
      "2026-04-05T12:00:00.000Z",
      "content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json",
      "content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.solver-request.v1.json",
    ],
    {
      cwd: new URL("..", import.meta.url),
      encoding: "utf8",
    }
  );

  const summary = readJson(path.join(outDir, "summary.json"));
  const muonDecay = readJson(path.join(outDir, "muon_decay.v1.json"));
  const chargedPion = readJson(path.join(outDir, "charged_pion_to_muon_neutrino.v1.json"));

  assert.match(stdout, /Built 2 accepted reaction library document\(s\)/);
  assert.equal(summary.schema, "reaction-library-build/v1");
  assert.equal(summary.entries.length, 2);
  assert.deepEqual(
    summary.entries.map((entry) => entry.entryId),
    ["muon_decay", "charged_pion_to_muon_neutrino"]
  );
  assert.equal(muonDecay.review.status, "accepted");
  assert.equal(muonDecay.title, "Muon decay");
  assert.equal(
    muonDecay.participants.some(
      (participant) => participant.id === "reactant_pro_muon_1" && participant.label === "Pro Muon"
    ),
    true
  );
  assert.equal(
    muonDecay.participants.some(
      (participant) =>
        participant.id === "product_pro_muon_neutrino_3" &&
        participant.label === "Pro Muon Neutrino"
    ),
    true
  );
  assert.equal(
    muonDecay.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_free_architrinos" &&
        participant.side === "intermediate" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    muonDecay.operators.some((operator) => operator.type === "dissociate"),
    true
  );
  assert.equal(
    muonDecay.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_noether_pair_1_anti_core" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    muonDecay.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_noether_pair_1_pro_core" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    muonDecay.operators.some(
      (operator) =>
        operator.type === "dissociate" &&
        operator.inputs.some((endpoint) => endpoint.participantId === "center_weak-lepton-decay_base_noether_pair_1") &&
        operator.outputs.some(
          (endpoint) => endpoint.participantId === "center_weak-lepton-decay_base_noether_pair_1_anti_core"
        ) &&
        operator.outputs.some(
          (endpoint) => endpoint.participantId === "center_weak-lepton-decay_base_noether_pair_1_pro_core"
        )
    ),
    true
  );
  assert.equal(
    muonDecay.operators.every((operator) => Array.isArray(operator.inputs) && operator.inputs.length >= 1),
    true
  );
  assert.equal(chargedPion.review.status, "accepted");
  assert.equal(chargedPion.title, "Charged pion to muon neutrino");
  assert.equal(
    chargedPion.operators.every((operator) => Array.isArray(operator.inputs) && operator.inputs.length >= 1),
    true
  );
});
