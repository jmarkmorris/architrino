import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionReviewCandidateFromSolverRequest } from "../src/apps/reaction/ReactionReviewImportRuntime.js";
import { buildAcceptedReactionLibraryCandidateFromSolverArtifacts } from "../src/apps/reaction/ReactionSolvedLibraryRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

test("solved library runtime converts an exact solver fixture into an accepted reusable library document", () => {
  const request = readJson("content/contracts/examples/solver-request/carry_through_neutron.v1.json");
  const reviewCandidate = buildReactionReviewCandidateFromSolverRequest(request);
  const result = readJson("content/contracts/examples/solver-result/carry_through_neutron_result.v1.json");
  const candidate = buildAcceptedReactionLibraryCandidateFromSolverArtifacts({
    request,
    result,
    reviewCandidate,
    acceptedAt: "2026-04-05T12:00:00.000Z",
    entryId: "carry_through_neutron",
    description: "Accepted exact carry-through neutron library entry.",
  });

  assert.equal(candidate.entry.id, "carry_through_neutron");
  assert.equal(candidate.entry.reviewStatus, "accepted");
  assert.equal(candidate.document.review.status, "accepted");
  assert.equal(candidate.document.title, "Reaction Review: Exact Carry-Through Neutron");
  assert.equal(candidate.document.review.acceptedAt, "2026-04-05T12:00:00.000Z");
  assert.equal(candidate.document.operators.length, 0);
  assert.equal(candidate.document.mappings.length >= 1, true);
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "reactant_neutron_1" &&
        participant.label === "Neutron"
    ),
    true
  );
  assert.equal(
    candidate.document.participants.some(
      (participant) =>
        participant.id === "product_neutron_1" &&
        participant.label === "Neutron"
    ),
    true
  );
  assert.equal(candidate.document.provenance.reviewInput.requestId, request.requestId);
});

test("solved library runtime rejects non-exact solver results", () => {
  assert.throws(
    () =>
      buildAcceptedReactionLibraryCandidateFromSolverArtifacts({
        request: {},
        result: {
          summary: {
            exact: false,
          },
          diagnostics: [
            {
              code: "connector-required-open",
              severity: "error",
              message: "Open connector.",
            },
          ],
        },
      }),
    /exact solver result/
  );
});
