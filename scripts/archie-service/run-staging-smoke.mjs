#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { buildFixtureRenderModel } from "../../src/archie-service/browser-client/fixture-render-model.mjs";
import { selectFixtureResponse } from "../../src/archie-service/http/fixture-response-selector.mjs";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const failures = [];
const smokePlanPath = "tests/archie-service/fixtures/deployment/staging-smoke-plan.v1.json";
const staticEntryPath = "tests/archie-service/fixtures/static-output/service-entry.fixture.html";
const answerRequestFixture = "tests/archie-service/fixtures/endpoints/post-answers.request.v1.json";

if (args.length !== 1 || args[0] !== "--check") {
  fail("Usage: node scripts/archie-service/run-staging-smoke.mjs --check");
}

const plan = readJson(smokePlanPath);
validatePlan(plan);
validateStaticEntry();
validateTextAnswer();
validateServiceTerms();
validateServiceStatus();
validateSecretBoundary();
validateRollbackReadiness(plan);

if (failures.length > 0) {
  console.error(`Archie staging-smoke check failed with ${failures.length} error(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Archie staging-smoke check passed: ${plan.checks.length} deployment check(s), fixture responses verified, no network`
);

function validatePlan(plan) {
  if (plan.schema !== "archie-deployment-smoke-plan/v1") {
    failures.push("deployment smoke plan has unexpected schema");
  }
  if (plan.environment !== "staging") {
    failures.push(`deployment smoke plan must target staging, found ${plan.environment}`);
  }
  const requiredChecks = new Set([
    "deploy-static-entry-001",
    "deploy-answer-text-001",
    "deploy-secret-scan-001",
    "deploy-rollback-001",
  ]);
  const checksById = new Map((plan.checks ?? []).map((entry) => [entry.id, entry]));
  for (const checkId of requiredChecks) {
    if (!checksById.has(checkId)) {
      failures.push(`deployment smoke plan missing ${checkId}`);
    }
  }
  for (const check of plan.checks ?? []) {
    if (check.status === "fail_closed") {
      failures.push(`${check.id}: smoke plan fixture must not start in fail_closed state`);
    }
  }
}

function validateStaticEntry() {
  const html = readText(staticEntryPath);
  if (!html.includes("/service-terms")) {
    failures.push("static entry must link to service terms route");
  }
  if (!html.includes("/service-status")) {
    failures.push("static entry must link to service status route");
  }
  if (/data-provider-calls-enabled=["']true["']/.test(html)) {
    failures.push("static entry must not enable provider calls");
  }
  if (/data-payments-enabled=["']true["']/.test(html)) {
    failures.push("static entry must not enable payments");
  }
}

function validateTextAnswer() {
  const selection = selectFixtureResponse({
    endpointId: "POST /answers",
    requestFixture: answerRequestFixture,
    rootDir,
  });
  const renderModel = buildFixtureRenderModel(selection);
  const manifest = selection.response;

  if (manifest.schema !== "archie-answer-artifact-manifest/v1") {
    failures.push("staging text answer must return an Answer Artifact Manifest");
  }
  if (!manifest.sourceContext?.sourceChips?.length) {
    failures.push("staging text answer must include source chips");
  }
  if (!manifest.claimContext?.claimLabel) {
    failures.push("staging text answer must include claim label");
  }
  if (!manifest.answerBody?.displayedText) {
    failures.push("staging text answer must include displayed text");
  }
  if (manifest.providerExecutionContext?.noBrowserKeys !== true) {
    failures.push("staging text answer must preserve noBrowserKeys");
  }
  if (manifest.tokenReceipt?.privatePromptIncluded !== false) {
    failures.push("staging text answer token receipt must not include private prompt text");
  }
  if (renderModel.invariants.privatePromptIncluded !== false) {
    failures.push("staging text answer render model must not include private prompt text");
  }
  validateSelectionSideEffects("staging text answer", selection);
}

function validateServiceTerms() {
  const selection = selectFixtureResponse({
    endpointId: "GET /service-terms",
    rootDir,
  });
  const renderModel = buildFixtureRenderModel(selection);
  const terms = selection.response;

  if (terms.schema !== "archie-service-terms/v1") {
    failures.push("service terms fixture has unexpected schema");
  }
  if (!exists(terms.legalTermsRoute)) {
    failures.push(`service terms legal route missing: ${terms.legalTermsRoute}`);
  }
  if (!renderModel.serviceTerms?.versionSetId || !renderModel.serviceTerms?.supportRoute) {
    failures.push("service terms render model must include version set and support route");
  }
  validateSelectionSideEffects("service terms", selection);
}

function validateServiceStatus() {
  const selection = selectFixtureResponse({
    endpointId: "GET /service-status",
    rootDir,
  });
  const renderModel = buildFixtureRenderModel(selection);
  const status = selection.response;

  if (status.schema !== "archie-service-status/v1") {
    failures.push("service status fixture has unexpected schema");
  }
  if (status.privatePromptIncluded !== false) {
    failures.push("service status must not include private prompt text");
  }
  if (!renderModel.serviceStatus?.serviceStatus || !renderModel.serviceStatus?.sourceStatus) {
    failures.push("service status render model must include service and source statuses");
  }
  validateSelectionSideEffects("service status", selection);
}

function validateSecretBoundary() {
  const result = spawnSync("node", ["scripts/archie-service/check-secret-boundary.mjs", "--check"], {
    cwd: rootDir,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    failures.push(`secret-boundary gate failed during staging smoke: ${result.stdout}\n${result.stderr}`);
  }
}

function validateRollbackReadiness(plan) {
  const snapshot = readJson("tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json");
  const providerRegistry = readJson("tests/archie-service/fixtures/provider-registry/provider-registry.v1.json");
  const terms = readJson("tests/archie-service/fixtures/terms/service-terms.v1.json");

  if (!Object.prototype.hasOwnProperty.call(snapshot, "rollbackParent")) {
    failures.push("source-index snapshot must declare rollbackParent, even when the fixture root has none");
  }
  if (!["fresh", "rollback_snapshot"].includes(snapshot.freshnessState)) {
    failures.push(`rollback readiness requires fresh or rollback snapshot state, found ${snapshot.freshnessState}`);
  }
  if (providerRegistry.environment !== plan.environment) {
    failures.push(`provider registry environment ${providerRegistry.environment} does not match smoke environment ${plan.environment}`);
  }
  if (!terms.versionSetId) {
    failures.push("rollback readiness requires a service terms version set id");
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
  return JSON.parse(readText(relativePath));
}

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
