function normalizeText(value) {
  return typeof value === "string" ? value : "";
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeLines(lines) {
  if (!Array.isArray(lines)) {
    return [];
  }
  return lines.slice(0, 3).map((line) => ({
    type: normalizeText(line?.type) || "blank",
    text: normalizeText(line?.text),
    placeholder: normalizeText(line?.placeholder),
    sign: normalizeText(line?.sign),
    color: normalizeText(line?.color),
  }));
}

function normalizeBinaryGlyphCircle(circle) {
  return {
    key: normalizeText(circle?.key),
    cx: normalizeNumber(circle?.cx),
    cy: normalizeNumber(circle?.cy),
    r: normalizeNumber(circle?.r),
    fillColor: normalizeText(circle?.fillColor),
    filter: normalizeText(circle?.filter),
  };
}

function normalizeBinaryGlyph(binaryGlyph) {
  const orbit = binaryGlyph?.orbit ?? {};
  const axis = binaryGlyph?.axis ?? {};
  return {
    showOrbit: binaryGlyph?.showOrbit !== false,
    showAxis: binaryGlyph?.showAxis !== false,
    viewBoxWidth: normalizeNumber(binaryGlyph?.viewBoxWidth, 120),
    viewBoxHeight: normalizeNumber(binaryGlyph?.viewBoxHeight, 120),
    orbit: {
      cx: normalizeNumber(orbit.cx, 60),
      cy: normalizeNumber(orbit.cy, 60),
      rx: normalizeNumber(orbit.rx, 38),
      ry: normalizeNumber(orbit.ry, 13),
      strokeColor: normalizeText(orbit.strokeColor),
      strokeWidth: normalizeNumber(orbit.strokeWidth, 5),
      filter: normalizeText(orbit.filter),
    },
    axis: {
      x1: normalizeNumber(axis.x1, 60),
      y1: normalizeNumber(axis.y1, 33.3333333333),
      x2: normalizeNumber(axis.x2, 60),
      y2: normalizeNumber(axis.y2, 86.6666666667),
      strokeColor: normalizeText(axis.strokeColor),
      strokeWidth: normalizeNumber(axis.strokeWidth, 4),
      lineCap: normalizeText(axis.lineCap) || "butt",
      opacity: normalizeNumber(axis.opacity, 1),
      strokeDasharray: normalizeText(axis.strokeDasharray),
      strokeDashoffset: normalizeNumber(axis.strokeDashoffset),
    },
    circles: Array.isArray(binaryGlyph?.circles)
      ? binaryGlyph.circles.map(normalizeBinaryGlyphCircle)
      : [],
  };
}

function normalizeChargeCircle(circle) {
  if (!circle || typeof circle !== "object") {
    return {
      cx: 40,
      cy: 57,
      r: 0,
      fillColor: "",
      filter: "",
    };
  }
  return {
    cx: normalizeNumber(circle?.cx, 40),
    cy: normalizeNumber(circle?.cy, 57),
    r: normalizeNumber(circle?.r, 7),
    fillColor: normalizeText(circle?.fillColor),
    filter: normalizeText(circle?.filter),
  };
}

function createBinaryCircle(key, position, radius, fillColor, filter) {
  return {
    key,
    cx: normalizeNumber(position?.cx),
    cy: normalizeNumber(position?.cy),
    r: normalizeNumber(radius),
    fillColor: normalizeText(fillColor),
    filter: normalizeText(filter),
  };
}

function resolveBinaryBorderColor(generator, polarCode) {
  const borderColorByPolar =
    generator?.borderColorByPolar && typeof generator.borderColorByPolar === "object"
      ? generator.borderColorByPolar
      : {};
  return normalizeText(borderColorByPolar?.[polarCode]) || normalizeText(generator?.borderColor) || "purple";
}

function resolveBinaryAxisForMode(generator, mode) {
  const baseAxis = generator?.axis && typeof generator.axis === "object" ? generator.axis : {};
  const axisByMode =
    generator?.axisByMode && typeof generator.axisByMode === "object" ? generator.axisByMode : {};
  const modeOverride =
    axisByMode?.[mode] && typeof axisByMode[mode] === "object" ? axisByMode[mode] : {};
  return {
    ...baseAxis,
    ...modeOverride,
  };
}

function getGeneratorPolarOptionsForMode(generator, mode) {
  const polarOptionsByMode =
    generator?.polarOptionsByMode && typeof generator.polarOptionsByMode === "object"
      ? generator.polarOptionsByMode
      : {};
  const modeSpecificOptions = Array.isArray(polarOptionsByMode?.[mode]) ? polarOptionsByMode[mode] : null;
  if (modeSpecificOptions) {
    return modeSpecificOptions;
  }
  return Array.isArray(generator?.polarOptions) ? generator.polarOptions : [];
}

function buildBinaryGlyphTileFromGrammar(code, generator) {
  const grammarCode = normalizeText(code);
  const [mode = "", binary = "", polar = ""] = grammarCode.split(":");
  const normalizedMode = normalizeText(mode);
  const normalizedBinary = normalizeText(binary);
  const normalizedPolar = normalizeText(polar);
  const colorByCode = {
    b: generator?.colors?.blue,
    r: generator?.colors?.red,
  };
  const binaryPair =
    normalizedBinary === "br"
      ? { left: colorByCode.b, right: colorByCode.r }
      : normalizedBinary === "rb"
        ? { left: colorByCode.r, right: colorByCode.b }
        : null;
  const polarPair =
    normalizedPolar.length === 2
      ? {
          bottom: colorByCode[normalizedPolar[0]] ?? "",
          top: colorByCode[normalizedPolar[1]] ?? "",
        }
      : null;
  const showOrbit = normalizedMode === "full" || normalizedMode === "bare";
  const showAxis =
    normalizedMode === "full" || normalizedMode === "axis" || normalizedMode === "bare";
  const circles = [];
  if (binaryPair) {
    circles.push(
      createBinaryCircle(
        "left",
        generator?.positions?.left,
        generator?.circleRadius,
        binaryPair.left,
        generator?.filters?.[binaryPair.left]
      ),
      createBinaryCircle(
        "right",
        generator?.positions?.right,
        generator?.circleRadius,
        binaryPair.right,
        generator?.filters?.[binaryPair.right]
      )
    );
  }
  if (polarPair) {
    circles.push(
      createBinaryCircle(
        "top",
        generator?.positions?.top,
        generator?.circleRadius,
        polarPair.top,
        generator?.filters?.[polarPair.top]
      ),
      createBinaryCircle(
        "bottom",
        generator?.positions?.bottom,
        generator?.circleRadius,
        polarPair.bottom,
        generator?.filters?.[polarPair.bottom]
      )
    );
  }
  return {
    key: `binary-${normalizedMode}-${normalizedBinary === "--" ? "none" : normalizedBinary}-${normalizedPolar}`,
    title: `${normalizeText(generator?.titlePrefix) || "Binary tile"}: ${grammarCode}`,
    grammarCode,
    type: "binary-glyph",
    borderColor: resolveBinaryBorderColor(generator, normalizedPolar),
    lines: [],
    binaryGlyph: normalizeBinaryGlyph({
      showOrbit,
      showAxis,
      viewBoxWidth: generator?.viewBoxWidth,
      viewBoxHeight: generator?.viewBoxHeight,
      orbit: generator?.orbit,
      axis: resolveBinaryAxisForMode(generator, normalizedMode),
      circles,
    }),
  };
}

function createGeneratedBinaryGlyphTiles(rawCatalog) {
  const generator = rawCatalog?.binaryGlyphGenerator;
  if (!generator || typeof generator !== "object") {
    return [];
  }
  const binaryOptionsByMode =
    generator?.binaryOptionsByMode && typeof generator.binaryOptionsByMode === "object"
      ? generator.binaryOptionsByMode
      : {};
  const modeOrder = Array.isArray(generator?.modeOrder)
    ? generator.modeOrder.map((value) => normalizeText(value)).filter(Boolean)
    : Object.keys(binaryOptionsByMode).map((value) => normalizeText(value)).filter(Boolean);
  return modeOrder.flatMap((mode) => {
    const binaryOptions = Array.isArray(binaryOptionsByMode[mode]) ? binaryOptionsByMode[mode] : [];
    const polarOptions = getGeneratorPolarOptionsForMode(generator, mode);
    return binaryOptions.flatMap((binary) =>
      polarOptions.map((polar) => buildBinaryGlyphTileFromGrammar(`${mode}:${binary}:${polar}`, generator))
    );
  });
}

export function normalizePdgeditTileCatalog(rawCatalog) {
  const geometry = rawCatalog?.geometry ?? {};
  const palette = rawCatalog?.palette ?? {};
  const textLayout = rawCatalog?.textLayout ?? {};
  const tiles = Array.isArray(rawCatalog?.tiles) ? rawCatalog.tiles : [];
  const generatedTiles = createGeneratedBinaryGlyphTiles(rawCatalog);
  const tileSizePx = Number(geometry.tileSizePx) || 80;
  const innerBorderOuterSizePx = Number(geometry.innerBorderOuterSizePx) || 72;
  const fallbackInset = (tileSizePx - innerBorderOuterSizePx) / 2;
  return {
    version: Number(rawCatalog?.version) || 1,
    geometry: {
      tileSizePx,
      outerFillColor: normalizeText(geometry.outerFillColor) || "outer_black",
      innerBorderOuterInsetPx: normalizeNumber(geometry.innerBorderOuterInsetPx, fallbackInset),
      innerBorderOuterSizePx,
      innerBorderStrokeWidthPx: Number(geometry.innerBorderStrokeWidthPx) || 4,
      innerBorderOuterRadiusPx: Number(geometry.innerBorderOuterRadiusPx) || 12,
    },
    palette,
    textLayout: {
      maxLines: Number(textLayout.maxLines) || 3,
      fontFamily: normalizeText(textLayout.fontFamily) || "'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontSizePx: Number(textLayout.fontSizePx) || 11.75,
      fontWeight: Number(textLayout.fontWeight) || 700,
      lineGapPx: Number(textLayout.lineGapPx) || 4,
      horizontalAlign: normalizeText(textLayout.horizontalAlign) || "center",
      verticalAlign: normalizeText(textLayout.verticalAlign) || "optical_center",
      epsilonEntity: normalizeText(textLayout.epsilonEntity) || "&#x03F5;",
      countFormat: normalizeText(textLayout.countFormat) || "<count> ϵ<sign>",
      countPlaceholders: Array.isArray(textLayout.countPlaceholders)
        ? textLayout.countPlaceholders.map((value) => normalizeText(value))
        : ["N", "M"],
    },
    tiles: [...tiles, ...generatedTiles].map((tile) => ({
      key: normalizeText(tile?.key),
      title: normalizeText(tile?.title),
      grammarCode: normalizeText(tile?.grammarCode),
      type: normalizeText(tile?.type) || "text",
      borderColor: normalizeText(tile?.borderColor),
      textOffsetYPx: normalizeNumber(tile?.textOffsetYPx),
      lines: normalizeLines(tile?.lines),
      binaryGlyph: normalizeBinaryGlyph(tile?.binaryGlyph),
      chargeCircle: normalizeChargeCircle(tile?.chargeCircle),
    })),
  };
}

export function getPdgeditFrameGeometry(catalog) {
  const tileSize = Number(catalog?.geometry?.tileSizePx) || 80;
  const outerInset = normalizeNumber(
    catalog?.geometry?.innerBorderOuterInsetPx,
    (tileSize - (Number(catalog?.geometry?.innerBorderOuterSizePx) || 72)) / 2
  );
  const outerSize = Number(catalog?.geometry?.innerBorderOuterSizePx) || 72;
  const strokeWidth = Number(catalog?.geometry?.innerBorderStrokeWidthPx) || 4;
  const outerRadius = Number(catalog?.geometry?.innerBorderOuterRadiusPx) || 12;
  return {
    tileSize,
    outerInset,
    outerSize,
    outerRadius,
    strokeWidth,
    rectInset: outerInset + strokeWidth / 2,
    rectSize: outerSize - strokeWidth,
    rectRadius: Math.max(0, outerRadius - strokeWidth / 2),
  };
}

export function resolvePdgeditCatalogColor(catalog, token) {
  if (typeof token !== "string" || !token.trim()) {
    return "";
  }
  if (token.startsWith("#")) {
    return token;
  }
  return typeof catalog?.palette?.[token] === "string" ? catalog.palette[token] : token;
}

export async function loadPdgeditTileCatalog({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("pdgedit tile catalog loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load pdgedit tile catalog: ${response.status} ${response.statusText}`);
  }
  const rawCatalog = await response.json();
  return normalizePdgeditTileCatalog(rawCatalog);
}

export function resolvePdgeditTileReviewLines(tile, sampleCounts = {}) {
  if (!Array.isArray(tile?.lines)) {
    return [];
  }
  const normalizedSampleCounts =
    sampleCounts && typeof sampleCounts === "object" ? sampleCounts : {};
  const topCount = normalizeText(normalizedSampleCounts.topCount) || "N";
  const bottomCount = normalizeText(normalizedSampleCounts.bottomCount) || "M";
  function resolveCountPlaceholder(placeholder, index) {
    const normalizedPlaceholder = normalizeText(placeholder).toUpperCase();
    if (normalizedPlaceholder === "N") {
      return topCount;
    }
    if (normalizedPlaceholder === "M") {
      return bottomCount;
    }
    return index === 0 ? topCount : bottomCount;
  }
  return (Array.isArray(tile?.lines) ? tile.lines : []).slice(0, 3).map((line, index) => {
    if (!line || line.type === "blank") {
      return { kind: "blank", text: "", color: line?.color || "" };
    }
    if (line.type === "count") {
      return {
        kind: "count",
        text: resolveCountPlaceholder(line.placeholder, index),
        color: line.color,
        sign: normalizeText(line.sign),
      };
    }
    return {
      kind: "literal",
      text: normalizeText(line.text),
      color: line.color,
    };
  });
}
