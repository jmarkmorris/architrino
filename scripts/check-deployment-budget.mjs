#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { BORG_DATASET_MANIFEST_V1 } from "../src/apps/borg/BorgAppManifest.js";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const DEFAULT_CONTRACT_PATH = "reference/priorities/aaa-operations/contracts/deployment-budget.v1.json";

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function validateMaximum(measurement, measuredKey, maximumKey, label) {
  requireCondition(Number.isFinite(measurement[measuredKey]), `${label}: measured value is missing`);
  requireCondition(Number.isFinite(measurement[maximumKey]), `${label}: maximum is missing`);
  requireCondition(measurement[measuredKey] <= measurement[maximumKey], `${label}: measured value exceeds maximum`);
  requireCondition(measurement.status === "passed", `${label}: status is not passed`);
}

export function checkDeploymentBudget({ rootDir = ROOT, contractPath = DEFAULT_CONTRACT_PATH, contract: suppliedContract = null } = {}) {
  const contract = suppliedContract ?? readJson(rootDir, contractPath);
  requireCondition(contract.schema === "architrino.deployment-budget.v1", "invalid deployment-budget schema");
  requireCondition(contract.contractId === "deployment-budget.v1", "invalid deployment-budget id");
  requireCondition(contract.firstConsumer?.appId === "borg", "Borg is not the first deployment-budget consumer");
  requireCondition(contract.overallStatus === "warning", "deployment status must preserve the live Actions overlap warning");

  const instrument = contract.instrument?.browserProbe;
  for (const [pathKey, bytesKey, hashKey] of [
    ["htmlPath", "htmlBytes", "htmlSha256"],
    ["scriptPath", "scriptBytes", "scriptSha256"],
  ]) {
    const absolutePath = path.join(rootDir, instrument[pathKey]);
    const stat = fs.statSync(absolutePath);
    requireCondition(stat.size === instrument[bytesKey], `deployment probe byte count changed for ${instrument[pathKey]}`);
    requireCondition(sha256File(absolutePath) === instrument[hashKey], `deployment probe hash changed for ${instrument[pathKey]}`);
  }

  const measurements = contract.measurements;
  validateMaximum(measurements.bundleSizeBytes, "measuredBytes", "maximumBytes", "bundle size");
  validateMaximum(measurements.staticAssetTransferBytes, "measuredBytes", "maximumBytes", "static asset transfer");
  validateMaximum(measurements.githubPagesBandwidthEstimate, "estimatedMonthlyBytes", "maximumMonthlyBytes", "Pages bandwidth estimate");
  validateMaximum(measurements.browserHeapBudget, "measuredBytes", "maximumBytes", "browser heap");
  validateMaximum(measurements.gpuMemoryBudget, "measuredMinimumBytes", "maximumMinimumBytes", "GPU surface lower bound");
  validateMaximum(measurements.browserStorageBudget, "measuredBytes", "maximumBytes", "browser storage");
  validateMaximum(measurements.generatedOutputBudget, "siteMeasuredBytes", "siteMaximumBytes", "generated site output");

  const actions = measurements.actionsArtifactBudget;
  requireCondition(actions.status === "warning", "Actions overlap warning is missing");
  requireCondition(actions.measuredAggregateBytes > actions.maximumAggregateBytes, "Actions warning does not describe an exceeded threshold");
  requireCondition(contract.warningCodes.includes("ACTIONS_ARTIFACT_AGGREGATE_ABOVE_CONSERVATIVE_THRESHOLD"), "Actions warning code is missing");

  const throughput = measurements.nativeSolverThroughput;
  requireCondition(throughput.status === "reported-separately-not-measured", "EOM throughput boundary changed");
  requireCondition(throughput.measurement === null, "deployment contract must not fabricate EOM throughput");
  requireCondition(throughput.deploymentStatusDependency === false, "EOM throughput was merged into deployment status");

  const consumer = BORG_DATASET_MANIFEST_V1.deploymentBudget;
  requireCondition(consumer.contractId === contract.contractId, "Borg deployment-budget contract id changed");
  requireCondition(consumer.contractPath === contractPath, "Borg deployment-budget path changed");
  requireCondition(consumer.deploymentBudgetStatus === contract.overallStatus, "Borg deployment status disagrees with the contract");
  for (const key of [
    "bundleSizeBytes",
    "staticAssetTransferBytes",
    "githubPagesBandwidthEstimate",
    "browserHeapBudget",
    "gpuMemoryBudget",
    "browserStorageBudget",
    "actionsArtifactBudget",
    "generatedOutputBudget",
    "nativeSolverThroughput",
  ]) {
    requireCondition(JSON.stringify(consumer[key]) === JSON.stringify(measurements[key]), `Borg deployment field ${key} disagrees with the contract`);
  }

  return {
    schema: contract.schema,
    status: contract.overallStatus,
    firstConsumer: contract.firstConsumer.appId,
    warningCodes: contract.warningCodes,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(checkDeploymentBudget(), null, 2));
}
