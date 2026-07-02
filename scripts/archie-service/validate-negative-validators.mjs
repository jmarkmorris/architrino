#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const failures = [];

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/validate-negative-validators.mjs --check");
}

const plan = readJson("tests/archie-service/fixtures/validators/negative-validator-suite.v1.json");
const manifestFixtures = listJsonFiles(path.join(rootDir, "tests/archie-service/fixtures/manifests"))
  .map((fixturePath) => readJson(path.relative(rootDir, fixturePath)))
  .filter((fixture) => fixture.schema === "archie-answer-artifact-manifest/v1");
const requiredCaseIds = new Map([
  ["provider-browser-key-negative-001", "blocked"],
  ["privacy-private-prompt-leak-negative-001", "blocked"],
  ["speech-low-quality-fallback-negative-001", "text_only_fallback"],
  ["action-issue-unconfirmed-negative-001", "confirmation_required"],
  ["terms-stale-negative-001", "unavailable"],
  ["source-authority-inflation-negative-001", "unsupported"],
]);

if (plan.schema !== "archie-service-validation-plan/v1") {
  failures.push("negative validator suite has unexpected schema");
}

const builder = plan.checkModeBuilderContract ?? {};
if (builder.scriptTarget !== "scripts/archie-service/build-source-index.mjs --check") {
  failures.push("builder contract must target source-index check mode");
}
if (builder.checkModeWriteBehavior !== "no_write") {
  failures.push("builder contract must be no-write in check mode");
}
if (builder.runtimeProvidersEnabled !== false) {
  failures.push("builder contract must not enable runtime providers");
}
if (builder.publicRoutesEnabled !== false) {
  failures.push("builder contract must not enable public routes");
}
if (!builder.expectedOutputClasses?.includes("manifest_source_context_fragments")) {
  failures.push("builder contract must produce manifest source-context fragments");
}

const casesById = new Map((plan.negativeValidatorCases ?? []).map((entry) => [entry.caseId, entry]));
const manifestsByCaseId = new Map();
for (const manifest of manifestFixtures) {
  for (const duplicateKey of manifest.issueMiningContext?.duplicateKeys ?? []) {
    if (!manifestsByCaseId.has(duplicateKey)) {
      manifestsByCaseId.set(duplicateKey, []);
    }
    manifestsByCaseId.get(duplicateKey).push(manifest);
  }
}

for (const [caseId, expectedDisposition] of requiredCaseIds) {
  const entry = casesById.get(caseId);
  if (!entry) {
    failures.push(`missing negative validator case ${caseId}`);
    continue;
  }
  if (entry.expectedDisposition !== expectedDisposition) {
    failures.push(`${caseId}: expected disposition ${expectedDisposition}`);
  }
  validateNegativeCase(entry);
  validateMatchingManifest(entry);
}

for (const entry of plan.negativeValidatorCases ?? []) {
  if (!requiredCaseIds.has(entry.caseId)) {
    validateNegativeCase(entry);
    validateMatchingManifest(entry);
  }
}

if (failures.length > 0) {
  console.error(`Archie negative-validator check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie negative-validator check passed: ${plan.negativeValidatorCases.length} negative case(s), ${manifestFixtures.length} manifest fixture(s), runtime side effects disabled`
);

function validateNegativeCase(entry) {
  if (entry.blocksRuntimeSideEffect !== true) {
    failures.push(`${entry.caseId}: must block runtime side effects`);
  }
  if (entry.privatePromptIncluded !== false) {
    failures.push(`${entry.caseId}: must not include private prompt text`);
  }
  if (entry.browserSecretExposed !== false) {
    failures.push(`${entry.caseId}: must not expose browser secrets`);
  }
  if (entry.sourceAuthorityUpgraded !== false) {
    failures.push(`${entry.caseId}: must not upgrade source authority`);
  }
  if (!Array.isArray(entry.manifestFieldTargets) || entry.manifestFieldTargets.length === 0) {
    failures.push(`${entry.caseId}: must name manifest field targets`);
  }

  if (entry.caseId.includes("browser-key") && !entry.manifestFieldTargets.includes("providerExecutionContext.noBrowserKeys")) {
    failures.push(`${entry.caseId}: browser-key refusal must target providerExecutionContext.noBrowserKeys`);
  }
  if (entry.caseId.includes("private-prompt") && !entry.manifestFieldTargets.includes("tokenReceipt.privatePromptIncluded")) {
    failures.push(`${entry.caseId}: private-prompt refusal must target tokenReceipt.privatePromptIncluded`);
  }
  if (entry.caseId.includes("speech") && !entry.manifestFieldTargets.includes("speechSync.status")) {
    failures.push(`${entry.caseId}: speech fallback refusal must target speechSync.status`);
  }
  if (entry.caseId.includes("unconfirmed") && !entry.manifestFieldTargets.includes("availableActions.submit_issue")) {
    failures.push(`${entry.caseId}: unconfirmed issue refusal must target availableActions.submit_issue`);
  }
  if (entry.caseId.includes("terms") && !entry.manifestFieldTargets.includes("providerExecutionContext")) {
    failures.push(`${entry.caseId}: stale terms refusal must target providerExecutionContext`);
  }
  if (entry.caseId.includes("source-authority") && !entry.manifestFieldTargets.includes("claimContext.claimLabel")) {
    failures.push(`${entry.caseId}: source-authority refusal must target claimContext.claimLabel`);
  }
}

function validateMatchingManifest(entry) {
  const manifests = manifestsByCaseId.get(entry.caseId) ?? [];
  if (manifests.length === 0) {
    failures.push(`${entry.caseId}: missing matching manifest-shaped refusal or fallback fixture`);
    return;
  }

  for (const manifest of manifests) {
    const label = `${entry.caseId}/${manifest.manifestId}`;
    const safeEventClasses = manifest.observabilityContext?.safeEventClasses ?? [];

    if (!safeEventClasses.includes(entry.caseId)) {
      failures.push(`${label}: observability safeEventClasses must include the negative case id`);
    }
    if (!safeEventClasses.includes(entry.validatorId)) {
      failures.push(`${label}: observability safeEventClasses must include validator id ${entry.validatorId}`);
    }
    if (manifest.providerExecutionContext?.noBrowserKeys !== true) {
      failures.push(`${label}: manifest must preserve noBrowserKeys true`);
    }
    if (manifest.tokenReceipt?.privatePromptIncluded !== false) {
      failures.push(`${label}: token receipt must not include private prompt text`);
    }
    if (manifest.issueMiningContext?.privatePromptIncluded !== false) {
      failures.push(`${label}: issue-mining context must not include private prompt text`);
    }
    if (manifest.privacyState?.publicMaterialIncluded !== false) {
      failures.push(`${label}: fail-closed manifest must not include public material`);
    }
    if (manifest.issueMiningContext?.publicIssueUrl !== null) {
      failures.push(`${label}: fail-closed manifest must not expose a submitted public issue URL`);
    }

    switch (entry.caseId) {
      case "provider-browser-key-negative-001":
        requireBlockedProvider(label, manifest);
        break;
      case "privacy-private-prompt-leak-negative-001":
        requirePrivatePromptRefusal(label, manifest);
        break;
      case "speech-low-quality-fallback-negative-001":
        requireTextOnlySpeechFallback(label, manifest);
        break;
      case "action-issue-unconfirmed-negative-001":
        requireIssueConfirmation(label, manifest);
        break;
      case "terms-stale-negative-001":
        requireStaleTermsUnavailable(label, manifest);
        break;
      case "source-authority-inflation-negative-001":
        requireSourceAuthorityRefusal(label, manifest);
        break;
      default:
        break;
    }
  }
}

function requireBlockedProvider(label, manifest) {
  if (manifest.providerExecutionContext.credentialBoundary !== "blocked") {
    failures.push(`${label}: browser-key refusal must block provider credential boundary`);
  }
  if (manifest.tokenReceipt.chargedTokens !== 0) {
    failures.push(`${label}: browser-key refusal must not charge tokens`);
  }
  if (manifest.claimContext.claimLabel !== "unsupported") {
    failures.push(`${label}: browser-key refusal must use unsupported claim label`);
  }
}

function requirePrivatePromptRefusal(label, manifest) {
  if (manifest.observabilityContext.redactionState !== "blocked") {
    failures.push(`${label}: private-prompt leak refusal must block observability redaction`);
  }
  if (manifest.tokenReceipt.capStatus !== "privacy_confirmation_required") {
    failures.push(`${label}: private-prompt leak refusal must require privacy confirmation`);
  }
  if (manifest.privacyState.promptRetention !== "redacted") {
    failures.push(`${label}: private-prompt leak refusal must keep prompt retention redacted`);
  }
}

function requireTextOnlySpeechFallback(label, manifest) {
  if (manifest.speechSync.status !== "text_only_fallback") {
    failures.push(`${label}: low-quality speech fallback must return text_only_fallback`);
  }
  if (manifest.speechSync.audioArtifactId !== null) {
    failures.push(`${label}: text-only speech fallback must not include an audio artifact id`);
  }
  if ((manifest.artifacts ?? []).some((artifact) => artifact.artifactType === "audio")) {
    failures.push(`${label}: text-only speech fallback must not include an audio artifact`);
  }
  if ((manifest.tokenReceipt.workUnits ?? []).includes("high_quality_speech")) {
    failures.push(`${label}: text-only speech fallback must not charge high_quality_speech work`);
  }
  if (manifest.tokenReceipt.chargedTokens !== 0) {
    failures.push(`${label}: text-only speech fallback must not charge tokens`);
  }
}

function requireIssueConfirmation(label, manifest) {
  const submitIssueAction = (manifest.availableActions ?? []).find((action) => action.actionType === "submit_issue");
  if (!submitIssueAction) {
    failures.push(`${label}: unconfirmed GitHub handoff must expose a submit_issue action`);
    return;
  }
  if (submitIssueAction.preflightStatus !== "confirmation_required") {
    failures.push(`${label}: submit_issue action must require confirmation`);
  }
  if (submitIssueAction.confirmationRequired !== true) {
    failures.push(`${label}: submit_issue action must set confirmationRequired true`);
  }
  if (!submitIssueAction.confirmationReasons.includes("public_visibility")) {
    failures.push(`${label}: submit_issue action must include public_visibility confirmation`);
  }
  if (!submitIssueAction.confirmationReasons.includes("external_handoff")) {
    failures.push(`${label}: submit_issue action must include external_handoff confirmation`);
  }
}

function requireStaleTermsUnavailable(label, manifest) {
  const unavailableAction = (manifest.availableActions ?? []).some((action) => action.preflightStatus === "unavailable");
  if (!unavailableAction) {
    failures.push(`${label}: stale terms refusal must expose an unavailable action`);
  }
  if (manifest.providerExecutionContext.credentialBoundary !== "blocked") {
    failures.push(`${label}: stale terms refusal must block provider credential boundary`);
  }
  if (manifest.privacyState.mediaRetention !== "disabled") {
    failures.push(`${label}: stale terms refusal must disable media retention`);
  }
  if (manifest.tokenReceipt.chargedTokens !== 0) {
    failures.push(`${label}: stale terms refusal must not charge tokens`);
  }
}

function requireSourceAuthorityRefusal(label, manifest) {
  if (manifest.claimContext.claimLabel !== "unsupported") {
    failures.push(`${label}: source-authority refusal must keep claim label unsupported`);
  }
  if (!manifest.sourceContext.excludedSourceClasses.includes("priority_material")) {
    failures.push(`${label}: source-authority refusal must keep priority material excluded`);
  }
  if ((manifest.artifacts ?? []).length !== 0) {
    failures.push(`${label}: source-authority refusal must not emit generated artifacts`);
  }
  if (manifest.tokenReceipt.chargedTokens !== 0) {
    failures.push(`${label}: source-authority refusal must not charge tokens`);
  }
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function listJsonFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
