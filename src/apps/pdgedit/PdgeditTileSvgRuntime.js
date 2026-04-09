import {
  getPdgeditFrameGeometry,
  resolvePdgeditCatalogColor,
  resolvePdgeditTileReviewLines,
} from "./PdgeditTileCatalogRuntime.js";

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
  const ascent = Number.isFinite(metrics.actualBoundingBoxAscent)
    ? metrics.actualBoundingBoxAscent
    : fontSizePx * 0.72;
  const descent = Number.isFinite(metrics.actualBoundingBoxDescent)
    ? metrics.actualBoundingBoxDescent
    : fontSizePx * 0.18;
  const top = -ascent;
  const bottom = descent;
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

function appendTextLine(documentLike, textElement, line, catalog) {
  if (line.kind === "count") {
    textElement.textContent = `${line.text} `;
    const epsilonSpan = documentLike.createElementNS(SVG_NAMESPACE, "tspan");
    epsilonSpan.setAttribute("font-family", EPSILON_FONT_FAMILY);
    epsilonSpan.textContent = EPSILON_GLYPH;
    textElement.append(epsilonSpan);
    const superscriptSize = Math.max(7, catalog.textLayout.fontSizePx - 2.5);
    const signSpan = documentLike.createElementNS(SVG_NAMESPACE, "tspan");
    signSpan.setAttribute("baseline-shift", "super");
    signSpan.setAttribute("font-size", String(superscriptSize));
    signSpan.textContent = line.sign;
    textElement.append(signSpan);
    return;
  }
  textElement.textContent = line.text;
}

function applyOptionalFilter(element, filterValue) {
  if (typeof filterValue !== "string" || !filterValue.trim()) {
    return;
  }
  element.style.filter = filterValue;
}

function appendBinaryGlyphSvg(documentLike, svg, catalog, tile) {
  const binaryGlyph = tile?.binaryGlyph ?? {};
  const nestedSvg = documentLike.createElementNS(SVG_NAMESPACE, "svg");
  const frame = getPdgeditFrameGeometry(catalog);
  const glyphInset = frame.outerInset;
  nestedSvg.setAttribute("x", glyphInset.toFixed(2));
  nestedSvg.setAttribute("y", glyphInset.toFixed(2));
  nestedSvg.setAttribute("width", String(frame.outerSize));
  nestedSvg.setAttribute("height", String(frame.outerSize));
  nestedSvg.setAttribute(
    "viewBox",
    `0 0 ${binaryGlyph.viewBoxWidth || 120} ${binaryGlyph.viewBoxHeight || 120}`
  );
  nestedSvg.setAttribute("aria-hidden", "true");

  const orbit = binaryGlyph.orbit ?? {};
  if (binaryGlyph.showOrbit !== false) {
    const orbitElement = documentLike.createElementNS(SVG_NAMESPACE, "ellipse");
    orbitElement.setAttribute("cx", String(orbit.cx ?? 60));
    orbitElement.setAttribute("cy", String(orbit.cy ?? 60));
    orbitElement.setAttribute("rx", String(orbit.rx ?? 38));
    orbitElement.setAttribute("ry", String(orbit.ry ?? 13));
    orbitElement.setAttribute("fill", "none");
    orbitElement.setAttribute("stroke", resolvePdgeditCatalogColor(catalog, orbit.strokeColor));
    orbitElement.setAttribute("stroke-width", String(orbit.strokeWidth ?? 5));
    applyOptionalFilter(orbitElement, orbit.filter);
    nestedSvg.append(orbitElement);
  }

  const axis = binaryGlyph.axis ?? {};
  if (binaryGlyph.showAxis !== false) {
    const axisElement = documentLike.createElementNS(SVG_NAMESPACE, "line");
    axisElement.setAttribute("x1", String(axis.x1 ?? 60));
    axisElement.setAttribute("y1", String(axis.y1 ?? 18));
    axisElement.setAttribute("x2", String(axis.x2 ?? 60));
    axisElement.setAttribute("y2", String(axis.y2 ?? 102));
    axisElement.setAttribute("fill", "none");
    axisElement.setAttribute("stroke", resolvePdgeditCatalogColor(catalog, axis.strokeColor));
    axisElement.setAttribute("stroke-width", String(axis.strokeWidth ?? 4));
    axisElement.setAttribute("stroke-linecap", axis.lineCap || "round");
    axisElement.setAttribute("opacity", String(axis.opacity ?? 1));
    if (typeof axis.strokeDasharray === "string" && axis.strokeDasharray.trim()) {
      axisElement.setAttribute("stroke-dasharray", axis.strokeDasharray.trim());
    }
    if (Number.isFinite(Number(axis.strokeDashoffset)) && Number(axis.strokeDashoffset) !== 0) {
      axisElement.setAttribute("stroke-dashoffset", String(axis.strokeDashoffset));
    }
    nestedSvg.append(axisElement);
  }

  (Array.isArray(binaryGlyph.circles) ? binaryGlyph.circles : []).forEach((circle) => {
    const circleElement = documentLike.createElementNS(SVG_NAMESPACE, "circle");
    circleElement.setAttribute("cx", String(circle.cx ?? 0));
    circleElement.setAttribute("cy", String(circle.cy ?? 0));
    circleElement.setAttribute("r", String(circle.r ?? 0));
    circleElement.setAttribute("fill", resolvePdgeditCatalogColor(catalog, circle.fillColor));
    circleElement.setAttribute("vector-effect", "non-scaling-stroke");
    applyOptionalFilter(circleElement, circle.filter);
    nestedSvg.append(circleElement);
  });

  svg.append(nestedSvg);
}

function appendChargeCircleSvg(documentLike, svg, catalog, tile) {
  const chargeCircle = tile?.chargeCircle ?? {};
  const radius = Number(chargeCircle.r ?? 0);
  if (!(radius > 0)) {
    return;
  }
  const circleElement = documentLike.createElementNS(SVG_NAMESPACE, "circle");
  circleElement.setAttribute("cx", String(chargeCircle.cx ?? catalog.geometry.tileSizePx / 2));
  circleElement.setAttribute("cy", String(chargeCircle.cy ?? catalog.geometry.tileSizePx / 2));
  circleElement.setAttribute("r", String(radius));
  circleElement.setAttribute("fill", resolvePdgeditCatalogColor(catalog, chargeCircle.fillColor));
  circleElement.setAttribute("vector-effect", "non-scaling-stroke");
  applyOptionalFilter(circleElement, chargeCircle.filter);
  svg.append(circleElement);
}

export function renderPdgeditTileSvg({
  documentLike = globalThis.document,
  catalog,
  tile,
  sampleCounts,
  measurementContext = createMeasurementContext(),
} = {}) {
  const svg = documentLike.createElementNS(SVG_NAMESPACE, "svg");
  const resolvedLines = resolvePdgeditTileReviewLines(tile, sampleCounts);
  const baselines = getTileBaselines(measurementContext, resolvedLines, catalog);
  const frame = getPdgeditFrameGeometry(catalog);
  const tileSize = frame.tileSize;

  svg.setAttribute("viewBox", `0 0 ${tileSize} ${tileSize}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", tile.title);
  svg.classList.add("pdgedit-review-tile-svg");

  const outerRect = documentLike.createElementNS(SVG_NAMESPACE, "rect");
  outerRect.setAttribute("width", String(tileSize));
  outerRect.setAttribute("height", String(tileSize));
  outerRect.setAttribute("fill", resolvePdgeditCatalogColor(catalog, catalog.geometry.outerFillColor));
  svg.append(outerRect);

  const innerRect = documentLike.createElementNS(SVG_NAMESPACE, "rect");
  innerRect.setAttribute("x", frame.rectInset.toFixed(2));
  innerRect.setAttribute("y", frame.rectInset.toFixed(2));
  innerRect.setAttribute("width", frame.rectSize.toFixed(2));
  innerRect.setAttribute("height", frame.rectSize.toFixed(2));
  innerRect.setAttribute("rx", frame.rectRadius.toFixed(2));
  innerRect.setAttribute("fill", "none");
  innerRect.setAttribute("stroke", resolvePdgeditCatalogColor(catalog, tile.borderColor));
  innerRect.setAttribute("stroke-width", String(frame.strokeWidth));
  svg.append(innerRect);

  if (tile?.type === "binary-glyph") {
    appendBinaryGlyphSvg(documentLike, svg, catalog, tile);
  }
  if (tile?.type === "charge-glyph") {
    appendChargeCircleSvg(documentLike, svg, catalog, tile);
  }

  resolvedLines.forEach((line, index) => {
    if (!line.text) {
      return;
    }
    const textElement = documentLike.createElementNS(SVG_NAMESPACE, "text");
    textElement.setAttribute("x", String(tileSize / 2));
    textElement.setAttribute(
      "y",
      (baselines[index] + Number(tile?.textOffsetYPx ?? 0)).toFixed(2)
    );
    textElement.setAttribute("fill", resolvePdgeditCatalogColor(catalog, line.color));
    textElement.setAttribute("font-family", catalog.textLayout.fontFamily);
    textElement.setAttribute("font-size", String(catalog.textLayout.fontSizePx));
    textElement.setAttribute("font-weight", String(catalog.textLayout.fontWeight));
    textElement.setAttribute("text-anchor", "middle");
    appendTextLine(documentLike, textElement, line, catalog);
    svg.append(textElement);
  });

  return svg;
}
