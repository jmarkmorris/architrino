import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const MAX_REQUEST_BODY_BYTES = 4 * 1024 * 1024;
const DEFAULT_REACTION_SOLVE_TIMEOUT_MS = 30000;

function normalizeText(value = "") {
  return String(value ?? "").trim();
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  const chunks = [];
  let totalBytes = 0;
  for await (const chunk of request) {
    const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += bufferChunk.length;
    if (totalBytes > MAX_REQUEST_BODY_BYTES) {
      throw new Error("Reaction solve request body exceeded the local dev limit.");
    }
    chunks.push(bufferChunk);
  }
  const sourceText = Buffer.concat(chunks).toString("utf8");
  return {
    sourceText,
    parsed: JSON.parse(sourceText),
  };
}

export function isReactionSolveApiRequest(request) {
  const method = normalizeText(request?.method).toUpperCase();
  const url = new URL(normalizeText(request?.url) || "/", "http://127.0.0.1");
  return method === "POST" && url.pathname === "/api/reaction/solve";
}

export function executeReactionSolveRequest(sourceText, options = {}) {
  const repoRoot = normalizeText(options?.repoRoot);
  if (!repoRoot) {
    throw new Error("Reaction solve API requires an explicit repo root.");
  }
  const solveScriptPath = resolve(repoRoot, "scripts/solve-reaction.mjs");
  const stdout = execFileSync(process.execPath, [solveScriptPath], {
    cwd: repoRoot,
    encoding: "utf8",
    input: sourceText,
    maxBuffer: Number(options?.maxBuffer ?? 16 * 1024 * 1024),
    timeout: Number(options?.timeoutMs ?? DEFAULT_REACTION_SOLVE_TIMEOUT_MS),
  });
  return JSON.parse(stdout);
}

function isReactionSolveTimeoutError(error = null) {
  const code = normalizeText(error?.code).toUpperCase();
  const signal = normalizeText(error?.signal).toUpperCase();
  const message = normalizeText(error?.message).toLowerCase();
  return (
    code === "ETIMEDOUT" ||
    signal === "SIGTERM" ||
    message.includes("timed out")
  );
}

export async function handleReactionSolveApiRequest(request, response, options = {}) {
  if (!isReactionSolveApiRequest(request)) {
    return false;
  }
  const executeSolveRequest =
    typeof options?.executeSolveRequest === "function"
      ? options.executeSolveRequest
      : executeReactionSolveRequest;
  try {
    const { sourceText } = await readJsonBody(request);
    const result = await Promise.resolve(executeSolveRequest(sourceText, options));
    sendJson(response, 200, result);
  } catch (error) {
    sendJson(
      response,
      isReactionSolveTimeoutError(error) ? 504 : 400,
      {
        error: isReactionSolveTimeoutError(error)
          ? "Reaction solve timed out. The local solve bridge may be stalled."
          : normalizeText(error?.message) || "Reaction solve request failed.",
      }
    );
  }
  return true;
}
