#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { loadVendoredCommonJsBundle } from "../../../../scripts/load-vendored-commonjs-bundle.mjs";
import { CANVAS_COLORS } from "../../../../src/apps/equation-mapping/EquationMappingData.js";

const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));
const ASSETS = path.join(ROOT, "apps/ios/ArchitrinoReader/ArchitrinoReader/ReaderAssets");
const MarkdownIt = loadVendoredCommonJsBundle(path.join(ASSETS, "markdown-it.min.js"));
const katex = loadVendoredCommonJsBundle(path.join(ASSETS, "katex/katex.min.js"));
const MARKER = '<meta name="generator" content="architrino-math-preview">';
const CSP = "default-src 'none'; style-src 'unsafe-inline'; font-src data:; base-uri 'none'; form-action 'none'";
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const parser = () => MarkdownIt({ html: false, linkify: false, typographer: false });

function sourceLines(source) {
  const offsets = [0];
  for (let i = 0; i < source.length; i++) if (source[i] === "\n") offsets.push(i + 1);
  offsets.push(source.length);
  return offsets;
}

export function selectSection(source, heading) {
  if (!heading) return source;
  const parsed = parser().parse(source, {});
  const codeLineRanges = parsed.filter((token) => ["fence", "code_block"].includes(token.type))
    .map((token) => token.map);
  const lines = source.match(/.*(?:\n|$)/g).filter(Boolean);
  let displayClose = null;
  const headingSource = lines.map((line, index) => {
    if (codeLineRanges.some(([start, end]) => index >= start && index < end)) return line;
    const trimmed = line.trim();
    if (!displayClose && (trimmed === "$$" || trimmed === "\\[")) {
      displayClose = trimmed === "$$" ? "$$" : "\\]";
      return line.endsWith("\n") ? "\n" : "";
    }
    if (displayClose) {
      if (trimmed === displayClose) displayClose = null;
      return line.endsWith("\n") ? "\n" : "";
    }
    return line;
  }).join("");
  const tokens = parser().parse(headingSource, {});
  const headings = tokens.flatMap((token, index) => token.type === "heading_open"
    ? [{ text: tokens[index + 1].content, level: Number(token.tag.slice(1)), line: token.map[0] }] : []);
  const matches = headings.filter((row) => row.text === heading);
  if (matches.length !== 1) throw new Error(`Section must match exactly one heading; found ${matches.length}: ${heading}`);
  const selected = matches[0];
  const next = headings.find((row) => row.line > selected.line && row.level <= selected.level);
  const offsets = sourceLines(source);
  return source.slice(offsets[selected.line], next ? offsets[next.line] : source.length);
}

function escaped(source, index) {
  let count = 0;
  while (index > 0 && source[--index] === "\\") count++;
  return count % 2 === 1;
}

// Shield math before Markdown table parsing can split TeX vertical bars.
// Markdown's own block parser supplies code ranges; inline code uses exact backtick runs.
export function protectMath(source) {
  const offsets = sourceLines(source);
  const codeRanges = parser().parse(source, {}).filter((t) => ["fence", "code_block"].includes(t.type))
    .map((t) => [offsets[t.map[0]], offsets[t.map[1]]]);
  let prefix = "MATHPREVIEW" + sha256(source).slice(0, 16).toUpperCase();
  while (source.includes(prefix)) prefix += "X";
  const segments = [];
  let output = "";
  for (let i = 0; i < source.length;) {
    const code = codeRanges.find(([start, end]) => i >= start && i < end);
    if (code) { output += source.slice(i, code[1]); i = code[1]; continue; }
    if (source[i] === "`" && !escaped(source, i)) {
      const run = source.slice(i).match(/^`+/)[0];
      let end = i + run.length;
      while ((end = source.indexOf(run, end)) >= 0) {
        if (source[end - 1] !== "`" && source[end + run.length] !== "`") break;
        end += run.length;
      }
      if (end >= 0) { output += source.slice(i, end + run.length); i = end + run.length; continue; }
      output += run; i += run.length; continue;
    }
    let open;
    if (!escaped(source, i)) {
      open = ["$$", "\\[", "\\(", "$"].find((candidate) => source.startsWith(candidate, i));
    }
    if (!open || (open === "$" && (!source[i + 1] || /\s/.test(source[i + 1])))) {
      output += source[i++]; continue;
    }
    const close = ({ "\\[": "\\]", "\\(": "\\)" })[open] ?? open;
    let end = i + open.length;
    while ((end = source.indexOf(close, end)) >= 0) {
      if (open === "$" && source.slice(i, end).includes("\n")) { end = -1; break; }
      if (!escaped(source, end)) {
        // A new price or opener cannot close the current dollar span. Stop here
        // so an unmatched currency sign cannot swallow a later valid formula.
        if (open === "$" && (/[\s$]/.test(source[end - 1]) || /[\d$]/.test(source[end + 1] ?? ""))) end = -1;
        break;
      }
      end += close.length;
    }
    if (end < 0) {
      if (open !== "$" || !/\d/.test(source[i + 1] ?? "")) {
        throw new Error(`Unclosed math delimiter ${open} near source line ${source.slice(0, i).split("\n").length}`);
      }
      output += source[i++]; continue;
    }
    const token = `${prefix}N${segments.length}TOKEN`;
    segments.push({ token, tex: source.slice(i + open.length, end), display: open === "$$" || open === "\\[" });
    output += token;
    i = end + close.length;
  }
  return { markdown: output, segments };
}

let bundledCss;
function fontCss() {
  if (bundledCss) return bundledCss;
  bundledCss = fs.readFileSync(path.join(ASSETS, "katex/katex.min.css"), "utf8")
    .replace(/src:[^;}]+/g, (declaration) => {
      const match = declaration.match(/url\(["']?([^)'"\s]+\.woff2)["']?\)/);
      if (!match) throw new Error("Bundled KaTeX font has no WOFF2 source");
      const bytes = fs.readFileSync(path.join(ASSETS, "katex", match[1]));
      return `src:url(data:font/woff2;base64,${bytes.toString("base64")}) format('woff2')`;
    });
  return bundledCss;
}

export function renderPreview(source, { title = "Math preview", sourceName = "Draft", section, theme = "purple", timestamp = new Date().toISOString() } = {}) {
  if (!["purple", "light"].includes(theme)) throw new Error("Theme must be purple or light");
  const { markdown, segments } = protectMath(selectSection(source, section));
  const md = parser();
  let omittedImages = 0;
  md.renderer.rules.image = (tokens, index) => { omittedImages++; return `<span class="note">[Image omitted: ${escapeHtml(tokens[index].content)}]</span>`; };
  md.renderer.rules.link_open = () => '<span class="source-ref">';
  md.renderer.rules.link_close = () => "</span>";
  md.renderer.rules.table_open = () => '<div class="table-scroll"><table>\n';
  md.renderer.rules.table_close = () => "</table></div>\n";
  const tokens = md.parse(markdown, {});
  const headings = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== "heading_open") continue;
    const id = `section-${headings.length + 1}`;
    tokens[i].attrSet("id", id);
    let label = tokens[i + 1].content;
    for (const segment of segments) label = label.replaceAll(segment.token, segment.tex);
    headings.push({ id, label, level: Number(tokens[i].tag.slice(1)) });
  }
  let body = md.renderer.render(tokens, md.options, {});
  for (const [index, segment] of segments.entries()) {
    let rendered;
    try {
      rendered = katex.renderToString(segment.tex, { displayMode: segment.display, output: "htmlAndMathml", throwOnError: true, strict: "error", trust: false });
    } catch (error) {
      throw new Error(`Math expression ${index + 1} failed (${segment.tex.slice(0, 120)}): ${error.message}`);
    }
    body = body.replaceAll(`<p>${segment.token}</p>`, rendered).replaceAll(segment.token, rendered);
  }
  const purple = CANVAS_COLORS.find((entry) => entry.id === "architrinoPurple").color;
  const colors = theme === "purple"
    ? `--paper:${purple};--ink:#ffffff;--rule:rgba(255,255,255,.22);--panel:rgba(22,10,32,.76);--stripe:rgba(255,255,255,.06)`
    : `--paper:#fdfdfd;--ink:${purple};--rule:rgba(75,0,130,.22);--panel:rgba(75,0,130,.08);--stripe:rgba(75,0,130,.04)`;
  const navigation = headings.filter((row) => row.level <= 3).map((row) => `<a href="#${row.id}">${escapeHtml(row.label)}</a>`).join("");
  const receipt = { sourceName, sourceSha256: sha256(source), section: section ?? null, theme, mathExpressions: segments.length, omittedImages, katexVersion: katex.version, snapshotAt: timestamp };
  const css = fs.readFileSync(new URL("../assets/preview.css", import.meta.url), "utf8");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">${MARKER}<meta http-equiv="Content-Security-Policy" content="${CSP}"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title><style>${fontCss()}\n:root{${colors}}\n${css}</style></head><body><main><div class="eyebrow">Architrino · KaTeX preview</div><p class="note">${escapeHtml(sourceName)} · ${escapeHtml(timestamp)} · Static snapshot; source unchanged.</p><nav aria-label="Document sections">${navigation}</nav>${body}<footer><p class="note">${segments.length} math expressions · KaTeX ${katex.version} · Source SHA-256: ${receipt.sourceSha256}</p><p class="note">Source links are inactive. Images are listed without fetching them (${omittedImages} omitted). Rerender after source changes.</p></footer></main></body></html>`;
  return { html, receipt };
}

export function writePreview({ input, output, ...options }) {
  const inputPath = fs.realpathSync(input);
  const outputPath = path.resolve(output);
  if (path.extname(outputPath).toLowerCase() !== ".html") throw new Error("Output must be an HTML file");
  if (fs.existsSync(outputPath)) {
    const inputStat = fs.statSync(inputPath);
    const outputStat = fs.statSync(outputPath);
    if (inputStat.dev === outputStat.dev && inputStat.ino === outputStat.ino) throw new Error("Cannot overwrite the source");
    if (!fs.readFileSync(outputPath, "utf8").includes(MARKER)) throw new Error("Refusing to overwrite an unrelated output file");
  }
  const source = fs.readFileSync(inputPath, "utf8");
  const { html, receipt } = renderPreview(source, { sourceName: path.basename(inputPath), ...options });
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
  if (sha256(fs.readFileSync(inputPath)) !== receipt.sourceSha256) throw new Error("Source changed during rendering; rerender the snapshot");
  return { ...receipt, input: inputPath, output: outputPath };
}

export async function servePreview(output, { port = 0 } = {}) {
  const file = fs.realpathSync(output);
  if (!fs.readFileSync(file, "utf8").includes(MARKER)) throw new Error("Serve only an output created by this helper");
  const server = http.createServer((request, response) => {
    const address = server.address();
    const hosts = [`127.0.0.1:${address.port}`, `localhost:${address.port}`];
    if (!hosts.includes(request.headers.host) || (request.headers.origin && !hosts.some((host) => request.headers.origin === `http://${host}`))) {
      response.writeHead(403); response.end(); return;
    }
    if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405); response.end(); return; }
    if (request.url !== "/preview.html" && request.url !== "/") { response.writeHead(404); response.end(); return; }
    try {
      const html = fs.readFileSync(file);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Content-Security-Policy": CSP, "X-Content-Type-Options": "nosniff" });
      response.end(request.method === "HEAD" ? undefined : html);
    } catch { response.writeHead(503); response.end("Preview unavailable; rerender the artifact."); }
  });
  await new Promise((resolve, reject) => { server.once("error", reject); server.listen(port, "127.0.0.1", resolve); });
  return { server, url: `http://127.0.0.1:${server.address().port}/preview.html` };
}

async function main() {
  const { values } = parseArgs({ options: { input: { type: "string" }, output: { type: "string" }, title: { type: "string" }, section: { type: "string" }, theme: { type: "string", default: "purple" }, serve: { type: "boolean", default: false }, port: { type: "string", default: "0" }, help: { type: "boolean", default: false } } });
  if (values.help) {
    console.log("Usage: node .agents/skills/math-preview/scripts/render-preview.mjs --input FILE.md --output FILE.html [--section 'Exact heading'] [--title TITLE] [--theme purple|light] [--serve] [--port 0]");
    return;
  }
  if (!values.input || !values.output) throw new Error("--input and --output are required; see --help");
  const port = Number(values.port);
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("Port must be an integer from 0 to 65535");
  const receipt = writePreview(values);
  if (values.serve) {
    const { url } = await servePreview(receipt.output, { port });
    receipt.url = url;
    receipt.serverPid = process.pid;
  }
  console.log(JSON.stringify(receipt, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
