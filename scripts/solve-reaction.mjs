import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

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
  JSON.parse(sourceText);
  const pythonSolverPath = fileURLToPath(new URL("./reaction_solver_core.py", import.meta.url));
  const stdout = execFileSync("python3", [pythonSolverPath], {
    encoding: "utf8",
    input: sourceText,
  });
  process.stdout.write(stdout);
} catch (error) {
  process.stderr.write(`${error?.stack || error?.message || String(error)}\n`);
  process.exitCode = 1;
}
