#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OBJECT_ID_PATTERN = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/i;
const ZERO_OBJECT_ID_PATTERN = /^(?:0{40}|0{64})$/;

function isObjectId(value) {
  return OBJECT_ID_PATTERN.test(String(value ?? ""));
}

function isZeroObjectId(value) {
  return ZERO_OBJECT_ID_PATTERN.test(String(value ?? ""));
}

export function parsePrePushUpdates(input) {
  const lines = String(input ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { ok: false, reason: "no ref updates received", updates: [] };
  }

  const updates = [];
  for (const line of lines) {
    const fields = line.split(/\s+/);
    if (fields.length !== 4) {
      return { ok: false, reason: "malformed ref update", updates: [] };
    }
    const [localRef, localOid, remoteRef, remoteOid] = fields;
    if (!isObjectId(localOid) || !isObjectId(remoteOid)) {
      return { ok: false, reason: "malformed object id", updates: [] };
    }
    updates.push({ localRef, localOid, remoteRef, remoteOid });
  }

  return { ok: true, reason: "parsed ref updates", updates };
}

export function classifyPrePushGate({ input, originMainOid }) {
  const parsed = parsePrePushUpdates(input);
  if (!parsed.ok) {
    return { action: "run", reason: parsed.reason };
  }

  if (parsed.updates.every((update) => isZeroObjectId(update.localOid))) {
    return { action: "skip", reason: "all updates delete remote refs" };
  }

  const normalizedOriginMainOid = String(originMainOid ?? "").trim();
  const originMainIsUsable =
    isObjectId(normalizedOriginMainOid) &&
    !isZeroObjectId(normalizedOriginMainOid);
  if (!originMainIsUsable) {
    return { action: "run", reason: "origin/main object id unavailable" };
  }

  const createsExactSuccessorBranches = parsed.updates.every(
    ({ localRef, localOid, remoteRef, remoteOid }) =>
      localRef === remoteRef &&
      remoteRef.startsWith("refs/heads/codex/") &&
      localOid === normalizedOriginMainOid &&
      isZeroObjectId(remoteOid)
  );

  if (createsExactSuccessorBranches) {
    return {
      action: "skip",
      reason: "all updates create codex branches at exact origin/main",
    };
  }

  return { action: "run", reason: "push contains content-bearing ref updates" };
}

function readOriginMainOid(argv) {
  const optionIndex = argv.indexOf("--origin-main-oid");
  return optionIndex >= 0 ? argv[optionIndex + 1] ?? "" : "";
}

function runCli() {
  const decision = classifyPrePushGate({
    input: fs.readFileSync(0, "utf8"),
    originMainOid: readOriginMainOid(process.argv.slice(2)),
  });
  process.stdout.write(`${decision.action}\t${decision.reason}\n`);
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath && fileURLToPath(import.meta.url) === invokedPath) {
  runCli();
}
