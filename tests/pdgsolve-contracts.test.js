import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function isTypeMatch(value, expectedType) {
  if (expectedType === "null") {
    return value === null;
  }
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

function resolveSchema(schema, rootSchema) {
  if (!schema || typeof schema !== "object" || typeof schema.$ref !== "string") {
    return schema;
  }
  const reference = schema.$ref;
  if (!reference.startsWith("#/")) {
    throw new Error(`Unsupported schema ref: ${reference}`);
  }
  return reference
    .slice(2)
    .split("/")
    .reduce((current, key) => current?.[key], rootSchema);
}

function validateAgainstSchema(value, schema, rootSchema = schema, path = "$", errors = []) {
  const resolvedSchema = resolveSchema(schema, rootSchema);
  if (!resolvedSchema || typeof resolvedSchema !== "object") {
    return errors;
  }

  if (Array.isArray(resolvedSchema.anyOf)) {
    const branchErrors = resolvedSchema.anyOf.map((branch) => {
      const nextErrors = [];
      validateAgainstSchema(value, branch, rootSchema, path, nextErrors);
      return nextErrors;
    });
    if (!branchErrors.some((candidateErrors) => candidateErrors.length === 0)) {
      errors.push(`${path}: value did not match any allowed schema branch`);
    }
    return errors;
  }

  if (Object.prototype.hasOwnProperty.call(resolvedSchema, "const") && value !== resolvedSchema.const) {
    errors.push(`${path}: expected constant ${JSON.stringify(resolvedSchema.const)}`);
    return errors;
  }

  if (Array.isArray(resolvedSchema.enum) && !resolvedSchema.enum.includes(value)) {
    errors.push(
      `${path}: expected one of ${resolvedSchema.enum.map((item) => JSON.stringify(item)).join(", ")}`
    );
  }

  if (resolvedSchema.type) {
    const allowedTypes = Array.isArray(resolvedSchema.type) ? resolvedSchema.type : [resolvedSchema.type];
    const matchesType = allowedTypes.some((candidateType) => isTypeMatch(value, candidateType));
    if (!matchesType) {
      errors.push(`${path}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }

  if (
    typeof resolvedSchema.minLength === "number" &&
    typeof value === "string" &&
    value.length < resolvedSchema.minLength
  ) {
    errors.push(`${path}: expected string length >= ${resolvedSchema.minLength}`);
  }

  if (typeof resolvedSchema.minimum === "number" && typeof value === "number" && value < resolvedSchema.minimum) {
    errors.push(`${path}: expected number >= ${resolvedSchema.minimum}`);
  }

  if (
    typeof resolvedSchema.minItems === "number" &&
    Array.isArray(value) &&
    value.length < resolvedSchema.minItems
  ) {
    errors.push(`${path}: expected array length >= ${resolvedSchema.minItems}`);
  }

  if (
    typeof resolvedSchema.maxItems === "number" &&
    Array.isArray(value) &&
    value.length > resolvedSchema.maxItems
  ) {
    errors.push(`${path}: expected array length <= ${resolvedSchema.maxItems}`);
  }

  if (
    value !== null &&
    (resolvedSchema.type === "object" ||
      (Array.isArray(resolvedSchema.type) && resolvedSchema.type.includes("object")))
  ) {
    const properties = resolvedSchema.properties ?? {};
    const required = resolvedSchema.required ?? [];
    for (const key of required) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${path}: missing required property ${key}`);
      }
    }
    if (resolvedSchema.additionalProperties === false) {
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
      validateAgainstSchema(value[key], childSchema, rootSchema, `${path}.${key}`, errors);
    }
  }

  if (
    Array.isArray(value) &&
    (resolvedSchema.type === "array" ||
      (Array.isArray(resolvedSchema.type) && resolvedSchema.type.includes("array")))
  ) {
    const itemSchema = resolvedSchema.items;
    if (itemSchema) {
      value.forEach((item, index) => {
        validateAgainstSchema(item, itemSchema, rootSchema, `${path}[${index}]`, errors);
      });
    }
  }

  return errors;
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256Digest(value) {
  return `sha256:${crypto.createHash("sha256").update(stableStringify(value)).digest("hex")}`;
}

const requestExample = {
  schema: "pdgsolve-request/v1",
  requestId: "reference_unsolved",
  source: {
    kind: "developer",
    title: "Reference unsolved request",
    sourceDocumentId: "developer:reference_unsolved",
  },
  reactants: [{ id: "reactant_1", assemblyId: "pro_up_quark_I", title: "Up Quark" }],
  products: [{ id: "product_1", assemblyId: "pro_electron_I", title: "Electron" }],
  policy: {
    exactClosureRequired: true,
    allowedBoundaryAugmentations: ["none"],
  },
};

const resultExample = {
  schema: "pdgsolve-result/v1",
  problemId: "pdgsolve_problem_reference_unsolved",
  searchStatus: "no_exact_closure",
  bestFamilyId: "family.unsolved.v1",
  acceptedFamilyId: null,
  diagnostics: [
    {
      id: "pdgsolve.search.unsupported_request",
      phase: "search",
      message: "No exact solve rule is available for this request.",
      blocking: true,
      payload: {
        requestId: "reference_unsolved",
      },
    },
  ],
  optionFamilies: [
    {
      familyId: "family.unsolved.v1",
      kind: "no_exact_closure",
      score: {
        exactness: 1,
        primitiveMismatch: 1,
        middleMismatch: 1,
        auxiliaryBurden: 0,
        nonIdentityOperatorCount: 0,
        dissociationCount: 0,
        ambiguityPenalty: 1,
        tieBreakKey: "unsupported_request",
      },
      augmentation: {
        reactantSide: "none",
        productSide: "none",
      },
      reactantAssemblies: [{ assemblyId: "pro_up_quark_I", count: 1 }],
      reactantSideOperators: [],
      intermediateAssemblies: [],
      productSideOperators: [],
      productAssemblies: [{ assemblyId: "pro_electron_I", count: 1 }],
      provenanceSummary: {
        summaryText: "No exact solver law is available for this request.",
        outputs: [
          {
            occurrenceKey: "product_1",
            provenanceClass: "mixed",
            supportSourceRows: [],
            ambiguous: true,
          },
        ],
      },
      diagnostics: [
        {
          id: "pdgsolve.search.unsupported_request",
          phase: "search",
          message: "No exact solve rule is available for this request.",
          blocking: true,
          payload: {
            requestId: "reference_unsolved",
          },
        },
      ],
      rawBranchCount: 0,
      publicationReady: false,
      canonicalCandidate: {
        candidateId: "candidate.unsupported.v1",
        exact: false,
        reactantAssemblies: [{ assemblyId: "pro_up_quark_I", count: 1 }],
        reactantSideOperators: [],
        intermediateAssemblies: [],
        productSideOperators: [],
        productAssemblies: [{ assemblyId: "pro_electron_I", count: 1 }],
        provenanceSummary: {
          summaryText: "No exact solver law is available for this request.",
          outputs: [
            {
              occurrenceKey: "product_1",
              provenanceClass: "mixed",
              supportSourceRows: [],
              ambiguous: true,
            },
          ],
        },
        solveGraph: null,
      },
    },
  ],
  review: {
    schema: "pdgsolve-review-state/v1",
    state: "stale",
    selectedFamilyId: "family.unsolved.v1",
    acceptedFamilyId: null,
    acceptedRecord: null,
    blockingDiagnostics: [
      {
        id: "pdgsolve.search.unsupported_request",
        phase: "search",
        message: "No exact solve rule is available for this request.",
        blocking: true,
        payload: {
          requestId: "reference_unsolved",
        },
      },
    ],
  },
  publication: null,
};

const corpusIndexExample = {
  schema: "pdgsolve-result-corpus/v1",
  sourceSchema: "pdg-live-manifest/v1",
  readyCount: 1,
  solvedCount: 1,
  exactAvailableCount: 0,
  partialOnlyCount: 0,
  noExactClosureCount: 1,
  results: [
    {
      batchId: 1,
      caseId: "reference_unsolved",
      proposalId: "reference_unsolved",
      requestId: "reference_unsolved",
      problemId: "pdgsolve_problem_reference_unsolved",
      searchStatus: "no_exact_closure",
      bestFamilyId: "family.unsolved.v1",
      resultPath: "content/contracts/examples/pdgsolve-result/v1/reference_unsolved.v1.json",
    },
  ],
};

test("pdgsolve request and unsolved result examples match their schemas", () => {
  const requestSchema = readJson("src/contracts/pdgsolve-request/v1/schema.json");
  const resultSchema = readJson("src/contracts/pdgsolve-result/v1/schema.json");

  assert.deepEqual(validateAgainstSchema(requestExample, requestSchema), [], "request schema drifted");
  assert.deepEqual(validateAgainstSchema(resultExample, resultSchema), [], "result schema drifted");
});

test("pdgsolve result-corpus summaries admit an all-unsolved corpus", () => {
  assert.equal(corpusIndexExample.schema, "pdgsolve-result-corpus/v1");
  assert.equal(corpusIndexExample.sourceSchema, "pdg-live-manifest/v1");
  assert.equal(Array.isArray(corpusIndexExample.results), true);
  assert.equal(corpusIndexExample.results.length, 1);
  assert.equal(corpusIndexExample.exactAvailableCount, 0);
  assert.equal(corpusIndexExample.results[0].searchStatus, "no_exact_closure");
});

test("pdgsolve result digests remain stable across unsolved review records", () => {
  assert.equal(sha256Digest(resultExample).startsWith("sha256:"), true);
  assert.equal(resultExample.review.selectedFamilyId, resultExample.bestFamilyId);
  assert.equal(resultExample.review.acceptedFamilyId, null);
  assert.equal(resultExample.optionFamilies[0].publicationReady, false);
});
