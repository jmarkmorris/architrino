#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { selectFixtureResponse } from "../../src/archie-service/http/fixture-response-selector.mjs";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const planPath = "tests/archie-service/fixtures/deployment/rollback-smoke-plan.v1.json";
const failures = [];

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/check-rollback.mjs --check");
}

const plan = readJson(planPath);
validatePlan(plan);
validateSourceSnapshot(plan);
validateProviderRegistry(plan);
validateTerms(plan);
validateEndpointCompatibility(plan);

if (failures.length > 0) {
  console.error(`Archie rollback check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie rollback check passed: ${plan.endpointCompatibility.length} endpoint fixture(s), service version ${plan.serviceVersionId}`
);

function validatePlan(plan) {
  if (plan.schema !== "archie-rollback-smoke-plan/v1") {
    failures.push("rollback smoke plan has unexpected schema");
  }
  if (plan.environment !== "staging") {
    failures.push(`rollback fixture must target staging, found ${plan.environment}`);
  }
  for (const key of [
    "requiresNoRuntimeProviders",
    "requiresNoPayments",
    "requiresNoDurableStorage",
    "requiresNoPublicRoutes",
  ]) {
    if (plan[key] !== true) {
      failures.push(`rollback fixture must set ${key} true`);
    }
  }
}

function validateSourceSnapshot(plan) {
  const snapshot = readJson("tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json");
  if (snapshot.snapshotId !== plan.sourceSnapshotId) {
    failures.push(`source snapshot ${snapshot.snapshotId} does not match rollback plan ${plan.sourceSnapshotId}`);
  }
  if (snapshot.rollbackParent !== plan.expectedRollbackParent) {
    failures.push(`rollback parent ${snapshot.rollbackParent} does not match expected ${plan.expectedRollbackParent}`);
  }
  if (!["fresh", "rollback_snapshot"].includes(snapshot.freshnessState)) {
    failures.push(`source snapshot freshness ${snapshot.freshnessState} is not rollback-compatible`);
  }
  for (const [key, artifactPath] of Object.entries(snapshot.generatedArtifactRefs ?? {})) {
    if (!exists(artifactPath)) {
      failures.push(`source snapshot generated artifact ref ${key} missing: ${artifactPath}`);
    }
  }
}

function validateProviderRegistry(plan) {
  const registry = readJson("tests/archie-service/fixtures/provider-registry/provider-registry.v1.json");
  if (registry.registryId !== plan.providerRegistryId) {
    failures.push(`provider registry ${registry.registryId} does not match rollback plan ${plan.providerRegistryId}`);
  }
  if (registry.environment !== plan.environment) {
    failures.push(`provider registry environment ${registry.environment} does not match ${plan.environment}`);
  }
  const capabilitiesById = new Map((registry.capabilities ?? []).map((entry) => [entry.capabilityId, entry]));
  for (const capabilityId of plan.requiredCapabilityIds ?? []) {
    const capability = capabilitiesById.get(capabilityId);
    if (!capability) {
      failures.push(`provider registry missing required capability ${capabilityId}`);
      continue;
    }
    if (capability.noBrowserKeys !== true) {
      failures.push(`${capabilityId}: rollback-compatible capability must preserve noBrowserKeys`);
    }
    if (!["service_side_only", "blocked", "not_required"].includes(capability.credentialBoundary)) {
      failures.push(`${capabilityId}: unknown credential boundary ${capability.credentialBoundary}`);
    }
  }
}

function validateTerms(plan) {
  const terms = readJson("tests/archie-service/fixtures/terms/service-terms.v1.json");
  if (terms.versionSetId !== plan.termsVersionSetId) {
    failures.push(`terms version set ${terms.versionSetId} does not match rollback plan ${plan.termsVersionSetId}`);
  }
  if (!exists(terms.legalTermsRoute)) {
    failures.push(`legal terms route missing: ${terms.legalTermsRoute}`);
  }
}

function validateEndpointCompatibility(plan) {
  for (const endpoint of plan.endpointCompatibility ?? []) {
    const selection = selectFixtureResponse({
      endpointId: endpoint.endpointId,
      requestFixture: endpoint.requestFixture,
      rootDir,
    });
    const label = `${endpoint.endpointId}/${selection.caseId}`;
    if (selection.responseFixture !== endpoint.responseFixture) {
      failures.push(`${label}: selected ${selection.responseFixture}, expected ${endpoint.responseFixture}`);
    }
    if (selection.responseSchema !== endpoint.responseSchema) {
      failures.push(`${label}: selected schema ${selection.responseSchema}, expected ${endpoint.responseSchema}`);
    }
    validateSelectionSideEffects(label, selection);
    validateResponseSafety(label, selection.response);
  }
}

function validateResponseSafety(label, response) {
  if (response.schema === "archie-answer-artifact-manifest/v1") {
    if (response.providerExecutionContext?.noBrowserKeys !== true) {
      failures.push(`${label}: manifest response must preserve noBrowserKeys`);
    }
    if (response.tokenReceipt?.privatePromptIncluded !== false) {
      failures.push(`${label}: token receipt must not include private prompt text`);
    }
    if (response.issueMiningContext?.privatePromptIncluded !== false) {
      failures.push(`${label}: issue-mining context must not include private prompt text`);
    }
    if (response.privacyState?.durableSaveEnabled !== false) {
      failures.push(`${label}: rollback fixture must not enable durable saves`);
    }
  } else if (response.schema === "archie-service-status/v1") {
    if (response.privatePromptIncluded !== false) {
      failures.push(`${label}: service status must not include private prompt text`);
    }
  } else if (response.schema === "archie-service-terms/v1") {
    if (!response.versionSetId || !response.legalTermsRoute) {
      failures.push(`${label}: service terms response missing version set or legal route`);
    }
  }
}

function validateSelectionSideEffects(label, selection) {
  for (const [key, value] of Object.entries(selection.sideEffects ?? {})) {
    if (value !== false) {
      failures.push(`${label}: selected fixture enables ${key}`);
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
