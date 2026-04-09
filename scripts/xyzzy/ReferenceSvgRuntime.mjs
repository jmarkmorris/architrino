import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { normalizeXyzzyTileCatalog } from "../../src/apps/xyzzy/XyzzyTileCatalogRuntime.js";
import { normalizeXyzzyReviewGroupCatalog } from "../../src/apps/xyzzy/XyzzyReviewGroupCatalogRuntime.js";
import { renderXyzzyTileSvg } from "../../src/apps/xyzzy/XyzzyTileSvgRuntime.js";

const repoRootPath = fileURLToPath(new URL("../../", import.meta.url));
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const TEXT_FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc";
const EPSILON_FONT_PATH = "/System/Library/Fonts/Supplemental/Times New Roman.ttf";
const PYTHON_FONT_MEASURE_SCRIPT = `
import json
import sys
from PIL import ImageFont

font = ImageFont.truetype(sys.argv[1], size=float(sys.argv[2]))
_left, top, _right, bottom = font.getbbox(sys.argv[3], anchor="ls")
print(json.dumps({"ascent": -float(top), "descent": float(bottom)}))
`.trim();

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export class MockSvgElement {
  constructor(name) {
    this.name = name;
    this.attributes = new Map();
    this.children = [];
    this.textContent = "";
    this.style = {};
    this.classNames = [];
    this.classList = {
      add: (...names) => {
        this.classNames.push(...names);
      },
    };
  }

  setAttribute(key, value) {
    this.attributes.set(key, String(value));
  }

  append(...children) {
    this.children.push(...children);
  }

  appendChild(child) {
    this.children.push(child);
  }
}

export function createMockDocument() {
  return {
    createElementNS(_namespace, name) {
      return new MockSvgElement(name);
    },
  };
}

export function createPythonMeasurementContext() {
  const measurementCache = new Map();
  return {
    font: "",
    measureText(text) {
      const fontSpec = String(this.font || "");
      const match = /(\d+(?:\.\d+)?)px\s+(.+)$/.exec(fontSpec);
      if (!match) {
        throw new Error(`Unsupported font specification: ${fontSpec}`);
      }
      const fontSize = Number(match[1]);
      const fontFamily = match[2];
      const fontPath = fontFamily.includes("STIX Two Text") ? EPSILON_FONT_PATH : TEXT_FONT_PATH;
      const cacheKey = `${fontPath}\u0000${fontSize}\u0000${text}`;
      if (!measurementCache.has(cacheKey)) {
        const rawMeasurement = execFileSync(
          "python3",
          ["-c", PYTHON_FONT_MEASURE_SCRIPT, fontPath, String(fontSize), String(text)],
          {
            cwd: repoRootPath,
            encoding: "utf8",
          }
        );
        measurementCache.set(cacheKey, JSON.parse(rawMeasurement));
      }
      const measurement = measurementCache.get(cacheKey);
      return {
        actualBoundingBoxAscent: measurement.ascent,
        actualBoundingBoxDescent: measurement.descent,
      };
    },
  };
}

function createSvgTextElement(documentLike, name, text) {
  const element = documentLike.createElementNS(SVG_NAMESPACE, name);
  element.textContent = String(text);
  return element;
}

function cloneChildren(children) {
  return Array.isArray(children) ? [...children] : [];
}

function serializeStyle(styleObject) {
  const entries = Object.entries(styleObject ?? {}).filter(([, value]) => String(value ?? "").trim());
  if (!entries.length) {
    return "";
  }
  return entries.map(([key, value]) => `${key}:${String(value).trim()}`).join(";");
}

function serializeSvgNode(node, { isRoot = false, indent = "" } = {}) {
  if (!node) {
    return "";
  }
  const attributes = Object.fromEntries(node.attributes instanceof Map ? node.attributes.entries() : []);
  if (isRoot && !attributes.xmlns) {
    attributes.xmlns = SVG_NAMESPACE;
  }
  const serializedStyle = serializeStyle(node.style);
  if (serializedStyle) {
    attributes.style = serializedStyle;
  }
  const attributeText = Object.entries(attributes)
    .map(([key, value]) => ` ${key}="${escapeXml(value)}"`)
    .join("");
  const text = typeof node.textContent === "string" ? node.textContent : "";
  const children = Array.isArray(node.children) ? node.children : [];
  if (!text && !children.length) {
    return `${indent}<${node.name}${attributeText}/>`;
  }

  if (!children.length) {
    return `${indent}<${node.name}${attributeText}>${escapeXml(text)}</${node.name}>`;
  }

  if (text) {
    const inlineChildren = children
      .map((child) => serializeSvgNode(child, { indent: "" }))
      .filter(Boolean)
      .join("");
    return `${indent}<${node.name}${attributeText}>${escapeXml(text)}${inlineChildren}</${node.name}>`;
  }

  const childIndent = `${indent}  `;
  const renderedChildren = children
    .map((child) => serializeSvgNode(child, { indent: childIndent }))
    .filter(Boolean);
  const innerLines = [];
  if (text) {
    innerLines.push(`${childIndent}${escapeXml(text)}`);
  }
  innerLines.push(...renderedChildren);
  return [
    `${indent}<${node.name}${attributeText}>`,
    ...innerLines,
    `${indent}</${node.name}>`,
  ].join("\n");
}

export function loadXyzzyTileCatalogFromFile(specPath) {
  return normalizeXyzzyTileCatalog(JSON.parse(fs.readFileSync(specPath, "utf8")));
}

export function loadXyzzyReviewGroupCatalogFromFile(specPath) {
  return normalizeXyzzyReviewGroupCatalog(JSON.parse(fs.readFileSync(specPath, "utf8")));
}

export function getAllXyzzyReviewGroups(groupCatalog) {
  return [
    ...(groupCatalog?.specialGroups ?? []),
    ...(groupCatalog?.singleRowGroups ?? []),
    ...(groupCatalog?.quarkColorGroups ?? []),
    ...(groupCatalog?.compositeGroups ?? []),
  ];
}

export function renderXyzzyTileReferenceSvg(
  tile,
  catalog,
  {
    documentLike = createMockDocument(),
    measurementContext = createPythonMeasurementContext(),
    sampleCounts = { topCount: "N", bottomCount: "M" },
  } = {}
) {
  const svg = renderXyzzyTileSvg({
    documentLike,
    catalog,
    tile,
    sampleCounts,
    measurementContext,
  });
  svg.attributes.delete?.("aria-label");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-labelledby", "title desc");
  svg.children.unshift(
    createSvgTextElement(documentLike, "desc", `${tile.title}. Xyzzy reference tile generated from xyzzy-tiles.json.`)
  );
  svg.children.unshift(createSvgTextElement(documentLike, "title", tile.title));
  return `${serializeSvgNode(svg, { isRoot: true })}\n`;
}

export function renderXyzzyGroupReferenceSvg(
  group,
  tileByKey,
  catalog,
  {
    documentLike = createMockDocument(),
    measurementContext = createPythonMeasurementContext(),
    sampleCounts = { topCount: "N", bottomCount: "M" },
  } = {}
) {
  const tileSize = Number(catalog?.geometry?.tileSizePx) || 80;
  const svg = documentLike.createElementNS(SVG_NAMESPACE, "svg");
  svg.setAttribute("viewBox", `0 0 ${tileSize * 4} ${tileSize * group.rows.length}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-labelledby", "title desc");
  svg.append(
    createSvgTextElement(documentLike, "title", group.title),
    createSvgTextElement(documentLike, "desc", `${group.title}. Xyzzy group reference generated from xyzzy-tiles.json.`)
  );

  group.rows.forEach((row, rowIndex) => {
    row.forEach((tileKey, columnIndex) => {
      const tile = tileByKey.get(tileKey);
      if (!tile) {
        throw new Error(`Unknown Xyzzy tile key in review group ${group.key}: ${tileKey}`);
      }
      const tileSvg = renderXyzzyTileSvg({
        documentLike,
        catalog,
        tile,
        sampleCounts,
        measurementContext,
      });
      const tileGroup = documentLike.createElementNS(SVG_NAMESPACE, "g");
      tileGroup.setAttribute(
        "transform",
        `translate(${(columnIndex * tileSize).toFixed(2)} ${(rowIndex * tileSize).toFixed(2)})`
      );
      tileGroup.append(...cloneChildren(tileSvg.children));
      svg.append(tileGroup);
    });
  });

  return `${serializeSvgNode(svg, { isRoot: true })}\n`;
}
