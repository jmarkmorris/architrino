#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  reduceF5EnclosedRootLedgers,
  writeF5ReductionOnce,
} from "../../src/prescribed-path-analysis/F5EnclosedRootLedgerReducer.mjs";

function usage() {
  return [
    "Usage:",
    "  node scripts/eom/reduce-f5-enclosed-root-ledger.mjs \\",
    "    --repo-root PATH --history-manifest PATH \\",
    "    --rung PATH --rung PATH --rung PATH --out PATH",
    "",
    "Rungs must be supplied in the exact 8, 32, 128 order.",
    "The output path is create-exclusive and is never overwritten.",
  ].join("\n");
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function parseArgs(argv) {
  const result = {
    repoRoot: process.cwd(), historyManifest: null, rungFiles: [], output: null,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--repo-root" && index + 1 < argv.length) {
      result.repoRoot = path.resolve(argv[++index]);
    } else if (argument === "--rung" && index + 1 < argv.length) {
      result.rungFiles.push(path.resolve(argv[++index]));
    } else if (argument === "--history-manifest" && index + 1 < argv.length) {
      result.historyManifest = path.resolve(argv[++index]);
    } else if (argument === "--out" && index + 1 < argv.length) {
      result.output = path.resolve(argv[++index]);
    } else if (argument === "--help") {
      process.stdout.write(`${usage()}\n`);
      process.exit(0);
    } else {
      throw new Error(`unknown or incomplete argument: ${argument}`);
    }
  }
  if (result.rungFiles.length !== 3 || result.historyManifest === null ||
      result.output === null) {
    throw new Error(usage());
  }
  return result;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const entries = args.rungFiles.map((file) => {
    const bytes = readFileSync(file);
    return { packet: JSON.parse(bytes.toString("utf8")), bytes };
  });
  const historyBytes = readFileSync(args.historyManifest);
  const historyEntry = {
    manifest: JSON.parse(historyBytes.toString("utf8")),
    bytes: historyBytes,
  };
  const result = reduceF5EnclosedRootLedgers(
    entries, historyEntry, { repoRoot: args.repoRoot },
  );
  const reducerBinding = entries[0].packet.implementationBindings.find(
    (binding) => binding.id === "reducer-source",
  );
  result.reducer = { path: reducerBinding.path, sha256: reducerBinding.sha256 };
  result.rawHistoryManifest = {
    path: args.historyManifest,
    sha256: sha256Bytes(historyBytes),
  };
  result.rawRungFiles = args.rungFiles.map((file, index) => ({
    path: file,
    sha256: sha256Bytes(entries[index].bytes),
  }));
  writeF5ReductionOnce(args.output, result);
  process.stdout.write(`${JSON.stringify({
    accepted: result.accepted,
    h3EvidenceEligible: result.h3EvidenceEligible,
    totalRows: result.totalRows,
    combinedScientificLedgerSha256: result.combinedScientificLedgerSha256,
    output: args.output,
  })}\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error.message}\n`);
  process.exitCode = 1;
}
