#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const issueMiningPath = "tests/archie-service/fixtures/issue-mining/issue-mining-sandbox.v1.json";
const tokenLedgerPath = "tests/archie-service/fixtures/token-ledger/token-ledger-sandbox.v1.json";
const termsPath = "tests/archie-service/fixtures/terms/service-terms.v1.json";
const failures = [];

const requiredCaseIds = new Set([
  "mining-draft-preflight-001",
  "mining-unsupported-gap-001",
  "mining-private-exclusion-001",
  "mining-terms-negative-001",
  "mining-owner-ambiguous-001",
  "mining-fixture-candidate-001",
]);

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/validate-issue-mining-sandbox.mjs --check");
}

const contract = readJson(issueMiningPath);
const tokenLedger = readJson(tokenLedgerPath);
const terms = readJson(termsPath);

validateContractRoot(contract, tokenLedger, terms);

const casesById = new Map((contract.signalCases ?? []).map((entry) => [entry.caseId, entry]));
const clustersById = new Map((contract.report?.clusters ?? []).map((entry) => [entry.clusterId, entry]));
const noiseCaseIds = new Set((contract.report?.noiseSummary ?? []).flatMap((entry) => entry.caseIds ?? []));

for (const caseId of requiredCaseIds) {
  if (!casesById.has(caseId)) {
    failures.push(`missing issue-mining sandbox case ${caseId}`);
  }
}

for (const entry of contract.signalCases ?? []) {
  validateSignalCase(entry, clustersById, noiseCaseIds);
}

validateReport(contract.report, casesById, clustersById);

if (failures.length > 0) {
  console.error(`Archie issue-mining sandbox check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie issue-mining sandbox check passed: ${contract.signalCases.length} signal case(s), GitHub writes disabled`
);

function validateContractRoot(contract, tokenLedger, terms) {
  if (contract.schema !== "archie-issue-mining-sandbox-contracts/v1") {
    failures.push("issue-mining sandbox contract has unexpected schema");
  }
  if (tokenLedger.schema !== "archie-token-ledger-sandbox-contracts/v1") {
    failures.push("token-ledger sandbox contract has unexpected schema");
  }
  if (contract.tokenLedgerContractId !== tokenLedger.contractId) {
    failures.push(
      `issue-mining token-ledger contract ${contract.tokenLedgerContractId} does not match ${tokenLedger.contractId}`
    );
  }
  if (contract.termsVersionSetId !== terms.versionSetId || contract.termsVersionSetId !== tokenLedger.termsVersionSetId) {
    failures.push("issue-mining terms version must match token-ledger and service terms fixtures");
  }
  if (!terms.githubHandoffNoticeVersion) {
    failures.push("issue-mining requires a GitHub handoff notice version");
  }
}

function validateSignalCase(entry, clustersById, noiseCaseIds) {
  const label = entry.caseId;
  const manifest = readJson(entry.manifestFixture);
  if (manifest.schema !== "archie-answer-artifact-manifest/v1") {
    failures.push(`${label}: manifest fixture must be an Answer Artifact Manifest`);
    return;
  }

  validateManifestInheritance(label, entry, manifest);
  validateActionPreflight(label, entry, manifest);
  validateNoSideEffects(label, entry, manifest);
  validateIssueUrlState(label, entry);
  validateDisposition(label, entry, clustersById, noiseCaseIds);
}

function validateManifestInheritance(label, entry, manifest) {
  compareField(label, "originMode", entry.originMode, manifest.mode);
  compareField(label, "originSurface", entry.originSurface, manifest.issueMiningContext.originSurface);
  compareField(label, "claimLabel", entry.claimLabel, manifest.claimContext.claimLabel);
  compareField(label, "tokenReceiptId", entry.tokenReceiptId, manifest.tokenReceipt.receiptId);
  compareField(label, "ownerLane", entry.ownerLane, manifest.issueMiningContext.ownerLane);
  compareField(label, "smallestNextArtifact", entry.smallestNextArtifact, manifest.issueMiningContext.smallestNextArtifact);
  compareArray(label, "sourceClasses", entry.sourceClasses, manifest.sourceContext.sourceClasses);
  compareArray(label, "duplicateKeys", entry.duplicateKeys, manifest.issueMiningContext.duplicateKeys);

  const manifestRoutes = (manifest.sourceContext.sourceChips ?? []).map((chip) => chip.route);
  compareArray(label, "sourceRoutes", entry.sourceRoutes, manifestRoutes);
}

function validateActionPreflight(label, entry, manifest) {
  if (entry.actionPreflightFixture === null) {
    return;
  }
  const preflight = readJson(entry.actionPreflightFixture);
  if (preflight.schema !== "archie-action-preflight/v1") {
    failures.push(`${label}: action preflight fixture has unexpected schema`);
    return;
  }
  const matchingAction = (manifest.availableActions ?? []).find(
    (action) => action.actionType === preflight.action.actionType && action.destinationClass === preflight.action.destinationClass
  );
  if (!matchingAction) {
    failures.push(`${label}: action preflight fixture must match a manifest available action`);
    return;
  }
  compareField(label, "action.preflightStatus", preflight.action.preflightStatus, matchingAction.preflightStatus);
  compareField(label, "action.confirmationRequired", preflight.action.confirmationRequired, matchingAction.confirmationRequired);
  compareArray(label, "action.confirmationReasons", preflight.action.confirmationReasons, matchingAction.confirmationReasons);
}

function validateNoSideEffects(label, entry, manifest) {
  if (entry.githubWriteAllowed !== false || entry.browserGithubTokenAllowed !== false || entry.serverGithubWriteAllowed !== false) {
    failures.push(`${label}: issue mining must not enable hidden GitHub writes or credentials`);
  }
  if (entry.durableStorageEnabled !== false || manifest.privacyState.durableSaveEnabled !== false) {
    failures.push(`${label}: issue mining sandbox must not enable durable storage`);
  }
  if (entry.providerPayloadIncluded !== false) {
    failures.push(`${label}: issue mining sandbox must not include provider payloads`);
  }
  if (
    entry.privatePromptIncluded !== false ||
    entry.draftIssueMetadata.privatePromptIncluded !== false ||
    manifest.issueMiningContext.privatePromptIncluded !== false ||
    manifest.tokenReceipt.privatePromptIncluded !== false
  ) {
    failures.push(`${label}: issue mining sandbox must not expose private prompt text`);
  }
  if (entry.draftIssueMetadata.userMaterialIncluded !== false || manifest.privacyState.publicMaterialIncluded !== false) {
    failures.push(`${label}: issue mining sandbox must not include user material without consent`);
  }
  if (entry.sourceAuthorityEffect !== "none") {
    failures.push(`${label}: issue mining must not affect source authority`);
  }
  if (entry.draftIssueMetadata.previewVisible !== true || entry.draftIssueMetadata.publicVisibilityWarningShown !== true) {
    failures.push(`${label}: issue draft metadata must remain user-visible with public warning`);
  }
  if (entry.draftIssueMetadata.sourceClaimInheritance !== true) {
    failures.push(`${label}: issue draft metadata must inherit source and claim context`);
  }
}

function validateIssueUrlState(label, entry) {
  if (entry.publicIssueUrlState === "public_link_fixture") {
    if (typeof entry.issueUrl !== "string" || !entry.issueUrl.startsWith("https://github.com/")) {
      failures.push(`${label}: public-link fixture requires a GitHub issue URL string`);
    }
    return;
  }
  if (entry.issueUrl !== null) {
    failures.push(`${label}: non-public issue URL states must not include an issue URL`);
  }
}

function validateDisposition(label, entry, clustersById, noiseCaseIds) {
  if (entry.expectedDisposition === "excluded_private") {
    if (entry.clusterId !== null) {
      failures.push(`${label}: private-exclusion cases must not join clusters`);
    }
    if (!noiseCaseIds.has(entry.caseId)) {
      failures.push(`${label}: private-exclusion cases must appear in noise summary`);
    }
    return;
  }

  if (entry.expectedDisposition === "draft_excluded_until_confirmation") {
    if (entry.clusterId !== null) {
      failures.push(`${label}: unsubmitted drafts must not join report clusters`);
    }
    if (entry.actionPreflightFixture === null || entry.publicIssueUrlState !== "not_submitted") {
      failures.push(`${label}: draft-excluded cases require confirmation preflight and not_submitted URL state`);
    }
    return;
  }

  if (entry.expectedDisposition === "blocked_until_terms" && entry.publicIssueUrlState !== "blocked_until_terms") {
    failures.push(`${label}: terms-block cases must use blocked_until_terms URL state`);
  }

  if (entry.expectedDisposition === "owner_decision_required" && entry.ownerLane !== "issue_ops") {
    failures.push(`${label}: ambiguous ownership must route to issue_ops`);
  }

  if (entry.clusterId === null) {
    failures.push(`${label}: ${entry.expectedDisposition} cases require a cluster id`);
    return;
  }

  const cluster = clustersById.get(entry.clusterId);
  if (!cluster) {
    failures.push(`${label}: missing report cluster ${entry.clusterId}`);
    return;
  }
  if (!cluster.caseIds.includes(entry.caseId)) {
    failures.push(`${label}: report cluster ${entry.clusterId} must include this case`);
  }
  if (cluster.ownerLane !== entry.ownerLane) {
    failures.push(`${label}: cluster owner lane must match signal owner lane`);
  }
  if (!cluster.claimLabels.includes(entry.claimLabel)) {
    failures.push(`${label}: cluster must include signal claim label`);
  }
  for (const duplicateKey of entry.duplicateKeys) {
    if (!cluster.duplicateKeys.includes(duplicateKey)) {
      failures.push(`${label}: cluster must include duplicate key ${duplicateKey}`);
    }
  }
  if (cluster.privacyState !== "private_prompt_excluded" || cluster.sourceAuthorityEffect !== "none") {
    failures.push(`${label}: cluster must preserve privacy and source-authority boundaries`);
  }
}

function validateReport(report, casesById, clustersById) {
  if (report.githubWritesAllowed !== false || report.durableStorageEnabled !== false || report.privatePromptIncluded !== false) {
    failures.push("issue-mining report must not enable GitHub writes, durable storage, or private prompt inclusion");
  }
  if (report.privacyStatement !== "no_private_prompt_or_user_media") {
    failures.push("issue-mining report must state private prompt and user media exclusion");
  }
  for (const cluster of report.clusters ?? []) {
    if (cluster.frequency !== cluster.caseIds.length) {
      failures.push(`${cluster.clusterId}: frequency must match case count`);
    }
    for (const caseId of cluster.caseIds) {
      if (!casesById.has(caseId)) {
        failures.push(`${cluster.clusterId}: references unknown signal case ${caseId}`);
      }
    }
  }
  for (const queue of report.fixQueues ?? []) {
    if (queue.privacySafe !== true) {
      failures.push(`${queue.queueId}: fix queue must be privacy safe`);
    }
    for (const clusterId of queue.clusterIds) {
      if (!clustersById.has(clusterId)) {
        failures.push(`${queue.queueId}: references unknown cluster ${clusterId}`);
      }
    }
    if (!queue.smallestNextArtifact || queue.smallestNextArtifact.length < 3) {
      failures.push(`${queue.queueId}: fix queue must name the smallest next artifact`);
    }
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

function fail(message) {
  console.error(message);
  process.exit(1);
}
