#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const gatewayPath = "tests/archie-service/fixtures/provider-registry/provider-gateway-contracts.v1.json";
const sandboxPath = "tests/archie-service/fixtures/provider-registry/provider-sandbox-contracts.v1.json";
const registryPath = "tests/archie-service/fixtures/provider-registry/provider-registry.v1.json";
const termsPath = "tests/archie-service/fixtures/terms/service-terms.v1.json";
const failures = [];

const requiredCaseIds = new Set([
  "gateway-answer-text-001",
  "gateway-speech-high-quality-001",
  "gateway-image-policy-001",
  "gateway-moderation-001",
  "gateway-retrieval-embedding-001",
  "gateway-rerank-001",
]);

const expectedRequestClasses = new Map([
  ["answer_text", "source_grounded_answer"],
  ["speech_output", "speech_sync_output"],
  ["image_generation", "generated_image_request"],
  ["moderation", "public_media_moderation"],
  ["retrieval_embedding", "retrieval_embedding_support"],
  ["rerank", "rerank_candidates"],
]);

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/validate-provider-gateway.mjs --check");
}

const gateway = readJson(gatewayPath);
const sandbox = readJson(sandboxPath);
const registry = readJson(registryPath);
const terms = readJson(termsPath);

validateContractRoot(gateway, sandbox, registry, terms);

const capabilitiesById = new Map((registry.capabilities ?? []).map((entry) => [entry.capabilityId, entry]));
const sandboxCasesById = new Map((sandbox.providerSandboxCases ?? []).map((entry) => [entry.caseId, entry]));
const gatewayCasesById = new Map((gateway.providerGatewayCases ?? []).map((entry) => [entry.caseId, entry]));
const seenRequestClasses = new Set();

for (const caseId of requiredCaseIds) {
  if (!gatewayCasesById.has(caseId)) {
    failures.push(`missing provider gateway case ${caseId}`);
  }
}

for (const entry of gateway.providerGatewayCases ?? []) {
  validateGatewayCase(entry, capabilitiesById, sandboxCasesById, terms, seenRequestClasses);
}

if (failures.length > 0) {
  console.error(`Archie provider-gateway check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie provider-gateway check passed: ${gateway.providerGatewayCases.length} gateway case(s), runtime provider calls disabled`
);

function validateContractRoot(gateway, sandbox, registry, terms) {
  if (gateway.schema !== "archie-provider-gateway-contracts/v1") {
    failures.push("provider gateway contract has unexpected schema");
  }
  if (sandbox.schema !== "archie-provider-sandbox-contracts/v1") {
    failures.push("provider sandbox contract has unexpected schema");
  }
  if (registry.schema !== "archie-provider-capability-registry/v1") {
    failures.push("provider registry has unexpected schema");
  }
  if (gateway.registryId !== registry.registryId) {
    failures.push(`provider gateway registry ${gateway.registryId} does not match ${registry.registryId}`);
  }
  if (gateway.providerSandboxContractId !== sandbox.contractId) {
    failures.push(
      `provider gateway sandbox contract ${gateway.providerSandboxContractId} does not match ${sandbox.contractId}`
    );
  }
  if (gateway.environment !== registry.environment || gateway.environment !== sandbox.environment) {
    failures.push("provider gateway environment must match registry and sandbox fixture environment");
  }
  if (gateway.termsVersionSetId !== terms.versionSetId || gateway.termsVersionSetId !== sandbox.termsVersionSetId) {
    failures.push("provider gateway terms version must match sandbox and service terms fixture");
  }
}

function validateGatewayCase(entry, capabilitiesById, sandboxCasesById, terms, seenRequestClasses) {
  const label = entry.caseId;
  const capability = capabilitiesById.get(entry.capabilityId);
  if (!capability) {
    failures.push(`${label}: missing provider registry capability ${entry.capabilityId}`);
    return;
  }
  const sandboxCase = sandboxCasesById.get(entry.sandboxCaseId);
  if (!sandboxCase) {
    failures.push(`${label}: missing provider sandbox case ${entry.sandboxCaseId}`);
    return;
  }

  compareField(label, "capabilityId", entry.capabilityId, sandboxCase.capabilityId);
  compareField(label, "requestClass", entry.requestClass, expectedRequestClasses.get(sandboxCase.capabilityType));
  compareField(label, "privacyState", entry.privacyState, sandboxCase.privacyState);
  compareField(label, "termsState", entry.termsState, sandboxCase.termsState);
  compareField(label, "fallbackManifestFixture", entry.fallbackManifestFixture, sandboxCase.fallbackManifestFixture);
  compareArray(label, "tokenWorkUnits", entry.tokenWorkUnits, sandboxCase.tokenWorkUnits);

  if (seenRequestClasses.has(entry.requestClass)) {
    failures.push(`${label}: duplicate provider gateway request class ${entry.requestClass}`);
  }
  seenRequestClasses.add(entry.requestClass);

  if (capability.noBrowserKeys !== true || entry.safeProviderExecutionContext.noBrowserKeys !== true) {
    failures.push(`${label}: gateway execution context must preserve noBrowserKeys`);
  }
  if (!entry.safeProviderExecutionContext.capabilityIds.includes(entry.capabilityId)) {
    failures.push(`${label}: safe provider execution context must include the selected capability`);
  }
  if (entry.safeProviderExecutionContext.credentialBoundary !== capability.credentialBoundary) {
    failures.push(`${label}: gateway credential boundary must match provider registry`);
  }
  if (entry.safeProviderExecutionContext.adapterMode !== "no_call_fixture_adapter") {
    failures.push(`${label}: gateway must use the no-call fixture adapter`);
  }
  if (entry.runtimeProviderCallAllowed !== false) {
    failures.push(`${label}: runtime provider calls must stay disabled`);
  }
  if (entry.publicEnabled !== false || sandboxCase.publicEnabled !== false) {
    failures.push(`${label}: provider gateway must not enable public provider capability`);
  }
  if (entry.browserKeyAllowed !== false || sandboxCase.browserKeysAllowed !== false) {
    failures.push(`${label}: provider gateway must not allow browser model keys`);
  }
  if (entry.providerPayloadAllowed !== false || sandboxCase.providerPayloadAllowed !== false) {
    failures.push(`${label}: provider gateway must not expose provider payloads`);
  }
  if (entry.privatePromptAllowed !== false || sandboxCase.privatePromptAllowed !== false) {
    failures.push(`${label}: provider gateway must not allow private prompt expansion`);
  }
  if (entry.sourceAuthorityEffect !== "none" || sandboxCase.sourceAuthorityEffect !== "none") {
    failures.push(`${label}: provider gateway must not affect source authority`);
  }
  if (sandboxCase.runtimeProvidersEnabled !== false) {
    failures.push(`${label}: sandbox case must not enable runtime providers`);
  }
  validateTermsState(label, entry, terms);
  validateFallbackManifest(label, entry.fallbackManifestFixture);
  validateResponseFixture(label, entry);
  validateCapabilitySpecificPolicy(label, entry, sandboxCase);
}

function validateTermsState(label, entry, terms) {
  if (entry.termsState === "fixture_terms_current") {
    if (!terms.serviceTermsVersion || !terms.privacyNoticeVersion || !terms.tokenSubscriptionTermsVersion) {
      failures.push(`${label}: current terms state requires service, privacy, and token terms`);
    }
  }
  if (entry.termsState === "blocked_until_media_terms" && !terms.generatedMediaTermsVersion) {
    failures.push(`${label}: media terms blocker requires generated media terms version`);
  }
}

function validateResponseFixture(label, entry) {
  if (entry.expectedGatewayDisposition === "fixture_safe_context") {
    if (entry.responseFixture !== null || entry.fallbackManifestFixture !== null) {
      failures.push(`${label}: safe-context-only gateway cases must not return manifests`);
    }
    return;
  }

  if (entry.expectedGatewayDisposition === "declared_fallback" && entry.responseFixture !== entry.fallbackManifestFixture) {
    failures.push(`${label}: declared-fallback gateway cases must return their declared fallback fixture`);
  }

  if (entry.responseFixture === null) {
    if (entry.expectedGatewayDisposition === "fixture_manifest_context") {
      failures.push(`${label}: fixture manifest context requires a response fixture`);
    }
    return;
  }

  if (!exists(entry.responseFixture)) {
    failures.push(`${label}: response fixture missing: ${entry.responseFixture}`);
    return;
  }
  const manifest = readJson(entry.responseFixture);
  validateSafeManifest(label, entry.responseFixture, manifest);

  if (entry.expectedGatewayDisposition === "fixture_manifest_context") {
    const capabilityIds = manifest.providerExecutionContext?.capabilityIds ?? [];
    if (!capabilityIds.includes(entry.capabilityId)) {
      failures.push(`${label}: response manifest must inherit the gateway capability`);
    }
  }
}

function validateFallbackManifest(label, fallbackManifestFixture) {
  if (fallbackManifestFixture === null) {
    return;
  }
  if (!exists(fallbackManifestFixture)) {
    failures.push(`${label}: fallback manifest fixture missing: ${fallbackManifestFixture}`);
    return;
  }
  const manifest = readJson(fallbackManifestFixture);
  validateSafeManifest(label, fallbackManifestFixture, manifest);
}

function validateSafeManifest(label, fixturePath, manifest) {
  if (manifest.schema !== "archie-answer-artifact-manifest/v1") {
    failures.push(`${label}: ${fixturePath} must be an Answer Artifact Manifest`);
    return;
  }
  if (manifest.providerExecutionContext?.noBrowserKeys !== true) {
    failures.push(`${label}: ${fixturePath} must preserve noBrowserKeys`);
  }
  if (manifest.tokenReceipt?.privatePromptIncluded !== false) {
    failures.push(`${label}: ${fixturePath} token receipt must not include private prompt text`);
  }
  if (manifest.issueMiningContext?.privatePromptIncluded !== false) {
    failures.push(`${label}: ${fixturePath} issue-mining context must not include private prompt text`);
  }
  if (manifest.privacyState?.durableSaveEnabled !== false) {
    failures.push(`${label}: ${fixturePath} must not enable durable saves`);
  }
}

function validateCapabilitySpecificPolicy(label, entry, sandboxCase) {
  if (sandboxCase.capabilityType === "answer_text" && entry.expectedGatewayDisposition !== "fixture_manifest_context") {
    failures.push(`${label}: answer text must return a fixture manifest context in the gateway fixture`);
  }
  if (sandboxCase.capabilityType === "speech_output") {
    if (entry.expectedGatewayDisposition !== "fixture_manifest_context") {
      failures.push(`${label}: speech output must return a fixture manifest context in the gateway fixture`);
    }
    if (!entry.tokenWorkUnits.includes("high_quality_speech")) {
      failures.push(`${label}: speech output must map to high_quality_speech work`);
    }
  }
  if (sandboxCase.capabilityType === "image_generation") {
    if (entry.expectedGatewayDisposition !== "declared_fallback") {
      failures.push(`${label}: generated image requests must stay on declared fallback`);
    }
    if (sandboxCase.expectedEnabledState !== "disabled" || sandboxCase.expectedHealthState !== "policy_blocked") {
      failures.push(`${label}: generated image sandbox case must remain disabled and policy-blocked`);
    }
  }
  if (sandboxCase.capabilityType === "moderation" && entry.expectedGatewayDisposition !== "declared_fallback") {
    failures.push(`${label}: public media moderation must stay on declared fallback until media routes are live`);
  }
  if (sandboxCase.capabilityType === "retrieval_embedding" && entry.expectedGatewayDisposition !== "fixture_safe_context") {
    failures.push(`${label}: retrieval embedding must only return safe internal context`);
  }
  if (sandboxCase.capabilityType === "rerank" && entry.expectedGatewayDisposition !== "fixture_safe_context") {
    failures.push(`${label}: rerank must only return safe internal context`);
  }
}

function compareField(label, field, actual, expected) {
  if (actual !== expected) {
    failures.push(`${label}: ${field} ${actual} does not match expected ${expected}`);
  }
}

function compareArray(label, field, actual, expected) {
  if (!Array.isArray(actual) || !Array.isArray(expected) || actual.length !== expected.length) {
    failures.push(`${label}: ${field} length does not match expected`);
    return;
  }
  for (const [index, value] of actual.entries()) {
    if (value !== expected[index]) {
      failures.push(`${label}: ${field}[${index}] ${value} does not match expected ${expected[index]}`);
    }
  }
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function exists(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
