#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const ledgerPath = "tests/archie-service/fixtures/token-ledger/token-ledger-sandbox.v1.json";
const gatewayPath = "tests/archie-service/fixtures/provider-registry/provider-gateway-contracts.v1.json";
const registryPath = "tests/archie-service/fixtures/provider-registry/provider-registry.v1.json";
const termsPath = "tests/archie-service/fixtures/terms/service-terms.v1.json";
const failures = [];

const requiredCaseIds = new Set([
  "ledger-normal-answer-001",
  "ledger-speech-sync-001",
  "ledger-terms-missing-negative-001",
  "ledger-provider-cost-map-negative-001",
  "ledger-auto-fund-001",
  "ledger-cap-exceeded-001",
]);

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/validate-token-ledger-sandbox.mjs --check");
}

const ledger = readJson(ledgerPath);
const gateway = readJson(gatewayPath);
const registry = readJson(registryPath);
const terms = readJson(termsPath);

validateContractRoot(ledger, gateway, terms);

const gatewayCasesById = new Map((gateway.providerGatewayCases ?? []).map((entry) => [entry.caseId, entry]));
const capabilitiesById = new Map((registry.capabilities ?? []).map((entry) => [entry.capabilityId, entry]));
const costMapByWorkUnit = new Map((ledger.tokenCostMapEntries ?? []).map((entry) => [entry.workUnit, entry]));
const ledgerCasesById = new Map((ledger.tokenLedgerCases ?? []).map((entry) => [entry.caseId, entry]));

for (const caseId of requiredCaseIds) {
  if (!ledgerCasesById.has(caseId)) {
    failures.push(`missing token-ledger sandbox case ${caseId}`);
  }
}

for (const entry of ledger.tokenLedgerCases ?? []) {
  validateLedgerCase(entry, gatewayCasesById, capabilitiesById, costMapByWorkUnit, terms);
}

if (failures.length > 0) {
  console.error(`Archie token-ledger sandbox check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie token-ledger sandbox check passed: ${ledger.tokenLedgerCases.length} ledger case(s), payments disabled`
);

function validateContractRoot(ledger, gateway, terms) {
  if (ledger.schema !== "archie-token-ledger-sandbox-contracts/v1") {
    failures.push("token-ledger sandbox contract has unexpected schema");
  }
  if (gateway.schema !== "archie-provider-gateway-contracts/v1") {
    failures.push("provider gateway contract has unexpected schema");
  }
  if (ledger.providerGatewayContractId !== gateway.contractId) {
    failures.push(
      `token-ledger gateway contract ${ledger.providerGatewayContractId} does not match ${gateway.contractId}`
    );
  }
  if (ledger.environment !== gateway.environment) {
    failures.push(`token-ledger environment ${ledger.environment} does not match ${gateway.environment}`);
  }
  if (ledger.termsVersionSetId !== terms.versionSetId || ledger.termsVersionSetId !== gateway.termsVersionSetId) {
    failures.push("token-ledger terms version must match gateway and service terms fixture");
  }
}

function validateLedgerCase(entry, gatewayCasesById, capabilitiesById, costMapByWorkUnit, terms) {
  const label = entry.caseId;
  const gatewayCase = gatewayCasesById.get(entry.gatewayCaseId);
  if (!gatewayCase) {
    failures.push(`${label}: missing provider-gateway case ${entry.gatewayCaseId}`);
    return;
  }

  compareField(label, "requestClass", entry.requestClass, gatewayCase.requestClass);
  compareArray(label, "tokenWorkUnits", entry.tokenWorkUnits, gatewayCase.tokenWorkUnits);
  compareArray(label, "receipt.workUnits", entry.receipt.workUnits, entry.tokenWorkUnits);

  const capability = capabilitiesById.get(gatewayCase.capabilityId);
  if (!capability) {
    failures.push(`${label}: missing provider capability ${gatewayCase.capabilityId}`);
  } else {
    validateCapabilityRefs(label, entry, gatewayCase, capability);
  }

  validateTermsRefs(label, entry.termsVersionRefs, terms);
  validateNoSideEffects(label, entry);
  validateCostMap(label, entry, costMapByWorkUnit);
  validateReceiptMath(label, entry);
  validateDisposition(label, entry, gatewayCase);
}

function validateCapabilityRefs(label, entry, gatewayCase, capability) {
  if (!entry.providerCapabilityRefs.some((capabilityRef) => capabilityRef.capabilityId === gatewayCase.capabilityId)) {
    failures.push(`${label}: provider capability refs must include gateway capability ${gatewayCase.capabilityId}`);
  }
  for (const capabilityRef of entry.providerCapabilityRefs) {
    if (capabilityRef.noProviderBillingInternals !== true) {
      failures.push(`${label}: provider capability ref must hide provider billing internals`);
    }
    if (capabilityRef.capabilityId === gatewayCase.capabilityId && capabilityRef.costClass !== capability.costClass) {
      failures.push(`${label}: provider capability cost class ${capabilityRef.costClass} does not match registry`);
    }
  }
}

function validateTermsRefs(label, termsVersionRefs, terms) {
  compareField(label, "serviceTermsVersion", termsVersionRefs.serviceTermsVersion, terms.serviceTermsVersion);
  compareField(label, "privacyNoticeVersion", termsVersionRefs.privacyNoticeVersion, terms.privacyNoticeVersion);
  compareField(
    label,
    "tokenSubscriptionTermsVersion",
    termsVersionRefs.tokenSubscriptionTermsVersion,
    terms.tokenSubscriptionTermsVersion
  );
  compareField(label, "generatedMediaTermsVersion", termsVersionRefs.generatedMediaTermsVersion, terms.generatedMediaTermsVersion);
}

function validateNoSideEffects(label, entry) {
  if (entry.runtimeProviderCallAllowed !== false) {
    failures.push(`${label}: runtime provider calls must stay disabled`);
  }
  if (entry.paymentsEnabled !== false || entry.paymentAttempted !== false) {
    failures.push(`${label}: token-ledger sandbox must not enable or attempt payments`);
  }
  if (entry.durableStorageEnabled !== false) {
    failures.push(`${label}: token-ledger sandbox must not enable durable storage`);
  }
  if (entry.providerPayloadIncluded !== false) {
    failures.push(`${label}: token-ledger sandbox must not expose provider payloads`);
  }
  if (entry.privatePromptIncluded !== false || entry.receipt.privatePromptIncluded !== false) {
    failures.push(`${label}: token-ledger sandbox must not expose private prompt text`);
  }
  if (entry.sourceAuthorityEffect !== "none") {
    failures.push(`${label}: token-ledger sandbox must not affect source authority`);
  }
  if (entry.receipt.autoFundApplied !== false) {
    failures.push(`${label}: fixture must not apply auto-fund without confirmation`);
  }
}

function validateCostMap(label, entry, costMapByWorkUnit) {
  const missing = entry.tokenWorkUnits.filter((workUnit) => !costMapByWorkUnit.has(workUnit));
  if (entry.costMapAvailable === true && missing.length > 0) {
    failures.push(`${label}: declares cost map available but misses ${missing.join(", ")}`);
  }
  if (entry.costMapAvailable === false) {
    if (entry.expectedLedgerDisposition !== "provider_cost_map_block") {
      failures.push(`${label}: missing cost map must use provider_cost_map_block disposition`);
    }
    if (missing.length === 0) {
      failures.push(`${label}: cost-map negative case must omit at least one requested work unit`);
    }
  }
}

function validateReceiptMath(label, entry) {
  const receipt = entry.receipt;
  if (entry.holdPlaced && receipt.heldTokens <= 0) {
    failures.push(`${label}: holdPlaced requires held tokens`);
  }
  if (!entry.holdPlaced && receipt.heldTokens !== 0) {
    failures.push(`${label}: no hold should leave held tokens at zero`);
  }
  if (receipt.heldTokens > 0 && receipt.chargedTokens + receipt.refundedTokens !== receipt.heldTokens) {
    failures.push(`${label}: charged plus refunded tokens must equal held tokens`);
  }
  if (receipt.chargedTokens > receipt.heldTokens) {
    failures.push(`${label}: charged tokens must not exceed held tokens`);
  }
  if (receipt.estimatedTokens > entry.spendingControl.perRequestCapTokens && receipt.capStatus !== "cap_exceeded") {
    if (entry.expectedLedgerDisposition !== "auto_fund_pending_block" && entry.expectedLedgerDisposition !== "terms_block") {
      failures.push(`${label}: estimate exceeds per-request cap without cap-exceeded disposition`);
    }
  }
  if (receipt.estimatedTokens > entry.spendingControl.availableBalanceTokens && entry.spendingControl.autoFundEnabled) {
    if (receipt.capStatus !== "auto_fund_pending" && entry.expectedLedgerDisposition !== "terms_block") {
      failures.push(`${label}: auto-fund-enabled insufficient balance must report auto_fund_pending`);
    }
  }
}

function validateDisposition(label, entry, gatewayCase) {
  const receipt = entry.receipt;
  switch (entry.expectedLedgerDisposition) {
    case "estimate_hold_charge_refund":
      requireReceiptState(label, entry, {
        estimateShown: true,
        holdPlaced: true,
        capStatus: "inside_limits",
        chargedPositive: true,
        refundedPositive: true,
        confirmationRequired: false,
      });
      break;
    case "charge_validated_work":
      requireReceiptState(label, entry, {
        estimateShown: true,
        holdPlaced: true,
        capStatus: "inside_limits",
        chargedPositive: true,
        refundedPositive: false,
        confirmationRequired: false,
      });
      if (!entry.tokenWorkUnits.includes("high_quality_speech")) {
        failures.push(`${label}: validated speech charge must use high_quality_speech`);
      }
      break;
    case "cap_exceeded_block":
      requireBlockedState(label, entry, "cap_exceeded", "token_cap");
      if (receipt.estimatedTokens <= entry.spendingControl.perRequestCapTokens) {
        failures.push(`${label}: cap-exceeded case must exceed per-request cap`);
      }
      break;
    case "auto_fund_pending_block":
      requireBlockedState(label, entry, "auto_fund_pending", "auto_fund");
      if (!entry.spendingControl.autoFundEnabled) {
        failures.push(`${label}: auto-fund pending case must enable auto-fund in spending control`);
      }
      if (receipt.estimatedTokens <= entry.spendingControl.availableBalanceTokens) {
        failures.push(`${label}: auto-fund pending case must exceed available balance`);
      }
      break;
    case "terms_block":
      requireBlockedState(label, entry, "privacy_confirmation_required", "privacy");
      if (gatewayCase.termsState === "fixture_terms_current") {
        failures.push(`${label}: terms-block case must originate from a blocked gateway terms state`);
      }
      break;
    case "provider_cost_map_block":
      requireBlockedState(label, entry, "estimate_required", null);
      if (entry.estimateShown !== false) {
        failures.push(`${label}: missing cost map cannot show a trustworthy estimate`);
      }
      break;
    default:
      failures.push(`${label}: unknown ledger disposition ${entry.expectedLedgerDisposition}`);
  }
}

function requireReceiptState(label, entry, expectation) {
  if (entry.estimateShown !== expectation.estimateShown) {
    failures.push(`${label}: estimateShown must be ${expectation.estimateShown}`);
  }
  if (entry.holdPlaced !== expectation.holdPlaced) {
    failures.push(`${label}: holdPlaced must be ${expectation.holdPlaced}`);
  }
  if (entry.confirmationRequired !== expectation.confirmationRequired) {
    failures.push(`${label}: confirmationRequired must be ${expectation.confirmationRequired}`);
  }
  if (entry.receipt.capStatus !== expectation.capStatus) {
    failures.push(`${label}: capStatus must be ${expectation.capStatus}`);
  }
  if (expectation.chargedPositive && entry.receipt.chargedTokens <= 0) {
    failures.push(`${label}: expected a positive token charge`);
  }
  if (expectation.refundedPositive && entry.receipt.refundedTokens <= 0) {
    failures.push(`${label}: expected a visible refund`);
  }
}

function requireBlockedState(label, entry, capStatus, requiredConfirmationReason) {
  if (entry.receipt.capStatus !== capStatus) {
    failures.push(`${label}: capStatus must be ${capStatus}`);
  }
  if (entry.holdPlaced !== false || entry.receipt.heldTokens !== 0) {
    failures.push(`${label}: blocked states must not place a hold`);
  }
  if (entry.receipt.chargedTokens !== 0 || entry.receipt.refundedTokens !== 0) {
    failures.push(`${label}: blocked states must not charge or refund tokens`);
  }
  if (requiredConfirmationReason !== null) {
    if (entry.confirmationRequired !== true) {
      failures.push(`${label}: blocked state must require confirmation`);
    }
    if (!entry.confirmationReasons.includes(requiredConfirmationReason)) {
      failures.push(`${label}: blocked state must include ${requiredConfirmationReason} confirmation reason`);
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
