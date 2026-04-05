import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";
import { buildReactionReviewCandidateFromSolverRequest } from "../src/apps/reaction/ReactionReviewImportRuntime.js";
import { buildReactionLibraryCandidateFromDocument } from "../src/apps/reaction/ReactionLibraryCandidateRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("reaction library candidate runtime builds a canonical accepted library payload from a PDG-reviewed reaction flow", () => {
  const request = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json");
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  const document = buildReactionFlowDocument({
    ...reviewCandidate.exportOverrides,
    review: {
      status: "accepted",
      acceptedAt: "2026-04-05T03:00:00.000Z",
    },
    snapshot: reviewCandidate.snapshot,
  });

  const candidate = buildReactionLibraryCandidateFromDocument(document);

  assert.equal(candidate.entry.id, "library_reaction_review_muon_decay_reaction_review");
  assert.equal(candidate.entry.title, "Reaction Review: Muon decay");
  assert.equal(candidate.entry.description, "Accepted PDG-backed solved reaction for Muon decay.");
  assert.deepEqual(candidate.entry.sourceDocumentIds, ["pdg-proposal:muon_decay"]);
  assert.equal(candidate.entry.reviewStatus, "accepted");
  assert.equal(candidate.entry.acceptedAt, "2026-04-05T03:00:00.000Z");
  assert.equal(candidate.snapshot.participants.length > 0, true);
  assert.equal(candidate.exportOverrides.reactionId, document.reactionId);
  assert.deepEqual(candidate.exportOverrides.sourceDocumentIds, document.provenance.sourceDocumentIds);
  assert.deepEqual(candidate.document, document);
});

test("reaction library candidate runtime rejects non reaction-flow documents", () => {
  assert.throws(
    () =>
      buildReactionLibraryCandidateFromDocument({
        schema: "solver-result/v1",
        resultId: "bad_input",
      }),
    /reaction-flow\/v1/
  );
});
