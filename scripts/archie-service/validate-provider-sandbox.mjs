#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const contractPath = "tests/archie-service/fixtures/provider-registry/provider-sandbox-contracts.v1.json";
const registryPath = "tests/archie-service/fixtures/provider-registry/provider-registry.v1.json";
const termsPath = "tests/archie-service/fixtures/terms/service-terms.v1.json";
const failures = [];

const requiredCaseIds = new Set([
  "provider-answer-text-001",
  "provider-speech-high-quality-001",
  "provider-image-policy-001",
  "provider-moderation-001",
  "provider-retrieval-embedding-001",
  "provider-rerank-001",
]);

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/validate-provider-sandbox.mjs --check");
}

const contract = readJson(contractPath);
const registry = readJson(registryPath);
const terms = readJson(termsPath);

validateContractRoot(contract, registry, terms);

const capabilitiesById = new Map((registry.capabilities ?? []).map((entry) => [entry.capabilityId, entry]));
const casesById = new Map((contract.providerSandboxCases ?? []).map((entry) => [entry.caseId, entry]));

for (const caseId of requiredCaseIds) {
  if (!casesById.has(caseId)) {
    failures.push(`missing provider sandbox case ${caseId}`);
  }
}

for (const entry of contract.providerSandboxCases ?? []) {
  validateSandboxCase(entry, capabilitiesById, terms);
}

if (failures.length > 0) {
  console.error(`Archie provider-sandbox check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie provider-sandbox check passed: ${contract.providerSandboxCases.length} capability gate(s), runtime providers disabled`
);

function validateContractRoot(contract, registry, terms) {
  if (contract.schema !== "archie-provider-sandbox-contracts/v1") {
    failures.push("provider sandbox contract has unexpected schema");
  }
  if (registry.schema !== "archie-provider-capability-registry/v1") {
    failures.push("provider registry has unexpected schema");
  }
  if (contract.registryId !== registry.registryId) {
    failures.push(`provider sandbox registry ${contract.registryId} does not match ${registry.registryId}`);
  }
  if (contract.environment !== registry.environment) {
    failures.push(`provider sandbox environment ${contract.environment} does not match ${registry.environment}`);
  }
  if (contract.termsVersionSetId !== terms.versionSetId) {
    failures.push(`provider sandbox terms ${contract.termsVersionSetId} does not match ${terms.versionSetId}`);
  }
}

function validateSandboxCase(entry, capabilitiesById, terms) {
  const label = entry.caseId;
  const capability = capabilitiesById.get(entry.capabilityId);
  if (!capability) {
    failures.push(`${label}: missing provider registry capability ${entry.capabilityId}`);
    return;
  }

  compareField(label, "capabilityType", capability.capabilityType, entry.capabilityType);
  compareField(label, "enabledState", capability.enabledState, entry.expectedEnabledState);
  compareField(label, "healthState", capability.healthState, entry.expectedHealthState);
  compareField(label, "costClass", capability.costClass, entry.expectedCostClass);
  compareField(label, "credentialBoundary", capability.credentialBoundary, entry.expectedCredentialBoundary);
  compareField(label, "fallbackBehavior", capability.fallbackBehavior, entry.expectedFallbackBehavior);

  if (capability.noBrowserKeys !== true) {
    failures.push(`${label}: registry capability must set noBrowserKeys true`);
  }
  if (entry.publicEnabled !== false || entry.expectedEnabledState === "public_enabled") {
    failures.push(`${label}: provider sandbox must not enable public provider capability`);
  }
  if (entry.runtimeProvidersEnabled !== false) {
    failures.push(`${label}: provider sandbox must not enable runtime providers`);
  }
  if (entry.browserKeysAllowed !== false) {
    failures.push(`${label}: provider sandbox must not allow browser model keys`);
  }
  if (entry.providerPayloadAllowed !== false) {
    failures.push(`${label}: provider sandbox must not expose provider payloads`);
  }
  if (entry.privatePromptAllowed !== false) {
    failures.push(`${label}: provider sandbox must not allow private prompt expansion`);
  }
  if (entry.sourceAuthorityEffect !== "none") {
    failures.push(`${label}: provider capability must not affect source authority`);
  }
  if (!entry.qualityGate || entry.qualityGate.length < 3) {
    failures.push(`${label}: provider sandbox must name a quality gate`);
  }
  if (!Array.isArray(entry.tokenWorkUnits) || entry.tokenWorkUnits.length === 0) {
    failures.push(`${label}: provider sandbox must include token work-unit mapping`);
  }
  validateTermsState(label, entry, terms);
  validateFallbackManifest(label, entry);
  validateCapabilitySpecificPolicy(label, entry);
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
  if (!["terms_bound_ephemeral", "terms_bound_no_retention", "disabled_until_terms"].includes(entry.privacyState)) {
    failures.push(`${label}: provider sandbox has unknown privacy state ${entry.privacyState}`);
  }
}

function validateFallbackManifest(label, entry) {
  if (entry.fallbackManifestFixture === null) {
    return;
  }
  if (!exists(entry.fallbackManifestFixture)) {
    failures.push(`${label}: fallback manifest fixture missing: ${entry.fallbackManifestFixture}`);
    return;
  }
  const manifest = readJson(entry.fallbackManifestFixture);
  if (manifest.schema !== "archie-answer-artifact-manifest/v1") {
    failures.push(`${label}: fallback fixture must be an Answer Artifact Manifest`);
    return;
  }
  if (manifest.providerExecutionContext?.noBrowserKeys !== true) {
    failures.push(`${label}: fallback manifest must preserve noBrowserKeys`);
  }
  if (manifest.tokenReceipt?.privatePromptIncluded !== false) {
    failures.push(`${label}: fallback token receipt must not include private prompt text`);
  }
  if (manifest.issueMiningContext?.privatePromptIncluded !== false) {
    failures.push(`${label}: fallback issue-mining context must not include private prompt text`);
  }
  if (manifest.privacyState?.durableSaveEnabled !== false) {
    failures.push(`${label}: fallback manifest must not enable durable saves`);
  }
}

function validateCapabilitySpecificPolicy(label, entry) {
  if (entry.capabilityType === "speech_output") {
    if (!entry.qualityGate.includes("high_quality")) {
      failures.push(`${label}: speech output must use a high-quality gate`);
    }
    if (entry.expectedFallbackBehavior !== "text_only_fallback") {
      failures.push(`${label}: speech output must fall back to text only`);
    }
    if (!entry.tokenWorkUnits.includes("high_quality_speech")) {
      failures.push(`${label}: speech output must map to high_quality_speech work`);
    }
  }
  if (entry.capabilityType === "image_generation") {
    if (entry.expectedEnabledState !== "disabled" || entry.expectedHealthState !== "policy_blocked") {
      failures.push(`${label}: image generation must stay disabled and policy-blocked in sandbox`);
    }
    if (entry.termsState !== "blocked_until_media_terms") {
      failures.push(`${label}: image generation must remain blocked by media terms`);
    }
  }
  if (entry.capabilityType === "retrieval_embedding" && !entry.expectedFallbackBehavior.includes("keyword")) {
    failures.push(`${label}: retrieval embeddings must declare keyword or route fallback`);
  }
  if (entry.capabilityType === "rerank" && entry.expectedFallbackBehavior !== "preserve_source_order") {
    failures.push(`${label}: rerank fallback must preserve source order`);
  }
  if (entry.capabilityType === "moderation" && !entry.expectedFallbackBehavior.includes("fail_closed")) {
    failures.push(`${label}: moderation fallback must not advance`);
  }
}

function compareField(label, field, actual, expected) {
  if (actual !== expected) {
    failures.push(`${label}: registry ${field} ${actual} does not match expected ${expected}`);
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
