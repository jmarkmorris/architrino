import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { normalizePdgeditTileCatalog } from "../src/apps/pdgedit/PdgeditTileCatalogRuntime.js";
import { normalizePdgeditReviewGroupCatalog } from "../src/apps/pdgedit/PdgeditReviewGroupCatalogRuntime.js";
import { renderPdgeditTileSvg } from "../src/apps/pdgedit/PdgeditTileSvgRuntime.js";
import {
  createMockDocument,
  createPythonMeasurementContext,
} from "../scripts/pdgedit/ReferenceSvgRuntime.mjs";

const glyphOutputDirPath = fileURLToPath(new URL("../scripts/glyphs/", import.meta.url));

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8"));
}

function readSvgFixture(filename) {
  return fs.readFileSync(path.join(glyphOutputDirPath, filename), "utf8");
}

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
  if (typeof node.style?.filter === "string" && node.style.filter.trim()) {
    normalizedAttributes.style = `filter:${node.style.filter}`;
  }

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

function renderComparableTileSvg(tile, catalog, renderContext) {
  const svg = renderPdgeditTileSvg({
    documentLike: renderContext.documentLike,
    catalog,
    tile,
    sampleCounts: renderContext.sampleCounts,
    measurementContext: renderContext.measurementContext,
  });
  return toComparableSvgTree(svg, { isRoot: true });
}

function renderComparableGroupSvg(group, tileByKey, catalog, renderContext) {
  const tileSize = Number(catalog?.geometry?.tileSizePx) || 80;
  const rawGroupSvg = {
    name: "svg",
    attrs: {
      viewBox: `0 0 ${tileSize * 4} ${tileSize * group.rows.length}`,
    },
    children: [],
    text: "",
  };

  group.rows.forEach((row, rowIndex) => {
    row.forEach((tileKey, columnIndex) => {
      const tile = tileByKey.get(tileKey);
      if (!tile) {
        throw new Error(`Unknown pdgedit tile key in review group ${group.key}: ${tileKey}`);
      }
      const tileSvg = renderPdgeditTileSvg({
        documentLike: renderContext.documentLike,
        catalog,
        tile,
        sampleCounts: renderContext.sampleCounts,
        measurementContext: renderContext.measurementContext,
      });
      rawGroupSvg.children.push({
        name: "g",
        attrs: {
          transform: `translate(${(columnIndex * tileSize).toFixed(2)} ${(rowIndex * tileSize).toFixed(2)})`,
        },
        children: [...tileSvg.children],
        text: "",
      });
    });
  });

  return toComparableSvgTree(rawGroupSvg, { isRoot: true });
}

function getRenderContext() {
  return {
    documentLike: createMockDocument(),
    measurementContext: createPythonMeasurementContext(),
    sampleCounts: {
      topCount: "N",
      bottomCount: "M",
    },
  };
}

test("the JS pdgedit tile renderer stays aligned with representative committed reference SVG artifacts", () => {
  const catalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const tileByKey = new Map(catalog.tiles.map((tile) => [tile.key, tile]));
  const renderContext = getRenderContext();
  const sampleTileKeys = [
    "associate",
    "pro-up-quark",
    "unbound-electrinos",
    "binary-full-br-rr",
  ];

  sampleTileKeys.forEach((tileKey) => {
    const tile = tileByKey.get(tileKey);
    assert.ok(tile, `missing sample tile ${tileKey}`);

    const jsSemanticTree = renderComparableTileSvg(tile, catalog, renderContext);
    const referenceSemanticTree = toComparableSvgTree(parseSvgTree(readSvgFixture(`pdgedit-tile-${tileKey}.svg`)), {
      isRoot: true,
    });

    assert.deepEqual(jsSemanticTree, referenceSemanticTree, tileKey);
  });
});

test("the JS tile renderer can reconstruct representative committed pdgedit review-group SVG semantics", () => {
  const catalog = normalizePdgeditTileCatalog(readJson("src/apps/pdgedit/pdgedit-tiles.json"));
  const reviewGroups = normalizePdgeditReviewGroupCatalog(readJson("src/apps/pdgedit/pdgedit-review-groups.json"));
  const tileByKey = new Map(catalog.tiles.map((tile) => [tile.key, tile]));
  const groupByKey = new Map(
    [
      ...reviewGroups.specialGroups,
      ...reviewGroups.singleRowGroups,
      ...reviewGroups.quarkColorGroups,
      ...reviewGroups.compositeGroups,
    ].map((group) => [group.key, group])
  );
  const renderContext = getRenderContext();
  const sampleGroupKeys = [
    "photon",
    "pro-up-quark",
    "up-quark-color-variations",
    "pro-proton",
  ];

  sampleGroupKeys.forEach((groupKey) => {
    const group = groupByKey.get(groupKey);
    assert.ok(group, `missing sample group ${groupKey}`);

    const jsSemanticTree = renderComparableGroupSvg(group, tileByKey, catalog, renderContext);
    const referenceSemanticTree = toComparableSvgTree(parseSvgTree(readSvgFixture(`pdgedit-group-${groupKey}.svg`)), {
      isRoot: true,
    });

    assert.deepEqual(jsSemanticTree, referenceSemanticTree, groupKey);
  });
});
