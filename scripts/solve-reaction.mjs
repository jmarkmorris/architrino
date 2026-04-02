import fs from "node:fs";

import { solveReactionSolverRequest } from "../src/apps/reaction/ReactionSolverContractRuntime.js";

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function readRequestSource(argv = []) {
  const inputPath = argv[0] ?? "";
  if (inputPath) {
    return fs.readFileSync(inputPath, "utf8");
  }
  return null;
}

try {
  const sourceText = readRequestSource(process.argv.slice(2)) ?? (await readStdin());
  const request = JSON.parse(sourceText);
  const { result } = solveReactionSolverRequest(request);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} catch (error) {
  process.stderr.write(`${error?.stack || error?.message || String(error)}\n`);
  process.exitCode = 1;
}
