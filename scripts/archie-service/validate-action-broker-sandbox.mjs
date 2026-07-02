#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const actionPath = "tests/archie-service/fixtures/actions/action-broker-sandbox.v1.json";
const issueMiningPath = "tests/archie-service/fixtures/issue-mining/issue-mining-sandbox.v1.json";
const termsPath = "tests/archie-service/fixtures/terms/service-terms.v1.json";
const failures = [];

const requiredCaseIds = new Set([
  "action-issue-prefill-001",
  "action-issue-unconfirmed-negative-001",
  "action-issue-cancelled-001",
  "action-terms-negative-001",
  "action-credential-negative-001",
]);

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/validate-action-broker-sandbox.mjs --check");
}

const contract = readJson(actionPath);
const issueMining = readJson(issueMiningPath);
const terms = readJson(termsPath);

validateContractRoot(contract, issueMining, terms);

const casesById = new Map((contract.actionCases ?? []).map((entry) => [entry.caseId, entry]));
const signalCasesById = new Map((issueMining.signalCases ?? []).map((entry) => [entry.caseId, entry]));

for (const caseId of requiredCaseIds) {
  if (!casesById.has(caseId)) {
    failures.push(`missing action-broker sandbox case ${caseId}`);
  }
}

for (const entry of contract.actionCases ?? []) {
  validateActionCase(entry, signalCasesById);
}

if (failures.length > 0) {
  console.error(`Archie action-broker sandbox check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie action-broker sandbox check passed: ${contract.actionCases.length} action case(s), GitHub writes disabled`
);

function validateContractRoot(contract, issueMining, terms) {
  if (contract.schema !== "archie-action-broker-sandbox-contracts/v1") {
    failures.push("action-broker sandbox contract has unexpected schema");
  }
  if (issueMining.schema !== "archie-issue-mining-sandbox-contracts/v1") {
    failures.push("issue-mining sandbox contract has unexpected schema");
  }
  if (contract.issueMiningContractId !== issueMining.contractId) {
    failures.push(
      `action-broker issue-mining contract ${contract.issueMiningContractId} does not match ${issueMining.contractId}`
    );
  }
  if (contract.termsVersionSetId !== terms.versionSetId || contract.termsVersionSetId !== issueMining.termsVersionSetId) {
    failures.push("action-broker terms version must match issue-mining and service terms fixtures");
  }
  if (!terms.githubHandoffNoticeVersion) {
    failures.push("action-broker requires a GitHub handoff notice version");
  }
}

function validateActionCase(entry, signalCasesById) {
  const label = entry.caseId;
  const manifest = readJson(entry.manifestFixture);
  const signalCase = signalCasesById.get(entry.issueMiningCaseId);
  if (!signalCase) {
    failures.push(`${label}: missing issue-mining signal case ${entry.issueMiningCaseId}`);
    return;
  }

  validateSignalInheritance(label, entry, signalCase);
  validateManifestAction(label, entry, manifest);
  validatePreflightFixture(label, entry, manifest);
  validateNoSideEffects(label, entry, manifest);
  validateResult(label, entry);
}

function validateSignalInheritance(label, entry, signalCase) {
  compareField(label, "manifestFixture", entry.manifestFixture, signalCase.manifestFixture);
  compareField(label, "tokenReceiptId", entry.tokenReceiptId, signalCase.tokenReceiptId);
  compareField(label, "prefilledIssue.title", entry.prefilledIssue.title, signalCase.draftIssueMetadata.title);
  compareField(
    label,
    "prefilledIssue.publicBodySummaryId",
    entry.prefilledIssue.publicBodySummaryId,
    signalCase.draftIssueMetadata.publicBodySummaryId
  );
  compareArray(label, "prefilledIssue.labels", entry.prefilledIssue.labels, signalCase.draftIssueMetadata.labels);

  if (entry.prefilledIssue.sourceClaimInheritance !== true || signalCase.draftIssueMetadata.sourceClaimInheritance !== true) {
    failures.push(`${label}: action issue metadata must inherit source and claim context`);
  }
  if (entry.prefilledIssue.privatePromptIncluded !== false || signalCase.draftIssueMetadata.privatePromptIncluded !== false) {
    failures.push(`${label}: action issue metadata must exclude private prompt text`);
  }
  if (entry.prefilledIssue.userMaterialIncluded !== false || signalCase.draftIssueMetadata.userMaterialIncluded !== false) {
    failures.push(`${label}: action issue metadata must exclude user material without consent`);
  }
}

function validateManifestAction(label, entry, manifest) {
  if (manifest.schema !== "archie-answer-artifact-manifest/v1") {
    failures.push(`${label}: manifest fixture must be an Answer Artifact Manifest`);
    return;
  }
  compareField(label, "manifest tokenReceiptId", entry.tokenReceiptId, manifest.tokenReceipt.receiptId);
  if (manifest.tokenReceipt.privatePromptIncluded !== false || manifest.issueMiningContext.privatePromptIncluded !== false) {
    failures.push(`${label}: manifest must exclude private prompt text from receipt and issue-mining context`);
  }
  if (manifest.privacyState.durableSaveEnabled !== false || manifest.privacyState.publicMaterialIncluded !== false) {
    failures.push(`${label}: action broker sandbox must not enable durable save or public user material inclusion`);
  }

  const action = (manifest.availableActions ?? []).find((candidate) => candidate.actionType === entry.actionType);
  if (!action) {
    if (entry.termsState !== "blocked_until_terms" || entry.expectedResultStatus !== "failed_closed") {
      failures.push(`${label}: manifest must expose action ${entry.actionType} unless the case is terms-blocked`);
    }
    return;
  }

  compareField(label, "action.preflightStatus", entry.expectedPreflightStatus, action.preflightStatus);
  compareField(label, "action.destinationClass", entry.destinationClass, action.destinationClass);
  compareArray(label, "action.confirmationReasons", entry.confirmationReasons, action.confirmationReasons);

  if (action.confirmationRequired !== true) {
    failures.push(`${label}: submit_issue action must require confirmation`);
  }
  if (!action.confirmationReasons.includes("public_visibility") || !action.confirmationReasons.includes("external_handoff")) {
    failures.push(`${label}: submit_issue action must disclose public visibility and external handoff`);
  }
}

function validatePreflightFixture(label, entry, manifest) {
  if (entry.actionPreflightFixture === null) {
    if (entry.expectedPreflightStatus !== "unavailable") {
      failures.push(`${label}: missing preflight fixture is allowed only for unavailable terms-blocked actions`);
    }
    return;
  }

  const preflight = readJson(entry.actionPreflightFixture);
  if (preflight.schema !== "archie-action-preflight/v1") {
    failures.push(`${label}: action preflight fixture has unexpected schema`);
    return;
  }
  compareField(label, "preflight.actionType", entry.actionType, preflight.action.actionType);
  compareField(label, "preflight.preflightStatus", entry.expectedPreflightStatus, preflight.action.preflightStatus);
  compareField(label, "preflight.destinationClass", entry.destinationClass, preflight.action.destinationClass);
  compareArray(label, "preflight.confirmationReasons", entry.confirmationReasons, preflight.action.confirmationReasons);

  const manifestAction = (manifest.availableActions ?? []).find((candidate) => candidate.actionType === entry.actionType);
  if (!manifestAction) {
    failures.push(`${label}: preflight fixture requires matching manifest action`);
  }
}

function validateNoSideEffects(label, entry, manifest) {
  if (entry.githubWriteAllowed !== false || entry.browserGithubTokenAllowed !== false || entry.serverGithubWriteAllowed !== false) {
    failures.push(`${label}: action broker must not enable hidden GitHub writes or credentials`);
  }
  if (entry.paymentsEnabled !== false || entry.paymentAttempted !== false) {
    failures.push(`${label}: action broker sandbox must not enable or attempt payments`);
  }
  if (entry.durableStorageEnabled !== false || manifest.privacyState?.durableSaveEnabled !== false) {
    failures.push(`${label}: action broker sandbox must not enable durable storage`);
  }
  if (entry.providerPayloadIncluded !== false) {
    failures.push(`${label}: action broker sandbox must not include provider payloads`);
  }
  if (
    entry.privatePromptIncluded !== false ||
    entry.prefilledIssue.privatePromptIncluded !== false ||
    manifest.tokenReceipt?.privatePromptIncluded !== false ||
    manifest.issueMiningContext?.privatePromptIncluded !== false
  ) {
    failures.push(`${label}: action broker sandbox must not expose private prompt text`);
  }
  if (entry.sourceAuthorityEffect !== "none") {
    failures.push(`${label}: action broker must not affect source authority`);
  }
  if (entry.publicVisibilityWarningShown !== true || entry.externalHandoffDisclosureShown !== true) {
    failures.push(`${label}: action broker must show public visibility and external handoff disclosures`);
  }
}

function validateResult(label, entry) {
  if (entry.requestedExecutionMode === "server_write") {
    if (entry.expectedResultStatus !== "failed_closed" || entry.prefilledUrlGenerated !== false || entry.prefilledUrl !== null) {
      failures.push(`${label}: server-write attempts must fail closed without a prefilled URL`);
    }
    return;
  }

  if (entry.confirmationState === "confirmed" && entry.termsState === "fixture_terms_current") {
    if (entry.expectedResultStatus !== "external_pending" || entry.prefilledUrlGenerated !== true) {
      failures.push(`${label}: confirmed prefilled URL handoff must become external_pending`);
    }
    if (typeof entry.prefilledUrl !== "string" || !entry.prefilledUrl.startsWith("https://github.com/")) {
      failures.push(`${label}: confirmed prefilled handoff must include a GitHub URL`);
    }
    return;
  }

  if (entry.confirmationState === "required_not_confirmed") {
    if (entry.expectedResultStatus !== "not_run" || entry.prefilledUrlGenerated !== false || entry.prefilledUrl !== null) {
      failures.push(`${label}: unconfirmed actions must not run or generate a URL`);
    }
    return;
  }

  if (entry.confirmationState === "cancelled") {
    if (entry.expectedResultStatus !== "cancelled" || entry.prefilledUrlGenerated !== false || entry.prefilledUrl !== null) {
      failures.push(`${label}: cancelled actions must not run or generate a URL`);
    }
    return;
  }

  if (entry.termsState === "blocked_until_terms") {
    if (entry.expectedResultStatus !== "failed_closed" || entry.prefilledUrlGenerated !== false || entry.prefilledUrl !== null) {
      failures.push(`${label}: terms-blocked actions must fail closed without a URL`);
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
