import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
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
    manifestPath: "",
    cursorPath: "",
    limit: null,
    startBatchId: null,
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
    if (arg === "--manifest") {
      options.manifestPath = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg === "--cursor") {
      options.cursorPath = argv[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg === "--limit") {
      options.limit = Number.parseInt(argv[index + 1] ?? "", 10);
      index += 1;
      continue;
    }
    if (arg === "--start-batch-id") {
      options.startBatchId = Number.parseInt(argv[index + 1] ?? "", 10);
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!options.manifestPath && !Object.prototype.hasOwnProperty.call(SOURCE_COMMANDS, options.source)) {
    throw new Error(`Unsupported --source ${JSON.stringify(options.source)}. Use fixtures or live.`);
  }
  if (options.limit !== null && (!Number.isInteger(options.limit) || options.limit <= 0)) {
    throw new Error(`--limit must be a positive integer.`);
  }
  if (
    options.startBatchId !== null &&
    (!Number.isInteger(options.startBatchId) || options.startBatchId <= 0)
  ) {
    throw new Error(`--start-batch-id must be a positive integer.`);
  }

  options.caseIds = options.caseIds.filter(Boolean);
  return options;
}

function printUsage() {
  process.stdout.write(
    [
      "Usage: node scripts/pdg-closure-sweep.mjs [--source live|fixtures] [--case <id>] [--database-url <url>] [--out-dir <dir>]",
      "   or: node scripts/pdg-closure-sweep.mjs --manifest <path> [--cursor <path>] [--start-batch-id <n>] [--limit <n>] [--out-dir <dir>]",
      "",
      "Runs one PDG case at a time through:",
      "  pdgfeed.py -> solver-request/v1 -> solve-reaction.mjs -> solver-result/v1",
      "",
      "In manifest mode, consumes frozen manifest rows with sequential batch ids and optional cursor advancement.",
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

function resolvePythonCommand() {
  const virtualEnv = String(process.env.VIRTUAL_ENV ?? "").trim();
  if (virtualEnv) {
    const virtualEnvPython = path.join(virtualEnv, "bin", "python");
    if (fs.existsSync(virtualEnvPython)) {
      return virtualEnvPython;
    }
  }
  return "python3";
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function computeFileHash(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
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

function extractUnsupportedParticipantMentions(notes) {
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
      return [{ side, particle }];
    });
}

function extractUnsupportedParticleNames(notes) {
  return extractUnsupportedParticipantMentions(notes).map((entry) => entry.particle);
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

function getParticipantInventoryFlags(participant) {
  return Array.isArray(participant?.inventory?.flags) ? participant.inventory.flags : [];
}

function getFlagValue(flags, prefix) {
  const match = flags.find((flag) => typeof flag === "string" && flag.startsWith(prefix));
  return match ? match.slice(prefix.length) : "";
}

function compactTokenFromProposalParticipant(participant) {
  const flags = getParticipantInventoryFlags(participant);
  const pdgName = String(participant?.pdgName || getFlagValue(flags, "pdg-name:") || "").trim();
  switch (pdgName) {
    case "p":
      return "P";
    case "anti-p":
      return "aP";
    case "n":
      return "N";
    case "anti-n":
      return "aN";
    case "e-":
      return "e";
    case "e+":
      return "ae";
    case "mu-":
      return "e2";
    case "mu+":
      return "ae2";
    case "tau-":
      return "e3";
    case "tau+":
      return "ae3";
    case "nu_e":
      return "v";
    case "anti-nu_e":
      return "av";
    case "nu_mu":
      return "v2";
    case "anti-nu_mu":
      return "av2";
    case "nu_tau":
      return "v3";
    case "anti-nu_tau":
      return "av3";
    case "gamma":
      return "2h";
    case "pi+":
      return "pi+";
    case "pi-":
      return "pi-";
    case "pi0":
      return "pi0";
    case "B+":
      return "B+";
    case "B-":
      return "B-";
    case "B0":
      return "dB0";
    case "anti-B0":
      return "bB0";
    case "W+":
    case "W-":
    case "Z":
      return pdgName;
    default:
      break;
  }

  const generation = String(getFlagValue(flags, "generation:") || "").trim();
  const family = String(participant?.family || "").trim();
  const polarity = String(participant?.polarity || "").trim();
  const templateId = String(participant?.templateId || "").trim();

  if (family === "lepton" && templateId === "electron") {
    const generationSuffix = generation && generation !== "1" ? generation : "";
    return `${polarity === "anti" ? "ae" : "e"}${generationSuffix}`;
  }
  if (family === "lepton" && templateId === "neutrino") {
    const generationSuffix = generation && generation !== "1" ? generation : "";
    return `${polarity === "anti" ? "av" : "v"}${generationSuffix}`;
  }
  if (templateId === "proton") {
    return polarity === "anti" ? "aP" : "P";
  }
  if (templateId === "neutron") {
    return polarity === "anti" ? "aN" : "N";
  }
  if (templateId === "upi0" || templateId === "dpi0") {
    return "pi0";
  }
  if (templateId === "b_plus") {
    return "B+";
  }
  if (templateId === "b_minus") {
    return "B-";
  }
  if (templateId === "dB0" || templateId === "db0") {
    return "dB0";
  }
  if (templateId === "bB0" || templateId === "bb0") {
    return "bB0";
  }

  return String(participant?.templateId || participant?.label || participant?.id || "?");
}

function buildCompactSideNotation(proposal, sideKey) {
  const singularSide = sideKey === "reactants" ? "reactant" : "product";
  const participantTokens = Array.isArray(proposal?.[sideKey])
    ? proposal[sideKey].map((participant) => compactTokenFromProposalParticipant(participant))
    : [];
  const unsupportedTokens = extractUnsupportedParticipantMentions(proposal?.notes)
    .filter((entry) => entry.side === singularSide)
    .map((entry) => entry.particle);
  const tokens = [...participantTokens, ...unsupportedTokens].filter(Boolean);
  return tokens.length > 0 ? tokens.join(".") : "-";
}

function loadCursor(cursorPath) {
  if (!cursorPath || !fs.existsSync(cursorPath)) {
    return null;
  }
  return readJson(cursorPath);
}

function writeCursor(cursorPath, payload) {
  if (!cursorPath) {
    return;
  }
  writeJson(cursorPath, payload);
}

function resolveManifestSelection(manifest, options) {
  const manifestEntries = Array.isArray(manifest?.entries) ? [...manifest.entries] : [];
  manifestEntries.sort((left, right) => Number(left?.batchId ?? 0) - Number(right?.batchId ?? 0));
  const cursor = loadCursor(options.cursorPath);
  const cursorStartBatchId = Number.isInteger(cursor?.nextBatchId) ? cursor.nextBatchId : null;
  const requestedStartBatchId = Number.isInteger(options.startBatchId) ? options.startBatchId : null;
  const startBatchId = requestedStartBatchId ?? cursorStartBatchId ?? Number(manifestEntries[0]?.batchId ?? 1);
  const selectedEntries = manifestEntries.filter((entry) => Number(entry?.batchId ?? 0) >= startBatchId);
  const limitedEntries = options.limit === null ? selectedEntries : selectedEntries.slice(0, options.limit);
  return {
    cursor,
    startBatchId,
    entries: limitedEntries,
  };
}

function buildReport(summary) {
  const lines = [
    `PDG closure sweep`,
    `runDir: ${summary.runDir}`,
    `source: ${summary.source}`,
    summary.manifestPath ? `manifest: ${summary.manifestPath}` : "",
    Number.isInteger(summary.startBatchId) ? `startBatchId: ${summary.startBatchId}` : "",
    Number.isInteger(summary.endBatchId) ? `endBatchId: ${summary.endBatchId}` : "",
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
    "Top unsupported particles in this run:",
  ].filter(Boolean);

  if (summary.topUnsupportedParticles.length === 0) {
    lines.push("(none)");
  } else {
    for (const entry of summary.topUnsupportedParticles) {
      lines.push(`${entry.particle}\t${entry.count}`);
    }
  }

  if (Number.isInteger(summary.discoveredUnsupportedReactionCount)) {
    lines.push(
      "",
      `Discovered unsupported reactions outside this batch: ${summary.discoveredUnsupportedReactionCount}`,
      "Top unsupported particles across all discovered unsupported reactions:"
    );
    if (summary.discoveredTopUnsupportedParticles.length === 0) {
      lines.push("(none)");
    } else {
      for (const entry of summary.discoveredTopUnsupportedParticles) {
        lines.push(`${entry.particle}\t${entry.count}`);
      }
    }
  }

  lines.push("", "Per case:");
  lines.push("batchId\tcaseId\tstatus\texact\tunresolved\treactants\tproducts\tunsupported\tpdgIdentifier");

  for (const entry of summary.cases) {
    const batchLabel = Number.isInteger(entry.batchId) ? String(entry.batchId) : "";
    lines.push(
      [
        batchLabel,
        entry.caseId,
        entry.status,
        `exact=${entry.exact}`,
        `unresolved=${entry.unresolvedTargetCount}`,
        entry.reactantsCompact || "-",
        entry.productsCompact || "-",
        entry.unsupportedParticles.join(","),
        entry.pdgIdentifier || "",
      ].join("\t")
    );
  }
  return `${lines.join("\n")}\n`;
}

function buildManifestItems(options) {
  const manifestPath = path.resolve(process.cwd(), options.manifestPath);
  const manifest = readJson(manifestPath);
  if (manifest?.schema !== "pdg-live-manifest/v1") {
    throw new Error(`Unsupported manifest schema in ${manifestPath}`);
  }
  const manifestHash = computeFileHash(manifestPath);
  const selection = resolveManifestSelection(manifest, options);
  if (selection.cursor && selection.cursor.manifestHash && selection.cursor.manifestHash !== manifestHash) {
    throw new Error(`Cursor manifest hash does not match ${manifestPath}`);
  }
  return {
    manifestPath,
    manifestHash,
    manifest,
    startBatchId: Number.isInteger(selection.startBatchId) ? selection.startBatchId : null,
    items: selection.entries.map((entry) => ({
      batchId: Number(entry.batchId),
      caseId: String(entry.caseId || entry.pdgIdentifier || `batch_${entry.batchId}`),
      title: String(entry.title || entry.channelDescription || entry.pdgIdentifier || `Batch ${entry.batchId}`),
      pdgIdentifier: String(entry.pdgIdentifier || ""),
      proposal: entry.proposal ?? null,
      request: entry.solverRequest ?? null,
    })),
  };
}

function buildSourceItems(options) {
  const commandSet = SOURCE_COMMANDS[options.source];
  const databaseArgs = options.databaseUrl ? ["--database-url", options.databaseUrl] : [];
  const pythonCommand = resolvePythonCommand();
  const listExecution = runCommand(pythonCommand, ["pdgfeed.py", commandSet.list, ...databaseArgs]);
  return {
    listExecution,
    items: selectCases(parseListedCases(listExecution.stdout), options.caseIds).map((entry) => ({
      batchId: null,
      caseId: entry.caseId,
      title: entry.title,
      pdgIdentifier: "",
      proposal: null,
      request: null,
      pythonCommand,
      commandSet,
      databaseArgs,
    })),
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const runDir = buildRunDir(options.outDir);
  const results = [];
  const runLogParts = [];
  const unsupportedParticleCounts = {};

  let selectedItems = [];
  let manifestPath = "";
  let manifestHash = "";
  let manifest = null;
  let startBatchId = null;

  if (options.manifestPath) {
    const manifestSelection = buildManifestItems(options);
    manifestPath = manifestSelection.manifestPath;
    manifestHash = manifestSelection.manifestHash;
    manifest = manifestSelection.manifest;
    startBatchId = manifestSelection.startBatchId;
    selectedItems = manifestSelection.items;
  } else {
    const sourceSelection = buildSourceItems(options);
    if (sourceSelection.listExecution.status !== 0) {
      writeText(path.join(runDir, "list.log"), formatCommandLog("list", sourceSelection.listExecution));
      throw new Error(
        `Failed to list ${options.source} PDG cases. See ${path.join(runDir, "list.log")}`
      );
    }
    runLogParts.push(formatCommandLog("list", sourceSelection.listExecution));
    selectedItems = sourceSelection.items;
  }

  for (const entry of selectedItems) {
    const safeCaseId = sanitizeCaseId(entry.caseId);
    const caseDir = path.join(runDir, safeCaseId);
    ensureDir(caseDir);

    let proposal = entry.proposal;
    let request = entry.request;
    const proposalPath = path.join(caseDir, `${safeCaseId}.proposal.v1.json`);
    const requestPath = path.join(caseDir, `${safeCaseId}.solver-request.v1.json`);

    if (!options.manifestPath) {
      const proposalExecution = runCommand(
        entry.pythonCommand,
        ["pdgfeed.py", entry.commandSet.printProposal, entry.caseId, ...entry.databaseArgs]
      );
      runLogParts.push(formatCommandLog(`${entry.caseId}:proposal`, proposalExecution));
      writeText(path.join(caseDir, "proposal.log"), formatCommandLog("proposal", proposalExecution));

      if (proposalExecution.status !== 0) {
        results.push({
          batchId: null,
          caseId: entry.caseId,
          title: entry.title,
          pdgIdentifier: "",
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
      proposal = JSON.parse(proposalExecution.stdout);
    }

    writeJson(proposalPath, proposal);
    const unsupportedParticles = extractUnsupportedParticleNames(proposal?.notes);
    const reactantsCompact = buildCompactSideNotation(proposal, "reactants");
    const productsCompact = buildCompactSideNotation(proposal, "products");
    accumulateUnsupportedParticleCounts(unsupportedParticleCounts, unsupportedParticles);

    if (proposal?.exportable !== true) {
      results.push({
        batchId: entry.batchId,
        caseId: entry.caseId,
        title: entry.title,
        pdgIdentifier: entry.pdgIdentifier,
        status: "unsupported-input",
        exact: false,
        unresolvedTargetCount: null,
        reactantsCompact,
        productsCompact,
        unsupportedParticles,
        proposalPath,
        requestPath: null,
        resultPath: null,
      });
      continue;
    }

    if (!request && !options.manifestPath) {
      const requestExecution = runCommand(
        entry.pythonCommand,
        ["pdgfeed.py", entry.commandSet.printRequest, entry.caseId, ...entry.databaseArgs]
      );
      runLogParts.push(formatCommandLog(`${entry.caseId}:request`, requestExecution));
      writeText(path.join(caseDir, "request.log"), formatCommandLog("request", requestExecution));

      if (requestExecution.status !== 0) {
        results.push({
          batchId: entry.batchId,
          caseId: entry.caseId,
          title: entry.title,
          pdgIdentifier: entry.pdgIdentifier,
          status: "request-error",
          exact: false,
          unresolvedTargetCount: null,
          reactantsCompact,
          productsCompact,
          unsupportedParticles,
          proposalPath,
          requestPath: null,
          resultPath: null,
        });
        continue;
      }
      request = JSON.parse(requestExecution.stdout);
    }

    if (!request) {
      results.push({
        batchId: entry.batchId,
        caseId: entry.caseId,
        title: entry.title,
        pdgIdentifier: entry.pdgIdentifier,
        status: "request-error",
        exact: false,
        unresolvedTargetCount: null,
        reactantsCompact,
        productsCompact,
        unsupportedParticles,
        proposalPath,
        requestPath: null,
        resultPath: null,
      });
      continue;
    }

    writeJson(requestPath, request);
    const solveExecution = runCommand(
      process.execPath,
      ["scripts/solve-reaction.mjs"],
      JSON.stringify(request)
    );
    runLogParts.push(formatCommandLog(`${entry.caseId}:solve`, solveExecution));
    writeText(path.join(caseDir, "solve.log"), formatCommandLog("solve", solveExecution));

    if (solveExecution.status !== 0) {
      results.push({
        batchId: entry.batchId,
        caseId: entry.caseId,
        title: entry.title,
        pdgIdentifier: entry.pdgIdentifier,
        status: "solve-error",
        exact: false,
        unresolvedTargetCount: null,
        reactantsCompact,
        productsCompact,
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
      batchId: entry.batchId,
      caseId: entry.caseId,
      title: entry.title,
      pdgIdentifier: entry.pdgIdentifier,
      status: result?.summary?.outcome ?? "solve-error",
      exact: result?.summary?.exact === true,
      unresolvedTargetCount: Number.isInteger(result?.summary?.unresolvedTargetCount)
        ? result.summary.unresolvedTargetCount
        : null,
      reactantsCompact,
      productsCompact,
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
    source: options.manifestPath ? "manifest" : options.source,
    runDir,
    manifestPath,
    startBatchId,
    endBatchId:
      results.length > 0 && results.every((entry) => Number.isInteger(entry.batchId))
        ? Math.max(...results.map((entry) => entry.batchId))
        : null,
    reactionsTested,
    analyzableReactionCount,
    reactionsNotYetAnalyzed,
    exactClosureCount,
    exactClosurePercent: exactPercent(exactClosureCount, analyzableReactionCount),
    outcomeCounts: summarizeOutcomeCounts(results),
    unsupportedParticleCounts,
    topUnsupportedParticles: buildTopUnsupportedParticles(unsupportedParticleCounts),
    discoveredUnsupportedReactionCount: Number.isInteger(manifest?.unsupportedDiscoveryCount)
      ? manifest.unsupportedDiscoveryCount
      : null,
    discoveredTopUnsupportedParticles: Array.isArray(manifest?.topUnsupportedParticles)
      ? manifest.topUnsupportedParticles
      : [],
    cases: results,
  };

  if (options.manifestPath && options.cursorPath) {
    const processedBatchIds = results
      .filter((entry) => Number.isInteger(entry.batchId))
      .map((entry) => entry.batchId);
    const nextBatchId =
      processedBatchIds.length > 0
        ? Math.max(...processedBatchIds) + 1
        : startBatchId ?? 1;
    writeCursor(options.cursorPath, {
      schema: "pdg-live-batch-cursor/v1",
      manifestPath,
      manifestHash,
      nextBatchId,
      lastProcessedBatchId: processedBatchIds.length > 0 ? Math.max(...processedBatchIds) : null,
    });
  }

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
