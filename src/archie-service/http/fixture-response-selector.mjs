import fs from "node:fs";
import path from "node:path";

const DEFAULT_CONTRACT_PATH = "tests/archie-service/fixtures/endpoints/endpoint-response-contracts.v1.json";
const DISABLED_SIDE_EFFECTS = [
  "runtimeProvidersEnabled",
  "publicRoutesEnabled",
  "durableStorageEnabled",
  "paymentsEnabled",
];

export function selectFixtureResponse({
  endpointId,
  requestFixture = null,
  contractPath = DEFAULT_CONTRACT_PATH,
  rootDir = process.cwd(),
} = {}) {
  if (!endpointId) {
    throw new FixtureResponseSelectionError("endpointId is required", {
      code: "missing_endpoint_id",
    });
  }

  const contract = readJson(rootDir, contractPath, "endpoint response contract");
  if (contract.schema !== "archie-endpoint-response-contracts/v1") {
    throw new FixtureResponseSelectionError("endpoint response contract has unexpected schema", {
      code: "unexpected_contract_schema",
      contractPath,
      schema: contract.schema,
    });
  }

  const matchingCases = (contract.endpointResponses ?? []).filter((entry) => entry.endpointId === endpointId);
  if (matchingCases.length === 0) {
    throw new FixtureResponseSelectionError(`No fixture response contract found for ${endpointId}`, {
      code: "unknown_endpoint",
      endpointId,
    });
  }

  const selectedCase = chooseCase(matchingCases, endpointId, requestFixture);
  assertNoRuntimeSideEffects(selectedCase);

  const response = readJson(rootDir, selectedCase.responseFixture, `${selectedCase.caseId} response fixture`);
  if (response.schema !== selectedCase.expectedSchema) {
    throw new FixtureResponseSelectionError(
      `${selectedCase.caseId} response fixture schema ${response.schema} does not match ${selectedCase.expectedSchema}`,
      {
        code: "response_schema_mismatch",
        caseId: selectedCase.caseId,
        responseFixture: selectedCase.responseFixture,
        expectedSchema: selectedCase.expectedSchema,
        actualSchema: response.schema,
      }
    );
  }

  return {
    endpointId: selectedCase.endpointId,
    caseId: selectedCase.caseId,
    responseKind: selectedCase.responseKind,
    expectedDisposition: selectedCase.expectedDisposition,
    requestFixture: selectedCase.requestFixture,
    responseFixture: selectedCase.responseFixture,
    responseSchema: selectedCase.expectedSchema,
    sideEffects: DISABLED_SIDE_EFFECTS.reduce((state, key) => {
      state[key] = selectedCase.invariants[key];
      return state;
    }, {}),
    response,
  };
}

export class FixtureResponseSelectionError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "FixtureResponseSelectionError";
    this.details = details;
  }
}

function chooseCase(matchingCases, endpointId, requestFixture) {
  if (requestFixture !== null) {
    const exactRequestCase = matchingCases.find((entry) => entry.requestFixture === requestFixture);
    if (exactRequestCase) {
      return exactRequestCase;
    }
    throw new FixtureResponseSelectionError(
      `No fixture response contract found for ${endpointId} with request fixture ${requestFixture}`,
      {
        code: "unknown_request_fixture",
        endpointId,
        requestFixture,
      }
    );
  }

  const noRequestCase = matchingCases.find((entry) => entry.requestFixture === null);
  if (noRequestCase) {
    return noRequestCase;
  }

  throw new FixtureResponseSelectionError(`Request fixture is required to select ${endpointId}`, {
    code: "ambiguous_endpoint",
    endpointId,
  });
}

function assertNoRuntimeSideEffects(entry) {
  const invariants = entry.invariants ?? {};
  if (invariants.validatesResponseShape !== true) {
    throw new FixtureResponseSelectionError(`${entry.caseId} does not require response-shape validation`, {
      code: "invalid_selector_invariant",
      caseId: entry.caseId,
      invariant: "validatesResponseShape",
    });
  }
  if (invariants.observabilityRedacted !== true) {
    throw new FixtureResponseSelectionError(`${entry.caseId} does not require observability redaction`, {
      code: "invalid_selector_invariant",
      caseId: entry.caseId,
      invariant: "observabilityRedacted",
    });
  }
  for (const key of DISABLED_SIDE_EFFECTS) {
    if (invariants[key] !== false) {
      throw new FixtureResponseSelectionError(`${entry.caseId} enables forbidden side effect ${key}`, {
        code: "side_effect_enabled",
        caseId: entry.caseId,
        invariant: key,
        value: invariants[key],
      });
    }
  }
}

function readJson(rootDir, relativePath, label) {
  const fullPath = path.join(rootDir, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new FixtureResponseSelectionError(`Missing ${label}: ${relativePath}`, {
      code: "missing_fixture",
      path: relativePath,
    });
  }
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    throw new FixtureResponseSelectionError(`Invalid JSON in ${label}: ${error.message}`, {
      code: "invalid_json",
      path: relativePath,
    });
  }
}
