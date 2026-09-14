#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";
import { buildStaticSite, WEB_KATEX_DIRECTORY } from "./build-static-site.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
// Representative shipped entrypoints. This checks packaged dependencies, not
// rendering, GPU behavior, or the deployed site's availability.
export const ENTRYPOINTS = ["index.html", "animator.html", "borg.html", "topo.html", "equation-mapping.html"];

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function resolveRepoFile(rootDir, relativePath, label) {
  requireCondition(typeof relativePath === "string" && relativePath.length > 0, `${label} must be a non-empty path`);
  requireCondition(!path.isAbsolute(relativePath), `${label} must be repository-relative: ${relativePath}`);
  const normalized = path.posix.normalize(relativePath.replaceAll("\\", "/"));
  requireCondition(normalized !== ".." && !normalized.startsWith("../"), `${label} escapes the repository: ${relativePath}`);
  const absolute = path.resolve(rootDir, normalized);
  requireCondition(absolute.startsWith(`${rootDir}${path.sep}`), `${label} escapes the repository: ${relativePath}`);
  const stat = fs.lstatSync(absolute);
  requireCondition(stat.isFile() && !stat.isSymbolicLink(), `${label} must be a regular file: ${relativePath}`);
  requireCondition(fs.realpathSync(absolute).startsWith(`${fs.realpathSync(rootDir)}${path.sep}`), `${label} resolves outside the repository: ${relativePath}`);
  return { absolute, normalized, stat };
}

function classifyReference(reference, sourcePath) {
  const value = String(reference ?? "").trim();
  if (!value || value.startsWith("#") || /^(?:data|mailto|tel|javascript):/iu.test(value)) return null;
  if (/^https?:\/\//iu.test(value)) return { remote: value };
  const pathname = value.split(/[?#]/u, 1)[0];
  const normalized = pathname.startsWith("/")
    ? path.posix.normalize(pathname.slice(1))
    : path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath), pathname));
  requireCondition(normalized !== ".." && !normalized.startsWith("../"), `dependency escapes the repository: ${sourcePath} -> ${value}`);
  return { local: normalized };
}

function collectReferences(sourcePath, content, rootDir) {
  const references = [];
  if (/\.html?$/iu.test(sourcePath)) {
    for (const match of content.matchAll(/<(?:script|img|source|audio|video|iframe)\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/giu)) references.push(match[1]);
    for (const match of content.matchAll(/<link\b[^>]*\bhref\s*=\s*["']([^"']+)["']/giu)) references.push(match[1]);
  }
  if (/\.(?:m?js)$/iu.test(sourcePath)) {
    for (const match of content.matchAll(/(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']/gu)) references.push(match[1]);
    for (const match of content.matchAll(/import\s*\(\s*["']([^"']+)["']\s*\)/gu)) references.push(match[1]);
  }
  if (/\.css$/iu.test(sourcePath)) {
    // Font src lists are alternatives: Pages ships woff2; legacy fallback
    // formats need not exist when a supported source is present.
    content = content.replace(/\bsrc\s*:\s*([^;}]+)/giu, (_declaration, sources) => {
      const alternatives = [...sources.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gu)].map(match => match[1]);
      const available = alternatives.find(raw => {
        const ref = classifyReference(raw, sourcePath);
        return ref?.remote || (ref?.local && fs.existsSync(path.join(rootDir, ref.local)));
      });
      if (available || alternatives.length) references.push(available ?? alternatives[0]);
      return "";
    });
    for (const match of content.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gu)) references.push(match[1]);
  }
  return references;
}

export function discoverResourceClosure(rootDir, entrypoint) {
  rootDir = path.resolve(rootDir);
  const queue = [entrypoint];
  const local = new Set();
  const remote = new Set();
  while (queue.length) {
    const sourcePath = queue.shift();
    if (local.has(sourcePath)) continue;
    const source = resolveRepoFile(rootDir, sourcePath, "resource dependency");
    local.add(source.normalized);
    const content = fs.readFileSync(source.absolute, "utf8");
    for (const rawReference of collectReferences(source.normalized, content, rootDir)) {
      const reference = classifyReference(rawReference, source.normalized);
      if (!reference) continue;
      if (reference.remote) remote.add(reference.remote);
      if (reference.local && !local.has(reference.local)) queue.push(reference.local);
    }
  }
  return {
    local: [...local].sort(),
    remote: [...remote].sort(),
  };
}


export function verifyPagesPayload(outputDir, { entrypoints = ENTRYPOINTS, checkRuntime = true } = {}) {
  const resources = new Set();
  const remote = new Set();
  for (const entrypoint of entrypoints) {
    const closure = discoverResourceClosure(outputDir, entrypoint);
    closure.local.forEach(name => resources.add(name));
    closure.remote.forEach(name => remote.add(name));
  }
  if (checkRuntime) {
    for (const name of [".nojekyll", WEB_KATEX_DIRECTORY + "katex.min.js", WEB_KATEX_DIRECTORY + "katex.min.css", WEB_KATEX_DIRECTORY + "fonts/KaTeX_Main-Regular.woff2"]) {
      resolveRepoFile(outputDir, name, "required Pages asset");
    }
    for (const name of [".git", ".local-data", "reference.html", "solver-gpu-harness.html", "src/archie-service"]) {
      requireCondition(!fs.existsSync(path.join(outputDir, name)), "private/local resource published: " + name);
    }
    // Exercise routing and search against copied content, not source-tree data.
    execFileSync(process.execPath, [path.join(outputDir, "scripts/smoke-option3.mjs")], { cwd: outputDir, stdio: "inherit" });
    resolveRepoFile(outputDir, "content/markdown/aaa/foundations/ontology.md", "representative reader content");
    // Import the copied runtime graph, with no fallback to the source tree.
    const modules = ["src/apps/borg/BorgAssemblyRecordCatalog.js", "src/apps/borg/BorgCertifiedBudgets.js"];
    execFileSync(process.execPath, ["--input-type=module", "-e", modules.map(name =>
      "await import(" + JSON.stringify(pathToFileURL(path.join(outputDir, name)).href) + ");"
    ).join("\n")], { cwd: outputDir, stdio: "inherit" });
  }
  return { entrypoints, localResources: resources.size, externalResourcesNotFetched: [...remote] };
}

export function checkPagesBuild({ outputDir } = {}) {
  const started = performance.now();
  fs.mkdirSync(path.join(ROOT, ".tmp"), { recursive: true });
  const temporary = outputDir ? null : fs.mkdtempSync(path.join(ROOT, ".tmp/pages-check-"));
  const target = outputDir ? path.resolve(outputDir) : path.join(temporary, "site");
  try {
    const build = buildStaticSite({ outputDir: target });
    const verification = verifyPagesPayload(target);
    return { ...build, verification, elapsedSeconds: (performance.now() - started) / 1000,
      observation: "built payload; browser interaction and deployed URL not observed" };
  } finally {
    if (temporary) fs.rmSync(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--out")) throw new Error("Usage: check-pages-build.mjs [--out <empty-directory>]");
  console.log(JSON.stringify(checkPagesBuild({ outputDir: args[1] }), null, 2));
}
