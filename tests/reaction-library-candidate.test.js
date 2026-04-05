import test from "node:test";
import assert from "node:assert/strict";

import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";
import { buildReactionLibraryCandidateFromDocument } from "../src/apps/reaction/ReactionLibraryCandidateRuntime.js";

test("reaction library candidate runtime builds a canonical accepted library payload from an accepted exact reaction flow", () => {
  const document = buildReactionFlowDocument({
    reactionId: "direct_electron_carry",
    title: "Direct Electron Carry",
    sourceDocumentIds: ["reaction_manual_direct_electron_carry"],
    review: {
      status: "accepted",
      acceptedAt: "2026-04-05T03:00:00.000Z",
    },
    snapshot: {
      participants: [
        {
          id: "reactant_electron",
          side: "reactant",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
        {
          id: "product_electron",
          side: "product",
          templateId: "electron",
          label: "Pro Electron",
          surfaceRowIndex: 0,
        },
      ],
      mappings: [
        {
          id: "map_direct_electron",
          sourceKey: "reactant_electron::electron_root",
          targetKey: "product_electron::electron_root",
          sourceRole: "reactant",
          targetRole: "product",
        },
      ],
    },
  });

  const candidate = buildReactionLibraryCandidateFromDocument(document);

  assert.equal(candidate.entry.id, `library_${document.reactionId}_manual_authoring`);
  assert.equal(candidate.entry.title, document.title);
  assert.equal(candidate.entry.description, "Accepted solved reaction-flow library entry.");
  assert.deepEqual(candidate.entry.sourceDocumentIds, document.provenance.sourceDocumentIds);
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
