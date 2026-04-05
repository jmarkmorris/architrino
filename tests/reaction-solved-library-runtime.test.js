import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionReviewCandidateFromSolverRequest } from "../src/apps/reaction/ReactionReviewImportRuntime.js";
import { buildAcceptedReactionLibraryCandidateFromSolverArtifacts } from "../src/apps/reaction/ReactionSolvedLibraryRuntime.js";
import { solveReactionSolverRequest } from "../src/apps/reaction/ReactionSolverContractRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("solved library runtime converts PDG-backed muon decay solve output into an accepted reusable library document", () => {
  const request = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json");
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  const { result } = solveReactionSolverRequest(request);
  const candidate = buildAcceptedReactionLibraryCandidateFromSolverArtifacts({
    request,
    result,
    reviewCandidate,
    acceptedAt: "2026-04-05T12:00:00.000Z",
    entryId: "muon_decay",
    description: "Accepted PDG-backed muon decay library entry.",
  });

  assert.equal(candidate.entry.id, "muon_decay");
  assert.equal(candidate.entry.reviewStatus, "accepted");
  assert.equal(candidate.document.review.status, "accepted");
  assert.equal(candidate.document.operators.length >= 4, true);
  assert.equal(candidate.document.mappings.length >= 1, true);
  assert.equal(candidate.document.provenance.reviewInput.origin.sourceDocumentId, "pdg-proposal:muon_decay");
  assert.equal(
    candidate.document.hints.semanticTags.includes("pdg-review"),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "reactant_pro_muon_1" &&
        participant.label === "Pro Muon"
    ),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "product_pro_muon_neutrino_3" &&
        participant.label === "Pro Muon Neutrino"
    ),
    true
  );
  assert.equal(
    candidate.document.operators.some((operator) => operator.type === "dissociate"),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_noether_pair_1_anti_core" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_noether_pair_1_pro_core" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_free_architrinos" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_noether_pair_1" &&
        participant.layout?.column === "left"
    ),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "center_weak-lepton-decay_base_source_core" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    candidate.document.operators.some(
      (operator) =>
        operator.type === "dissociate" &&
        operator.inputs.some((endpoint) => endpoint.participantId === "reactant_pro_muon_1") &&
        operator.outputs.some(
          (endpoint) => endpoint.participantId === "center_weak-lepton-decay_base_free_architrinos"
        )
    ),
    true
  );
});

test("solved library runtime converts PDG-backed charged pion decay solve output into an accepted reusable library document", () => {
  const request = readJson(
    "content/contracts/examples/pdg/v1/generated/charged_pion_to_muon_neutrino.solver-request.v1.json"
  );
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  const { result } = solveReactionSolverRequest(request);
  const candidate = buildAcceptedReactionLibraryCandidateFromSolverArtifacts({
    request,
    result,
    reviewCandidate,
    acceptedAt: "2026-04-05T12:00:00.000Z",
    entryId: "charged_pion_to_muon_neutrino",
    description: "Accepted PDG-backed charged pion decay library entry.",
  });

  assert.equal(candidate.entry.id, "charged_pion_to_muon_neutrino");
  assert.equal(candidate.document.review.status, "accepted");
  assert.equal(candidate.document.operators.length >= 1, true);
  assert.equal(candidate.document.mappings.length >= 1, true);
  assert.equal(
    candidate.document.provenance.reviewInput.origin.sourceDocumentId,
    "pdg-proposal:charged_pion_to_muon_neutrino"
  );
});

test("solved library runtime preserves generated center participants and operator inputs for neutron beta decay", () => {
  const request = readJson("content/contracts/examples/pdg/v1/generated/free_neutron_beta_decay.solver-request.v1.json");
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  const { result } = solveReactionSolverRequest(request);
  const candidate = buildAcceptedReactionLibraryCandidateFromSolverArtifacts({
    request,
    result,
    reviewCandidate,
    acceptedAt: "2026-04-05T12:00:00.000Z",
    entryId: "free_neutron_beta",
    description: "Accepted PDG-backed solved free neutron beta decay library entry.",
  });

  assert.equal(candidate.entry.id, "free_neutron_beta");
  assert.equal(candidate.document.review.status, "accepted");
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id.includes("free_architrinos") &&
        participant.side === "intermediate" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.structureKey === "up_quark" &&
        participant.layout?.column === "center"
    ),
    true
  );
  assert.equal(
    candidate.document.operators.every((operator) => Array.isArray(operator.inputs) && operator.inputs.length >= 1),
    true
  );
});
