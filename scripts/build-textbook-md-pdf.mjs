#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const TEXTBOOK_TOC_PATH = "content/graph/textbook_toc.json";
const OUTPUT_DIR = "content/generated/markdown/textbook/reading-copies";
const FULL_TEXTBOOK_PATH = `${OUTPUT_DIR}/architrino-textbook.md`;

const args = new Set(process.argv.slice(2));
const wantsWrite = args.has("--write");
const wantsCheck = args.has("--check");
const unknownArgs = [...args].filter((arg) => !["--check", "--write", "--help"].includes(arg));

if (args.has("--help")) {
  printUsage(0);
}
if (unknownArgs.length) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  printUsage(2);
}
if (wantsWrite && wantsCheck) {
  console.error("Use either --check or --write, not both.");
  printUsage(2);
}

const mode = wantsWrite ? "write" : "check";
const rootDir = process.cwd();
const warnings = [];
const errors = [];

function printUsage(exitCode) {
  console.log("Usage: node scripts/build-textbook-md-pdf.mjs [--check|--write]");
  console.log("  --check  Validate generated textbook MD-to-PDF markdown files (default)");
  console.log("  --write  Regenerate textbook MD-to-PDF markdown files");
  process.exit(exitCode);
}

function toPosixPath(value) {
  return String(value).replace(/\\/g, "/");
}

function normalizePath(value) {
  return toPosixPath(String(value).trim())
    .replace(/^\.?\//, "")
    .replace(/\/+/g, "/")
    .replace(/\/$/, "");
}

function normalizeMarkdownKey(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugifyTitle(title) {
  return normalizeMarkdownKey(title).replace(/\s+/g, "-") || "section";
}

function parseMarkdownHeading(line) {
  const match = line.match(/^(#{1,6})\s+(.*)$/);
  if (!match) {
    return null;
  }
  let title = match[2].trim();
  const boldMatch = title.match(/^\*\*(.+?)\*\*/);
  if (boldMatch) {
    title = boldMatch[1].trim();
  }
  return {
    level: match[1].length,
    title,
  };
}

function extractMarkdownSection(markdown, sectionKey) {
  const target = normalizeMarkdownKey(sectionKey);
  if (!target) {
    return null;
  }
  const lines = String(markdown ?? "").split(/\r?\n/);
  let sectionTitle = null;
  let start = -1;
  let end = lines.length;
  let startLevel = null;
  for (let i = 0; i < lines.length; i += 1) {
    const heading = parseMarkdownHeading(lines[i]);
    if (!heading) {
      continue;
    }
    if (start === -1) {
      if (normalizeMarkdownKey(heading.title) === target) {
        sectionTitle = heading.title;
        start = i + 1;
        startLevel = heading.level;
      }
      continue;
    }
    if (heading.level <= (startLevel ?? heading.level)) {
      end = i;
      break;
    }
  }
  if (start === -1) {
    return null;
  }
  return {
    title: sectionTitle,
    body: lines.slice(start, end).join("\n").trim(),
    level: startLevel,
  };
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

function readMarkdown(relativePath) {
  const normalizedPath = normalizePath(relativePath);
  const absolutePath = path.join(rootDir, normalizedPath);
  try {
    return fs.readFileSync(absolutePath, "utf8");
  } catch (error) {
    warnings.push(`${normalizedPath}: failed to read markdown (${error.message})`);
    return null;
  }
}

function relativeRepoLink(fromPath, targetPath) {
  const fromDir = path.posix.dirname(normalizePath(fromPath));
  return path.posix.relative(fromDir, normalizePath(targetPath)) || ".";
}

function splitMarkdownTarget(target) {
  const value = String(target ?? "").trim();
  const suffixStart = value.search(/[?#]/);
  if (suffixStart === -1) {
    return { pathPart: value, suffix: "" };
  }
  return {
    pathPart: value.slice(0, suffixStart),
    suffix: value.slice(suffixStart),
  };
}

function shouldRewriteMarkdownTarget(target) {
  const value = String(target ?? "").trim();
  if (!value || value.startsWith("#") || value.startsWith("/")) {
    return false;
  }
  return !/^[a-z][a-z0-9+.-]*:/i.test(value);
}

function rewriteMarkdownTarget(target, sourcePath, outputPath) {
  if (!shouldRewriteMarkdownTarget(target)) {
    return target;
  }
  const { pathPart, suffix } = splitMarkdownTarget(target);
  if (!pathPart || !shouldRewriteMarkdownTarget(pathPart)) {
    return target;
  }
  const sourceDir = path.posix.dirname(normalizePath(sourcePath));
  const resolvedPath = normalizePath(path.posix.join(sourceDir, pathPart));
  return `${relativeRepoLink(outputPath, resolvedPath)}${suffix}`;
}

function rewriteMarkdownLinks(markdown, sourcePath, outputPath) {
  const lines = String(markdown ?? "").split(/\r?\n/);
  let inCodeFence = false;
  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inCodeFence = !inCodeFence;
        return line;
      }
      if (inCodeFence) {
        return line;
      }
      return line.replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (_match, prefix, target, suffix) => {
        return `${prefix}${rewriteMarkdownTarget(target, sourcePath, outputPath)}${suffix}`;
      });
    })
    .join("\n");
}

function stripFrontmatter(markdown) {
  const lines = String(markdown ?? "").replace(/\r\n/g, "\n").split("\n");
  if (lines[0]?.trim() !== "---") {
    return lines.join("\n").trim();
  }
  const endIndex = lines.findIndex((line, index) => index > 0 && line.trim() === "---");
  if (endIndex === -1) {
    return lines.join("\n").trim();
  }
  return lines.slice(endIndex + 1).join("\n").trim();
}

function stripLeadingTitle(markdown) {
  const lines = String(markdown ?? "").split(/\r?\n/);
  const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);
  if (firstContentIndex === -1 || !/^#\s+/.test(lines[firstContentIndex])) {
    return lines.join("\n").trim();
  }
  return lines.slice(firstContentIndex + 1).join("\n").trim();
}

function shiftHeadings(markdown, shift) {
  const headingShift = Number.isFinite(shift) ? Math.trunc(shift) : 0;
  if (headingShift === 0) {
    return markdown;
  }
  const lines = String(markdown ?? "").split(/\r?\n/);
  let inCodeFence = false;
  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inCodeFence = !inCodeFence;
        return line;
      }
      if (inCodeFence) {
        return line;
      }
      const match = line.match(/^(#{1,6})(\s+.*)$/);
      if (!match) {
        return line;
      }
      const nextLevel = Math.max(1, Math.min(6, match[1].length + headingShift));
      return `${"#".repeat(nextLevel)}${match[2]}`;
    })
    .join("\n");
}

function normalizeFragment({ markdown, sourcePath, outputPath, headingShift, stripTitle }) {
  let fragment = stripFrontmatter(markdown);
  if (stripTitle) {
    fragment = stripLeadingTitle(fragment);
  }
  fragment = rewriteMarkdownLinks(fragment, sourcePath, outputPath);
  fragment = shiftHeadings(fragment, headingShift);
  return fragment.trim();
}

function readingCopyPathForEntry(entry) {
  return `${OUTPUT_DIR}/${slugifyTitle(entry.title)}.md`;
}

function renderReadingCopy({ title, entries, outputPath }) {
  const lines = [
    `# ${title}`,
    "",
  ];
  const renderedTargets = new Set();

  function renderEntry(entry, headingLevel) {
    if (!entry || typeof entry !== "object") {
      return;
    }
    const titleText = String(entry.title ?? "").trim();
    if (!titleText) {
      return;
    }
    const boundedHeadingLevel = Math.max(1, Math.min(6, headingLevel));
    const markdownPath =
      typeof entry.markdownPath === "string" && entry.markdownPath.trim()
        ? normalizePath(entry.markdownPath)
        : null;
    const markdownSection =
      typeof entry.markdownSection === "string" && entry.markdownSection.trim()
        ? entry.markdownSection.trim()
        : null;

    if (markdownPath) {
      const targetKey = markdownSection
        ? `${markdownPath}::${normalizeMarkdownKey(markdownSection)}`
        : markdownPath;
      if (!renderedTargets.has(targetKey)) {
        renderedTargets.add(targetKey);
        const markdownText = readMarkdown(markdownPath);
        if (markdownText) {
          let sourceMarkdown = markdownText;
          let headingShift = boundedHeadingLevel - 1;
          let stripTitle = true;
          if (markdownSection) {
            const extracted = extractMarkdownSection(markdownText, markdownSection);
            if (!extracted) {
              warnings.push(`${markdownPath}: could not resolve section "${markdownSection}"`);
              sourceMarkdown = "";
            } else {
              sourceMarkdown = extracted.body;
              headingShift = boundedHeadingLevel - (extracted.level ?? 2);
              stripTitle = false;
            }
          }
          const fragment = normalizeFragment({
            markdown: sourceMarkdown,
            sourcePath: markdownPath,
            outputPath,
            headingShift,
            stripTitle,
          });
          lines.push(`${"#".repeat(boundedHeadingLevel)} ${titleText}`, "");
          if (fragment) {
            lines.push(fragment, "");
          }
        }
      }
    } else {
      lines.push(`${"#".repeat(boundedHeadingLevel)} ${titleText}`, "");
    }

    const children = Array.isArray(entry.children) ? entry.children : [];
    children.forEach((child) => renderEntry(child, boundedHeadingLevel + 1));
  }

  entries.forEach((entry) => renderEntry(entry, 2));
  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

function buildReadingCopies(tocRoot) {
  const copies = new Map();
  const rootChildren = Array.isArray(tocRoot?.children) ? tocRoot.children : [];
  copies.set(
    FULL_TEXTBOOK_PATH,
    renderReadingCopy({
      title: "Architrino Textbook",
      entries: rootChildren,
      outputPath: FULL_TEXTBOOK_PATH,
    })
  );
  rootChildren.forEach((entry) => {
    const outputPath = readingCopyPathForEntry(entry);
    const children = Array.isArray(entry.children) ? entry.children : [];
    copies.set(
      outputPath,
      renderReadingCopy({
        title: entry.title,
        entries: children.length ? children : [entry],
        outputPath,
      })
    );
  });
  return copies;
}

const toc = readJson(TEXTBOOK_TOC_PATH);
const copies = toc?.tocRoot ? buildReadingCopies(toc.tocRoot) : new Map();
const drift = [];
const wrote = [];

for (const [outputPath, text] of copies.entries()) {
  const absolutePath = path.join(rootDir, outputPath);
  const current = fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : null;
  if (current !== text) {
    drift.push(outputPath);
    if (mode === "write") {
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
      fs.writeFileSync(absolutePath, text, "utf8");
      wrote.push(outputPath);
    }
  }
}

console.log(`build-textbook-md-pdf mode: ${mode}`);
console.log(`- Reading copies: ${copies.size}`);
if (wrote.length) {
  console.log(`- Wrote reading copies: ${wrote.length}`);
}
if (mode === "check" && drift.length) {
  console.log("- Drift detected:");
  drift.forEach((outputPath) => console.log(`  - ${outputPath}`));
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

if (errors.length || (mode === "check" && drift.length)) {
  process.exit(1);
}
