import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { buildReactionFlowDocument } from "../src/apps/reaction/ReactionFlowExportRuntime.js";
import { buildReactionReviewCandidateFromSolverRequest } from "../src/apps/reaction/ReactionReviewImportRuntime.js";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function isTypeMatch(value, expectedType) {
  if (expectedType === "array") {
    return Array.isArray(value);
  }
  if (expectedType === "object") {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  if (expectedType === "integer") {
    return Number.isInteger(value);
  }
  if (expectedType === "number") {
    return typeof value === "number" && Number.isFinite(value);
  }
  return typeof value === expectedType;
}

function validateAgainstSchema(value, schema, path = "$", errors = []) {
  if (!schema || typeof schema !== "object") {
    return errors;
  }

  if (Object.prototype.hasOwnProperty.call(schema, "const") && value !== schema.const) {
    errors.push(`${path}: expected constant ${JSON.stringify(schema.const)}`);
    return errors;
  }

  if (Array.isArray(schema.enum) && !schema.enum.includes(value)) {
    errors.push(`${path}: expected one of ${schema.enum.map((item) => JSON.stringify(item)).join(", ")}`);
  }

  if (schema.type) {
    const allowedTypes = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matchesType = allowedTypes.some((candidateType) => isTypeMatch(value, candidateType));
    if (!matchesType) {
      errors.push(`${path}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }

  if (typeof schema.minLength === "number" && typeof value === "string" && value.length < schema.minLength) {
    errors.push(`${path}: expected string length >= ${schema.minLength}`);
  }

  if (typeof schema.minimum === "number" && typeof value === "number" && value < schema.minimum) {
    errors.push(`${path}: expected number >= ${schema.minimum}`);
  }

  if (schema.type === "object" || (Array.isArray(schema.type) && schema.type.includes("object"))) {
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${path}: missing required property ${key}`);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(properties, key)) {
          errors.push(`${path}: unexpected property ${key}`);
        }
      }
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }
      validateAgainstSchema(value[key], childSchema, `${path}.${key}`, errors);
    }
  }

  if (schema.type === "array" || (Array.isArray(schema.type) && schema.type.includes("array"))) {
    const itemSchema = schema.items;
    if (itemSchema) {
      value.forEach((item, index) => {
        validateAgainstSchema(item, itemSchema, `${path}[${index}]`, errors);
      });
    }
  }

  return errors;
}

test("PDG solver-request review import yields a reviewable snapshot plus accepted-flow provenance", () => {
  const request = readJson("content/contracts/examples/pdg/v1/generated/muon_decay.solver-request.v1.json");
  const schema = readJson("src/contracts/reaction-flow/v1/schema.json");
  const candidate = buildReactionReviewCandidateFromSolverRequest(request);
  const document = buildReactionFlowDocument({
    ...candidate.exportOverrides,
    review: {
      status: "accepted",
      acceptedAt: "2026-04-04T10:00:00.000Z",
    },
    snapshot: candidate.snapshot,
  });

  assert.deepEqual(validateAgainstSchema(document, schema), []);
  assert.equal(candidate.reviewInput.origin.sourceKind, "pdg-ingest");
  assert.equal(candidate.reviewInput.origin.sourceDocumentId, "pdg-proposal:muon_decay");
  assert.equal(candidate.reviewInput.upstreamContext.sourceSchema, "pdg-proposal/v1");
  assert.equal(candidate.reviewInput.upstreamContext.proposalId, "muon_decay");
  assert.equal(candidate.reviewInput.upstreamContext.reviewBoundary, "reaction-review");
  assert.equal(candidate.exportOverrides.reactionId, "reaction_review_muon_decay");
  assert.equal(candidate.exportOverrides.title, "Reaction Review: Muon decay");
  assert.equal(candidate.exportOverrides.semanticTags.includes("pdg-review"), true);
  assert.equal(candidate.snapshot.participants[0].tags.includes("pdg:species:muon"), true);
  assert.equal(candidate.snapshot.participants[0].tags.includes("pdg-id:mu-"), true);
  assert.equal(candidate.snapshot.participants[1].label, "Pro Electron");
  assert.equal(candidate.snapshot.participants[2].label, "Anti Electron Neutrino");
  assert.equal(document.review.status, "accepted");
  assert.equal(document.provenance.sourceDocumentIds[0], "pdg-proposal:muon_decay");
  assert.deepEqual(document.provenance.reviewInput, {
    schema: "solver-request/v1",
    requestId: "muon_decay",
    origin: {
      sourceKind: "pdg-ingest",
      sourceDocumentId: "pdg-proposal:muon_decay",
      title: "Muon decay",
    },
    upstreamContext: request.upstreamContext,
  });
  assert.equal(document.participants[0].provenanceId, "solver-request-participant:reactant_pro_muon_1");
  assert.equal(document.participants[0].tags.includes("pdg:species:muon"), true);
});

test("reaction review import rejects non solver-request input", () => {
  assert.throws(
    () =>
      buildReactionReviewCandidateFromSolverRequest({
        schema: "pdg-proposal/v1",
        proposalId: "muon_decay",
      }),
    /solver-request\/v1/
  );
});
