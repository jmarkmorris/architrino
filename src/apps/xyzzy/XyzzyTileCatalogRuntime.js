function normalizeText(value) {
  return typeof value === "string" ? value : "";
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

export function normalizeXyzzyTileCatalog(rawCatalog) {
  const geometry = rawCatalog?.geometry ?? {};
  const palette = rawCatalog?.palette ?? {};
  const textLayout = rawCatalog?.textLayout ?? {};
  const tiles = Array.isArray(rawCatalog?.tiles) ? rawCatalog.tiles : [];
  return {
    version: Number(rawCatalog?.version) || 1,
    geometry: {
      tileSizePx: Number(geometry.tileSizePx) || 80,
      outerFillColor: normalizeText(geometry.outerFillColor) || "outer_black",
      innerBorderOuterSizePx: Number(geometry.innerBorderOuterSizePx) || 72,
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
    tiles: tiles.map((tile) => ({
      key: normalizeText(tile?.key),
      title: normalizeText(tile?.title),
      borderColor: normalizeText(tile?.borderColor),
      lines: normalizeLines(tile?.lines),
    })),
  };
}

export function resolveXyzzyCatalogColor(catalog, token) {
  if (typeof token !== "string" || !token.trim()) {
    return "";
  }
  if (token.startsWith("#")) {
    return token;
  }
  return typeof catalog?.palette?.[token] === "string" ? catalog.palette[token] : token;
}

export async function loadXyzzyTileCatalog({
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
} = {}) {
  if (typeof fetchImpl !== "function") {
    throw new Error("Xyzzy tile catalog loading requires fetch().");
  }
  const response = await fetchImpl(specUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load Xyzzy tile catalog: ${response.status} ${response.statusText}`);
  }
  const rawCatalog = await response.json();
  return normalizeXyzzyTileCatalog(rawCatalog);
}

export function resolveXyzzyTileReviewLines(tile, sampleCounts = {}) {
  const topCount = normalizeText(sampleCounts.topCount) || "N";
  const bottomCount = normalizeText(sampleCounts.bottomCount) || "M";
  return (Array.isArray(tile?.lines) ? tile.lines : []).slice(0, 3).map((line, index) => {
    if (!line || line.type === "blank") {
      return { kind: "blank", text: "", color: line?.color || "" };
    }
    if (line.type === "count") {
      return {
        kind: "count",
        text: index === 0 ? topCount : bottomCount,
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
