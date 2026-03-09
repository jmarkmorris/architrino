#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const WRITE = process.argv.includes("--write");
const ROOT = process.cwd();
const SCENES_ROOT = path.join(ROOT, "content", "scenes");

function walkJson(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkJson(p));
    else if (ent.isFile() && p.endsWith(".json")) out.push(p);
  }
  return out;
}

function normalizeHeadingKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\$[^$]*\$/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function parseHeadings(markdownText) {
  const lines = markdownText.split(/\r?\n/);
  return lines
    .map((line) => line.match(/^(#{1,6})\s+(.+)$/))
    .filter(Boolean)
    .map((m) => ({ level: m[1].length, title: m[2].trim() }));
}

function collectHeadingEntries(headings, targetLevel) {
  const entries = [];
  let current = null;
  for (const h of headings) {
    if (h.level === targetLevel) {
      current = { key: normalizeHeadingKey(h.title), hasChildHeadings: false };
      entries.push(current);
      continue;
    }
    if (!current) continue;
    if (h.level <= targetLevel) {
      current = null;
      continue;
    }
    if (h.level === targetLevel + 1) current.hasChildHeadings = true;
  }
  return entries;
}

function loadJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function saveJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

const files = walkJson(SCENES_ROOT);
const sceneTypeByPath = new Map();
for (const f of files) {
  try {
    const j = loadJson(f);
    if (j?.scene?.type) sceneTypeByPath.set(path.relative(ROOT, f), j.scene.type);
  } catch {
    // ignore
  }
}

const findings = [];
const touched = new Set();
const jsonByFile = new Map();

for (const absFile of files) {
  let json;
  try {
    json = loadJson(absFile);
    jsonByFile.set(absFile, json);
  } catch {
    continue;
  }
  const relFile = path.relative(ROOT, absFile);
  const scene = json?.scene ?? {};

  // Check index badges against child scene type
  if (scene.type === "Scene-Index") {
    const childMap = new Map((scene.children || []).map((c) => [c.nodeId, c.scenePath]));
    for (const obj of json.objects || []) {
      if (obj?.labelBadge !== "doc") continue;
      const childPath = childMap.get(obj.id);
      if (!childPath) continue;
      const childType = sceneTypeByPath.get(childPath);
      if (childType === "Scene-Markdown-Split" || childType === "Scene-Markdown-Tree") {
        findings.push(
          `${relFile}: index node "${obj.id}" has doc badge but child is ${childType}`
        );
        if (WRITE) {
          delete obj.labelBadge;
          touched.add(absFile);
        }
      }
    }
  }

  // Check split/tree override badges against doc-vs-index behavior
  if (scene.type !== "Scene-Markdown-Split" && scene.type !== "Scene-Markdown-Tree") continue;
  const source = scene.source ?? {};
  if (source.type !== "markdown" || typeof source.path !== "string") continue;
  const mdPath = path.join(ROOT, source.path);
  if (!fs.existsSync(mdPath)) continue;

  const cfg = scene.type === "Scene-Markdown-Tree" ? source.tree ?? {} : source.split ?? {};
  const headingLevel =
    scene.type === "Scene-Markdown-Tree"
      ? typeof cfg.rootHeadingLevel === "number"
        ? cfg.rootHeadingLevel
        : 2
      : typeof cfg.headingLevel === "number"
        ? cfg.headingLevel
        : 2;
  const maxDepth = typeof cfg.maxDepth === "number" ? Math.max(1, cfg.maxDepth) : 1;
  const nextDepth = Math.max(maxDepth - 1, 0);
  const overrides = cfg.overrides && typeof cfg.overrides === "object" ? cfg.overrides : {};

  const md = fs.readFileSync(mdPath, "utf8");
  const entries = collectHeadingEntries(parseHeadings(md), headingLevel);
  const hasChildByKey = new Map(entries.map((e) => [e.key, e.hasChildHeadings === true]));

  for (const [rawKey, ov] of Object.entries(overrides)) {
    if (!ov || typeof ov !== "object") continue;
    if (ov.hidden === true || ov.exclude === true) continue;
    const key = normalizeHeadingKey(rawKey);
    if (!hasChildByKey.has(key)) continue;
    const hasChildren = hasChildByKey.get(key) === true;
    const expectedDoc = ov.mode === "doc" ? true : !(nextDepth > 0 && hasChildren);
    const hasDoc = ov.labelBadge === "doc";

    if (hasDoc !== expectedDoc) {
      findings.push(
        `${relFile}: override "${rawKey}" doc badge ${hasDoc ? "set" : "missing"} but expected ${
          expectedDoc ? "doc" : "index"
        }`
      );
      if (WRITE) {
        if (expectedDoc) ov.labelBadge = "doc";
        else delete ov.labelBadge;
        touched.add(absFile);
      }
    }
  }
}

if (WRITE) {
  for (const f of touched) {
    const j = jsonByFile.get(f);
    if (!j) continue;
    saveJson(f, j);
  }
}

if (findings.length) {
  console.log(findings.join("\n"));
  process.exitCode = 1;
} else {
  console.log("OK: no doc-icon audit issues");
}
