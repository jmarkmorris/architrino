#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { buildFixtureRenderModel } from "../../src/archie-service/browser-client/fixture-render-model.mjs";
import { selectFixtureResponse } from "../../src/archie-service/http/fixture-response-selector.mjs";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const renderContractPath = "tests/archie-service/fixtures/render/render-contracts.v1.json";
const failures = [];

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/validate-render-contracts.mjs --check");
}

const contract = readJson(renderContractPath);
if (contract.schema !== "archie-render-contracts/v1") {
  failures.push("render contract fixture has unexpected schema");
}

for (const renderCase of contract.renderCases ?? []) {
  validateRenderCase(renderCase);
}

if (failures.length > 0) {
  console.error(`Archie render-contract check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Archie render-contract check passed: ${contract.renderCases.length} render contract(s)`);

function validateRenderCase(renderCase) {
  const label = renderCase.caseId;
  const selection = selectFixtureResponse({
    endpointId: renderCase.endpointId,
    requestFixture: renderCase.requestFixture,
    rootDir,
  });
  const renderModel = buildFixtureRenderModel(selection);

  if (selection.responseFixture !== renderCase.selectedResponseFixture) {
    failures.push(`${label}: selected response fixture ${selection.responseFixture}`);
  }
  if (selection.responseSchema !== renderCase.responseSchema) {
    failures.push(`${label}: selected response schema ${selection.responseSchema}`);
  }
  if (renderModel.responseSchema !== renderCase.responseSchema) {
    failures.push(`${label}: render model response schema ${renderModel.responseSchema}`);
  }

  validateNoRuntimeSideEffects(label, selection.sideEffects, renderCase.invariants);
  validateRenderInvariants(label, renderModel, renderCase.invariants);

  for (const surface of renderCase.requiredSurfaces) {
    validateSurface(label, surface, renderModel);
  }
}

function validateNoRuntimeSideEffects(label, sideEffects, invariants) {
  for (const key of ["runtimeProvidersEnabled", "publicRoutesEnabled", "durableStorageEnabled", "paymentsEnabled"]) {
    if (sideEffects[key] !== false) {
      failures.push(`${label}: selected response enables ${key}`);
    }
    if (invariants[key] !== false) {
      failures.push(`${label}: render invariant enables ${key}`);
    }
  }
}

function validateRenderInvariants(label, renderModel, invariants) {
  if (invariants.selectedResponseOnlyAuthority !== true) {
    failures.push(`${label}: render contract must use selected response as the only authority`);
  }
  if (invariants.sideChannelAuthorityAllowed !== false || renderModel.invariants.sideChannelAuthorityAllowed !== false) {
    failures.push(`${label}: render model must not allow side-channel authority`);
  }
  if (invariants.privatePromptIncluded !== false || renderModel.invariants.privatePromptIncluded !== false) {
    failures.push(`${label}: render model must not include private prompt text`);
  }
  if (invariants.providerSecretsAllowed !== false || renderModel.invariants.providerSecretsIncluded !== false) {
    failures.push(`${label}: render model must not include provider secrets`);
  }
}

function validateSurface(label, surface, renderModel) {
  switch (surface) {
    case "source_chips":
      validateSourceChips(label, renderModel);
      break;
    case "claim_label":
      validateClaimLabel(label, renderModel);
      break;
    case "displayed_verbatim_text":
      validateDisplayedVerbatimText(label, renderModel);
      break;
    case "token_receipt":
      validateTokenReceipt(label, renderModel);
      break;
    case "action_confirmations":
      validateActionConfirmations(label, renderModel);
      break;
    case "speech_sync":
      validateSpeechSync(label, renderModel);
      break;
    case "issue_draft":
      validateIssueDraft(label, renderModel);
      break;
    case "service_terms":
      validateServiceTerms(label, renderModel);
      break;
    case "service_status":
      validateServiceStatus(label, renderModel);
      break;
    default:
      failures.push(`${label}: unknown render surface ${surface}`);
  }
}

function validateSourceChips(label, renderModel) {
  if (renderModel.invariants.authorityOrigin !== "manifest") {
    failures.push(`${label}: source chips must render from manifest authority`);
  }
  if (!Array.isArray(renderModel.sourceChips) || renderModel.sourceChips.length === 0) {
    failures.push(`${label}: source chips surface must include at least one chip`);
    return;
  }
  for (const chip of renderModel.sourceChips) {
    for (const key of ["route", "label", "sourceClass", "authorityStatus", "visibility"]) {
      if (!chip[key]) {
        failures.push(`${label}: source chip missing ${key}`);
      }
    }
  }
}

function validateClaimLabel(label, renderModel) {
  if (renderModel.invariants.authorityOrigin !== "manifest") {
    failures.push(`${label}: claim label must render from manifest authority`);
  }
  if (!renderModel.claimLabel) {
    failures.push(`${label}: claim label surface missing`);
  }
}

function validateDisplayedVerbatimText(label, renderModel) {
  const display = renderModel.displayedVerbatimText;
  if (!display?.displayedText) {
    failures.push(`${label}: displayed text missing`);
  }
  if (!Array.isArray(display?.segments) || display.segments.length === 0) {
    failures.push(`${label}: verbatim segment list missing`);
    return;
  }
  for (const segment of display.segments) {
    if (!segment.segmentId || !segment.text) {
      failures.push(`${label}: verbatim segment missing id or text`);
    }
    if (display.displayedText && !display.displayedText.includes(segment.text)) {
      failures.push(`${label}: verbatim segment text must be visible in displayed text`);
    }
  }
}

function validateTokenReceipt(label, renderModel) {
  const receipt = renderModel.tokenReceipt;
  if (!receipt?.receiptId) {
    failures.push(`${label}: token receipt missing receipt id`);
  }
  if (!receipt?.capStatus) {
    failures.push(`${label}: token receipt missing cap status`);
  }
  if (typeof receipt?.chargedTokens !== "number") {
    failures.push(`${label}: token receipt missing charged token count`);
  }
  if (!Array.isArray(receipt?.workUnits)) {
    failures.push(`${label}: token receipt missing work units`);
  }
  if (receipt?.privatePromptIncluded !== false) {
    failures.push(`${label}: token receipt must not include private prompt text`);
  }
}

function validateActionConfirmations(label, renderModel) {
  if (!Array.isArray(renderModel.actionConfirmations) || renderModel.actionConfirmations.length === 0) {
    failures.push(`${label}: action confirmation surface missing`);
    return;
  }
  for (const action of renderModel.actionConfirmations) {
    if (!action.actionType || !action.preflightStatus || typeof action.confirmationRequired !== "boolean") {
      failures.push(`${label}: action confirmation entry missing action, preflight, or confirmation state`);
    }
    if (action.confirmationRequired && action.confirmationReasons.length === 0) {
      failures.push(`${label}: confirmation-required action must name confirmation reasons`);
    }
  }
}

function validateSpeechSync(label, renderModel) {
  const speech = renderModel.speechSync;
  if (!speech || speech.status === "not_requested") {
    failures.push(`${label}: speech sync surface missing active status`);
    return;
  }
  if (speech.status === "synced" && !speech.audioArtifactId) {
    failures.push(`${label}: synced speech must reference an audio artifact`);
  }
  if (speech.status === "synced" && speech.segmentIds.length === 0) {
    failures.push(`${label}: synced speech must include timed segment ids`);
  }
  const visibleSegmentIds = new Set((renderModel.displayedVerbatimText?.segments ?? []).map((segment) => segment.segmentId));
  for (const segmentId of speech.segmentIds) {
    if (!visibleSegmentIds.has(segmentId)) {
      failures.push(`${label}: speech segment ${segmentId} must match displayed verbatim text`);
    }
  }
}

function validateIssueDraft(label, renderModel) {
  const issueDraft = renderModel.issueDraft;
  if (!issueDraft || issueDraft.artifactIds.length === 0) {
    failures.push(`${label}: issue draft artifact missing`);
    return;
  }
  if (issueDraft.issueMiningEnabled !== true) {
    failures.push(`${label}: issue draft must include issue-mining metadata`);
  }
  if (issueDraft.publicIssueUrl !== null) {
    failures.push(`${label}: unsubmitted issue draft must not include a public issue URL`);
  }
  if (issueDraft.privatePromptIncluded !== false) {
    failures.push(`${label}: issue draft render surface must not include private prompt text`);
  }
}

function validateServiceTerms(label, renderModel) {
  const terms = renderModel.serviceTerms;
  for (const key of ["versionSetId", "legalTermsRoute", "supportRoute", "legalReviewState"]) {
    if (!terms?.[key]) {
      failures.push(`${label}: service terms surface missing ${key}`);
    }
  }
}

function validateServiceStatus(label, renderModel) {
  const status = renderModel.serviceStatus;
  for (const key of ["statusId", "serviceStatus", "answerStatus", "sourceStatus", "speechStatus", "visualStatus"]) {
    if (!status?.[key]) {
      failures.push(`${label}: service status surface missing ${key}`);
    }
  }
  if (status?.privatePromptIncluded !== false) {
    failures.push(`${label}: service status surface must not include private prompt text`);
  }
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
