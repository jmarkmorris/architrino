import {
  resolveXyzzyCatalogColor,
  resolveXyzzyTileReviewLines,
} from "./XyzzyTileCatalogRuntime.js";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const EPSILON_GLYPH = "ϵ";
const EPSILON_FONT_FAMILY = "'STIX Two Text', Cambria Math, Georgia, serif";

function createMeasurementContext() {
  const canvas = document.createElement("canvas");
  return canvas.getContext("2d");
}

function setCanvasFont(context, fontSizePx, fontFamily, fontWeight = 700) {
  context.font = `${fontWeight} ${fontSizePx}px ${fontFamily}`;
}

function measureTextBounds(context, text, fontSizePx, fontFamily, fontWeight = 700) {
  setCanvasFont(context, fontSizePx, fontFamily, fontWeight);
  const metrics = context.measureText(text);
  const top = -(metrics.actualBoundingBoxAscent || fontSizePx * 0.72);
  const bottom = metrics.actualBoundingBoxDescent || fontSizePx * 0.18;
  return { top, bottom };
}

function getResolvedLineBounds(context, line, catalog) {
  if (!line?.text) {
    return { top: 0, bottom: 0 };
  }
  const textLayout = catalog.textLayout;
  if (line.kind === "count") {
    const superscriptSize = Math.max(7, textLayout.fontSizePx - 2.5);
    const superscriptShift = textLayout.fontSizePx * 0.36;
    const segments = [
      {
        text: `${line.text} `,
        fontFamily: textLayout.fontFamily,
        fontSizePx: textLayout.fontSizePx,
        fontWeight: textLayout.fontWeight,
        baselineShift: 0,
      },
      {
        text: EPSILON_GLYPH,
        fontFamily: EPSILON_FONT_FAMILY,
        fontSizePx: textLayout.fontSizePx,
        fontWeight: textLayout.fontWeight,
        baselineShift: 0,
      },
      {
        text: line.sign,
        fontFamily: textLayout.fontFamily,
        fontSizePx: superscriptSize,
        fontWeight: textLayout.fontWeight,
        baselineShift: -superscriptShift,
      },
    ];
    let top = 0;
    let bottom = 0;
    let isFirst = true;
    segments.forEach((segment) => {
      const bounds = measureTextBounds(
        context,
        segment.text,
        segment.fontSizePx,
        segment.fontFamily,
        segment.fontWeight
      );
      const shiftedTop = bounds.top + segment.baselineShift;
      const shiftedBottom = bounds.bottom + segment.baselineShift;
      if (isFirst) {
        top = shiftedTop;
        bottom = shiftedBottom;
        isFirst = false;
        return;
      }
      top = Math.min(top, shiftedTop);
      bottom = Math.max(bottom, shiftedBottom);
    });
    return { top, bottom };
  }
  return measureTextBounds(
    context,
    line.text,
    textLayout.fontSizePx,
    textLayout.fontFamily,
    textLayout.fontWeight
  );
}

function getTileBaselines(context, resolvedLines, catalog) {
  const visibleEntries = resolvedLines
    .map((line, index) => ({ index, line, bounds: getResolvedLineBounds(context, line, catalog) }))
    .filter((entry) => entry.line.text);
  if (!visibleEntries.length) {
    return resolvedLines.map(() => 0);
  }
  const baselinesByIndex = new Map();
  let topCursor = 0;
  let blockBottom = 0;
  visibleEntries.forEach((entry, visibleIndex) => {
    const baseline = topCursor - entry.bounds.top;
    baselinesByIndex.set(entry.index, baseline);
    blockBottom = baseline + entry.bounds.bottom;
    if (visibleIndex < visibleEntries.length - 1) {
      topCursor = blockBottom + catalog.textLayout.lineGapPx;
    }
  });
  const verticalOffset = catalog.geometry.tileSizePx / 2 - blockBottom / 2;
  return resolvedLines.map((_line, index) => (baselinesByIndex.get(index) || 0) + verticalOffset);
}

function appendTextLine(textElement, line, catalog) {
  if (line.kind === "count") {
    textElement.textContent = `${line.text} `;
    const epsilonSpan = document.createElementNS(SVG_NAMESPACE, "tspan");
    epsilonSpan.setAttribute("font-family", EPSILON_FONT_FAMILY);
    epsilonSpan.textContent = EPSILON_GLYPH;
    textElement.append(epsilonSpan);
    const superscriptSize = Math.max(7, catalog.textLayout.fontSizePx - 2.5);
    const signSpan = document.createElementNS(SVG_NAMESPACE, "tspan");
    signSpan.setAttribute("baseline-shift", "super");
    signSpan.setAttribute("font-size", String(superscriptSize));
    signSpan.textContent = line.sign;
    textElement.append(signSpan);
    return;
  }
  textElement.textContent = line.text;
}

export function renderXyzzyTileSvg({
  documentLike = globalThis.document,
  catalog,
  tile,
  sampleCounts,
  measurementContext = createMeasurementContext(),
} = {}) {
  const svg = documentLike.createElementNS(SVG_NAMESPACE, "svg");
  const resolvedLines = resolveXyzzyTileReviewLines(tile, sampleCounts);
  const baselines = getTileBaselines(measurementContext, resolvedLines, catalog);
  const tileSize = catalog.geometry.tileSizePx;
  const innerBorderOuterSize = catalog.geometry.innerBorderOuterSizePx;
  const innerBorderStrokeWidth = catalog.geometry.innerBorderStrokeWidthPx;
  const innerBorderOuterRadius = catalog.geometry.innerBorderOuterRadiusPx;
  const rectInset = (tileSize - innerBorderOuterSize) / 2 + innerBorderStrokeWidth / 2;
  const rectSize = innerBorderOuterSize - innerBorderStrokeWidth;
  const rectRadius = Math.max(0, innerBorderOuterRadius - innerBorderStrokeWidth / 2);

  svg.setAttribute("viewBox", `0 0 ${tileSize} ${tileSize}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", tile.title);
  svg.classList.add("xyzzy-review-tile-svg");

  const outerRect = documentLike.createElementNS(SVG_NAMESPACE, "rect");
  outerRect.setAttribute("width", String(tileSize));
  outerRect.setAttribute("height", String(tileSize));
  outerRect.setAttribute("fill", resolveXyzzyCatalogColor(catalog, catalog.geometry.outerFillColor));
  svg.append(outerRect);

  const innerRect = documentLike.createElementNS(SVG_NAMESPACE, "rect");
  innerRect.setAttribute("x", rectInset.toFixed(2));
  innerRect.setAttribute("y", rectInset.toFixed(2));
  innerRect.setAttribute("width", rectSize.toFixed(2));
  innerRect.setAttribute("height", rectSize.toFixed(2));
  innerRect.setAttribute("rx", rectRadius.toFixed(2));
  innerRect.setAttribute("fill", "none");
  innerRect.setAttribute("stroke", resolveXyzzyCatalogColor(catalog, tile.borderColor));
  innerRect.setAttribute("stroke-width", String(innerBorderStrokeWidth));
  svg.append(innerRect);

  resolvedLines.forEach((line, index) => {
    if (!line.text) {
      return;
    }
    const textElement = documentLike.createElementNS(SVG_NAMESPACE, "text");
    textElement.setAttribute("x", String(tileSize / 2));
    textElement.setAttribute("y", baselines[index].toFixed(2));
    textElement.setAttribute("fill", resolveXyzzyCatalogColor(catalog, line.color));
    textElement.setAttribute("font-family", catalog.textLayout.fontFamily);
    textElement.setAttribute("font-size", String(catalog.textLayout.fontSizePx));
    textElement.setAttribute("font-weight", String(catalog.textLayout.fontWeight));
    textElement.setAttribute("text-anchor", "middle");
    appendTextLine(textElement, line, catalog);
    svg.append(textElement);
  });

  return svg;
}
