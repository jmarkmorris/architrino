import { createXyzzyTileReviewAppRuntime } from "../XyzzyTileReviewAppRuntime.js";

const specUrl = new URL("../xyzzy-tiles.json", import.meta.url).href;
const groupSpecUrl = new URL("../xyzzy-review-groups.json", import.meta.url).href;

const runtime = createXyzzyTileReviewAppRuntime({
  documentLike: globalThis.document,
  fetchImpl: typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null,
  specUrl,
  groupSpecUrl,
  statusElement: document.getElementById("xyzzy-review-status"),
  catalogMetaElement: document.getElementById("xyzzy-review-catalog-meta"),
  specialGroupElement: document.getElementById("xyzzy-review-special-group-grid"),
  singleRowGroupElement: document.getElementById("xyzzy-review-single-row-group-grid"),
  compositeGroupElement: document.getElementById("xyzzy-review-composite-group-grid"),
  titleGridElement: document.getElementById("xyzzy-review-title-grid"),
  binaryGridElement: document.getElementById("xyzzy-review-binary-grid"),
  gridElement: document.getElementById("xyzzy-review-grid"),
  topCountInput: document.getElementById("xyzzy-review-top-count"),
  bottomCountInput: document.getElementById("xyzzy-review-bottom-count"),
});

void runtime.init().catch((error) => {
  const statusElement = document.getElementById("xyzzy-review-status");
  if (statusElement) {
    statusElement.textContent = `Xyzzy review error: ${String(error?.message || error).trim()}`;
  }
  throw error;
});
