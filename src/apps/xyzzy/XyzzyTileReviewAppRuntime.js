import { getXyzzyFrameGeometry, loadXyzzyTileCatalog } from "./XyzzyTileCatalogRuntime.js";
import { loadXyzzyReviewGroupCatalog } from "./XyzzyReviewGroupCatalogRuntime.js";
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

function createResolvedGroupTile(documentLike, catalog, tile, sampleCounts, measurementContext) {
  const tileSvg = renderXyzzyTileSvg({
    documentLike,
    catalog,
    tile,
    sampleCounts,
    measurementContext,
  });
  tileSvg.classList.add("xyzzy-review-group-tile");
  return tileSvg;
}

function createGroupRow(documentLike, catalog, tileByKey, rowTileKeys, sampleCounts, measurementContext) {
  const row = documentLike.createElement("div");
  row.className = "xyzzy-review-group-row";
  rowTileKeys.forEach((tileKey) => {
    const tile = tileByKey.get(tileKey);
    if (!tile) {
      throw new Error(`Unknown Xyzzy review group tile key: ${tileKey}`);
    }
    row.append(createResolvedGroupTile(documentLike, catalog, tile, sampleCounts, measurementContext));
  });
  return row;
}

function createGroupCard(
  documentLike,
  catalog,
  tileByKey,
  group,
  sampleCounts,
  measurementContext
) {
  const card = documentLike.createElement("article");
  card.className = "xyzzy-review-card xyzzy-review-group-card";

  const preview = documentLike.createElement("div");
  preview.className = "xyzzy-review-card-preview xyzzy-review-group-preview";

  const stack = documentLike.createElement("div");
  stack.className = "xyzzy-review-group-stack";
  group.rows.forEach((rowTileKeys) => {
    stack.append(
      createGroupRow(
        documentLike,
        catalog,
        tileByKey,
        rowTileKeys,
        sampleCounts,
        measurementContext
      )
    );
  });
  preview.append(stack);

  const meta = documentLike.createElement("div");
  meta.className = "xyzzy-review-card-meta";

  const titleElement = documentLike.createElement("h2");
  titleElement.className = "xyzzy-review-card-title";
  titleElement.textContent = group.title || group.key;

  const keyElement = documentLike.createElement("div");
  keyElement.className = "xyzzy-review-card-key";
  keyElement.textContent = group.key;

  meta.append(titleElement, keyElement);
  card.append(preview, meta);
  return card;
}

export function createXyzzyTileReviewAppRuntime({
  documentLike = globalThis.document,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
  groupSpecUrl,
  statusElement,
  catalogMetaElement,
  specialGroupElement,
  singleRowGroupElement,
  compositeGroupElement,
  titleGridElement,
  binaryGridElement,
  gridElement,
  topCountInput,
  bottomCountInput,
} = {}) {
  const measurementContext = documentLike.createElement("canvas").getContext("2d");
  let catalog = null;
  let groupCatalog = null;

  function getSampleCounts() {
    return {
      topCount: normalizeInputValue(topCountInput?.value, "N"),
      bottomCount: normalizeInputValue(bottomCountInput?.value, "M"),
    };
  }

  function render() {
    const hasTileGridElements = gridElement || titleGridElement || binaryGridElement;
    const hasGroupElements = specialGroupElement || singleRowGroupElement || compositeGroupElement;
    if (!catalog || (!hasTileGridElements && !hasGroupElements)) {
      return;
    }

    const sampleCounts = getSampleCounts();
    const catalogTiles = catalog.tiles.filter((tile) => tile.type !== "binary-glyph");
    const binaryTiles = catalog.tiles.filter((tile) => tile.type === "binary-glyph");
    const fallbackGrid = !titleGridElement && !binaryGridElement ? gridElement : null;
    const tileByKey = new Map(catalog.tiles.map((tile) => [tile.key, tile]));

    if (specialGroupElement && groupCatalog) {
      specialGroupElement.replaceChildren(
        ...groupCatalog.specialGroups.map((group) =>
          createGroupCard(documentLike, catalog, tileByKey, group, sampleCounts, measurementContext)
        )
      );
    }
    if (singleRowGroupElement && groupCatalog) {
      singleRowGroupElement.replaceChildren(
        ...groupCatalog.singleRowGroups.map((group) =>
          createGroupCard(documentLike, catalog, tileByKey, group, sampleCounts, measurementContext)
        )
      );
    }
    if (compositeGroupElement && groupCatalog) {
      compositeGroupElement.replaceChildren(
        ...groupCatalog.compositeGroups.map((group) =>
          createGroupCard(documentLike, catalog, tileByKey, group, sampleCounts, measurementContext)
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
      const specialGroupCount = groupCatalog?.specialGroups?.length ?? 0;
      const singleRowGroupCount = groupCatalog?.singleRowGroups?.length ?? 0;
      const compositeGroupCount = groupCatalog?.compositeGroups?.length ?? 0;
      statusElement.textContent =
        `Rendered ${catalogTiles.length} catalog tiles, ${binaryTiles.length} binary tiles, ` +
        `${specialGroupCount} special single-row groups, ${singleRowGroupCount} standard-model single-row groups, ` +
        `and ${compositeGroupCount} composite groups from the JSON-driven Xyzzy catalogs. ` +
        `Frame rect ${frame.rectInset.toFixed(0)},${frame.rectInset.toFixed(0)} ` +
        `${frame.rectSize.toFixed(0)}x${frame.rectSize.toFixed(0)}.`;
    }
  }

  async function init() {
    const hasTileGridElements = gridElement || titleGridElement || binaryGridElement;
    const hasGroupElements = specialGroupElement || singleRowGroupElement || compositeGroupElement;
    if (!hasTileGridElements && !hasGroupElements) {
      throw new Error("Xyzzy review output element is required.");
    }

    const loadOperations = [loadXyzzyTileCatalog({ fetchImpl, specUrl })];
    if (hasGroupElements) {
      if (!groupSpecUrl) {
        throw new Error("Xyzzy review group spec URL is required.");
      }
      loadOperations.push(loadXyzzyReviewGroupCatalog({ fetchImpl, specUrl: groupSpecUrl }));
    }

    const [loadedCatalog, loadedGroupCatalog = null] = await Promise.all(loadOperations);
    catalog = loadedCatalog;
    groupCatalog = loadedGroupCatalog;

    if (catalogMetaElement) {
      const groupTotal =
        (groupCatalog?.specialGroups?.length ?? 0) +
        (groupCatalog?.singleRowGroups?.length ?? 0) +
        (groupCatalog?.compositeGroups?.length ?? 0);
      catalogMetaElement.textContent =
        `${catalog.tiles.length} tiles from ${specUrl}` +
        (groupCatalog ? `; ${groupTotal} review groups from ${groupSpecUrl}` : "");
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
