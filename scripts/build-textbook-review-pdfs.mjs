#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEXTBOOK_TOC_PATH = "content/graph/textbook_toc.json";
const READING_COPY_DIR = "content/generated/markdown/textbook/reading-copies";
const OUTPUT_DIR = "content/generated/pdf/textbook/review-copies";
const MANIFEST_PATH = `${OUTPUT_DIR}/manifest.json`;
const TEMP_HTML_DIR = ".tmp/textbook-review-pdf-html";
const READER_ASSET_DIR = "apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets";
const FULL_TEXTBOOK_ID = "architrino-textbook";
const DEFAULT_PDF_MERGE_PATHS = [
  process.env.PDF_UNITE_PATH,
  "/opt/homebrew/bin/pdfunite",
  "/usr/local/bin/pdfunite",
  "pdfunite",
  process.env.QPDF_PATH,
  "/opt/homebrew/bin/qpdf",
  "/usr/local/bin/qpdf",
  "qpdf",
].filter(Boolean);
const DEFAULT_BROWSER_PATHS = [
  process.env.PDF_BROWSER_PATH,
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "chromium",
  "chromium-browser",
  "google-chrome",
].filter(Boolean);

const args = parseArgs(process.argv.slice(2));
const mode = args.write ? "write" : "check";
const rootDir = process.cwd();
const require = createRequire(import.meta.url);
const MarkdownIt = require(path.join(rootDir, READER_ASSET_DIR, "markdown-it.min.js"));
const katex = require(path.join(rootDir, READER_ASSET_DIR, "katex/katex.min.js"));
const markdownParser = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});
const warnings = [];
const errors = [];

if (args.help) {
  printUsage(0);
}
if (args.unknown.length) {
  console.error(`Unknown argument(s): ${args.unknown.join(", ")}`);
  printUsage(2);
}
if (args.write && args.check) {
  console.error("Use either --check or --write, not both.");
  printUsage(2);
}

function printUsage(exitCode) {
  console.log("Usage: node scripts/build-textbook-review-pdfs.mjs [--check|--write] [--browser=PATH] [--virtual-time-budget=MS]");
  console.log("  --check                Validate generated textbook review PDFs and manifest (default)");
  console.log("  --write                Regenerate textbook review PDFs and manifest");
  console.log("  --browser=PATH         Browser binary for headless PDF printing");
  console.log("  --virtual-time-budget  Headless browser virtual time budget in ms (default: 30000)");
  process.exit(exitCode);
}

function parseArgs(argv) {
  const parsed = {
    check: false,
    write: false,
    help: false,
    browserPath: null,
    virtualTimeBudgetMs: 30000,
    unknown: [],
  };
  for (const arg of argv) {
    if (arg === "--check") {
      parsed.check = true;
    } else if (arg === "--write") {
      parsed.write = true;
    } else if (arg === "--help") {
      parsed.help = true;
    } else if (arg.startsWith("--browser=")) {
      parsed.browserPath = arg.slice("--browser=".length);
    } else if (arg.startsWith("--virtual-time-budget=")) {
      const value = Number(arg.slice("--virtual-time-budget=".length));
      if (!Number.isFinite(value) || value <= 0) {
        parsed.unknown.push(arg);
      } else {
        parsed.virtualTimeBudgetMs = Math.trunc(value);
      }
    } else {
      parsed.unknown.push(arg);
    }
  }
  return parsed;
}

function normalizeRelPath(value) {
  return String(value)
    .replace(/\\/g, "/")
    .replace(/^\.\/?/, "")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
}

function slugFromTitle(title) {
  return String(title || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "") || "chapter";
}

function readJson(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  try {
    return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch (error) {
    errors.push(`${relativePath}: failed to read JSON (${error.message})`);
    return null;
  }
}

function sha256Buffer(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function sha256File(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  return sha256Buffer(fs.readFileSync(absolutePath));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function protectMathSegments(markdown) {
  const protectedSegments = [];
  let protectedIndex = 0;
  const makeToken = () => `ARCHITRINOMATHSEGMENT${protectedIndex++}TOKEN`;
  const stash = (raw, math, display) => {
    const token = makeToken();
    protectedSegments.push({ token, raw, math, display });
    return token;
  };

  let output = String(markdown ?? "");
  output = output.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => `\n\n${stash(match, math, true)}\n\n`);
  output = output.replace(/\\\[([\s\S]*?)\\\]/g, (match, math) => `\n\n${stash(match, math, true)}\n\n`);
  output = output.replace(/\\\(([\s\S]*?)\\\)/g, (match, math) => stash(match, math, false));
  output = output.replace(
    /(^|[^\\$])\$(?!\$)([^$\n]|\\\$)+?\$(?!\$)/g,
    (match, prefix) => {
      const rawMath = match.slice(prefix.length);
      return `${prefix}${stash(rawMath, rawMath.slice(1, -1), false)}`;
    }
  );
  return { markdown: output, protectedSegments };
}

function renderMathHtml(segment) {
  try {
    return katex.renderToString(segment.math || "", {
      displayMode: segment.display === true,
      output: "html",
      throwOnError: false,
      strict: "ignore",
    });
  } catch {
    return escapeHtml(segment.raw || segment.math || "");
  }
}

function restoreMathSegments(html, protectedSegments) {
  return protectedSegments.reduce((result, segment) => {
    const rendered = renderMathHtml(segment);
    return result
      .replaceAll(`<p>${segment.token}</p>`, rendered)
      .replaceAll(segment.token, rendered);
  }, html);
}

function renderMarkdownHTMLFragment(markdownText) {
  const protectedMarkdown = protectMathSegments(markdownText);
  const html = markdownParser.render(protectedMarkdown.markdown);
  return restoreMathSegments(html, protectedMarkdown.protectedSegments);
}

function resolveBrowserPath() {
  return resolveExecutablePath(args.browserPath ? [args.browserPath] : DEFAULT_BROWSER_PATHS);
}

function resolvePdfMergeTool() {
  const executablePath = resolveExecutablePath(DEFAULT_PDF_MERGE_PATHS);
  if (!executablePath) {
    return null;
  }
  return {
    path: executablePath,
    kind: path.basename(executablePath).toLowerCase().includes("qpdf") ? "qpdf" : "pdfunite",
  };
}

function resolveExecutablePath(candidates) {
  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }
    if (candidate.includes("/") && fs.existsSync(candidate)) {
      return candidate;
    }
    if (!candidate.includes("/")) {
      const result = spawnSync("which", [candidate], { encoding: "utf8" });
      if (result.status === 0 && result.stdout.trim()) {
        return result.stdout.trim();
      }
    }
  }
  return null;
}

function mergePdfFiles({ inputPaths, outputPath, tool }) {
  const absoluteInputPaths = inputPaths.map((inputPath) => path.join(rootDir, inputPath));
  const absoluteOutputPath = path.join(rootDir, outputPath);
  const missingInputs = absoluteInputPaths.filter((inputPath) => !fs.existsSync(inputPath));
  if (missingInputs.length) {
    errors.push(
      `${outputPath}: full-textbook PDF merge missing input(s): ${missingInputs
        .map((inputPath) => normalizeRelPath(path.relative(rootDir, inputPath)))
        .join(", ")}`
    );
    return;
  }

  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.rmSync(absoluteOutputPath, { force: true });

  const argsForTool =
    tool.kind === "qpdf"
      ? ["--empty", "--pages", ...absoluteInputPaths, "--", absoluteOutputPath]
      : [...absoluteInputPaths, absoluteOutputPath];
  const result = spawnSync(tool.path, argsForTool, { encoding: "utf8" });
  if (result.status !== 0) {
    const detail = `${result.stderr || result.stdout || ""}`.trim();
    errors.push(
      `${outputPath}: full-textbook PDF merge failed${detail ? ` (${detail})` : ""}`
    );
    return;
  }
  if (!fs.existsSync(absoluteOutputPath) || fs.statSync(absoluteOutputPath).size <= 0) {
    errors.push(`${outputPath}: full-textbook PDF merge did not produce output`);
  }
}

function buildRecords() {
  const toc = readJson(TEXTBOOK_TOC_PATH);
  const rootChildren = Array.isArray(toc?.tocRoot?.children) ? toc.tocRoot.children : [];
  if (!rootChildren.length) {
    errors.push(`${TEXTBOOK_TOC_PATH}: expected tocRoot.children`);
    return [];
  }

  const records = [];

  for (const entry of rootChildren) {
    const title = String(entry?.title || "").trim();
    if (!title) {
      continue;
    }
    const slug = slugFromTitle(title);
    records.push({
      id: entry.id || slug,
      title,
      sourcePath: `${READING_COPY_DIR}/${slug}.md`,
      pdfPath: `${OUTPUT_DIR}/${slug}.pdf`,
    });
  }

  records.push({
    id: FULL_TEXTBOOK_ID,
    title: "Architrino Textbook",
    sourcePath: `${READING_COPY_DIR}/${FULL_TEXTBOOK_ID}.md`,
    pdfPath: `${OUTPUT_DIR}/${FULL_TEXTBOOK_ID}.pdf`,
  });

  return records;
}

function validateInputRecords(records) {
  for (const record of records) {
    const sourceAbsolutePath = path.join(rootDir, record.sourcePath);
    if (!fs.existsSync(sourceAbsolutePath)) {
      errors.push(`Missing reading-copy markdown: ${record.sourcePath}`);
    }
  }
}

function renderReviewHtml({ record, markdownText, htmlDir }) {
  const assetDir = pathToFileURL(path.join(rootDir, READER_ASSET_DIR)).href;
  const escapedTitle = escapeHtml(record.title);
  const bodyHtml = renderMarkdownHTMLFragment(markdownText);
  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${escapedTitle}</title>
    <link rel="stylesheet" href="${assetDir}/katex/katex.min.css" />
    <style>
      @page {
        size: letter;
        margin: 0.72in 0.68in;
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        color: #111827;
      }

      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-variant-ligatures: none;
        font-feature-settings: "liga" 0, "clig" 0, "dlig" 0, "hlig" 0;
        font-size: 12pt;
        line-height: 1.42;
      }

      .review-header {
        border-bottom: 1px solid #d1d5db;
        margin-bottom: 1.2rem;
        padding-bottom: 0.55rem;
      }

      .review-kicker {
        color: #4b5563;
        font-size: 8.6pt;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .review-title {
        font-size: 22pt;
        line-height: 1.12;
        margin: 0.18rem 0 0.2rem;
      }

      .review-source {
        color: #6b7280;
        font-size: 8.8pt;
        overflow-wrap: anywhere;
      }

      article {
        max-width: none;
      }

      article > h1:first-child {
        display: none;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: #111827;
        line-height: 1.18;
        margin: 1.15em 0 0.35em;
        break-after: avoid;
      }

      h1 {
        font-size: 20pt;
      }

      h2 {
        border-top: 1px solid #e5e7eb;
        font-size: 16pt;
        padding-top: 0.65rem;
      }

      h3 {
        font-size: 13.2pt;
      }

      h4,
      h5,
      h6 {
        font-size: 11.5pt;
      }

      p,
      ul,
      ol,
      blockquote,
      pre,
      table {
        margin: 0.45em 0 0.78em;
      }

      li {
        margin: 0.18em 0;
      }

      a {
        color: #1d4ed8;
        text-decoration: none;
      }

      code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 0.92em;
      }

      pre {
        background: #f3f4f6;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        overflow-wrap: anywhere;
        padding: 0.62rem;
        white-space: pre-wrap;
      }

      blockquote {
        border-left: 3px solid #9ca3af;
        color: #374151;
        padding-left: 0.75rem;
      }

      table {
        border-collapse: collapse;
        font-size: 9.2pt;
        width: 100%;
      }

      th,
      td {
        border: 1px solid #d1d5db;
        padding: 0.32rem 0.42rem;
        vertical-align: top;
      }

      th {
        background: #f3f4f6;
      }

      img {
        height: auto;
        max-width: 100%;
      }

      .katex-display {
        overflow: visible;
        padding: 0.1em 0;
      }

      .katex {
        font-size: 1.02em;
      }

      .katex .katex-mathml {
        clip: rect(1px, 1px, 1px, 1px);
        border: 0;
        height: 1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
    </style>
  </head>
  <body>
    <header class="review-header">
      <div class="review-kicker">Architrino PDF Review Copy</div>
      <h1 class="review-title">${escapedTitle}</h1>
      <div class="review-source">${escapeHtml(record.sourcePath)}</div>
    </header>
    <article id="review-content">${bodyHtml}</article>
  </body>
</html>
`;
}

function writeReviewHtml(record) {
  const htmlDir = TEMP_HTML_DIR;
  const htmlPath = `${htmlDir}/${slugFromTitle(record.title)}.html`;
  const sourceAbsolutePath = path.join(rootDir, record.sourcePath);
  const markdownText = fs.readFileSync(sourceAbsolutePath, "utf8");
  const html = renderReviewHtml({
    record,
    markdownText,
    htmlDir,
  });
  fs.mkdirSync(path.join(rootDir, htmlDir), { recursive: true });
  fs.writeFileSync(path.join(rootDir, htmlPath), html, "utf8");
  return htmlPath;
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function removePathWithRetries(targetPath, attempts = 8) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
      return;
    } catch (error) {
      if (attempt === attempts - 1) {
        throw error;
      }
      await delay(250 * (attempt + 1));
    }
  }
}

async function waitForStableFile(outputPath, timeoutMs) {
  const startedAt = Date.now();
  let lastSize = -1;
  let stableSince = 0;

  while (Date.now() - startedAt < timeoutMs) {
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 0) {
        if (stats.size === lastSize) {
          if (!stableSince) {
            stableSince = Date.now();
          }
          if (Date.now() - stableSince >= 1500) {
            return;
          }
        } else {
          lastSize = stats.size;
          stableSince = 0;
        }
      }
    }
    await delay(250);
  }

  throw new Error(`Timed out waiting for PDF output: ${outputPath}`);
}

async function runBrowserPrint({ browserPath, htmlPath, pdfPath }) {
  const absoluteHtmlPath = path.join(rootDir, htmlPath);
  const absolutePdfPath = path.join(rootDir, pdfPath);
  const profileDir = path.join(rootDir, ".tmp", "textbook-review-pdf-profile", slugFromTitle(pdfPath));
  await removePathWithRetries(profileDir);
  fs.mkdirSync(path.dirname(absolutePdfPath), { recursive: true });
  fs.rmSync(absolutePdfPath, { force: true });

  const isFullTextbook = pdfPath.endsWith(`/${FULL_TEXTBOOK_ID}.pdf`);
  const timeoutMs = isFullTextbook
    ? Math.max(600000, args.virtualTimeBudgetMs + 480000)
    : Math.max(180000, args.virtualTimeBudgetMs + 120000);
  const browserArgs = [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--allow-file-access-from-files",
    "--run-all-compositor-stages-before-draw",
    `--virtual-time-budget=${args.virtualTimeBudgetMs}`,
    `--user-data-dir=${profileDir}`,
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    `--print-to-pdf=${absolutePdfPath}`,
    pathToFileURL(absoluteHtmlPath).href,
  ];
  const stderrChunks = [];
  const child = spawn(browserPath, browserArgs, {
    stdio: ["ignore", "ignore", "pipe"],
    detached: true,
  });
  let childExited = false;

  child.stderr.on("data", (chunk) => {
    if (stderrChunks.length < 200) {
      stderrChunks.push(String(chunk));
    }
  });

  const exitPromise = new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      childExited = true;
      resolve({ code, signal });
    });
  });

  function signalBrowserProcessGroup(signal) {
    if (child.pid) {
      try {
        process.kill(-child.pid, signal);
        return;
      } catch {
        // Fall back to the parent process below when the platform does not
        // expose a usable process group for this browser launch.
      }
    }
    child.kill(signal);
  }

  try {
    await Promise.race([
      waitForStableFile(absolutePdfPath, timeoutMs),
      exitPromise.then(({ code, signal }) => {
        if (code === 0 && fs.existsSync(absolutePdfPath) && fs.statSync(absolutePdfPath).size > 0) {
          return waitForStableFile(absolutePdfPath, Math.min(timeoutMs, 30000));
        }
        const detail = stderrChunks.join("").trim();
        throw new Error(
          `Browser export failed${signal ? ` (${signal})` : ""}${detail ? `\n${detail}` : ""}`.trim()
        );
      }),
    ]);
  } catch (error) {
    errors.push(`${pdfPath}: browser PDF export failed (${error.message})`);
  } finally {
    if (!childExited && !child.killed) {
      signalBrowserProcessGroup("SIGTERM");
    }
    const exitResult = await Promise.race([exitPromise, delay(3000).then(() => null)]);
    if (exitResult === null && !childExited) {
      signalBrowserProcessGroup("SIGKILL");
      await Promise.race([exitPromise, delay(1000).then(() => null)]);
    }
    if (fs.existsSync(absolutePdfPath) && fs.statSync(absolutePdfPath).size > 0) {
      await waitForStableFile(absolutePdfPath, Math.min(timeoutMs, 30000));
    }
    await removePathWithRetries(profileDir);
  }
}

function buildManifest(records) {
  return {
    schemaVersion: "textbook_review_pdf_manifest_v1",
    sourceTocPath: TEXTBOOK_TOC_PATH,
    outputDir: OUTPUT_DIR,
    records: records.map((record) => {
      const pdfExists = fs.existsSync(path.join(rootDir, record.pdfPath));
      return {
        id: record.id,
        title: record.title,
        sourcePath: record.sourcePath,
        sourceSha256: sha256File(record.sourcePath),
        pdfPath: record.pdfPath,
        pdfSha256: pdfExists ? sha256File(record.pdfPath) : null,
        pdfBytes: pdfExists ? fs.statSync(path.join(rootDir, record.pdfPath)).size : 0,
      };
    }),
  };
}

function writeManifest(records) {
  const manifest = buildManifest(records);
  fs.mkdirSync(path.dirname(path.join(rootDir, MANIFEST_PATH)), { recursive: true });
  fs.writeFileSync(path.join(rootDir, MANIFEST_PATH), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function validateManifest(records) {
  const manifestAbsolutePath = path.join(rootDir, MANIFEST_PATH);
  if (!fs.existsSync(manifestAbsolutePath)) {
    errors.push(`Missing PDF manifest: ${MANIFEST_PATH}`);
    return;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestAbsolutePath, "utf8"));
  } catch (error) {
    errors.push(`${MANIFEST_PATH}: invalid JSON (${error.message})`);
    return;
  }

  const recordsByPath = new Map(
    Array.isArray(manifest.records)
      ? manifest.records.map((record) => [record?.pdfPath, record])
      : []
  );
  const expectedPdfPaths = new Set(records.map((record) => record.pdfPath));

  for (const record of records) {
    const manifestRecord = recordsByPath.get(record.pdfPath);
    if (!manifestRecord) {
      errors.push(`${MANIFEST_PATH}: missing record for ${record.pdfPath}`);
      continue;
    }
    const pdfAbsolutePath = path.join(rootDir, record.pdfPath);
    if (!fs.existsSync(pdfAbsolutePath)) {
      errors.push(`Missing generated PDF: ${record.pdfPath}`);
      continue;
    }
    const currentSourceSha = sha256File(record.sourcePath);
    if (manifestRecord.sourceSha256 !== currentSourceSha) {
      errors.push(`${record.pdfPath}: source markdown drift; regenerate with --write`);
    }
    const currentPdfSha = sha256File(record.pdfPath);
    if (manifestRecord.pdfSha256 !== currentPdfSha) {
      errors.push(`${record.pdfPath}: PDF hash differs from manifest`);
    }
  }

  for (const pdfPath of recordsByPath.keys()) {
    if (!expectedPdfPaths.has(pdfPath)) {
      warnings.push(`${MANIFEST_PATH}: stale record for ${pdfPath}`);
    }
  }
}

const records = buildRecords();
validateInputRecords(records);

if (!errors.length && mode === "write") {
  const browserPath = resolveBrowserPath();
  if (!browserPath) {
    errors.push("No supported browser found. Set PDF_BROWSER_PATH or pass --browser=PATH.");
  } else {
    const pdfMergeTool = resolvePdfMergeTool();
    console.log(`build-textbook-review-pdfs mode: ${mode}`);
    console.log(`- Browser: ${browserPath}`);
    if (pdfMergeTool) {
      console.log(`- PDF merge: ${pdfMergeTool.path}`);
    }
    console.log(`- Review PDFs: ${records.length}`);
    fs.rmSync(path.join(rootDir, TEMP_HTML_DIR), { recursive: true, force: true });
    for (const record of records) {
      console.log(`- Writing ${record.pdfPath}`);
      if (record.id === FULL_TEXTBOOK_ID) {
        if (!pdfMergeTool) {
          errors.push("No supported PDF merge tool found. Install pdfunite or qpdf.");
          break;
        }
        mergePdfFiles({
          inputPaths: records
            .filter((candidate) => candidate.id !== FULL_TEXTBOOK_ID)
            .map((candidate) => candidate.pdfPath),
          outputPath: record.pdfPath,
          tool: pdfMergeTool,
        });
      } else {
        const htmlPath = writeReviewHtml(record);
        await runBrowserPrint({ browserPath, htmlPath, pdfPath: record.pdfPath });
      }
      if (errors.length) {
        break;
      }
    }
    if (!errors.length) {
      writeManifest(records);
    }
    fs.rmSync(path.join(rootDir, TEMP_HTML_DIR), { recursive: true, force: true });
  }
} else if (!errors.length) {
  console.log(`build-textbook-review-pdfs mode: ${mode}`);
  console.log(`- Review PDFs: ${records.length}`);
  validateManifest(records);
}

if (warnings.length) {
  console.log("\nwarnings:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}
if (errors.length) {
  console.log("\nerrors:");
  errors.forEach((error) => console.log(`- ${error}`));
}
console.log(`\nsummary: ${errors.length} error(s), ${warnings.length} warning(s)`);

if (errors.length) {
  process.exit(1);
}
