import { getPdgeditFrameGeometry, loadPdgeditTileCatalog } from "./PdgeditTileCatalogRuntime.js?v=2026-04-08-quark-color-title-tile";
import { loadPdgeditReviewGroupCatalog } from "./PdgeditReviewGroupCatalogRuntime.js?v=2026-04-08-quark-color-title-tile";
import { renderPdgeditTileSvg } from "./PdgeditTileSvgRuntime.js?v=2026-04-08-quark-color-title-tile";

function normalizeInputValue(value, fallback) {
  const text = typeof value === "string" ? value.trim() : "";
  return text || fallback;
}

function createTileCard(documentLike, catalog, tile, sampleCounts, measurementContext) {
  const card = documentLike.createElement("article");
  card.className = "pdgedit-review-card";

  const preview = documentLike.createElement("div");
  preview.className = "pdgedit-review-card-preview";
  preview.append(
    renderPdgeditTileSvg({
      documentLike,
      catalog,
      tile,
      sampleCounts,
      measurementContext,
    })
  );

  const meta = documentLike.createElement("div");
  meta.className = "pdgedit-review-card-meta";

  const title = documentLike.createElement("h2");
  title.className = "pdgedit-review-card-title";
  title.textContent = tile.title || tile.key;

  const key = documentLike.createElement("div");
  key.className = "pdgedit-review-card-key";
  key.textContent = tile.key;

  meta.append(title, key);
  card.append(preview, meta);
  return card;
}

function createResolvedGroupTile(documentLike, catalog, tile, sampleCounts, measurementContext) {
  const tileSvg = renderPdgeditTileSvg({
    documentLike,
    catalog,
    tile,
    sampleCounts,
    measurementContext,
  });
  tileSvg.classList.add("pdgedit-review-group-tile");
  return tileSvg;
}

function createGroupRow(documentLike, catalog, tileByKey, rowTileKeys, sampleCounts, measurementContext) {
  const row = documentLike.createElement("div");
  row.className = "pdgedit-review-group-row";
  rowTileKeys.forEach((tileKey) => {
    const tile = tileByKey.get(tileKey);
    if (!tile) {
      throw new Error(`Unknown pdgedit review group tile key: ${tileKey}`);
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
  card.className = "pdgedit-review-card pdgedit-review-group-card";

  const preview = documentLike.createElement("div");
  preview.className = "pdgedit-review-card-preview pdgedit-review-group-preview";

  const stack = documentLike.createElement("div");
  stack.className = "pdgedit-review-group-stack";
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
  meta.className = "pdgedit-review-card-meta";

  const titleElement = documentLike.createElement("h2");
  titleElement.className = "pdgedit-review-card-title";
  titleElement.textContent = group.title || group.key;

  const keyElement = documentLike.createElement("div");
  keyElement.className = "pdgedit-review-card-key";
  keyElement.textContent = group.key;

  meta.append(titleElement, keyElement);
  card.append(preview, meta);
  return card;
}

export function createPdgeditTileReviewAppRuntime({
  documentLike = globalThis.document,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  specUrl,
  groupSpecUrl,
  statusElement,
  catalogMetaElement,
  specialGroupElement,
  singleRowGroupElement,
  quarkColorGroupElement,
  compositeGroupElement,
  titleGridElement,
  labelGridElement,
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
    const hasTileGridElements = gridElement || titleGridElement || labelGridElement || binaryGridElement;
    const hasGroupElements =
      specialGroupElement || singleRowGroupElement || quarkColorGroupElement || compositeGroupElement;
    if (!catalog || (!hasTileGridElements && !hasGroupElements)) {
      return;
    }

    const sampleCounts = getSampleCounts();
    const labelTiles = catalog.tiles.filter((tile) => tile.type === "composite-label");
    const catalogTiles = catalog.tiles.filter((tile) => tile.type !== "binary-glyph" && tile.type !== "composite-label");
    const binaryTiles = catalog.tiles.filter((tile) => tile.type === "binary-glyph");
    const fallbackGrid = !titleGridElement && !labelGridElement && !binaryGridElement ? gridElement : null;
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
    if (quarkColorGroupElement && groupCatalog) {
      quarkColorGroupElement.replaceChildren(
        ...groupCatalog.quarkColorGroups.map((group) =>
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
    if (labelGridElement) {
      labelGridElement.replaceChildren(
        ...labelTiles.map((tile) =>
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
      const frame = getPdgeditFrameGeometry(catalog);
      const specialGroupCount = groupCatalog?.specialGroups?.length ?? 0;
      const singleRowGroupCount = groupCatalog?.singleRowGroups?.length ?? 0;
      const quarkColorGroupCount = groupCatalog?.quarkColorGroups?.length ?? 0;
      const compositeGroupCount = groupCatalog?.compositeGroups?.length ?? 0;
      statusElement.textContent =
        `Rendered ${catalogTiles.length} catalog tiles, ${labelTiles.length} composite label tiles, ${binaryTiles.length} binary tiles, ` +
        `${specialGroupCount} special single-row groups, ${singleRowGroupCount} standard-model single-row groups, ` +
        `${quarkColorGroupCount} quark color example groups, and ${compositeGroupCount} composite groups ` +
        `from the JSON-driven Pdgedit catalogs. ` +
        `Frame rect ${frame.rectInset.toFixed(0)},${frame.rectInset.toFixed(0)} ` +
        `${frame.rectSize.toFixed(0)}x${frame.rectSize.toFixed(0)}.`;
    }
  }

  async function init() {
    const hasTileGridElements = gridElement || titleGridElement || labelGridElement || binaryGridElement;
    const hasGroupElements =
      specialGroupElement || singleRowGroupElement || quarkColorGroupElement || compositeGroupElement;
    if (!hasTileGridElements && !hasGroupElements) {
      throw new Error("pdgedit review output element is required.");
    }

    const loadOperations = [loadPdgeditTileCatalog({ fetchImpl, specUrl })];
    if (hasGroupElements) {
      if (!groupSpecUrl) {
        throw new Error("pdgedit review group spec URL is required.");
      }
      loadOperations.push(loadPdgeditReviewGroupCatalog({ fetchImpl, specUrl: groupSpecUrl }));
    }

    const [loadedCatalog, loadedGroupCatalog = null] = await Promise.all(loadOperations);
    catalog = loadedCatalog;
    groupCatalog = loadedGroupCatalog;

    if (catalogMetaElement) {
      const groupTotal =
        (groupCatalog?.specialGroups?.length ?? 0) +
        (groupCatalog?.singleRowGroups?.length ?? 0) +
        (groupCatalog?.quarkColorGroups?.length ?? 0) +
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
