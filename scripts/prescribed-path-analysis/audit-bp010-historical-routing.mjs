#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_BATCH = ".local-data/braid-analysis/f6c-whole-history-20260828/continuation/prepared-batch-3-4-5-v1";
const DEFAULT_ARCHIVES = ".local-data/braid-analysis/f6c-whole-history-20260828/continuation-source-archives";
const ROLES = ["producer", "producerControls", "verifier", "verifierControls"];
const HISTORICAL_OWNER_GIT_SOURCE = Object.freeze({
  commit: "0fb575921783188ce528a45c671090e9ecc00464",
  path: "reference/priorities/braid-program/evidence/2026-08-27-braid-search-launch-readiness.md",
  bytes: 359719,
  sha256: "04a889345ee7c4cd43b0f41bebb70cb2f176ac4d13af035204347f3c6904feaf",
});

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function identity(path) {
  if (!existsSync(path)) return { path, exists: false };
  return { path, exists: true, bytes: statSync(path).size, sha256: sha256(path) };
}

function same(binding, observed) {
  return observed.exists && observed.bytes === binding.bytes && observed.sha256 === binding.sha256;
}

function archiveCandidate(archiveRoot, binding) {
  const direct = resolve(archiveRoot, binding.sha256, basename(binding.path));
  if (existsSync(direct)) return direct;
  return resolve(archiveRoot, "parent-batch-c0e0f-source-preparation", binding.sha256, `${basename(binding.path)}.archive`);
}

export function auditHistoricalRouting({ batchDirectory = DEFAULT_BATCH, archiveDirectory = DEFAULT_ARCHIVES } = {}) {
  const batchRoot = resolve(batchDirectory);
  const archiveRoot = resolve(archiveDirectory);
  const parents = [];
  for (const parentIndex of [3, 4, 5]) {
    const planPath = resolve(batchRoot, `parent-${parentIndex}.plan.json`);
    const plan = JSON.parse(readFileSync(planPath));
    if (plan.parentIndex !== parentIndex || plan.scope !== `original-parent-${parentIndex}-emission-refinement`) {
      throw new Error(`parent ${parentIndex} plan identity differs`);
    }
    const declaredRoutes = new Map((plan.historicalDocumentRoutes ?? []).map((route) => [
      `${route.original.path}|${route.original.sha256}|${route.original.bytes}`,
      route.physical,
    ]));
    const bindings = [
      ...ROLES.map((role) => ({ role, binding: plan[role], executionClass: "historical-nonexecuting-wrapper" })),
      ...plan.operationalBindings.slice(0, 2).map((binding, index) => ({
        role: index === 0 ? "operationalEntry" : "operationalControls",
        binding,
        executionClass: "historical-operational-wrapper-not-authorized-for-execution",
      })),
      { role: "acceptanceOwner", binding: plan.acceptanceOwner, executionClass: "historical-nonexecuting-document" },
    ];
    const rows = bindings.map(({ role, binding, executionClass }) => {
      const logicalPath = resolve(binding.path);
      const current = identity(logicalPath);
      const key = `${binding.path}|${binding.sha256}|${binding.bytes}`;
      const declared = declaredRoutes.get(key);
      const inferredPath = archiveCandidate(archiveRoot, binding);
      const physical = identity(declared?.path ?? inferredPath);
      return {
        role,
        executionClass,
        logical: binding,
        current,
        currentMatchesHistoricalBinding: same(binding, current),
        routeDeclaredInPlan: declared != null,
        physical,
        physicalMatchesHistoricalBinding: same(binding, physical),
      };
    });
    parents.push({
      parentIndex,
      plan: identity(planPath),
      declaredHistoricalDocumentRoutes: plan.historicalDocumentRoutes ?? [],
      rows,
      completeHistoricalByteInventory: rows.every((row) => row.currentMatchesHistoricalBinding || row.physicalMatchesHistoricalBinding),
      completePlanRouteInventory: rows.every((row) => row.currentMatchesHistoricalBinding || row.routeDeclaredInPlan),
      currentGenerationMatchesAllHistoricalBindings: rows.every((row) => row.currentMatchesHistoricalBinding),
    });
  }
  const firstRows = JSON.stringify(parents[0].rows.map((row) => ({
    role: row.role,
    logical: row.logical,
    physical: row.physical,
  })));
  for (const parent of parents.slice(1)) {
    const rows = JSON.stringify(parent.rows.map((row) => ({ role: row.role, logical: row.logical, physical: row.physical })));
    if (rows !== firstRows) throw new Error("parents 3-5 do not share one historical source generation");
  }
  return {
    schema: "braid-program/bp010-historical-routing-audit.v1",
    parents,
    decision: {
      historicalSourceBytesLocated: parents.every((row) => row.completeHistoricalByteInventory),
      missingLocalArchiveRoles: [...new Set(parents.flatMap((parent) => parent.rows
        .filter((row) => !row.currentMatchesHistoricalBinding && !row.physicalMatchesHistoricalBinding)
        .map((row) => row.role)))],
      historicalAcceptanceOwnerGitSource: HISTORICAL_OWNER_GIT_SOURCE,
      preparedPlansExecutableAsHistoricalRoutes: parents.every((row) => row.completePlanRouteInventory),
      currentTreeReplayIsHistoricalValidation: false,
      nextObject: "materialize the exact acceptance-owner blob from the named Git commit into the approved private archive, encode and independently review that route in the parent-3-5 consumer admission without changing logical historical bindings, and execute separately captured current code only",
    },
    claimBoundary: "read-only source-routing inventory; no historical acceptance renewal, numerical execution, acceleration evaluation, whole-history coverage, or M05/M06 verdict",
    falsifier: "a reported physical archive with different bytes or SHA-256, a missing parent plan, a cross-parent generation mismatch, or a consumer that accepts an undeclared or unused route",
  };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(auditHistoricalRouting(), null, 2));
}
