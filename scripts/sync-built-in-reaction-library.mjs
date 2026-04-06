#!/usr/bin/env node

import { syncBuiltInReactionLibrary } from "./reaction-library-build-runtime.mjs";

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function printUsage(exitCode = 0) {
  process.stdout.write(
    [
      "Usage: node scripts/sync-built-in-reaction-library.mjs [--check|--write] [--accepted-at <iso>]",
      "",
      "Synchronize the checked-in built-in Reaction library fixtures from the canonical",
      "PDG solver-request inputs through the full solver -> Reaction accepted-library path.",
    ].join("\n") + "\n"
  );
  process.exit(exitCode);
}

function parseArgs(argv = []) {
  const args = new Set(argv);
  const unknownArgs = [...args].filter(
    (arg) => !["--check", "--write", "--accepted-at", "--help", "-h"].includes(arg)
  );
  if (args.has("--help") || args.has("-h")) {
    printUsage(0);
  }
  if (unknownArgs.length) {
    process.stderr.write(`Unknown argument(s): ${unknownArgs.join(", ")}\n`);
    printUsage(2);
  }
  const mode = args.has("--write") ? "write" : "check";
  if (args.has("--write") && args.has("--check")) {
    process.stderr.write("Use either --check or --write, not both.\n");
    printUsage(2);
  }
  let acceptedAt = "";
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--accepted-at") {
      acceptedAt = normalizeText(argv[index + 1]);
      index += 1;
    }
  }
  return {
    mode,
    acceptedAt,
  };
}

function printItemList(title = "", items = [], field = "") {
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }
  process.stdout.write(`- ${title} (${items.length})\n`);
  for (const item of items) {
    process.stdout.write(`  - ${field ? item?.[field] : item}\n`);
  }
}

try {
  const args = parseArgs(process.argv.slice(2));
  const result = syncBuiltInReactionLibrary({
    mode: args.mode,
    acceptedAt: args.acceptedAt,
  });
  process.stdout.write(`built-in reaction library sync mode: ${result.mode}\n`);
  process.stdout.write(`- Requests scanned: ${result.requestCount}\n`);
  process.stdout.write(`- Entries emitted: ${result.entryCount}\n`);
  process.stdout.write(`- Exact entries: ${result.exactEntryCount}\n`);
  process.stdout.write(`- Non-exact entries: ${result.nonExactEntryCount}\n`);
  if (result.defaultEntryId) {
    process.stdout.write(`- Default entry: ${result.defaultEntryId}\n`);
  }
  printItemList("updated", result.changedPaths);
  printItemList("drift", result.driftPaths);
  if (Array.isArray(result.generationErrors) && result.generationErrors.length) {
    process.stdout.write(`- generation errors (${result.generationErrors.length})\n`);
    for (const error of result.generationErrors) {
      process.stdout.write(
        `  - ${error.outputPath}: ${error.message}\n`
      );
    }
  }
  const failed =
    result.generationErrors.length > 0 ||
    (result.mode === "check" && result.driftPaths.length > 0);
  if (failed) {
    process.exitCode = 1;
  }
} catch (error) {
  process.stderr.write(`${error?.stack || error?.message || String(error)}\n`);
  process.exitCode = 1;
}
