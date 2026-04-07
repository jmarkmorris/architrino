import { getXyzzyFrameGeometry, loadXyzzyTileCatalog } from "./XyzzyTileCatalogRuntime.js";
import { renderXyzzyTileSvg } from "./XyzzyTileSvgRuntime.js";

function normalizeInputValue(value, fallback) {
  const text = typeof value === "string" ? value.trim() : "";
  return text || fallback;
}

function createTileCard(documentLike, catalog, tile, sampleCounts, measurementContext) {
  const card = documentLike.createElement("article");
  card.className = "xyzzy-review-card";

  const preview = documentLike.createElement("div");
  preview.className = "xyzzy-review-card-preview";
  preview.append(
    renderXyzzyTileSvg({
      documentLike,
      catalog,
      tile,
      sampleCounts,
      measurementContext,
    })
  );

  const meta = documentLike.createElement("div");
  meta.className = "xyzzy-review-card-meta";

  const title = documentLike.createElement("h2");
  title.className = "xyzzy-review-card-title";
  title.textContent = tile.title || tile.key;

  const key = documentLike.createElement("div");
  key.className = "xyzzy-review-card-key";
  key.textContent = tile.key;

  meta.append(title, key);
  card.append(preview, meta);
  return card;
}

function createAssemblyShowcaseCard(
  documentLike,
  catalog,
  title,
  key,
  tiles,
  sampleCounts,
  measurementContext
) {
  const card = documentLike.createElement("article");
  card.className = "xyzzy-review-card xyzzy-review-assembly-card";

  const preview = documentLike.createElement("div");
  preview.className = "xyzzy-review-card-preview xyzzy-review-assembly-preview";

  const strip = documentLike.createElement("div");
  strip.className = "xyzzy-review-assembly-strip";
  tiles.forEach((tile) => {
    const tileSvg = renderXyzzyTileSvg({
      documentLike,
      catalog,
      tile,
      sampleCounts,
      measurementContext,
    });
    tileSvg.classList.add("xyzzy-review-assembly-tile");
    strip.append(tileSvg);
  });
  preview.append(strip);

  const meta = documentLike.createElement("div");
  meta.className = "xyzzy-review-card-meta";

  const titleElement = documentLike.createElement("h2");
  titleElement.className = "xyzzy-review-card-title";
  titleElement.textContent = title;

  const keyElement = documentLike.createElement("div");
  keyElement.className = "xyzzy-review-card-key";
  keyElement.textContent = key;

  meta.append(titleElement, keyElement);
  card.append(preview, meta);
  return card;
}

export function createXyzzyTileReviewAppRuntime({
  documentLike = globalThis.document,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
  statusElement,
  catalogMetaElement,
  assemblyShowcaseElement,
  titleGridElement,
  binaryGridElement,
  gridElement,
  topCountInput,
  bottomCountInput,
} = {}) {
  const measurementContext = documentLike.createElement("canvas").getContext("2d");
  let catalog = null;

  function getSampleCounts() {
    return {
      topCount: normalizeInputValue(topCountInput?.value, "N"),
      bottomCount: normalizeInputValue(bottomCountInput?.value, "M"),
    };
  }

  function render() {
    if (!catalog || (!gridElement && !titleGridElement && !binaryGridElement && !assemblyShowcaseElement)) {
      return;
    }
    const sampleCounts = getSampleCounts();
    const catalogTiles = catalog.tiles.filter((tile) => tile.type !== "binary-glyph");
    const binaryTiles = catalog.tiles.filter((tile) => tile.type === "binary-glyph");
    const unboundAssemblyKeys = [
      "unbound",
      "unbound-electrinos",
      "unbound-positrinos",
      "architrinos",
    ];
    const unboundAssemblyTiles = unboundAssemblyKeys
      .map((key) => catalog.tiles.find((tile) => tile.key === key))
      .filter(Boolean);
    const fallbackGrid = !titleGridElement && !binaryGridElement ? gridElement : null;
    if (assemblyShowcaseElement) {
      assemblyShowcaseElement.replaceChildren(
        createAssemblyShowcaseCard(
          documentLike,
          catalog,
          "Unbound Architrinos Group",
          unboundAssemblyKeys.join(" | "),
          unboundAssemblyTiles,
          sampleCounts,
          measurementContext
        )
      );
    }
    if (titleGridElement) {
      titleGridElement.replaceChildren(
        ...catalogTiles.map((tile) =>
          createTileCard(documentLike, catalog, tile, sampleCounts, measurementContext)
        )
      );
    }
    if (binaryGridElement) {
      binaryGridElement.replaceChildren(
        ...binaryTiles.map((tile) =>
          createTileCard(documentLike, catalog, tile, sampleCounts, measurementContext)
        )
      );
    }
    if (fallbackGrid) {
      fallbackGrid.replaceChildren(
        ...catalog.tiles.map((tile) =>
          createTileCard(documentLike, catalog, tile, sampleCounts, measurementContext)
        )
      );
    }
    if (statusElement) {
      const frame = getXyzzyFrameGeometry(catalog);
      statusElement.textContent =
        `Rendered ${catalogTiles.length} catalog tiles, ${binaryTiles.length} binary tiles, ` +
        `and the unbound-architrino group showcase from the JSON-driven Xyzzy catalog. ` +
        `Frame rect ${frame.rectInset.toFixed(0)},${frame.rectInset.toFixed(0)} ` +
        `${frame.rectSize.toFixed(0)}x${frame.rectSize.toFixed(0)}.`;
    }
  }

  async function init() {
    if (!gridElement && !titleGridElement && !binaryGridElement && !assemblyShowcaseElement) {
      throw new Error("Xyzzy review grid element is required.");
    }
    catalog = await loadXyzzyTileCatalog({ fetchImpl, specUrl });
    if (catalogMetaElement) {
      catalogMetaElement.textContent = `${catalog.tiles.length} tiles from ${specUrl}`;
    }
    if (documentLike.fonts?.ready) {
      await documentLike.fonts.ready;
    }
    render();
    topCountInput?.addEventListener("input", render);
    bottomCountInput?.addEventListener("input", render);
  }

  return {
    init,
    render,
  };
}
