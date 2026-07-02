#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const failures = [];
const requiredEndpoints = new Set([
  "POST /answers",
  "POST /answers/{manifest_id}/actions/listen",
  "POST /answers/{manifest_id}/actions/visualize",
  "POST /answers/{manifest_id}/actions/issue-draft",
  "GET /service-terms",
  "GET /service-status",
]);

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/validate-endpoint-responses.mjs --check");
}

const contract = readJson("tests/archie-service/fixtures/endpoints/endpoint-response-contracts.v1.json");
if (contract.schema !== "archie-endpoint-response-contracts/v1") {
  failures.push("endpoint response contract fixture has unexpected schema");
}

const cases = contract.endpointResponses ?? [];
const endpointsSeen = new Set(cases.map((entry) => entry.endpointId));
for (const endpoint of requiredEndpoints) {
  if (!endpointsSeen.has(endpoint)) {
    failures.push(`missing endpoint response contract for ${endpoint}`);
  }
}

for (const entry of cases) {
  validateEndpointCase(entry);
}

if (failures.length > 0) {
  console.error(`Archie endpoint-response check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Archie endpoint-response check passed: ${cases.length} endpoint response contract(s)`);

function validateEndpointCase(entry) {
  const label = entry.caseId;
  const invariants = entry.invariants ?? {};

  if (entry.requestFixture !== null && !exists(entry.requestFixture)) {
    failures.push(`${label}: request fixture missing: ${entry.requestFixture}`);
  }
  if (!exists(entry.responseFixture)) {
    failures.push(`${label}: response fixture missing: ${entry.responseFixture}`);
    return;
  }
  assertDisabledServiceSideEffects(label, invariants);

  const response = readJson(entry.responseFixture);
  if (response.schema !== entry.expectedSchema) {
    failures.push(`${label}: expected response schema ${entry.expectedSchema}, found ${response.schema}`);
    return;
  }

  if (entry.expectedSchema === "archie-answer-artifact-manifest/v1") {
    validateManifestResponse(entry, response);
  } else if (entry.expectedSchema === "archie-service-terms/v1") {
    validateServiceTermsResponse(label, response, invariants);
  } else if (entry.expectedSchema === "archie-service-status/v1") {
    validateServiceStatusResponse(label, response, invariants);
  }
}

function validateManifestResponse(entry, manifest) {
  const label = entry.caseId;
  const invariants = entry.invariants;

  if (invariants.preservesSourceContext && !manifest.sourceContext?.systemCardRoute) {
    failures.push(`${label}: manifest response must preserve sourceContext and System Card route`);
  }
  if (invariants.includesTokenReceipt && manifest.tokenReceipt?.privatePromptIncluded !== false) {
    failures.push(`${label}: manifest response must include a private-safe token receipt`);
  }
  if (invariants.includesPrivacyState && typeof manifest.privacyState?.publicMaterialIncluded !== "boolean") {
    failures.push(`${label}: manifest response must include privacy state`);
  }
  if (invariants.includesIssueMiningMetadata && manifest.issueMiningContext?.privatePromptIncluded !== false) {
    failures.push(`${label}: manifest response must include private-safe issue-mining metadata`);
  }
  if (invariants.observabilityRedacted && !["safe_ids_only", "blocked", "redacted"].includes(manifest.observabilityContext?.redactionState)) {
    failures.push(`${label}: manifest response must use redacted observability state`);
  }
  if (manifest.providerExecutionContext?.noBrowserKeys !== true) {
    failures.push(`${label}: manifest response must keep noBrowserKeys true`);
  }
  if (manifest.privacyState?.durableSaveEnabled !== false) {
    failures.push(`${label}: fixture-backed endpoint response must not enable durable saves`);
  }
  if (manifest.tokenReceipt?.autoFundApplied !== false) {
    failures.push(`${label}: fixture-backed endpoint response must not apply auto-fund`);
  }

  switch (entry.endpointId) {
    case "POST /answers":
      if (entry.responseKind !== "answer_manifest") {
        failures.push(`${label}: POST /answers must return an answer manifest fixture`);
      }
      if (manifest.answerBody?.verbatimSegments?.length < 1) {
        failures.push(`${label}: answer manifest must include verbatim display text segments`);
      }
      break;
    case "POST /answers/{manifest_id}/actions/listen":
      if (!["synced", "text_only_fallback", "refused"].includes(manifest.speechSync?.status)) {
        failures.push(`${label}: listen response must include speechSync status`);
      }
      if (manifest.speechSync.status === "synced" && !manifest.artifacts.some((artifact) => artifact.artifactType === "audio")) {
        failures.push(`${label}: synced listen response must include an audio artifact`);
      }
      break;
    case "POST /answers/{manifest_id}/actions/visualize":
      if (entry.expectedDisposition === "unavailable" && !manifest.availableActions.some((action) => action.preflightStatus === "unavailable")) {
        failures.push(`${label}: unavailable visualize response must expose an unavailable action`);
      }
      if (entry.responseKind === "manifest_refusal" && manifest.privacyState.mediaRetention !== "disabled") {
        failures.push(`${label}: manifest refusal must disable media retention`);
      }
      break;
    case "POST /answers/{manifest_id}/actions/issue-draft":
      validateIssueDraftEndpoint(label, manifest);
      break;
    default:
      break;
  }
}

function validateIssueDraftEndpoint(label, manifest) {
  if (!manifest.artifacts.some((artifact) => artifact.artifactType === "issue_draft")) {
    failures.push(`${label}: issue-draft endpoint must return an issue_draft artifact`);
  }
  const submitIssueAction = manifest.availableActions.find((action) => action.actionType === "submit_issue");
  if (!submitIssueAction) {
    failures.push(`${label}: issue-draft endpoint must include submit_issue action`);
    return;
  }
  if (submitIssueAction.preflightStatus !== "confirmation_required") {
    failures.push(`${label}: submit_issue action must require confirmation`);
  }
  if (!submitIssueAction.confirmationReasons.includes("public_visibility")) {
    failures.push(`${label}: submit_issue action must include public_visibility confirmation`);
  }
  if (!submitIssueAction.confirmationReasons.includes("external_handoff")) {
    failures.push(`${label}: submit_issue action must include external_handoff confirmation`);
  }
}

function validateServiceTermsResponse(label, response, invariants) {
  if (invariants.includesTokenReceipt || invariants.includesPrivacyState || invariants.includesIssueMiningMetadata) {
    failures.push(`${label}: service terms response must not require manifest-only fields`);
  }
  if (!response.legalTermsRoute || !response.supportRoute) {
    failures.push(`${label}: service terms response must include legal and support routes`);
  }
}

function validateServiceStatusResponse(label, response, invariants) {
  if (invariants.includesTokenReceipt || invariants.includesPrivacyState || invariants.includesIssueMiningMetadata) {
    failures.push(`${label}: service status response must not require manifest-only fields`);
  }
  if (response.privatePromptIncluded !== false) {
    failures.push(`${label}: service status response must not include private prompt text`);
  }
}

function assertDisabledServiceSideEffects(label, invariants) {
  if (invariants.validatesResponseShape !== true) {
    failures.push(`${label}: response shape validation invariant must be true`);
  }
  if (invariants.observabilityRedacted !== true) {
    failures.push(`${label}: observability redaction invariant must be true`);
  }
  if (invariants.runtimeProvidersEnabled !== false) {
    failures.push(`${label}: endpoint fixture must not enable runtime providers`);
  }
  if (invariants.publicRoutesEnabled !== false) {
    failures.push(`${label}: endpoint fixture must not enable public routes`);
  }
  if (invariants.durableStorageEnabled !== false) {
    failures.push(`${label}: endpoint fixture must not enable durable storage`);
  }
  if (invariants.paymentsEnabled !== false) {
    failures.push(`${label}: endpoint fixture must not enable payments`);
  }
}

function exists(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
