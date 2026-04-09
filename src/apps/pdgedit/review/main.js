import { createPdgeditTileReviewAppRuntime } from "../PdgeditTileReviewAppRuntime.js?v=2026-04-08-quark-color-title-tile";

const specUrl = new URL("../pdgedit-tiles.json", import.meta.url).href;
const groupSpecUrl = new URL("../pdgedit-review-groups.json", import.meta.url).href;

const runtime = createPdgeditTileReviewAppRuntime({
  documentLike: globalThis.document,
  fetchImpl: typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null,
  specUrl,
  groupSpecUrl,
  statusElement: document.getElementById("pdgedit-review-status"),
  catalogMetaElement: document.getElementById("pdgedit-review-catalog-meta"),
  specialGroupElement: document.getElementById("pdgedit-review-special-group-grid"),
  singleRowGroupElement: document.getElementById("pdgedit-review-single-row-group-grid"),
  quarkColorGroupElement: document.getElementById("pdgedit-review-quark-color-group-grid"),
  compositeGroupElement: document.getElementById("pdgedit-review-composite-group-grid"),
  titleGridElement: document.getElementById("pdgedit-review-title-grid"),
  binaryGridElement: document.getElementById("pdgedit-review-binary-grid"),
  gridElement: document.getElementById("pdgedit-review-grid"),
  topCountInput: document.getElementById("pdgedit-review-top-count"),
  bottomCountInput: document.getElementById("pdgedit-review-bottom-count"),
});

void runtime.init().catch((error) => {
  const statusElement = document.getElementById("pdgedit-review-status");
  if (statusElement) {
    statusElement.textContent = `pdgedit review error: ${String(error?.message || error).trim()}`;
  }
  throw error;
});
