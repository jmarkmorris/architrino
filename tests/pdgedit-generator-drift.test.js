import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { normalizePdgeditTileCatalog } from "../src/apps/pdgedit/PdgeditTileCatalogRuntime.js";
import { normalizePdgeditReviewGroupCatalog } from "../src/apps/pdgedit/PdgeditReviewGroupCatalogRuntime.js";

const repoRootPath = fileURLToPath(new URL("../", import.meta.url));
const glyphOutputDirPath = fileURLToPath(new URL("../scripts/glyphs/", import.meta.url));

function parseSvgTree(svgText) {
  const tokens = svgText.match(/<[^>]+>|[^<]+/g) ?? [];
  const stack = [];
  let root = null;

  tokens.forEach((token) => {
    if (token.startsWith("<?") || token.startsWith("<!")) {
      return;
    }
    if (token.startsWith("</")) {
      stack.pop();
      return;
    }
    if (token.startsWith("<")) {
      const openMatch = /^<([A-Za-z0-9:_-]+)/.exec(token);
      if (!openMatch) {
        return;
      }
      const attrs = {};
      for (const attrMatch of token.matchAll(/([A-Za-z_:][-A-Za-z0-9_:.]*)="([^"]*)"/g)) {
        attrs[attrMatch[1]] = attrMatch[2];
      }
      const node = {
        name: openMatch[1],
        attrs,
        children: [],
        text: "",
      };
      if (stack.length) {
        stack[stack.length - 1].children.push(node);
      } else {
        root = node;
      }
      if (!token.endsWith("/>")) {
        stack.push(node);
      }
      return;
    }
    if (!stack.length || /^\s+$/.test(token)) {
      return;
    }
    stack[stack.length - 1].text += token;
  });

  return root;
}

function normalizeAttributeValue(key, value) {
  const text = String(value);
  function formatNumber(numberValue) {
    const rounded = Math.round(numberValue * 100) / 100;
    if (Number.isInteger(rounded)) {
      return String(rounded);
    }
    return rounded.toFixed(2).replace(/0+$/u, "").replace(/\.$/u, "");
  }
  if (/^-?\d+(?:\.\d+)?$/.test(text)) {
    return formatNumber(Number(text));
  }
  if (key === "viewBox" || key === "stroke-dasharray") {
    return text
      .split(/\s+/)
      .filter(Boolean)
      .map((segment) => (/^-?\d+(?:\.\d+)?$/.test(segment) ? formatNumber(Number(segment)) : segment))
      .join(" ");
  }
  if (key === "transform") {
    const match = /^translate\(([-\d.]+)\s+([-\d.]+)\)$/.exec(text);
    if (match) {
      return `translate(${formatNumber(Number(match[1]))} ${formatNumber(Number(match[2]))})`;
    }
  }
  return text;
}

function sortObjectEntries(object) {
  return Object.fromEntries(Object.entries(object).sort(([left], [right]) => left.localeCompare(right)));
}

function normalizeTextContent(text) {
  return String(text).replaceAll("&#x03F5;", "ϵ");
}

function toComparableSvgTree(node, { isRoot = false } = {}) {
  if (!node || node.name === "title" || node.name === "desc") {
    return null;
  }

  const rawAttributes =
    node.attributes instanceof Map ? Object.fromEntries(node.attributes.entries()) : { ...(node.attrs ?? {}) };
  const normalizedAttributes = {};
  Object.entries(rawAttributes).forEach(([key, value]) => {
    if (isRoot && (key === "xmlns" || key === "role" || key === "aria-label" || key === "aria-labelledby")) {
      return;
    }
    normalizedAttributes[key] = normalizeAttributeValue(key, value);
  });

  const comparableNode = { name: node.name };
  if (Object.keys(normalizedAttributes).length) {
    comparableNode.attrs = sortObjectEntries(normalizedAttributes);
  }
  const text = typeof node.textContent === "string" && node.textContent.length ? node.textContent : node.text;
  if (typeof text === "string" && text.length) {
    comparableNode.text = normalizeTextContent(text);
  }

  const children = (Array.isArray(node.children) ? node.children : [])
    .map((child) => toComparableSvgTree(child))
    .filter(Boolean);
  if (children.length) {
    comparableNode.children = children;
  }

  return comparableNode;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function getExpectedReferenceSvgFilenames() {
  const tileCatalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));
  const groups = [
    ...reviewGroups.specialGroups,
    ...reviewGroups.singleRowGroups,
    ...reviewGroups.quarkColorGroups,
    ...reviewGroups.compositeGroups,
  ];
  return [
    ...tileCatalog.tiles.map((tile) => `pdgedit-tile-${tile.key}.svg`),
    ...groups.map((group) => `pdgedit-group-${group.key}.svg`),
  ].sort();
}

function listReferenceSvgFilenames(directoryPath) {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /^pdgedit-.*\.svg$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

test("committed pdgedit reference svg filenames match the shared catalogs exactly", () => {
  const expectedFilenames = getExpectedReferenceSvgFilenames();
  const actualFilenames = listReferenceSvgFilenames(glyphOutputDirPath);

  assert.deepEqual(actualFilenames, expectedFilenames);
});

test("glyph.py regenerates the committed pdgedit reference svg set and canonical artifacts without drift", () => {
  const expectedFilenames = getExpectedReferenceSvgFilenames();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdgedit-glyph-drift-"));

  execFileSync("python3", ["scripts/glyphs/glyph.py", "--output-dir", tempDir], {
    cwd: repoRootPath,
    encoding: "utf8",
  });

  assert.deepEqual(listReferenceSvgFilenames(tempDir), expectedFilenames);

  const canonicalSampleFilenames = [
    "pdgedit-tile-pro-up-quark.svg",
    "pdgedit-tile-unbound-electrinos.svg",
    "pdgedit-tile-binary-full-br-rr.svg",
    "pdgedit-tile-pro-noether-swarm-glyph.svg",
    "pdgedit-group-pro-up-quark.svg",
    "pdgedit-group-pro-proton.svg",
    "pdgedit-group-photon.svg",
    "pdgedit-group-up-quark-color-variations.svg",
  ];

  canonicalSampleFilenames.forEach((filename) => {
    const regeneratedSvg = fs.readFileSync(path.join(tempDir, filename), "utf8");
    const committedSvg = fs.readFileSync(path.join(glyphOutputDirPath, filename), "utf8");
    assert.deepEqual(
      toComparableSvgTree(parseSvgTree(regeneratedSvg), { isRoot: true }),
      toComparableSvgTree(parseSvgTree(committedSvg), { isRoot: true }),
      filename
    );
  });
});
