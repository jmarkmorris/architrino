import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

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

try {
  const sourceText = readRequestSource(process.argv.slice(2)) ?? (await readStdin());
  JSON.parse(sourceText);
  const pythonSolverPath = fileURLToPath(new URL("./reaction_solver_core.py", import.meta.url));
  const stdout = execFileSync(resolvePythonCommand(), [pythonSolverPath], {
    encoding: "utf8",
    input: sourceText,
  });
  process.stdout.write(stdout);
} catch (error) {
  process.stderr.write(`${error?.stack || error?.message || String(error)}\n`);
  process.exitCode = 1;
}
