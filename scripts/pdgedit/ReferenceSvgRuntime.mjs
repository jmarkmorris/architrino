import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { normalizePdgeditTileCatalog } from "../../src/apps/pdgedit/PdgeditTileCatalogRuntime.js";
import { normalizePdgeditReviewGroupCatalog } from "../../src/apps/pdgedit/PdgeditReviewGroupCatalogRuntime.js";
import { renderPdgeditTileSvg } from "../../src/apps/pdgedit/PdgeditTileSvgRuntime.js";

const repoRootPath = fileURLToPath(new URL("../../", import.meta.url));
const pythonVenvPath = path.resolve(repoRootPath, process.env.AAA_VENV ?? "../.venv");
const pythonPath = path.join(pythonVenvPath, "bin/python");
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
          pythonPath,
          ["-c", PYTHON_FONT_MEASURE_SCRIPT, fontPath, String(fontSize), String(text)],
          {
            cwd: repoRootPath,
            encoding: "utf8",
            env: { ...process.env, VIRTUAL_ENV: pythonVenvPath },
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

export function loadPdgeditTileCatalogFromFile(specPath) {
  return normalizePdgeditTileCatalog(JSON.parse(fs.readFileSync(specPath, "utf8")));
}

export function loadPdgeditReviewGroupCatalogFromFile(specPath) {
  return normalizePdgeditReviewGroupCatalog(JSON.parse(fs.readFileSync(specPath, "utf8")));
}

export function getAllPdgeditReviewGroups(groupCatalog) {
  return [
    ...(groupCatalog?.specialGroups ?? []),
    ...(groupCatalog?.singleRowGroups ?? []),
    ...(groupCatalog?.quarkColorGroups ?? []),
    ...(groupCatalog?.compositeGroups ?? []),
  ];
}

export function renderPdgeditTileReferenceSvg(
  tile,
  catalog,
  {
    documentLike = createMockDocument(),
    measurementContext = createPythonMeasurementContext(),
    sampleCounts = { topCount: "N", bottomCount: "M" },
  } = {}
) {
  const svg = renderPdgeditTileSvg({
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
    createSvgTextElement(documentLike, "desc", `${tile.title}. Pdgedit reference tile generated from pdgedit-tiles.json.`)
  );
  svg.children.unshift(createSvgTextElement(documentLike, "title", tile.title));
  return `${serializeSvgNode(svg, { isRoot: true })}\n`;
}

export function renderPdgeditGroupReferenceSvg(
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
    createSvgTextElement(documentLike, "desc", `${group.title}. Pdgedit group reference generated from pdgedit-tiles.json.`)
  );

  group.rows.forEach((row, rowIndex) => {
    row.forEach((tileKey, columnIndex) => {
      const tile = tileByKey.get(tileKey);
      if (!tile) {
        throw new Error(`Unknown pdgedit tile key in review group ${group.key}: ${tileKey}`);
      }
      const tileSvg = renderPdgeditTileSvg({
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
