import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const SOURCE_COMMANDS = {
  fixtures: {
    list: "list-fixtures",
    printProposal: "print-fixture-proposal",
    printRequest: "print-fixture-solver-request",
  },
  live: {
    list: "list-live-cases",
    printProposal: "print-live-proposal",
    printRequest: "print-live-solver-request",
  },
};

function parseArgs(argv) {
  const options = {
    source: "live",
    outDir: "",
    databaseUrl: "",
    caseIds: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--source") {
      options.source = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg === "--out-dir") {
      options.outDir = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg === "--database-url") {
      options.databaseUrl = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg === "--case") {
      options.caseIds.push(argv[index + 1] ?? "");
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Object.prototype.hasOwnProperty.call(SOURCE_COMMANDS, options.source)) {
    throw new Error(`Unsupported --source ${JSON.stringify(options.source)}. Use fixtures or live.`);
  }

  options.caseIds = options.caseIds.filter(Boolean);
  return options;
}

function printUsage() {
  process.stdout.write(
    [
      "Usage: node scripts/pdg-closure-sweep.mjs [--source live|fixtures] [--case <id>] [--database-url <url>] [--out-dir <dir>]",
      "",
      "Runs one PDG case at a time through:",
      "  pdgfeed.py -> solver-request/v1 -> solve-reaction.mjs -> solver-result/v1",
      "",
      "Defaults:",
      "  --source live",
      "  --out-dir /tmp/pdg-closure-sweep-XXXXXX",
    ].join("\n") + "\n"
  );
}

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function runCommand(command, args, input = "") {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    input,
  });
  return {
    command,
    args,
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    error: result.error ? String(result.error) : "",
  };
}

function sanitizeCaseId(caseId) {
  return caseId.replace(/[^a-zA-Z0-9._-]+/g, "_");
}

function parseListedCases(stdout) {
  return stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [caseId, ...titleParts] = line.split("\t");
      return {
        caseId,
        title: titleParts.join("\t"),
      };
    });
}

function selectCases(listedCases, requestedCaseIds) {
  if (requestedCaseIds.length === 0) {
    return listedCases;
  }
  const listedById = new Map(listedCases.map((entry) => [entry.caseId, entry]));
  const missing = requestedCaseIds.filter((caseId) => !listedById.has(caseId));
  if (missing.length > 0) {
    throw new Error(`Unknown case id(s): ${missing.join(", ")}`);
  }
  return requestedCaseIds.map((caseId) => listedById.get(caseId));
}

function buildRunDir(outDir) {
  if (outDir) {
    ensureDir(outDir);
    return outDir;
  }
  return fs.mkdtempSync(path.join(os.tmpdir(), "pdg-closure-sweep-"));
}

function writeJson(filePath, payload) {
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function writeText(filePath, text) {
  fs.writeFileSync(filePath, text, "utf8");
}

function formatCommandLog(label, execution) {
  return [
    `[${label}] ${execution.command} ${execution.args.join(" ")}`,
    `exit=${execution.status === null ? "null" : execution.status}`,
    execution.error ? `error=${execution.error}` : "",
    "--- stdout ---",
    execution.stdout.trimEnd(),
    "--- stderr ---",
    execution.stderr.trimEnd(),
    "",
  ]
    .filter((entry, index, entries) => entry !== "" || index === entries.length - 1)
    .join("\n");
}

function exactPercent(exactCount, testedCount) {
  if (testedCount === 0) {
    return 0;
  }
  return Number(((exactCount / testedCount) * 100).toFixed(2));
}

function summarizeOutcomeCounts(results) {
  const counts = {
    exact: 0,
    partial: 0,
    ambiguous: 0,
    unsupported: 0,
    "unsupported-input": 0,
    "no-solution": 0,
    "request-error": 0,
    "solve-error": 0,
  };
  for (const entry of results) {
    counts[entry.status] = (counts[entry.status] ?? 0) + 1;
  }
  return counts;
}

function extractUnsupportedParticleNames(notes) {
  if (!Array.isArray(notes)) {
    return [];
  }
  return notes
    .map((note) => String(note))
    .filter((note) => note.startsWith("unsupported:"))
    .flatMap((note) => {
      const parts = note.split(":");
      const side = parts[1] ?? "";
      const particle = parts[2] ?? "";
      if ((side !== "reactant" && side !== "product") || !particle || particle === "unknown") {
        return [];
      }
      return [particle];
    });
}

function accumulateUnsupportedParticleCounts(counts, particleNames) {
  for (const particleName of particleNames) {
    counts[particleName] = (counts[particleName] ?? 0) + 1;
  }
}

function buildTopUnsupportedParticles(unsupportedParticleCounts, limit = 5) {
  return Object.entries(unsupportedParticleCounts)
    .sort((left, right) => {
      if (right[1] !== left[1]) {
        return right[1] - left[1];
      }
      return left[0].localeCompare(right[0]);
    })
    .slice(0, limit)
    .map(([particle, count]) => ({ particle, count }));
}

function buildReport(summary) {
  const lines = [
    `PDG closure sweep`,
    `runDir: ${summary.runDir}`,
    `source: ${summary.source}`,
    `reactionsTested: ${summary.reactionsTested}`,
    `analyzableReactions: ${summary.analyzableReactionCount}`,
    `reactionsNotYetAnalyzed: ${summary.reactionsNotYetAnalyzed}`,
    `exactClosures: ${summary.exactClosureCount}`,
    `exactClosurePercent: ${summary.exactClosurePercent}%`,
    `partialClosures: ${summary.outcomeCounts.partial}`,
    `noSolution: ${summary.outcomeCounts["no-solution"]}`,
    `unsupportedInputs: ${summary.outcomeCounts["unsupported-input"]}`,
    `requestErrors: ${summary.outcomeCounts["request-error"]}`,
    `solveErrors: ${summary.outcomeCounts["solve-error"]}`,
    "",
    "Top unsupported particles:",
  ];

  if (summary.topUnsupportedParticles.length === 0) {
    lines.push("(none)");
  } else {
    for (const entry of summary.topUnsupportedParticles) {
      lines.push(`${entry.particle}\t${entry.count}`);
    }
  }

  lines.push(
    "",
    "Per case:",
  );

  for (const entry of summary.cases) {
    lines.push(
      `${entry.caseId}\t${entry.status}\texact=${entry.exact}\tunresolved=${entry.unresolvedTargetCount}\tunsupported=${entry.unsupportedParticles.join(",")}`
    );
  }
  return `${lines.join("\n")}\n`;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const runDir = buildRunDir(options.outDir);
  const commandSet = SOURCE_COMMANDS[options.source];
  const databaseArgs = options.databaseUrl ? ["--database-url", options.databaseUrl] : [];

  const listExecution = runCommand("python3", ["pdgfeed.py", commandSet.list, ...databaseArgs]);
  if (listExecution.status !== 0) {
    writeText(path.join(runDir, "list.log"), formatCommandLog("list", listExecution));
    throw new Error(`Failed to list ${options.source} PDG cases. See ${path.join(runDir, "list.log")}`);
  }

  const listedCases = parseListedCases(listExecution.stdout);
  const selectedCases = selectCases(listedCases, options.caseIds);
  const results = [];
  const runLogParts = [formatCommandLog("list", listExecution)];
  const unsupportedParticleCounts = {};

  for (const entry of selectedCases) {
    const safeCaseId = sanitizeCaseId(entry.caseId);
    const caseDir = path.join(runDir, safeCaseId);
    ensureDir(caseDir);

    const proposalExecution = runCommand("python3", ["pdgfeed.py", commandSet.printProposal, entry.caseId, ...databaseArgs]);
    runLogParts.push(formatCommandLog(`${entry.caseId}:proposal`, proposalExecution));
    writeText(path.join(caseDir, "proposal.log"), formatCommandLog("proposal", proposalExecution));

    if (proposalExecution.status !== 0) {
      results.push({
        caseId: entry.caseId,
        title: entry.title,
        status: "request-error",
        exact: false,
        unresolvedTargetCount: null,
        unsupportedParticles: [],
        proposalPath: null,
        requestPath: null,
        resultPath: null,
      });
      continue;
    }

    const proposal = JSON.parse(proposalExecution.stdout);
    const proposalPath = path.join(caseDir, `${safeCaseId}.proposal.v1.json`);
    writeJson(proposalPath, proposal);
    const unsupportedParticles = extractUnsupportedParticleNames(proposal.notes);
    accumulateUnsupportedParticleCounts(unsupportedParticleCounts, unsupportedParticles);

    if (proposal.exportable !== true) {
      results.push({
        caseId: entry.caseId,
        title: entry.title,
        status: "unsupported-input",
        exact: false,
        unresolvedTargetCount: null,
        unsupportedParticles,
        proposalPath,
        requestPath: null,
        resultPath: null,
      });
      continue;
    }

    const requestExecution = runCommand("python3", ["pdgfeed.py", commandSet.printRequest, entry.caseId, ...databaseArgs]);
    runLogParts.push(formatCommandLog(`${entry.caseId}:request`, requestExecution));
    writeText(path.join(caseDir, "request.log"), formatCommandLog("request", requestExecution));

    if (requestExecution.status !== 0) {
      results.push({
        caseId: entry.caseId,
        title: entry.title,
        status: "request-error",
        exact: false,
        unresolvedTargetCount: null,
        unsupportedParticles,
        proposalPath,
        requestPath: null,
        resultPath: null,
      });
      continue;
    }

    const request = JSON.parse(requestExecution.stdout);
    const requestPath = path.join(caseDir, `${safeCaseId}.solver-request.v1.json`);
    writeJson(requestPath, request);

    const solveExecution = runCommand(process.execPath, ["scripts/solve-reaction.mjs"], requestExecution.stdout);
    runLogParts.push(formatCommandLog(`${entry.caseId}:solve`, solveExecution));
    writeText(path.join(caseDir, "solve.log"), formatCommandLog("solve", solveExecution));

    if (solveExecution.status !== 0) {
      results.push({
        caseId: entry.caseId,
        title: entry.title,
        status: "solve-error",
        exact: false,
        unresolvedTargetCount: null,
        unsupportedParticles,
        proposalPath,
        requestPath,
        resultPath: null,
      });
      continue;
    }

    const result = JSON.parse(solveExecution.stdout);
    const resultPath = path.join(caseDir, `${safeCaseId}.solver-result.v1.json`);
    writeJson(resultPath, result);

    results.push({
      caseId: entry.caseId,
      title: entry.title,
      status: result?.summary?.outcome ?? "solve-error",
      exact: result?.summary?.exact === true,
      unresolvedTargetCount: Number.isInteger(result?.summary?.unresolvedTargetCount)
        ? result.summary.unresolvedTargetCount
        : null,
      unsupportedParticles,
      proposalPath,
      requestPath,
      resultPath,
    });
  }

  writeText(path.join(runDir, "run.log"), runLogParts.join("\n"));

  const reactionsTested = results.length;
  const analyzableResults = results.filter((entry) => entry.status !== "unsupported-input");
  const reactionsNotYetAnalyzed = results.filter((entry) => entry.status === "unsupported-input").length;
  const analyzableReactionCount = analyzableResults.length;
  const exactClosureCount = analyzableResults.filter((entry) => entry.exact).length;
  const summary = {
    source: options.source,
    runDir,
    reactionsTested,
    analyzableReactionCount,
    reactionsNotYetAnalyzed,
    exactClosureCount,
    exactClosurePercent: exactPercent(exactClosureCount, analyzableReactionCount),
    outcomeCounts: summarizeOutcomeCounts(results),
    unsupportedParticleCounts,
    topUnsupportedParticles: buildTopUnsupportedParticles(unsupportedParticleCounts),
    cases: results,
  };

  writeJson(path.join(runDir, "summary.json"), summary);
  const report = buildReport(summary);
  writeText(path.join(runDir, "report.txt"), report);
  process.stdout.write(report);
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error?.stack || error?.message || String(error)}\n`);
  process.exitCode = 1;
}
