import { loadXyzzyTileCatalog } from "./XyzzyTileCatalogRuntime.js";
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

export function createXyzzyTileReviewAppRuntime({
  documentLike = globalThis.document,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
  statusElement,
  catalogMetaElement,
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
    if (!catalog || !gridElement) {
      return;
    }
    const sampleCounts = getSampleCounts();
    gridElement.replaceChildren(
      ...catalog.tiles.map((tile) =>
        createTileCard(documentLike, catalog, tile, sampleCounts, measurementContext)
      )
    );
    if (statusElement) {
      statusElement.textContent = `Rendered ${catalog.tiles.length} JSON-driven Xyzzy tiles.`;
    }
  }

  async function init() {
    if (!gridElement) {
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
