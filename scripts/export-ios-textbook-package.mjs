#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { loadVendoredCommonJsBundle } from "./load-vendored-commonjs-bundle.mjs";

const ROOT_DIR = process.cwd();
const TEXTBOOK_TOC_PATH = "content/graph/textbook_toc.json";
const READING_COPY_DIR = "content/generated/markdown/textbook/reading-copies";
const APP_ROOT = "apps/ios/ArchitrinoReader";
const READER_ASSET_DIR = `${APP_ROOT}/ArchitrinoReader/ReaderAssets`;
const DEFAULT_OUTPUT_DIR = `${APP_ROOT}/GeneratedTextbookPackage`;
const SCHEMA_PATH = `${APP_ROOT}/textbook_bundle_schema_v1.json`;
const MANIFEST_FILE = "textbook_bundle.json";
const LINK_METADATA_FILE = "textbook_bundle_links.json";
const SEARCH_INDEX_FILE = "textbook_bundle_search_index.json";
const MANIFEST_SCHEMA = "textbook_bundle_schema_v1";
const PACKAGE_VERSION_PREFIX = "1.0.0";
const SEARCH_SNIPPET_LENGTH = 220;
const SEARCH_MARKDOWN_SNIPPET_LENGTH = 360;
const SEARCH_INDEX_SCHEMA_VERSION = 1;
const ARCHITRINO_WEB_BASE_URL = "https://architrino.com";
const REFERENCE_MARKDOWN_DOCUMENTS = [
  {
    id: "archie-terminology-usage",
    title: "Terminology Usage",
    sourcePath: "content/markdown/aaa/archie/terminology-usage.md",
    bundlePath: "references/terminology-usage.md",
  },
  {
    id: "archie-comparative-glossary",
    title: "Comparative Glossary",
    sourcePath: "content/markdown/aaa/archie/comparative-glossary.md",
    bundlePath: "references/comparative-glossary.md",
  },
  {
    id: "archie-mathematics-terminology",
    title: "Mathematics Terminology",
    sourcePath: "content/markdown/aaa/archie/mathematics-terminology.md",
    bundlePath: "references/mathematics-terminology.md",
  },
  {
    id: "archie-academic-style-guide",
    title: "Academic Style Guide",
    sourcePath: "content/markdown/aaa/archie/academic-style-guide.md",
    bundlePath: "references/academic-style-guide.md",
  },
  {
    id: "archie-mathematics-style-guide",
    title: "Mathematics Style Guide",
    sourcePath: "content/markdown/aaa/archie/mathematics-style-guide.md",
    bundlePath: "references/mathematics-style-guide.md",
  },
];
const REFERENCE_MARKDOWN_BY_SOURCE_PATH = new Map(
  REFERENCE_MARKDOWN_DOCUMENTS.map((document) => [
    normalizeRelPath(document.sourcePath),
    document,
  ]),
);
const ASSET_EXTENSIONS = new Set([
  ".css",
  ".gif",
  ".jpeg",
  ".jpg",
  ".js",
  ".json",
  ".pdf",
  ".png",
  ".svg",
  ".webp",
]);

const MarkdownIt = loadVendoredCommonJsBundle(
  path.join(ROOT_DIR, READER_ASSET_DIR, "markdown-it.min.js"),
);
const katex = loadVendoredCommonJsBundle(
  path.join(ROOT_DIR, READER_ASSET_DIR, "katex/katex.min.js"),
);
const renderedMarkdownParser = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

const parsed = parseArgs(process.argv.slice(2));
const mode = parsed.write ? "write" : "check";
const strict = parsed.strict;
const outputDir = normalizeRelPath(parsed.output || DEFAULT_OUTPUT_DIR);

if (parsed.modeConflict) {
  printUsage(2);
}
if (parsed.unknown.length) {
  console.error(`Unknown argument(s): ${parsed.unknown.join(", ")}`);
  printUsage(2);
}
if (parsed.helpRequested) {
  printUsage(0);
}

const rootOutputPath = path.join(ROOT_DIR, outputDir);
const manifest = {
  schema_version: 1,
  manifest_schema: MANIFEST_SCHEMA,
  generated_at: new Date().toISOString(),
  package_version: "",
  schema_version_note: "content_bundle_schema_v1",
  textbook_toc: {
    path: TEXTBOOK_TOC_PATH,
    sha256: "",
    size: 0,
  },
  chapters: [],
  references: [],
  files: [],
  links: [],
};

const warnings = [];
const errors = [];
const diagnostics = [];
const seenBundlePaths = new Set();
const generatedFilePayloads = new Map();
const searchIndex = [];

function printUsage(code) {
  console.log("Usage: node scripts/export-ios-textbook-package.mjs [--check|--write] [--strict] [--output=PATH]");
  console.log("  --write   Build bundle artifacts into local path");
  console.log("  --check   Verify existing bundle artifacts against canonical sources (default)");
  console.log("  --strict  In check mode, treat warnings as hard failures");
  console.log("  --output  Override package output path (for example: apps/ios/ArchitrinoReader/GeneratedTextbookPackage)");
  process.exit(code);
}

function parseArgs(argv) {
  const state = {
    write: false,
    check: false,
    strict: false,
    output: null,
    unknown: [],
    modeConflict: false,
    helpRequested: false,
  };
  for (const arg of argv) {
    if (arg === "--help") {
      state.helpRequested = true;
    } else if (arg === "--write") {
      state.write = true;
    } else if (arg === "--check") {
      state.check = true;
    } else if (arg === "--strict") {
      state.strict = true;
    } else if (arg.startsWith("--output=")) {
      state.output = arg.slice("--output=".length);
    } else {
      state.unknown.push(arg);
    }
  }
  if (state.write && state.check) {
    state.modeConflict = true;
  }
  return state;
}

function normalizeRelPath(value) {
  return String(value)
    .replace(/\\/g, "/")
    .replace(/^\.\/?/, "")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
}

function toPosix(value) {
  return String(value).replace(/\\/g, "/");
}

function readText(filePath, label) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    errors.push(`Failed to read ${label || toPosix(filePath)}: ${error.message}`);
    return null;
  }
}

function readJson(filePath, label) {
  const payload = readText(filePath, label);
  if (payload === null) {
    return null;
  }
  try {
    return JSON.parse(payload);
  } catch (error) {
    errors.push(`Invalid JSON in ${label || toPosix(filePath)}: ${error.message}`);
    return null;
  }
}

function sha256Buffer(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
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

function addFileRecord({ sourcePath, bundlePath, type, role }) {
  const absoluteSource = path.join(ROOT_DIR, sourcePath);
  if (!fs.existsSync(absoluteSource)) {
    errors.push(`Expected source file missing: ${toPosix(sourcePath)}`);
    return;
  }
  if (seenBundlePaths.has(bundlePath)) {
    errors.push(`Duplicate bundle path: ${bundlePath}`);
    return;
  }
  const payload = fs.readFileSync(absoluteSource);
  const hash = sha256Buffer(payload);
  manifest.files.push({
    path: bundlePath,
    sourcePath,
    role,
    type,
    size: payload.length,
    sha256: hash,
  });
  seenBundlePaths.add(bundlePath);
}

function addGeneratedFileRecord({ bundlePath, type, role, payload }) {
  const bytes = Buffer.from(payload);
  const sourcePath = `__generated__/${bundlePath}`;
  if (seenBundlePaths.has(bundlePath)) {
    errors.push(`Duplicate bundle path: ${bundlePath}`);
    return;
  }
  manifest.files.push({
    path: bundlePath,
    sourcePath,
    role,
    type,
    size: bytes.length,
    sha256: sha256Buffer(bytes),
  });
  generatedFilePayloads.set(bundlePath, bytes);
  seenBundlePaths.add(bundlePath);
}

function addChapterRecord({ entry, sectionKeys }) {
  const slug = slugFromTitle(entry.title);
  const sourcePath = `${READING_COPY_DIR}/${slug}.md`;
  const bundlePath = `reading-copies/${slug}.md`;
  const htmlPath = `reading-copies/${slug}.html`;

  const absoluteSource = path.join(ROOT_DIR, sourcePath);
  if (!fs.existsSync(absoluteSource)) {
    warnings.push(`Missing chapter bundle for TOC node '${entry.title}': ${sourcePath}`);
    return null;
  }

  const buffer = fs.readFileSync(absoluteSource);
  const markdownText = buffer.toString("utf8");
  const record = {
    id: entry.id || slug,
    title: entry.title,
    markdownPath: sourcePath,
    bundlePath,
    htmlPath,
    heading: entry.kind === "markdown-view" ? "markdown-view" : "scene-index",
    sectionCount: sectionKeys.length,
    sectionKeys: sectionKeys,
  };

  const chapterBytes = sha256Buffer(buffer);
  if (seenBundlePaths.has(bundlePath)) {
    errors.push(`Duplicate chapter bundle path: ${bundlePath}`);
    return null;
  }
  manifest.chapters.push(record);
  manifest.files.push({
    path: bundlePath,
    sourcePath,
    role: "chapter",
    type: "markdown",
    size: buffer.length,
    sha256: chapterBytes,
  });
  seenBundlePaths.add(bundlePath);
  addGeneratedFileRecord({
    bundlePath: htmlPath,
    type: "html",
    role: "chapter",
    payload: renderMarkdownHTMLFragment(markdownText),
  });
  return {
    sourcePath,
    bundlePath,
    htmlPath,
    chapterId: record.id,
    sourceChapterId: record.id,
    id: record.id,
    title: record.title,
    sectionKeys: record.sectionKeys,
  };
}

function addReferenceDocumentRecord(document) {
  const sourcePath = normalizeRelPath(document.sourcePath);
  const bundlePath = normalizeRelPath(document.bundlePath);
  const htmlPath = bundlePath.replace(/\.md$/i, ".html");
  const absoluteSource = path.join(ROOT_DIR, sourcePath);

  if (!fs.existsSync(absoluteSource)) {
    errors.push(`Expected reference document missing: ${sourcePath}`);
    return null;
  }

  const buffer = fs.readFileSync(absoluteSource);
  const markdownText = buffer.toString("utf8");
  if (seenBundlePaths.has(bundlePath)) {
    errors.push(`Duplicate reference bundle path: ${bundlePath}`);
    return null;
  }

  const record = {
    id: document.id,
    title: document.title,
    sourcePath,
    bundlePath,
    htmlPath,
  };

  manifest.references.push(record);
  manifest.files.push({
    path: bundlePath,
    sourcePath,
    role: "reference",
    type: "markdown",
    size: buffer.length,
    sha256: sha256Buffer(buffer),
  });
  seenBundlePaths.add(bundlePath);
  addGeneratedFileRecord({
    bundlePath: htmlPath,
    type: "html",
    role: "reference",
    payload: renderMarkdownHTMLFragment(markdownText),
  });

  return {
    sourcePath,
    bundlePath,
    htmlPath,
    sourceChapterId: record.id,
    id: record.id,
    title: record.title,
  };
}

function collectSectionKeys(entry) {
  const sections = [];
  const walk = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }
    if (node.kind === "markdown-section" && node.sectionKey) {
      const title = String(node.title || "").trim();
      const key = String(node.sectionKey || "").trim();
      if (key) {
        sections.push(key);
      }
      if (title && !key) {
        sections.push(title.toLowerCase());
      }
      return;
    }
    const children = Array.isArray(node.children) ? node.children : [];
    children.forEach(walk);
  };
  walk(entry);
  return [...new Set(sections)];
}

function normalizeSectionKey(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function anchorFromTitle(title) {
  return String(title || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^a-z0-9\-\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "") || "section";
}

function anchorTitleFromMarkdownContent(content, env) {
  return String(content || "")
    .replace(/@@ARCHITRINO_INLINE_MATH_(\d+)@@/g, (_match, indexValue) => {
      const index = Number(indexValue);
      const block = env?.inlineMathBlocks?.[index];
      return block?.math || "";
    })
    .replace(/@@ARCHITRINO_DISPLAY_MATH_(\d+)@@/g, (_match, indexValue) => {
      const index = Number(indexValue);
      const block = env?.displayMathBlocks?.[index];
      return block?.math || "";
    });
}

function installHeadingAnchorRenderer(markdownParser) {
  const defaultHeadingOpen =
    markdownParser.renderer.rules.heading_open ||
    ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

  markdownParser.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const level = Number(String(token.tag || "").replace(/^h/i, ""));
    if (level >= 2 && level <= 6) {
      const inlineToken = tokens[idx + 1];
      const anchorTitle = anchorTitleFromMarkdownContent(inlineToken?.content || "", env);
      const baseAnchor = anchorFromTitle(anchorTitle);
      env.headingAnchorCounts = env.headingAnchorCounts || new Map();
      const prior = env.headingAnchorCounts.get(baseAnchor) || 0;
      token.attrSet("id", prior === 0 ? baseAnchor : `${baseAnchor}-${prior}`);
      env.headingAnchorCounts.set(baseAnchor, prior + 1);
    }
    return defaultHeadingOpen(tokens, idx, options, env, self);
  };
}

installHeadingAnchorRenderer(renderedMarkdownParser);

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEscapedDelimiter(text, index) {
  let slashCount = 0;
  for (let cursor = index - 1; cursor >= 0 && text[cursor] === "\\"; cursor -= 1) {
    slashCount += 1;
  }
  return slashCount % 2 === 1;
}

function findClosingDelimiter(text, delimiter, fromIndex) {
  let index = fromIndex;
  while (index < text.length) {
    const candidate = text.indexOf(delimiter, index);
    if (candidate < 0) {
      return -1;
    }
    if (!isEscapedDelimiter(text, candidate)) {
      return candidate;
    }
    index = candidate + delimiter.length;
  }
  return -1;
}

function nextMathDelimiter(text, fromIndex) {
  const delimiters = [
    { open: "$$", close: "$$", display: true },
    { open: "\\[", close: "\\]", display: true },
    { open: "\\(", close: "\\)", display: false },
    { open: "$", close: "$", display: false },
  ];
  let best = null;
  for (const delimiter of delimiters) {
    let index = text.indexOf(delimiter.open, fromIndex);
    while (index >= 0 && isEscapedDelimiter(text, index)) {
      index = text.indexOf(delimiter.open, index + delimiter.open.length);
    }
    if (index >= 0 && (!best || index < best.index || delimiter.open.length > best.delimiter.open.length)) {
      best = { index, delimiter };
    }
  }
  return best;
}

function renderedMathHTML(math, displayMode, fallbackText) {
  const internalTokenPattern = /@@ARCHITRINO_(?:DISPLAY|INLINE)_MATH_\d+@@/g;
  const cleanFallbackText = String(fallbackText || "").replace(internalTokenPattern, "");
  if (/@@ARCHITRINO_(?:DISPLAY|INLINE)_MATH_\d+@@/.test(String(math || ""))) {
    return escapeHTML(cleanFallbackText);
  }
  try {
    return katex.renderToString(math, {
      displayMode,
      throwOnError: false,
      strict: "ignore",
    });
  } catch {
    return escapeHTML(cleanFallbackText);
  }
}

function isFenceStart(trimmedLine) {
  if (trimmedLine.startsWith("```")) {
    return "```";
  }
  if (trimmedLine.startsWith("~~~")) {
    return "~~~";
  }
  return null;
}

function displayMathOpenForLine(line) {
  const match = /^(\s*(?:>\s*)?(?:(?:[-*+]|\d+\.)\s+)?)(\$\$|\\\[)\s*$/.exec(line);
  if (!match) {
    return null;
  }
  return {
    prefix: match[1] || "",
    closeDelimiter: match[2] === "$$" ? "$$" : "\\]",
  };
}

function isDisplayMathCloseLine(line, closeDelimiter) {
  const escaped = closeDelimiter === "$$" ? "\\$\\$" : "\\\\\\]";
  return new RegExp(`^\\s*(?:>\\s*)?${escaped}\\s*$`).test(line);
}

function stripDisplayMathContentPrefix(line, displayOpen) {
  if (String(displayOpen.prefix || "").includes(">")) {
    return line.replace(/^\s*>\s?/, "");
  }
  return line;
}

function extractDisplayMathBlocks(markdownText) {
  const displayBlocks = [];
  const outputLines = [];
  const lines = String(markdownText || "").split(/\r?\n/);
  let fence = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (fence) {
      outputLines.push(line);
      if (trimmed.startsWith(fence)) {
        fence = null;
      }
      continue;
    }

    const fenceStart = isFenceStart(trimmed);
    if (fenceStart) {
      fence = fenceStart;
      outputLines.push(line);
      continue;
    }

    const displayOpen = displayMathOpenForLine(line);
    if (!displayOpen) {
      outputLines.push(line);
      continue;
    }

    const mathLines = [];
    let closeIndex = -1;
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      if (isDisplayMathCloseLine(lines[cursor], displayOpen.closeDelimiter)) {
        closeIndex = cursor;
        break;
      }
      mathLines.push(stripDisplayMathContentPrefix(lines[cursor], displayOpen));
    }

    if (closeIndex < 0) {
      outputLines.push(line);
      continue;
    }

    const blockIndex = displayBlocks.length;
    displayBlocks.push({
      math: mathLines.join("\n"),
      fallbackText: `${trimmed}\n${mathLines.join("\n")}\n${displayOpen.closeDelimiter}`,
    });
    outputLines.push(`${displayOpen.prefix}@@ARCHITRINO_DISPLAY_MATH_${blockIndex}@@`);
    index = closeIndex;
  }

  return {
    markdownText: outputLines.join("\n"),
    displayBlocks,
  };
}

function backtickRunAt(text, index) {
  let cursor = index;
  while (cursor < text.length && text[cursor] === "`") {
    cursor += 1;
  }
  return text.slice(index, cursor);
}

function extractInlineMathFromText(text, inlineBlocks) {
  let output = "";
  let cursor = 0;

  while (cursor < text.length) {
    const match = nextMathDelimiter(text, cursor);
    const codeStart = text.indexOf("`", cursor);

    if (!match) {
      output += text.slice(cursor);
      break;
    }

    if (codeStart >= 0 && codeStart < match.index) {
      const tickRun = backtickRunAt(text, codeStart);
      const closeIndex = text.indexOf(tickRun, codeStart + tickRun.length);
      const codeEnd = closeIndex >= 0 ? closeIndex + tickRun.length : codeStart + tickRun.length;
      output += text.slice(cursor, codeEnd);
      cursor = codeEnd;
      continue;
    }

    const { index, delimiter } = match;
    const contentStart = index + delimiter.open.length;
    const contentEnd = findClosingDelimiter(text, delimiter.close, contentStart);
    if (contentEnd < 0) {
      output += text.slice(cursor, contentStart);
      cursor = contentStart;
      continue;
    }

    const fallbackText = text.slice(index, contentEnd + delimiter.close.length);
    const mathIndex = inlineBlocks.length;
    inlineBlocks.push({
      math: text.slice(contentStart, contentEnd),
      display: delimiter.display,
      fallbackText,
    });
    output += text.slice(cursor, index);
    output += `@@ARCHITRINO_INLINE_MATH_${mathIndex}@@`;
    cursor = contentEnd + delimiter.close.length;
  }

  return output;
}

function extractInlineMathSpans(markdownText) {
  const inlineBlocks = [];
  const outputLines = [];
  const lines = String(markdownText || "").split(/\r?\n/);
  let fence = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (fence) {
      outputLines.push(line);
      if (trimmed.startsWith(fence)) {
        fence = null;
      }
      continue;
    }

    const fenceStart = isFenceStart(trimmed);
    if (fenceStart) {
      fence = fenceStart;
      outputLines.push(line);
      continue;
    }

    outputLines.push(extractInlineMathFromText(line, inlineBlocks));
  }

  return {
    markdownText: outputLines.join("\n"),
    inlineBlocks,
  };
}

function replaceDisplayMathPlaceholders(html, displayBlocks) {
  return displayBlocks.reduce((result, block, index) => {
    const token = `@@ARCHITRINO_DISPLAY_MATH_${index}@@`;
    const rendered = renderedMathHTML(block.math, true, block.fallbackText);
    return result
      .replaceAll(`<p>${token}</p>`, rendered)
      .replaceAll(token, rendered);
  }, html);
}

function replaceInlineMathPlaceholders(html, inlineBlocks) {
  return inlineBlocks.reduce((result, block, index) => {
    const token = `@@ARCHITRINO_INLINE_MATH_${index}@@`;
    return result.replaceAll(token, renderedMathHTML(block.math, block.display, block.fallbackText));
  }, html);
}

function renderMarkdownHTMLFragment(markdownText) {
  const displayPrepared = extractDisplayMathBlocks(markdownText || "");
  const inlinePrepared = extractInlineMathSpans(displayPrepared.markdownText);
  const html = renderedMarkdownParser.render(inlinePrepared.markdownText, {
    displayMathBlocks: displayPrepared.displayBlocks,
    headingAnchorCounts: new Map(),
    inlineMathBlocks: inlinePrepared.inlineBlocks,
  });
  return replaceInlineMathPlaceholders(
    replaceDisplayMathPlaceholders(html, displayPrepared.displayBlocks),
    inlinePrepared.inlineBlocks,
  );
}

function normalizeSearchText(value) {
  return String(value || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1")
    .replace(/!\[[^\]]*\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\\[a-zA-Z]+/g, " ")
    .replace(/\$\$/g, " ")
    .replace(/\$/g, " ")
    .replace(/\\left|\\right/g, " ")
    .replace(/\u201c|\u201d/g, "\"")
    .replace(/\u2018|\u2019/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSearchSnippetMarkdown(value) {
  return String(value || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isEscapedAt(text, index) {
  let slashCount = 0;
  for (let cursor = index - 1; cursor >= 0 && text[cursor] === "\\"; cursor -= 1) {
    slashCount += 1;
  }
  return slashCount % 2 === 1;
}

function countUnescapedDelimiter(text, delimiter) {
  let count = 0;
  let cursor = 0;
  while (cursor < text.length) {
    const index = text.indexOf(delimiter, cursor);
    if (index < 0) {
      break;
    }
    if (!isEscapedAt(text, index)) {
      count += 1;
    }
    cursor = index + delimiter.length;
  }
  return count;
}

function countUnescapedSingleDollar(text) {
  let count = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] !== "$" || isEscapedAt(text, index)) {
      continue;
    }
    if (text[index - 1] === "$" || text[index + 1] === "$") {
      continue;
    }
    count += 1;
  }
  return count;
}

function countUnescapedSingleBacktick(text) {
  let count = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] !== "`" || isEscapedAt(text, index)) {
      continue;
    }
    if (text[index - 1] === "`" || text[index + 1] === "`") {
      continue;
    }
    count += 1;
  }
  return count;
}

function closeUnmatchedMarkdownDelimiters(text) {
  let closed = text;
  if (countUnescapedDelimiter(closed, "$$") % 2 === 1) {
    closed += "$$";
  }
  if (countUnescapedSingleDollar(closed) % 2 === 1) {
    closed += "$";
  }
  if (countUnescapedDelimiter(closed, "**") % 2 === 1) {
    closed += "**";
  }
  if (countUnescapedSingleBacktick(closed) % 2 === 1) {
    closed += "`";
  }
  return closed;
}

function truncateRenderableMarkdown(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  const head = text.slice(0, maxLength);
  const boundary = Math.max(
    head.lastIndexOf(" "),
    head.lastIndexOf("."),
    head.lastIndexOf(","),
    head.lastIndexOf(";"),
    head.lastIndexOf(":"),
  );
  const cutoff = boundary > Math.floor(maxLength * 0.65) ? boundary : maxLength;
  return `${closeUnmatchedMarkdownDelimiters(head.slice(0, cutoff).trim())}...`;
}

function buildSearchSnippetMarkdown(value) {
  const compact = normalizeSearchSnippetMarkdown(value);
  return truncateRenderableMarkdown(compact, SEARCH_MARKDOWN_SNIPPET_LENGTH);
}

function buildSearchEntriesForChapter({ chapter, markdownText, sectionKeys }) {
  const sectionKeySet = new Set((sectionKeys || []).map((key) => normalizeSectionKey(key)));
  const anchorCounts = new Map();
  const duplicateHeadingCounts = new Map();
  const lines = String(markdownText || "").split(/\r?\n/);
  const chapterPath = chapter.bundlePath;
  const normalizedChapterPath = chapter.sourcePath;
  let currentHeading = {
    sectionTitle: chapter.title,
    headingLevel: 1,
    anchor: "top",
    lines: [],
  };

  const flushCurrent = () => {
    const rawSectionMarkdown = currentHeading.lines.join("\n");
    const rawSectionText = currentHeading.lines.join(" ");
    const sectionText = normalizeSearchText(rawSectionText);
    if (!sectionText) {
      return;
    }
    const normalizedKey = normalizeSectionKey(currentHeading.sectionTitle);
    const sectionAnchorKey = `${chapter.id}::${currentHeading.anchor}`;
    if (searchIndex.find((entry) => entry.sectionAnchorKey === sectionAnchorKey)) {
      warnings.push(`Duplicate section anchor path detected for ${chapter.id}: ${currentHeading.anchor}`);
    }
    searchIndex.push({
      chapterId: chapter.id,
      chapterTitle: chapter.title,
      chapterPath: chapterPath,
      chapterSourcePath: normalizedChapterPath,
      sectionTitle: currentHeading.sectionTitle,
      headingLevel: currentHeading.headingLevel,
      sectionAnchor: currentHeading.anchor,
      sectionAnchorKey,
      sectionKey:
        sectionKeySet.has(normalizedKey) || normalizedKey === "top" ? normalizedKey : "",
      text: sectionText,
      snippet: sectionText.length > SEARCH_SNIPPET_LENGTH ? `${sectionText.slice(0, SEARCH_SNIPPET_LENGTH)}...` : sectionText,
      snippetMarkdown: buildSearchSnippetMarkdown(rawSectionMarkdown),
      sourcePath: chapter.sourcePath,
    });
  };

  for (const line of lines) {
    const headingMatch = /^(#{2,6})\s+(.+?)(?:\s+\{[^}]*\})?\s*$/.exec(line);
    if (headingMatch) {
      flushCurrent();
      const level = headingMatch[1].length;
      const title = String(headingMatch[2] || "").trim();
      const baseAnchor = anchorFromTitle(title);
      const prior = anchorCounts.get(baseAnchor) || 0;
      const anchor = prior === 0 ? baseAnchor : `${baseAnchor}-${prior}`;
      anchorCounts.set(baseAnchor, prior + 1);
      if (prior > 0) {
        duplicateHeadingCounts.set(baseAnchor, (duplicateHeadingCounts.get(baseAnchor) || 1) + 1);
      }
      currentHeading = {
        sectionTitle: title,
        headingLevel: level,
        anchor,
        lines: [],
      };
      continue;
    }
    currentHeading.lines.push(line);
  }
  flushCurrent();

  const duplicateHeadings = [...duplicateHeadingCounts.entries()];
  if (duplicateHeadings.length) {
    const duplicateCount = duplicateHeadings.reduce((sum, item) => sum + item[1], 0);
    diagnostics.push(
      `Chapter ${chapter.sourcePath} has ${duplicateCount} repeated heading titles (${duplicateHeadings.length} unique titles); assigned deterministic suffix anchors for intra-chapter linking.`,
    );
  }
}

function collectLinks(markdownText) {
  const links = [];
  const lines = String(markdownText ?? "").split(/\r?\n/);
  let inFence = false;
  const pattern = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]+\")?\)/g;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }
    let match;
    while ((match = pattern.exec(line)) !== null) {
      links.push(match[1]);
    }
  }
  return links;
}

function splitTarget(rawTarget) {
  return String(rawTarget || "").split(/[?#]/, 2)[0];
}

function resolveLink(sourceMarkdownPath, target) {
  const trimmed = String(target || "").trim();
  if (!trimmed || trimmed.startsWith("#")) {
    return { status: "skip_anchor" };
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    return { status: "external" };
  }

  const noQuery = splitTarget(trimmed);
  const sourceDir = path.dirname(sourceMarkdownPath);
  const joined = path.join(sourceDir, noQuery);
  const normalized = path.normalize(joined);

  const absolute = path.isAbsolute(normalized)
    ? normalized
    : path.resolve(ROOT_DIR, normalized);
  const rel = path.relative(ROOT_DIR, absolute);

  if (rel.startsWith("..") || rel.startsWith("/")) {
    return { status: "outside_repo" };
  }

  return {
    status: "local",
    resolvedPath: normalizeRelPath(rel),
    ext: path.extname(rel).toLowerCase(),
  };
}

function toArchitrinoWebUrl(rawTarget, resolvedPath) {
  const trimmed = String(rawTarget || "").trim();
  const anchorMatch = trimmed.split("#", 2);
  const anchor = anchorMatch.length > 1 ? `#${anchorMatch[1]}` : "";
  const targetBasename = path.basename(String(resolvedPath || "").trim(), path.extname(resolvedPath || ""));
  const slug = targetBasename ? targetBasename.toLowerCase() : "";
  if (!slug) {
    return null;
  }
  if (slug === "ideal-braid") {
    return `${ARCHITRINO_WEB_BASE_URL}/ideal-braid${anchor}`;
  }
  return `${ARCHITRINO_WEB_BASE_URL}/${slug}${anchor}`;
}

function toArchitrinoSceneWebUrl(resolvedPath) {
  const scenePath = normalizeRelPath(resolvedPath);
  if (!scenePath.startsWith("content/scenes/") || !scenePath.endsWith(".json")) {
    return null;
  }
  const params = new URLSearchParams();
  params.set("scene", scenePath);
  return `${ARCHITRINO_WEB_BASE_URL}/#${params.toString()}`;
}

function processLink({ sourcePath, sourceChapterId }, rawTarget) {
  const normalized = resolveLink(sourcePath, rawTarget);
  const target = String(rawTarget || "").trim();

  if (normalized.status === "skip_anchor") {
    manifest.links.push({
      sourceChapterId,
      sourcePath,
      target,
      kind: "anchor",
      status: normalized.status,
      targetBundlePath: "",
    });
    return;
  }

  if (normalized.status === "external") {
    manifest.links.push({
      sourceChapterId,
      sourcePath,
      target,
      kind: "external",
      status: normalized.status,
      targetBundlePath: "",
    });
    return;
  }

  if (normalized.status === "outside_repo") {
    warnings.push(`Skipped non-repo link in ${sourcePath}: ${target}`);
    manifest.links.push({
      sourceChapterId,
      sourcePath,
      target,
      kind: "unsupported",
      status: normalized.status,
      targetBundlePath: "",
    });
    return;
  }

  if (!normalized.ext) {
    manifest.links.push({
      sourceChapterId,
      sourcePath,
      target,
      kind: "local",
      status: "missing_extension",
      targetBundlePath: normalized.resolvedPath,
    });
    warnings.push(`Unsupported link target without extension in ${sourcePath}: ${target}`);
    return;
  }

  if (normalized.ext === ".md") {
    const referenceDocument = REFERENCE_MARKDOWN_BY_SOURCE_PATH.get(normalized.resolvedPath);
    if (referenceDocument) {
      manifest.links.push({
        sourceChapterId,
        sourcePath,
        target,
        kind: "markdown",
        status: "bundled_reference",
        targetBundlePath: referenceDocument.bundlePath,
      });
      return;
    }

    manifest.links.push({
      sourceChapterId,
      sourcePath,
      target,
      kind: "markdown",
      status: "kept_out_of_bundle",
      targetBundlePath: normalized.resolvedPath,
    });
    return;
  }

  if (normalized.ext === ".html") {
    const redirectUrl = toArchitrinoWebUrl(target, normalized.resolvedPath);
    manifest.links.push({
      sourceChapterId,
      sourcePath,
      target,
      kind: "external",
      status: redirectUrl ? "web_redirect" : "unsupported_extension_html",
      targetBundlePath: redirectUrl || normalized.resolvedPath,
    });
    if (!redirectUrl) {
      warnings.push(`Unsupported html link in ${sourcePath}: ${target}`);
    }
    return;
  }

  if (normalized.ext === ".json") {
    const redirectUrl = toArchitrinoSceneWebUrl(normalized.resolvedPath);
    manifest.links.push({
      sourceChapterId,
      sourcePath,
      target,
      kind: redirectUrl ? "external" : "unsupported",
      status: redirectUrl ? "web_scene_redirect" : "unsupported_extension_json",
      targetBundlePath: redirectUrl || normalized.resolvedPath,
    });
    if (!redirectUrl) {
      warnings.push(`Unsupported json link in ${sourcePath}: ${target}`);
    }
    return;
  }

  if (!ASSET_EXTENSIONS.has(normalized.ext)) {
    manifest.links.push({
      sourceChapterId,
      sourcePath,
      target,
      kind: "unsupported",
      status: `unsupported_extension_${normalized.ext.replace(/\./, "")}`,
      targetBundlePath: normalized.resolvedPath,
    });
    warnings.push(`Unsupported link extension in ${sourcePath}: ${target}`);
    return;
  }

  const bundlePath = `assets/${normalized.resolvedPath}`;
  if (!seenBundlePaths.has(bundlePath)) {
    const absoluteAsset = path.join(ROOT_DIR, normalized.resolvedPath);
    if (!fs.existsSync(absoluteAsset)) {
      warnings.push(`Missing asset for link in ${sourcePath}: ${target} -> ${normalized.resolvedPath}`);
      manifest.links.push({
        sourceChapterId,
        sourcePath,
        target,
        kind: "asset",
        status: "missing_source",
        targetBundlePath: bundlePath,
      });
      return;
    }
    addFileRecord({
      sourcePath: normalized.resolvedPath,
      bundlePath,
      type: "binary",
      role: "asset",
    });
  }
  manifest.links.push({
    sourceChapterId,
    sourcePath,
    target,
    kind: "asset",
    status: "copied",
    targetBundlePath: bundlePath,
  });
}

function validateLinkMetadata() {
  const missingSourceChapterIds = manifest.links.filter((link) => !link.sourceChapterId);
  if (missingSourceChapterIds.length > 0) {
    const samples = missingSourceChapterIds
      .slice(0, 3)
      .map((link) => `${link.sourcePath} -> ${link.target}`)
      .join("; ");
    errors.push(
      `Generated link metadata is missing sourceChapterId on ${missingSourceChapterIds.length} links. Samples: ${samples}`,
    );
  }
}

function writeBundleFiles() {
  const manifestPath = path.join(rootOutputPath, MANIFEST_FILE);
  const metadataPath = path.join(rootOutputPath, LINK_METADATA_FILE);
  const packageTocPath = path.join(rootOutputPath, "graph/textbook_toc.json");

  if (mode === "write") {
    if (fs.existsSync(rootOutputPath)) {
      fs.rmSync(rootOutputPath, { recursive: true, force: true });
    }
    fs.mkdirSync(rootOutputPath, { recursive: true });

    for (const record of manifest.files) {
      const sourceAbsolute = path.join(ROOT_DIR, record.sourcePath);
      const targetAbsolute = path.join(rootOutputPath, record.path);
      if (record.sourcePath.startsWith("__generated__/")) {
        const payload = generatedFilePayloads.get(record.path);
        if (!payload) {
          errors.push(`Missing generated payload for ${record.path}`);
          continue;
        }
        fs.mkdirSync(path.dirname(targetAbsolute), { recursive: true });
        fs.writeFileSync(targetAbsolute, payload);
        continue;
      }
      if (!fs.existsSync(sourceAbsolute)) {
        errors.push(`Missing output source at write time: ${record.sourcePath}`);
        continue;
      }
      fs.mkdirSync(path.dirname(targetAbsolute), { recursive: true });
      fs.cpSync(sourceAbsolute, targetAbsolute, { force: true });
    }
    const sortedFiles = [...manifest.files].sort((a, b) => a.path.localeCompare(b.path));
    const bundleManifest = {
      ...manifest,
      package_version: `${PACKAGE_VERSION_PREFIX}-${manifest.textbook_toc.sha256.slice(0, 8)}`,
      files: sortedFiles,
      links: [],
    };
    fs.writeFileSync(packageTocPath, readText(path.join(ROOT_DIR, TEXTBOOK_TOC_PATH), TEXTBOOK_TOC_PATH), "utf8");
    fs.writeFileSync(manifestPath, `${JSON.stringify(bundleManifest, null, 2)}\n`, "utf8");
    fs.writeFileSync(
      metadataPath,
      `${JSON.stringify(
        {
          schema_version: 1,
          generated_at: manifest.generated_at,
          total_links: manifest.links.length,
          links: [...manifest.links].sort((a, b) => {
            const aKey = `${a.sourceChapterId}::${a.target}`;
            const bKey = `${b.sourceChapterId}::${b.target}`;
            return aKey.localeCompare(bKey);
          }),
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
  } else {
    if (!fs.existsSync(manifestPath)) {
      errors.push(`Missing expected bundle manifest at ${outputDir}/${MANIFEST_FILE}`);
      return;
    }
    const liveManifest = readJson(manifestPath, `${outputDir}/${MANIFEST_FILE}`);
    if (!liveManifest) {
      return;
    }
    const expectedManifest = {
      ...manifest,
      package_version: `${PACKAGE_VERSION_PREFIX}-${manifest.textbook_toc.sha256.slice(0, 8)}`,
      files: [...manifest.files].sort((a, b) => a.path.localeCompare(b.path)),
      links: [],
    };

    const expectedChapters = expectedManifest.chapters.length;
    if ((liveManifest.chapters || []).length !== expectedChapters) {
      warnings.push(`Chapter count drift: expected ${expectedChapters}, found ${(liveManifest.chapters || []).length}`);
    }

    for (const expected of expectedManifest.files) {
      const actual = liveManifest.files?.find((item) => item.path === expected.path);
      if (!actual) {
        errors.push(`Missing file in bundle manifest: ${expected.path}`);
        continue;
      }
      if (actual.sha256 !== expected.sha256) {
        warnings.push(`Manifest hash drift: ${expected.path}`);
      }
    }

    for (const record of expectedManifest.files) {
      const sourceAbsolute = path.join(rootOutputPath, record.path);
      if (!fs.existsSync(sourceAbsolute)) {
        errors.push(`Bundle file missing on disk: ${record.path}`);
        continue;
      }
      const onDisk = sha256Buffer(fs.readFileSync(sourceAbsolute));
      if (onDisk !== record.sha256) {
        warnings.push(`Bundle hash drift on disk: ${record.path}`);
      }
    }
  }
}

function addSearchIndexFileRecord() {
  const payload = {
    schema_version: SEARCH_INDEX_SCHEMA_VERSION,
    total_entries: searchIndex.length,
    entries: searchIndex,
  };
  addGeneratedFileRecord({
    bundlePath: SEARCH_INDEX_FILE,
    type: "json",
    role: "search",
    payload: `${JSON.stringify(payload, null, 2)}\n`,
  });
}

function validateSchemaFile() {
  const schemaText = readText(path.join(ROOT_DIR, SCHEMA_PATH), SCHEMA_PATH);
  if (schemaText === null) {
    warnings.push("Schema file missing. Added manifest without a local schema companion file.");
    return;
  }
  const schema = readJson(path.join(ROOT_DIR, SCHEMA_PATH), SCHEMA_PATH);
  if (schema && schema.title !== "Architrino Reader Textbook Bundle v1") {
    warnings.push(`Unexpected schema title in ${SCHEMA_PATH}: ${schema.title}`);
  }
}

(function main() {
  const toc = readJson(path.join(ROOT_DIR, TEXTBOOK_TOC_PATH), TEXTBOOK_TOC_PATH);
  if (!toc || !toc.tocRoot) {
    process.exitCode = 1;
    return;
  }

  const tocText = readText(path.join(ROOT_DIR, TEXTBOOK_TOC_PATH), TEXTBOOK_TOC_PATH);
  if (tocText !== null) {
    manifest.textbook_toc.sha256 = sha256Buffer(Buffer.from(tocText));
    manifest.textbook_toc.size = tocText.length;
  }

  const chapterEntries = Array.isArray(toc.tocRoot?.children) ? toc.tocRoot.children : [];
  if (chapterEntries.length === 0) {
    errors.push("No top-level chapters found in textbook_toc.json");
  }

  addFileRecord({
    sourcePath: TEXTBOOK_TOC_PATH,
    bundlePath: "graph/textbook_toc.json",
    type: "json",
    role: "toc",
  });

  chapterEntries.forEach((entry) => {
    const chapter = addChapterRecord({
      entry,
      sectionKeys: collectSectionKeys(entry),
    });
    if (!chapter) {
      return;
    }
    const chapterText = readText(path.join(ROOT_DIR, chapter.sourcePath), chapter.sourcePath);
    if (chapterText === null) {
      return;
    }
    buildSearchEntriesForChapter({
      chapter,
      markdownText: chapterText,
      sectionKeys: chapter.sectionKeys,
    });
    collectLinks(chapterText).forEach((target) => {
      processLink(chapter, target);
    });
  });

  REFERENCE_MARKDOWN_DOCUMENTS.forEach((document) => {
    const reference = addReferenceDocumentRecord(document);
    if (!reference) {
      return;
    }
    const referenceText = readText(path.join(ROOT_DIR, reference.sourcePath), reference.sourcePath);
    if (referenceText === null) {
      return;
    }
    collectLinks(referenceText).forEach((target) => {
      processLink(reference, target);
    });
  });

  addSearchIndexFileRecord();

  validateSchemaFile();
  validateLinkMetadata();
  writeBundleFiles();

  console.log(`export-ios-textbook-package mode: ${mode}`);
  console.log(`- Chapters: ${manifest.chapters.length}`);
  console.log(`- Files mapped: ${manifest.files.length}`);
  console.log(`- Links captured: ${manifest.links.length}`);
  console.log(`- Search entries: ${searchIndex.length}`);
  console.log(`- Output: ${toPosix(outputDir)}`);
  if (warnings.length) {
    console.log("warnings:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }
  if (diagnostics.length) {
    console.log("diagnostics:");
    diagnostics.forEach((diagnostic) => console.log(`- ${diagnostic}`));
  }
  if (errors.length) {
    console.log("errors:");
    errors.forEach((error) => console.log(`- ${error}`));
  }

  if (errors.length || (strict && warnings.length)) {
    process.exit(1);
  }
})();
