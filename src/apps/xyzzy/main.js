import { createXyzzyTileReviewAppRuntime } from "./XyzzyTileReviewAppRuntime.js";

const specUrl = new URL("./xyzzy-tiles.json", import.meta.url).href;

const runtime = createXyzzyTileReviewAppRuntime({
  documentLike: globalThis.document,
  fetchImpl: typeof globalThis.fetch === "function" ? globalThis.fetch.bind(globalThis) : null,
  specUrl,
  statusElement: document.getElementById("xyzzy-review-status"),
  catalogMetaElement: document.getElementById("xyzzy-review-catalog-meta"),
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
